"use client";

import { Alert, AlertIcon } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";

import Relay from "../components/relay";

export default function RelayPage() {
  const url = 'wss://relay-for-demo.dephy.dev'

  return (
    <>
      {url ? (
        <Relay url={url} />
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
