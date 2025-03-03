"use client";

import { useMemo } from "react";
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import { Alert, AlertIcon } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";

import Relay from "../../components/relay";

export default function RelayPage() {
  // const url = 'wss://relay-for-demo.dephy.dev'
  const { query: { nrelay }} = useRouter()
  const searchParams = useSearchParams()
 
  const kinds = searchParams.get('kinds')?.split(',').map(Number) ?? [1573]

  const url = useMemo(() => {
    if (nrelay) {
      return `wss://${decodeURIComponent(nrelay as string)}`;
    }
  }, [nrelay]);

  return (
    <>
      {url ? (
        <Relay url={url} kinds={kinds} />
      ) : (
        <Alert status="error">
          <AlertIcon />
          <FormattedMessage
            id="no-url"
            description="No URL error message"
            defaultMessage="No URL provided"
          />
        </Alert>
      )}
    </>
  );
}
