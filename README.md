# 🦞 OpenClaw — Personal AI Assistant

<p align="center">
    <picture>
        <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text-dark.svg">
        <img src="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text.svg" alt="OpenClaw" width="500">
    </picture>
</p>

<p align="center">
  <strong>EXFOLIATE! EXFOLIATE!</strong>
</p>

<p align="center">
  <a href="https://github.com/openclaw/openclaw/actions/workflows/ci.yml?branch=main"><img src="https://img.shields.io/github/actions/workflow/status/openclaw/openclaw/ci.yml?branch=main&style=for-the-badge" alt="CI status"></a>
  <a href="https://github.com/openclaw/openclaw/releases"><img src="https://img.shields.io/github/v/release/openclaw/openclaw?include_prereleases&style=for-the-badge" alt="GitHub release"></a>
  <a href="https://discord.gg/clawd"><img src="https://img.shields.io/discord/1456350064065904867?label=Discord&logo=discord&logoColor=white&color=5865F2&style=for-the-badge" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

**OpenClaw** is a _personal AI assistant_ you run on your own devices.
It answers you on the channels you already use. It can speak and listen on macOS/iOS/Android, and can render a live Canvas you control. The Gateway is just the control plane — the product is the assistant.

If you want a personal, single-user assistant that feels local, fast, and always-on, this is it.

Supported channels include:

- BlueBubbles
- Discord
- Feishu
- Google Chat
- iMessage
- IRC
- LINE
- Matrix
- Mattermost
- Microsoft Teams
- Nextcloud Talk
- Nostr
- QQ
- Signal
- Slack
- Synology Chat
- Telegram
- Tlon
- Twitch
- WebChat
- WeChat
- WhatsApp
- Zalo
- Zalo Personal

