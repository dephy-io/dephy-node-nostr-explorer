"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useIntl, FormattedMessage } from "react-intl";

import {
  Stack,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
} from "@chakra-ui/react";

import RelayIcon from "../../components/relay-icon";
import Relay from "../../components/relay";

function normalizeRelayUrl(url: string): string {
  const cleanUrl = url.replace(/^(wss?|https?|relay):\/\//, '').replace(/\/+$/, '');
  
  return `wss://${cleanUrl}`;
}

export default function RelayPage() {
  const { formatMessage } = useIntl();
  const { query: { nrelay }, push } = useRouter()
  const searchParams = useSearchParams()
  const [url, setUrl] = useState('');
  const [relay, setRelay] = useState('');
  const [kindString, setKindString] = useState('1573')
  const [kinds, setKinds] = useState([1573])

  const [showRelay, setShowRelay] = useState(true)

  useEffect(() => {
    if (nrelay) {
      setRelay(decodeURIComponent(nrelay as string));
      setUrl(normalizeRelayUrl(decodeURIComponent(nrelay as string)));
    }
  }, [nrelay])

  useEffect(() => {
    if (searchParams.has('kind')) {
      setKindString(searchParams.get('kind') as string)
      setKinds((searchParams.get('kind') as string).split(',').map(Number))
    }
  }, [searchParams])

  function goToRelay() {
    // setUrl(normalizeRelayUrl(decodeURIComponent(nrelay as string)));
    // setShowRelay(true)
    push(`/relay/${encodeURIComponent(relay)}?kind=${kindString}`);
    setShowRelay(true);
  }

  return (
    <>
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
    </>
  );
}
