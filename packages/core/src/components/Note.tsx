import {
  Box,
  HStack,
  Text,
  Card,
  CardBody,
  CardHeader,
  CardProps,
} from "@chakra-ui/react";
import { NDKKind } from "@nostr-dev-kit/ndk";

import NEvent from "./NEvent";
import User from "./User";
import FormattedRelativeTime from "./FormattedRelativeTime";
import { EventProps, ReactionKind } from "../types";
interface NoteProps extends EventProps, CardProps {}

const defaultReactionKinds: ReactionKind[] = [
  NDKKind.Zap,
  NDKKind.Repost,
  NDKKind.Reaction,
  NDKKind.Text,
];

export default function Note({
  event,
  components,
  reactionKinds = defaultReactionKinds,
  ...rest
}: NoteProps) {
  const e = event.tags.find((t) => t[0] === "e" && t[3] === "reply");
  const root = event.tags.find((t) => !e && t[0] === "e" && t[3] === "root");
  // Parse the content and nested payload safely
  const parseNestedJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      // Check if Status.payload exists and is a string
      if (parsed.Status?.payload) {
        try {
          parsed.Status.payload = JSON.parse(parsed.Status.payload);
          // Check if recover_info exists and is a string
          if (typeof parsed.Status.payload.recover_info === 'string') {
            const recoverInfo = JSON.parse(parsed.Status.payload.recover_info);
            parsed.Status.payload.recover_info = {
              ...recoverInfo,
              signature: JSON.stringify(recoverInfo.signature),
              payload: JSON.stringify(recoverInfo.payload)
            };
          }
        } catch (e) {
          console.warn('Failed to parse nested payload:', e);
        }
      }
      return parsed;
    } catch (e) {
      console.error('Failed to parse content:', e);
      return jsonString;
    }
  };

  const parsedContent = parseNestedJson(event.content);
  return (
    <Card variant="event" {...rest}>
      <CardHeader>
        <HStack align="center" justify="space-between">
          <User pubkey={event.pubkey} />
          <HStack>
            {event.sig && (
              <Text color="gray.400" fontSize="sm">
                <FormattedRelativeTime timestamp={event.created_at ?? 0} />
              </Text>
            )}
          </HStack>
        </HStack>
      </CardHeader>
      <CardBody>
        {e && (
          <Box mb={2}>
            <NEvent
              id={e[1]}
              relays={[]}
              components={components}
              reactionKinds={[]}
            />
          </Box>
        )}
        {root && (
          <Box mb={2}>
            <NEvent
              id={root[1]}
              relays={[]}
              components={components}
              reactionKinds={[]}
            />
          </Box>
        )}
        <Box>
          <pre style={{ whiteSpace: 'pre-wrap'}}>{JSON.stringify(parsedContent, null, 2)}</pre>
        </Box>
      </CardBody>
      
    </Card>
  );
}
