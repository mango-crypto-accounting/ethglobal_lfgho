"use client";

import React from "react";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";

import { CheckIcon } from "lucide-react";

export function InvoiceButton({}) {
  const { address } = useAccount();

  return address ? (
    <Button className="w-full" type="submit">
      <CheckIcon className="mr-2 h-4 w-4" /> Pay
    </Button>
  ) : (
    <ConnectKitButton.Custom>
      {({ show }) => {
        return (
          <Button
            type="button"
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              show?.();
            }}
          >
            Connect Wallet
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
