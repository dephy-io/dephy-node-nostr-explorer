# DePHY Node Nostr Explorer

### Scripts for dev and build

install dependencies

`pnpm install`

dev

`pnpm dev`

To view the application in your browser, open:

`http://localhost:3000`

build

`pnpm build`

### Deploy on Cloudflare

Build configuration

Build command: `pnpm run build:pages`

Build output: `apps/relays/.vercel/output/static`

Variables and Secrets
NODE_VERSION: `20`

Runtime

Compatibility date: `Feb 21, 2025`

Compatibility flags: `nodejs_compat`