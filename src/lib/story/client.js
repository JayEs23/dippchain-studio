/**
 * Story Protocol SDK Client Configuration
 * 
 * This module sets up the Story Protocol SDK client for interacting with
 * Story Protocol's IP registration and management features.
 * 
 * JavaScript version (no TypeScript)
 */

import { StoryClient } from "@story-protocol/core-sdk";
import { http } from "viem";

// Story Network configuration
const STORY_NETWORKS = {
  aeneid: {
    chainId: 1315,
    rpcUrl: process.env.NEXT_PUBLIC_STORY_AENEID_RPC || "https://aeneid.storyrpc.io",
  },
  mainnet: {
    chainId: 1514,
    rpcUrl: process.env.NEXT_PUBLIC_STORY_MAINNET_RPC || "https://mainnet.storyrpc.io",
  },
};

/**
 * Get Story Protocol client configuration
 * @param {string} network - Network name ('aeneid' or 'mainnet')
 * @param {object} walletClient - Wagmi wallet client (optional, for signing)
 * @returns {object} StoryConfig object
 */
export function getStoryConfig(network = "aeneid", walletClient = null) {
  const networkConfig = STORY_NETWORKS[network];
  if (!networkConfig) {
    throw new Error(`Unknown Story network: ${network}`);
  }

  return {
    chainId: networkConfig.chainId,
    transport: walletClient?.transport || http(networkConfig.rpcUrl),
    account: walletClient?.account?.address,
  };
}

/**
 * Create Story Protocol client instance
 * 
 * @param {object} walletClient - Wagmi wallet client (for signing transactions)
 * @param {string} network - Story network to use ('aeneid' or 'mainnet')
 * @returns {StoryClient} StoryClient instance
 */
export function createStoryClient(walletClient, network = "aeneid") {
  const config = getStoryConfig(network, walletClient);
  return StoryClient.newClient(config);
}

/**
 * Create Story Protocol client instance (read-only, no wallet)
 * 
 * @param {string} network - Story network to use ('aeneid' or 'mainnet')
 * @returns {StoryClient} StoryClient instance
 */
export function createStoryClientReadOnly(network = "aeneid") {
  const config = getStoryConfig(network);
  return StoryClient.newClient(config);
}

/**
 * Story Protocol contract addresses (Aeneid Testnet)
 * These should match the deployed Story Protocol contracts
 */
export const STORY_CONTRACTS = {
  aeneid: {
    IP_ASSET_REGISTRY: process.env.NEXT_PUBLIC_STORY_IP_ASSET_REGISTRY || "",
    IP_ACCOUNT_REGISTRY: process.env.NEXT_PUBLIC_STORY_IP_ACCOUNT_REGISTRY || "",
    LICENSING_MODULE: process.env.NEXT_PUBLIC_STORY_LICENSING_MODULE || "",
    ROYALTY_MODULE: process.env.NEXT_PUBLIC_STORY_ROYALTY_MODULE || "",
  },
  mainnet: {
    IP_ASSET_REGISTRY: process.env.NEXT_PUBLIC_STORY_IP_ASSET_REGISTRY_MAINNET || "",
    IP_ACCOUNT_REGISTRY: process.env.NEXT_PUBLIC_STORY_IP_ACCOUNT_REGISTRY_MAINNET || "",
    LICENSING_MODULE: process.env.NEXT_PUBLIC_STORY_LICENSING_MODULE_MAINNET || "",
    ROYALTY_MODULE: process.env.NEXT_PUBLIC_STORY_ROYALTY_MODULE_MAINNET || "",
  },
};

/**
 * Helper to get Story Protocol explorer URL
 */
export function getStoryExplorerUrl(network, type, identifier) {
  const baseUrl =
    network === "aeneid"
      ? "https://aeneid.storyscan.io"
      : "https://storyscan.io";

  switch (type) {
    case "ip":
      return `${baseUrl}/ip/${identifier}`;
    case "account":
      return `${baseUrl}/account/${identifier}`;
    case "tx":
      return `${baseUrl}/tx/${identifier}`;
    default:
      return baseUrl;
  }
}

/**
 * Get Story NFT contract address from SDK
 * This is the IP Asset Registry contract which mints NFTs
 */
export function getStoryNFTContractAddress(network = "aeneid") {
  const contractAddress = STORY_CONTRACTS[network]?.IP_ASSET_REGISTRY;
  if (!contractAddress || contractAddress === "") {
    return undefined;
  }
  return contractAddress;
}

