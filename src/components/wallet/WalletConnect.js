"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useAppKitSafe } from "@/hooks/useAppKitSafe";
import { Button } from "@/components/ui/button";
import { LogOut, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { formatAddress } from "@/lib/utils";

// Client-side only component to avoid SSR issues with AppKit
export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const appKit = useAppKitSafe();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnect = () => {
    if (appKit?.open) {
      appKit.open();
    } else {
      console.warn("AppKit not available. Please refresh the page.");
    }
  };

  if (!mounted || !appKit) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden rounded-lg bg-muted px-3 py-1.5 text-sm font-mono md:block">
          {formatAddress(address)}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => disconnect()}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden md:inline">Disconnect</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleConnect}
      className="gap-2"
    >
      <Wallet className="h-4 w-4" />
      Connect Wallet
    </Button>
  );
}

