"use client";

import { useState } from "react";
import {
  Stack,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
} from "@chakra-ui/react";
import { useIntl, FormattedMessage } from "react-intl";

import RelayIcon from "./relay-icon";
import Relay from "./relay";

function normalizeRelayUrl(url: string): string {
  const cleanUrl = url.replace(/^(wss?|https?|relay):\/\//, '').replace(/\/+$/, '');
  
  return `wss://${cleanUrl}`;
}

export default function Relays() {
  const { formatMessage } = useIntl();
  const [relay, setRelay] = useState('dev-relay.dephy.dev');
  const [kindString, setKindString] = useState('1573')
  const [url, setUrl] = useState('wss://dev-relay.dephy.dev')
  const [kinds, setKinds] = useState([1573])
  const [showRelay, setShowRelay] = useState(true)

  function goToRelay() {
    setUrl(normalizeRelayUrl(relay));
    setKinds(kindString.split(',').map(Number))
    setShowRelay(true)
  }

  return (
    <Stack spacing={10}>
      <HStack spacing={4} w="100%">
        <InputGroup flex="2">
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={RelayIcon} color="chakra-subtle-text" />}
          />
          <Input
            type="text"
            placeholder={formatMessage({
              id: "relay-url",
              description: "Relay URL placeholder",
              defaultMessage: "Relay URL",
            })}
            value={relay}
            onChange={(ev) => {setRelay(ev.target.value); setShowRelay(false)}}
          />
        </InputGroup>
        <InputGroup flex="1">
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={RelayIcon} color="chakra-subtle-text" />}
          />
          <Input
            value={kindString}
            placeholder="Kinds"
            onChange={(ev) => { setKindString(ev.target.value); setShowRelay(false) }}
          />
        </InputGroup>
        <Button
          h="1.75rem"
          size="sm"
          isDisabled={relay.trim().length === 0 && kinds.length === 0} 
          onClick={() => goToRelay()}
          variant="solid"
          colorScheme="brand"
        >
          <FormattedMessage
            id="go"
            description="Go to relay button"
            defaultMessage="Refresh"
          />
        </Button>
      </HStack>
      { showRelay ? <Relay url={url} kinds={kinds} /> : null }
    </Stack>
  );
}