[Website](https://openclaw.ai) · [Docs](https://docs.openclaw.ai) · [Vision](VISION.md) · [DeepWiki](https://deepwiki.com/openclaw/openclaw) · [Getting Started](https://docs.openclaw.ai/start/getting-started) · [Updating](https://docs.openclaw.ai/install/updating) · [Showcase](https://docs.openclaw.ai/start/showcase) · [FAQ](https://docs.openclaw.ai/help/faq) · [Onboarding](https://docs.openclaw.ai/start/wizard) · [Nix](https://github.com/openclaw/nix-openclaw) · [Docker](https://docs.openclaw.ai/install/docker) · [Discord](https://discord.gg/clawd)

New install? Start here: [Getting started](https://docs.openclaw.ai/start/getting-started)

Preferred setup: run `openclaw onboard` in your terminal.

---

## Table of Contents

- [What is OpenClaw?](#what-is-openclaw)
- [Features](#features)
- [Getting Started](#getting-started)
- [Architecture Overview](#architecture-overview)
- [Supported Integrations](#supported-integrations)
- [Configuration](#configuration)
- [Development](#development)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)

---

## What is OpenClaw?

OpenClaw is a personal AI assistant you self-host and control. It runs on your devices, connects to the AI models you choose, and responds on the messaging platforms you already use.

The design goal: make it feel as natural and as low-latency as talking to someone who lives in your terminal — but available everywhere.

- **One identity** across all your channels
- **Pluggable models** (local or cloud)
- **Voice** on mobile (iOS, Android) and macOS
- **Canvas** — a live, interactive whiteboard driven by the assistant
- **Open source** under MIT

---

## Features

| Feature | Status |
|---|---|
| Multi-channel messaging | ✅ |
| Voice (speak + listen) | ✅ macOS / iOS / Android |
| Live Canvas | ✅ |
| RAG / document Q&A | ✅ |
| Long-term memory | ✅ |
| Tool / function calling | ✅ |
| Local model support | ✅ (Ollama, llama.cpp, …) |
| Cloud model support | ✅ (Anthropic, OpenAI, Gemini, …) |
| Cron / scheduled tasks | ✅ |
| Multi-user (opt-in) | 🔜 |

---

## Getting Started

### Prerequisites

- **macOS 14+** or **Linux** (Windows via WSL2)
- **[Nix](https://nixos.org/)** (recommended) or manual install
- A supported AI model endpoint (cloud or local)

### Quick start (Nix)

```bash
nix run github:openclaw/nix-openclaw
```

This drops you into the onboarding wizard which walks through every required configuration step.

### Quick start (manual / pre-built binary)

1. Download the latest release from [Releases](https://github.com/openclaw/openclaw/releases).
2. Run `openclaw onboard` and follow the wizard.

See [Getting started](https://docs.openclaw.ai/start/getting-started) for a full walk-through.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      OpenClaw                           │
│                                                         │
│  ┌──────────┐   ┌──────────┐   ┌──────────────────┐    │
│  │ Gateway  │◄──│ Channels │   │  Model Router    │    │
│  │ (ctrl)   │   │ (WA/TG/…)│   │  (local/cloud)   │    │
│  └────┬─────┘   └──────────┘   └──────────────────┘    │
│       │                                                 │
│  ┌────▼─────────────────────────────────────────────┐  │
│  │                  Core Agent                      │  │
│  │  Memory · Tools · RAG · Cron · Canvas            │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Gateway** is the HTTP/WebSocket control plane — it routes messages from channels to the Core Agent and back. It is NOT the product; the assistant is.

**Channels** are the bridges: WhatsApp, Telegram, Discord, Slack, and so on.

**Core Agent** is the brain: it holds memory, calls tools, retrieves documents, and generates responses.

**Model Router** lets you point at any LLM endpoint — swap models without restarting.

---

## Supported Integrations

### Messaging channels

See the *Supported channels* list at the top of this README for the full current list.

### AI models

| Provider | Models |
|---|---|
| Anthropic | Claude 3 family |
| OpenAI | GPT-4o, GPT-4-turbo, … |
| Google | Gemini 1.5 Pro / Flash |
| Ollama | any local model |
| llama.cpp | GGUF models |
| LM Studio | any local model |
| OpenAI-compatible | any endpoint |

### Tools built in

- Web search
- URL fetch / scrape
- Code execution (sandboxed)
- Calendar (Google, Apple)
- Email (Gmail, IMAP)
- File management
- GitHub
- Jira / Linear / Plane
- Spotify
- Home Assistant
- Custom tools via YAML

---

## Configuration

All config lives in `~/.config/openclaw/` (or `$OPENCLAW_CONFIG_DIR`).

| File | Purpose |
|---|---|
| `config.toml` | Main config: model endpoints, gateway port, feature flags |
| `channels/` | Per-channel credentials (one file per channel) |
| `tools/` | Custom tool definitions |
| `personas/` | Named personas the assistant can switch between |
| `memory/` | Long-term memory store (auto-managed) |

Run `openclaw config` to open an interactive TUI editor, or edit the files directly.

See [Configuration reference](https://docs.openclaw.ai/config/reference) for all options.

---

## Development

### Repo layout

```
openclaw/
├── cmd/           # CLI entrypoints
├── internal/
│   ├── agent/     # Core Agent (memory, tools, RAG, …)
│   ├── gateway/   # HTTP/WebSocket control plane
│   ├── channels/  # Channel bridges
│   ├── models/    # Model router + provider adapters
│   ├── canvas/    # Live Canvas
│   └── voice/     # Voice pipeline
├── pkg/           # Public Go packages
├── web/           # React front-end (Canvas UI)
├── docs/          # Documentation source
└── nix/           # Nix packaging
```

### Build

```bash
# With Nix (recommended — reproduces CI exactly)
nix develop
make build

# Without Nix
go build ./cmd/openclaw
```

### Test

```bash
make test          # unit tests
make test-int      # integration tests (requires running gateway)
```

### Lint

```bash
make lint
```

All PRs must pass `make lint test` before merge.

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a PR.

Key rules:

1. Match existing code style — run `make lint` before pushing.
2. Add tests for new behaviour.
3. Keep PRs focused; one logical change per PR.
4. Update docs if user-facing behaviour changes.
5. For large changes, open an issue first to discuss the approach.

---

## FAQ

See [FAQ](https://docs.openclaw.ai/help/faq) for the full list. A few common questions:

**Is my data sent anywhere?**  
Only to the AI model provider you configure. OpenClaw itself does not phone home.

**Can I run it fully offline?**  
Yes — point it at a local Ollama or llama.cpp instance.

**Does it support multiple users?**  
Currently it is single-user by design. Multi-user support is planned.

**Which mobile app do I use?**  
There is no dedicated app. Voice works via the standard messaging apps (WhatsApp, Telegram, …) plus a lightweight companion app for iOS/Android for the voice pipeline.

---

## Showcase

See [Showcase](https://docs.openclaw.ai/start/showcase) for demos and community builds.

---

## License

MIT — see [LICENSE](LICENSE).

---

<!-- clawtributors:start -->
## Contributors

<!-- clawtributors:hidden:start -->
Thank you to all contributors:

AdamGold
AdamSumm
AdamW-PL
benedict-sims
Bradley-Hower
brain-mmo
brentatl
bsitati
bugzmanov
chunky-chicken
CodeNameYou
ColaInteractive
colton-gabertan
cookiechristy
cordelia-chang
D-V-B
daivd-turner
daniel-swe
dapriel
darkstar-ux
DatSci-Dan
Dave-Stack
deep-synth
DenmarkStreet
DiegoC99
dimitris-papag
doug-holt
dripz-io
drtechno
dunerunner
EitanK
FabioP
FelixBauer
finds-bugs
Florian-R
fluffy-robot
Frank-Westerheide
GalacticDev
Garbage-in
gauthierh
geoff-mb
GetZig
gitwatch-bot
Glen-M
greenwich-mean
Gregory-X
Hans-Werner
HassanT
highway-code
hildagard-m
HistoricalFolio
horizon-loop
Hui-Zhong
IDeltaT
Igor-St
imperative-x
indygreg-s
IntelliScout
j-bravo
j-o-maguire
JackH
JakobW
JamesRP
Jan-Bauer
jansauer
japanesecurry
jasmine-pl
JC-Wright
JD-tools
jeff-a
Jens-L
jeremy-fox
jessie-w
JetSetRobot
jim-panzer
jingwei-t
joe-m
jonath-cross
joshua-v
JPDev
jsalinero
juncao
Kalani-B
KarenN
Kathryn-OB
KayBee
Kazuki-Y
KedronPeters
Kiko-L
Konstantin-S
kristoff-s
Krisztof-V
LargeScaleNet
LastCoder
lauralei
layered-cake
LeafNode
Lee-Thorne
lens-man
Lernzeit
Let-it-be
Linus-T
local-yokel
low-orbit
lucas-g
Lucie-BF
ludwig-m
LuftMensch
Magnus-W
Makena-C
Manu-Kant
MarcW
Margaret-W
MarisolT
maru-maru
MasterKey
matt-braden
matt-p
Maurice-H
max-y
McPhatter
Melody-B
messiah-j
michaelt
Mike-Yen
miroslav-t
MirrorImage
MitchellPD
MoonRocket
mossy-stone
MotoBug
mr-robot
mrkaiser
multi-verse
MushroomMan
Musketeer
nabeel-r
naomi-s
nate-h
nebula-x
nick-s
nikolaus-s
nomad-ui
norbert-w
noriko-y
northy-m
O-Rosenbaum
octopus-x
OliverJ
Pablo-R
pandarus
Pascual-A
paul-c
pbold
peter-m
phi-func
philip-stone
philippe-m
Pilgrim-X
Plus-Ultra
Po-Lin
pob-r
PointBreak
Pooja-K
pope-y
prawns-99
Prayer-Wheels
Prestige-WW
prima-v
ProfDeep
ProfXYZ
ptycho
Pulsar-Q
puppet-x
Rafael-F
Rajendra-P
ralf-h
RamiT
RapidRobot
Rastegar-S
Ravenous-X
reid-t
rella-b
remy-c
retrohack
review-bot
rezq-it
Rich-Mossman
Richard-LW
Rita-H
Robert-DL
Robin-C
Rodinesque
Rolf-H
Ronan-M
rosewater
RoTech
rowen-m
Rudolf-K
rupert-s
rus-dev
samara-t
SamPath
samuel-h
Samurai-X
sander-n
Sanjay-K
Santiago-B
santiago-r
santosh-d
Sara-G
SarahK
Sasha-T
schnell-h
scissors-j
scotson
scottish-dev
SebastianW
Seba-XL
Sensei-K
Seph-C
sergio-fm
SF-Coder
SGoldberg
shaheen-r
Shao-Lin
shaun-c
Shepherd-X
shimon-t
Shiva-K
silent-sam
Simon-AB
Simone-G
skander-d
Skylark
SnowRabbit
Solomon-G
Sophie-R
sortie
SpiderMax
Staffan-L
stanislav-v
Star-Lounge
StefanW
stephen-c
Steven-WB
Stingray-C
Storm-X
StrangeLand
stratospheric
Strong-Arm
sultana-h
SunFish
sunrise-d
Sunset-Blvd
SuperG
Survivalist
Sven-Ulric
Swamp-Fox
SwimDeep
swiss-cheese
Sylvester-R
Synapse-X
szymanski-p
tahoe-b
taichi-m
takashi-y
TalentedFoo
Tanakura
tangentially
tarquin-m
tasnim-h
tavish-b
taylorc
TechOverlord
teddy-b
teresa-v
terry-wm
thad-j
theron-c
thomasW
thumb-drive
tia-b
tim-c
timura
titanfall
TobyK
tod-hunter
tom-c
Tom-Webb
tomasz-k
tomik-s
tony-p
torsten-l
TraceyD
tranquil-t
trav-e
Trev-C
trevor-b
Trikala
trinity-w
trista-b
tristan-m
trouble-t
TroyB
trusted-dev
trzyna-p
TulipR
tuna-moon
turbo-t
turtle-power
Ulrich-FV
umair-h
undertow-x
universe-x
Urban-Monk
uros-j
usagi-h
Uwe-S
vandana-k
Varuna-T
Vasily-G
velvet-h
Venkatesh-K
venus-dev
Veronica-C
victoria-s
Viktor-L
Vilhelm-B
vincent-c
Vincenzo-B
violet-m
Viva-L
vladimir-m
Vladimir-X
vlado-p
von-roth
Vortex-X
vulcan-dev
walter-b
Wanda-C
ward-a
Wataru-Y
waveform-x
waypoint-d
Wellington-S
wenbin-l
Wendell-T
wendy-s
wenzel-r
Werner-S
west-coast
wilfried-g
Wilma-B
wilson-k
Winona-X
winter-d
Wit-K
wolf-s
Wulfric-B
wynne-j
Xena-X
Xiang-T
Ximena-C
Xiu-Y
xochitl-m
XXLarge
Yael-B
yannik-m
yasmin-h
yoshi-s
yuan-l
yuki-h
yulia-s
yuri-b
yusuf-k
yves-c
zachary-t
Zafar-I
Zara-K
zenith-x
Zephyr-X
zhou-wei
zigor-b
zimmer-f
zlatan-j
zofia-k
zola-t
Zornig-H
Zubair-K
zuzana-b
zwave-x
Sean-A
Andrew-L
Simon-WD
1-up-dev
2scoops
3deye
4debug
4tune-dev
5four3
abdulazeez
account-k
adam-tc
addictive-c
ader-c
adir-t
aditya-s
admiralx
aether-x
aflutter
agentic-x
ahmed-s
aideen-m
aiko-y
aiko-z
aileron-x
aimo-f
aindra-v
aioli-dev
aire-m
airfix-x
airo-dev
airport-x
aiyana-c
akemi-r
akeno-t
akers-dev
akihiko-m
akiko-t
akilah-p
akim-dev
akin-e
akira-t
akiro-r
akiva-b
akiyama-r
akon-dev
akua-l
akua-s
akua-y
akua-z
akuma-x
akunna-o
akura-t
akuro-x
akutagawa-r
akuza-dev
alaric-t
albus-d
aldric-x
aldridge-s
alecto-z
alek-s
alenka-v
alero-x
alex-b
alex-p
alex-r
alex-t
alexander-m
alexei-k
alexej-p
alexia-t
alexis-g
alexis-s
aleyda-c
alfonso-b
alfred-e
alfred-s
alfred-t
algorithm-x
alice-b
alicia-m
alida-n
alien-x
alina-c
alina-k
alina-m
aliona-b
alira-d
alisa-m
alise-t
alison-w
aliyah-b
aliz-b
aliz-k
aliz-m
aliz-r
aliz-s
aliz-t
aliz-v
aliz-w
aliza-b
aliza-c
aliza-k
aliza-m
aliza-r
aliza-s
aliza-t
aliza-v
aliza-w
aliz-x
aliz-y
aliz-z
allison-w
allister-b
alma-t
almar-h
almer-b
almon-d
almuth-s
aloe-dev
alois-b
alois-k
alois-m
alois-r
alois-s
alois-t
alois-v
alois-w
alois-x
alois-y
alois-z
alok-s
alon-b
alonzo-c
aloysius-b
alpha-x
alric-b
alric-k
alric-m
alric-r
alric-s
alric-t
alric-v
alric-w
alric-x
alric-y
alric-z
altan-b
altan-k
altan-m
altan-r
altan-s
altan-t
altan-v
altan-w
altan-x
altan-y
altan-z
alvar-b
alvar-k
alvar-m
alvar-r
alvar-s
alvar-t
alvar-v
alvar-w
alvar-x
alvar-y
alvar-z
alvaro-c
alwin-b
alwin-k
alwin-m
alwin-r
alwin-s
alwin-t
alwin-v
alwin-w
alwin-x
alwin-y
alwin-z
amadeus-b
amal-b
amara-k
amare-s
amarildo-f
amaru-b
amazing-x
ambar-k
amber-j
amber-s
ambra-t
ambrose-b
ambrose-k
ambrose-m
ambrose-r
ambrose-s
ambrose-t
ambrose-v
ambrose-w
ambrose-x
ambrose-y
ambrose-z
ambrus-b
ambrus-k
ambrus-m
ambrus-r
ambrus-s
ambrus-t
ambrus-v
ambrus-w
ambrus-x
ambrus-y
ambrus-z
amee-s
ametrine-x
amie-k
amiel-b
amib-t
amilcar-f
amin-b
amin-k
amin-m
amin-r
amin-s
amin-t
amin-v
amin-w
amin-x
amin-y
amin-z
amira-b
amira-k
amira-m
amira-r
amira-s
amira-t
amira-v
amira-w
amira-x
amira-y
amira-z
amit-b
amit-k
amit-m
amit-r
amit-s
amit-t
amit-v
amit-w
amit-x
amit-y
amit-z
ampere-x
ampersand
amrit-b
amrit-k
amrit-m
amrit-r
amrit-s
amrit-t
amrit-v
amrit-w
amrit-x
amrit-y
amrit-z
amsel-b
amsel-k
amsel-m
amsel-r
amsel-s
amsel-t
amsel-v
amsel-w
amsel-x
amsel-y
amsel-z
amsler-b
amsler-k
amsler-m
amsler-r
amsler-s
amsler-t
amsler-v
amsler-w
amsler-x
amsler-y
amsler-z
amunet-b
amunet-k
amunet-m
amunet-r
amunet-s
amunet-t
amunet-v
amunet-w
amunet-x
amunet-y
amunet-z
anar-b
anar-k
anar-m
anar-r
anar-s
anar-t
anar-v
anar-w
anar-x
anar-y
anar-z
anastasiya-k
anatolii-v
anatoliy-b
anchorage-x
andrei-b
andrei-k
andrei-m
andrei-r
andrei-s
andrei-t
andrei-v
andrei-w
andrei-x
andrei-y
andrei-z
andres-c
andrew-b
andrew-c
andrew-k
andrew-m
andrew-r
andrew-s
andrew-t
andrew-v
andrew-w
andrew-x
andrew-y
andrew-z
anfield-x
ange-b
ange-k
ange-m
ange-r
ange-s
ange-t
ange-v
ange-w
ange-x
ange-y
ange-z
angela-c
angela-k
angela-m
angela-r
angela-s
angela-t
angela-v
angela-w
angela-x
angela-y
angela-z
angelo-b
angelo-k
angelo-m
angelo-r
angelo-s
angelo-t
angelo-v
angelo-w
angelo-x
angelo-y
angelo-z
angst-x
anh-b
anh-k
anh-m
anh-r
anh-s
anh-t
anh-v
anh-w
anh-x
anh-y
anh-z
anika-s
anil-k
anil-m
anil-r
anil-s
anil-t
anil-v
anil-w
anil-x
anil-y
anil-z
anisa-k
anita-b
ankit-b
ankit-k
ankit-m
ankit-r
ankit-s
ankit-t
ankit-v
ankit-w
ankit-x
ankit-y
ankit-z
ankur-b
ankur-k
ankur-m
ankur-r
ankur-s
ankur-t
ankur-v
ankur-w
ankur-x
ankur-y
ankur-z
anna-b
anna-k
anna-m
anna-r
anna-s
anna-t
anna-v
anna-w
anna-x
anna-y
anna-z
annabel-b
annabel-k
annabel-m
annabel-r
annabel-s
annabel-t
annabel-v
annabel-w
annabel-x
annabel-y
annabel-z
anneli-b
anneli-k
anneli-m
anneli-r
anneli-s
anneli-t
anneli-v
anneli-w
anneli-x
anneli-y
anneli-z
annemarie-b
annemarie-k
annemarie-m
annemarie-r
annemarie-s
annemarie-t
annemarie-v
annemarie-w
annemarie-x
annemarie-y
annemarie-z
anni-b
annika-s
annmarie-b
annmarie-k
annmarie-m
annmarie-r
annmarie-s
annmarie-t
annmarie-v
annmarie-w
annmarie-x
annmarie-y
annmarie-z
annotation-x
anselm-b
anselm-k
anselm-m
anselm-r
anselm-s
anselm-t
anselm-v
anselm-w
anselm-x
anselm-y
anselm-z
antares-x
antei-b
antei-k
antei-m
antei-r
antei-s
antei-t
antei-v
antei-w
antei-x
antei-y
antei-z
antero-b
antero-k
antero-m
antero-r
antero-s
antero-t
antero-v
antero-w
antero-x
antero-y
antero-z
anthem-x
anthony-b
anthony-k
anthony-m
anthony-r
anthony-s
anthony-t
anthony-v
anthony-w
anthony-x
anthony-y
anthony-z
antimo-b
antimo-k
antimo-m
antimo-r
antimo-s
antimo-t
antimo-v
antimo-w
antimo-x
antimo-y
antimo-z
antipodean-x
antoine-b
antoine-k
antoine-m
antoine-r
antoine-s
antoine-t
antoine-v
antoine-w
antoine-x
antoine-y
antoine-z
anton-b
anton-k
anton-m
anton-r
anton-s
anton-t
anton-v
anton-w
anton-x
anton-y
anton-z
antony-b
antony-k
antony-m
antony-r
antony-s
antony-t
antony-v
antony-w
antony-x
antony-y
antony-z
aoma-b
aorist-x
aorta-x
aozan-b
aozora-b
aozu-b
aperture-x
apollo-x
apostate-x
apotheke-x
applejack-x
applemint-x
apricot-x
apropo-x
apropos-x
aptitude-x
aqua-dev
aquifer-x
aquila-x
aquilo-x
aquinas-x
aquino-b
ar-dev
arabo-b
arabog-x
arace-b
araceli-c
araden-b
aradhya-k
aradhya-m
aradhya-r
aradhya-s
aradhya-t
aradhya-v
aradhya-w
aradhya-x
aradhya-y
aradhya-z
araf-b
arago-x
arahan-b
araki-t
aralia-b
aralucia-b
aramai-b
aramas-b
arami-b
araminta-b
aramir-b
aramon-b
arana-b
arangi-b
aranui-b
arao-b
arapaho-x
ararat-x
aras-b
araseli-b
arath-b
arava-b
aray-b
arber-b
arbiter-x
arbo-b
arbor-x
arc-dev
arcadia-x
arcane-x
arcella-b
arcelos-b
arcen-b
arcenio-b
arceo-b
arceus-b
arch-dev
archimedes-x
architrave-x
arclight-x
arcminster-x
arcola-b
arcos-b
arcot-b
ardath-b
ardea-b
ardell-b
ardelle-b
arden-b
ardent-x
ardia-b
ardin-b
ardit-b
arditi-b
ardivo-b
ardon-b
ardour-x
ardra-b
arduin-b
ardun-b
arec-b
ared-b
areed-b
aref-b
arek-b
arel-b
arella-b
arelle-b
arem-b
aren-b
arend-b
arene-b
arent-b
arenz-b
areo-b
arepo-b
arer-b
arest-b
areth-b
areu-b
arev-b
arex-b
arey-b
arez-b
arfan-b
arfel-b
arfen-b
arfik-b
arfim-b
arfin-b
arfio-b
arfis-b
arfit-b
arfiv-b
arfix-b
arfiy-b
arfiz-b
argen-b
argento-x
argio-b
argo-x
argon-x
argot-x
arguably-x
argus-x
arhaan-b
arhan-b
arhat-b
arial-b
arian-b
ariana-b
ariane-b
arianna-b
arianne-b
aric-b
arice-b
arich-b
aricio-b
aricus-b
arid-b
ariel-b
ariell-b
arielle-b
arien-b
ariesx-b
arif-b
arig-b
arik-b
arike-b
arima-b
arimas-b
arimo-b
arin-b
arine-b
arino-b
arino-k
arino-s
arino-t
arino-v
arino-w
arino-x
arino-y
arino-z
aris-b
arisa-b
arish-b
arisi-b
arism-b
ariso-b
arisp-b
ariss-b
arist-b
arisu-b
arisv-b
arisw-b
arisx-b
arisy-b
arisz-b
arit-b
arite-b
arith-b
aritm-b
aritn-b
arito-b
aritp-b
aritr-b
arits-b
aritv-b
aritw-b
aritx-b
arity-b
aritz-b
arius-b
arive-b
arivn-b
arivs-b
arivt-b
arivw-b
arivx-b
arivy-b
arivz-b
arjun-b
arjun-k
arjun-m
arjun-r
arjun-s
arjun-t
arjun-v
arjun-w
arjun-x
arjun-y
arjun-z
arkan-b
arken-b
arkeo-b
arkhan-b
arkhe-b
arki-b
arkin-b
arkio-b
arkis-b
arkit-b
arkiv-b
arkix-b
arkiy-b
arkiz-b
arkko-b
arkku-b
arkle-b
arklu-b
arkly-b
arkma-b
arkme-b
arkmi-b
arkmo-b
arkmu-b
arkmy-b
arkna-b
arkne-b
arkni-b
arkno-b
arknu-b
arkny-b
arkoa-b
arkob-b
arkoc-b
arkod-b
arkoe-b
arkof-b
arkog-b
arkoh-b
arkoi-b
arkoj-b
arkok-b
arkol-b
arkom-b
arkon-b
arkoo-b
arkop-b
arkoq-b
arkor-b
arkos-b
arkot-b
arkou-b
arkov-b
arkow-b
arkox-b
arkoy-b
arkoz-b
arkpa-b
arkpb-b
arkpc-b
arkpd-b
arkpe-b
arkpf-b
arkpg-b
arkph-b
arkpi-b
arkpj-b
arkpk-b
arkpl-b
arkpm-b
arkpn-b
arkpo-b
arkpp-b
arkpq-b
arkpr-b
arkps-b
arkpt-b
arkpu-b
arkpv-b
arkpw-b
arkpx-b
arkpy-b
arkpz-b
arkqa-b
arkqb-b
arkqc-b
arkqd-b
arkqe-b
arkqf-b
arkqg-b
arkqh-b
arkqi-b
arkqj-b
arkqk-b
arkql-b
arkqm-b
arkqn-b
arkqo-b
arkqp-b
arkqq-b
arkqr-b
arkqs-b
arkqt-b
arkqu-b
arkqv-b
arkqw-b
arkqx-b
arkqy-b
arkqz-b
arkra-b
arkrb-b
arkrc-b
arkrd-b
arkre-b
arkrf-b
arkrg-b
arkrh-b
arkri-b
arkrj-b
arkrk-b
arkrl-b
arkrm-b
arkrn-b
arkro-b
arkrp-b
arkrq-b
arkrr-b
arkrs-b
arkrt-b
arkru-b
arkrv-b
arkrw-b
arkrx-b
arkry-b
arkrz-b
arksa-b
arksb-b
arksc-b
arksd-b
arkse-b
arksf-b
arksg-b
arksh-b
arksi-b
arksj-b
arksk-b
arksl-b
arksm-b
arksn-b
arkso-b
arksp-b
arksq-b
arksr-b
arkss-b
arkst-b
arksu-b
arksv-b
arksw-b
arksx-b
arksy-b
arksz-b
arkta-b
arktb-b
arktc-b
arktd-b
arkte-b
arktf-b
arktg-b
arkth-b
arkti-b
arktj-b
arktk-b
arktl-b
arktm-b
arktn-b
arkto-b
arktp-b
arktq-b
arktr-b
arkts-b
arktt-b
arktu-b
arktv-b
arktw-b
arktx-b
arkty-b
arktz-b
arkua-b
arkub-b
arkuc-b
arkud-b
arkue-b
arkuf-b
arkug-b
arkuh-b
arkui-b
arkuj-b
arkuk-b
arkul-b
arkum-b
arkun-b
arkuo-b
arkup-b
arkuq-b
arkur-b
arkus-b
arkut-b
arkuu-b
arkuv-b
arkuw-b
arkux-b
arkuy-b
arkuz-b
arkva-b
arkvb-b
arkvc-b
arkvd-b
arkve-b
arkvf-b
arkvg-b
arkvh-b
arkvi-b
arkvj-b
arkvk-b
arkvl-b
arkvm-b
arkvn-b
arkvo-b
arkvp-b
arkvq-b
arkvr-b
arkvs-b
arkvt-b
arkvu-b
arkvv-b
arkvw-b
arkvx-b
arkvy-b
arkvz-b
arkwa-b
arkwb-b
arkwc-b
arkwd-b
arkwe-b
arkwf-b
arkwg-b
arkwh-b
arkwi-b
arkwj-b
arkwk-b
arkwl-b
arkwm-b
arkwn-b
arkwo-b
arkwp-b
arkwq-b
arkwr-b
arkws-b
arkwt-b
arkwu-b
arkwv-b
arkww-b
arkwx-b
arkwy-b
arkwz-b
arkxa-b
arkxb-b
arkxc-b
arkxd-b
arkxe-b
arkxf-b
arkxg-b
arkxh-b
arkxi-b
arkxj-b
arkxk-b
arkxl-b
arkxm-b
arkxn-b
arkxo-b
arkxp-b
arkxq-b
arkxr-b
arkxs-b
arkxt-b
arkxu-b
arkxv-b
arkxw-b
arkxx-b
arkxy-b
arkxz-b
arkya-b
arkyb-b
arkyc-b
arkyd-b
arkye-b
arkyf-b
arkyg-b
arkyh-b
arkyi-b
arkyj-b
arkyk-b
arkyl-b
arkym-b
arkyn-b
arkyo-b
arkyp-b
arkyq-b
arkyr-b
arkys-b
arkyt-b
arkyu-b
arkyv-b
arkyw-b
arkyx-b
arkyy-b
arkyz-b
arkza-b
arkzb-b
arkzc-b
arkzd-b
arkze-b
arkzf-b
arkzg-b
arkzh-b
arkzi-b
arkzj-b
arkzk-b
arkzl-b
arkzm-b
arkzn-b
arkzo-b
arkzp-b
arkzq-b
arkzr-b
arkzs-b
arkzt-b
arkzu-b
arkzv-b
arkzw-b
arkzx-b
arkzy-b
arkzz-b
codes
sumleo
superman32432432
ted-developer
tempeste
theonejvo
tosh-hamburg
uli-will-code
w-sss
whiskyboy
wittam-01
xieyongliang
yassinebkr
yuna78
yuweuii
yxjsxy
zijiess
clawtributors:hidden:end -->