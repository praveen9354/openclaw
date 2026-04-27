import { afterEach, describe, expect, it, vi } from "vitest";
import {
  handleChannelConfigReload,
  handleChannelConfigSave,
  handleNostrProfileFieldChange,
  handleNostrProfileSave,
} from "./app-channels.ts";
import type { ChannelsState } from "./controllers/channels.ts";
import type { ConfigState } from "./controllers/config.ts";
import type { ChannelsStatusSnapshot } from "./types.ts";
import { createNostrProfileFormState } from "./views/channels.nostr-profile-form.ts";

type ChannelsActionHostForTest = ConfigState &
  ChannelsState & {
    hello?: { auth?: { deviceToken?: string | null } | null } | null;
    password?: string;
    settings: { token?: string };
    nostrProfileFormState: ReturnType<typeof createNostrProfileFormState> | null;
    nostrProfileAccountId: string | null;
  };

function createChannelsSnapshot(name = "saved"): ChannelsStatusSnapshot {
  const nostrAccount = {
    accountId: "default",
    configured: true,
    profile: { name },
  } as ChannelsStatusSnapshot["channelAccounts"][string][number] & {
    profile: { name: string };
  };
  return {
    ts: Date.now(),
    channelOrder: ["nostr"],
    channelLabels: { nostr: "Nostr" },
    channels: { nostr: { configured: true } },
    channelAccounts: {
      nostr: [nostrAccount],
    },
    channelDefaultAccountId: { nostr: "default" },
  };
}

function createHost(request: ReturnType<typeof vi.fn> = vi.fn()): ChannelsActionHostForTest {
  return {
    applySessionKey: "main",
    channelsError: null,
    channelsLastSuccess: null,
    channelsLoading: false,
    channelsSnapshot: createChannelsSnapshot("old"),
    client: { request } as unknown as ConfigState["client"],
    configActiveSection: null,
    configActiveSubsection: null,
    configApplying: false,
    configForm: null,
    configFormDirty: false,
    configFormMode: "form",
    configFormOriginal: null,
    configIssues: [],
    configLoading: false,
    configRaw: "",
    configRawOriginal: "",
    configSaving: false,
    configSchema: null,
    configSchemaLoading: false,
    configSchemaVersion: null,
    configSearchQuery: "",
    configSnapshot: null,
    configUiHints: {},
    configValid: null,
    connected: true,
    lastError: null,
    nostrProfileAccountId: null,
    nostrProfileFormState: null,
    settings: {},
    updateRunning: false,
    whatsappBusy: false,
    whatsappLoginConnected: null,
    whatsappLoginMessage: null,
    whatsappLoginQrDataUrl: null,
  };
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("channel config actions", () => {
  it("discards stale dirty config state on explicit reload", async () => {
    const request = vi.fn().mockImplementation(async (method: string) => {
      if (method === "config.get") {
        return {
          config: { gateway: { mode: "remote" } },
          valid: true,
          issues: [],
          raw: '{\n  "gateway": { "mode": "remote" }\n}\n',
        };
      }
      if (method === "channels.status") {
        return createChannelsSnapshot();
      }
      return {};
    });
    const host = createHost(request);
    host.configFormDirty = true;
    host.configForm = { gateway: { mode: "local" } };

    await handleChannelConfigReload(host);

    expect(host.configFormDirty).toBe(false);
    expect(host.configForm).toEqual({ gateway: { mode: "remote" } });
    expect(host.configFormOriginal).toEqual({ gateway: { mode: "remote" } });
    expect(request).toHaveBeenCalledWith("channels.status", { probe: true, timeoutMs: 8000 });
  });

  it("keeps failed channel saves from discarding pending edits during recovery reload", async () => {
    const request = vi.fn().mockImplementation(async (method: string) => {
      if (method === "config.set") {
        throw new Error("Config hash mismatch");
      }
      if (method === "config.get") {
        return {
          config: { gateway: { mode: "remote" } },
          valid: true,
          issues: [],
          raw: '{\n  "gateway": { "mode": "remote" }\n}\n',
        };
      }
      if (method === "channels.status") {
        return createChannelsSnapshot();
      }
      return {};
    });
    const host = createHost(request);
    host.configSnapshot = { hash: "old-hash" };
    host.configFormDirty = true;
    host.configForm = { gateway: { mode: "local" } };

    await handleChannelConfigSave(host);

    expect(host.lastError).toContain("Config hash mismatch");
    expect(host.configFormDirty).toBe(true);
    expect(host.configForm).toEqual({ gateway: { mode: "local" } });
    expect(host.configSnapshot?.config).toEqual({ gateway: { mode: "remote" } });
    expect(request.mock.calls.some(([method]) => method === "channels.status")).toBe(false);
  });
});

describe("Nostr profile actions", () => {
  it("uses the refreshed channel profile as the saved baseline after publishing", async () => {
    const request = vi.fn().mockImplementation(async (method: string) => {
      if (method === "channels.status") {
        return createChannelsSnapshot("saved-normalized");
      }
      return {};
    });
    const host = createHost(request);
    host.nostrProfileAccountId = "default";
    host.nostrProfileFormState = createNostrProfileFormState({ name: "old" });
    handleNostrProfileFieldChange(host, "name", "draft");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: true, persisted: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    await handleNostrProfileSave(host);

    expect(fetch).toHaveBeenCalledWith(
      "/api/channels/nostr/default/profile",
      expect.objectContaining({ method: "PUT" }),
    );
    expect(host.nostrProfileFormState?.values).toEqual({
      name: "saved-normalized",
      displayName: "",
      about: "",
      picture: "",
      banner: "",
      website: "",
      nip05: "",
      lud16: "",
    });
    expect(host.nostrProfileFormState?.original).toEqual(host.nostrProfileFormState?.values);
  });
});
