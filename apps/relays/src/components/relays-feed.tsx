"use client";

import { Feed } from "@ngine/core";

import { components } from "../kinds";
import NDK, { NDKKind } from "@nostr-dev-kit/ndk";

 

export default function RelaysFeed({ relay, kinds }: { relay: string, kinds: NDKKind[] }) {
  return <Feed filter={{ kinds }} relays={[relay]} components={components} />;
}
