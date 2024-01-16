"use client";

import React from "react";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

export default function Web3Connect() {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;

  return (
    <>
      {isDisconnected ? "Disconnected" : `Connected Wallet: ${address}`}
      <ConnectKitButton />
    </>
  );
}
