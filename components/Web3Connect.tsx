"use client";

import React from "react";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

export default function Web3Connect() {
  const { address } = useAccount();

  return (
    <div className="flex justify-end">{address && <ConnectKitButton />}</div>
  );
}
