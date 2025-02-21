import { NDKKind } from "@nostr-dev-kit/ndk";

import RelayList from "./components/relay-list";
import RelaySet from "./components/relay-set";

export const kinds = [
  // NDKKind.Text,
  // NDKKind.Article,
  // NDKKind.RelayList,
  // NDKKind.RelaySet,
  1573
];

export const components = {
  [NDKKind.RelayList]: RelayList,
  [NDKKind.RelaySet]: RelaySet,
};
