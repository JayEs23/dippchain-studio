/**
 * Web3 Configuration
 * 
 * Wagmi and Reown AppKit configuration for wallet connections
 */

import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// Story Network configurations (custom chains)
const storyAeneidNetwork = {
  id: 1315,
  name: "Story Aeneid",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_STORY_AENEID_RPC || "https://aeneid.storyrpc.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "StoryScan",
      url: "https://aeneid.storyscan.io",
    },
  },
};

const storyMainnetNetwork = {
  id: 1514,
  name: "Story Homer",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_STORY_MAINNET_RPC || "https://mainnet.storyrpc.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "StoryScan",
      url: "https://storyscan.io",
    },
  },
};

// Reown project ID (get from https://cloud.reown.com)
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

// Metadata for AppKit
const metadata = {
  name: "DippChain Studio",
  description: "IP Registration and Management Platform",
  url: typeof window !== "undefined" ? window.location.origin : "https://dippchain.studio",
  icons: [],
};

// Create the Wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  networks: [storyAeneidNetwork, storyMainnetNetwork],
  projectId: projectId || "f4ee019849844b93ee179f98f9860337",
});

// Initialize AppKit - must be called before any hooks use it
// This runs at module load time, before React renders
let appKitInitialized = false;

function initializeAppKit() {
  if (appKitInitialized) return;
  
  // Only initialize on client side
  if (typeof window === "undefined") return;
  
  try {
    createAppKit({
      adapters: [wagmiAdapter],
      networks: [storyAeneidNetwork, storyMainnetNetwork],
      metadata: metadata,
      projectId: projectId || "f4ee019849844b93ee179f98f9860337",
      features: {
        analytics: false,
        email: false,
        socials: false,
      },
    });
    appKitInitialized = true;
  } catch (error) {
    console.warn("Failed to initialize Reown AppKit:", error);
    if (!projectId) {
      console.warn(
        "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not set. WalletConnect features disabled. " +
        "Get a project ID from https://cloud.reown.com"
      );
    }
  }
}

// Initialize immediately if in browser
if (typeof window !== "undefined") {
  initializeAppKit();
}

export { initializeAppKit, appKitInitialized };

