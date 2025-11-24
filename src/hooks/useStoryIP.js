/**
 * Story Protocol React Hooks
 * 
 * Custom hooks for interacting with Story Protocol SDK
 * JavaScript version (no TypeScript)
 */

"use client";

import { useAccount, useWalletClient } from "wagmi";
import { useState, useCallback } from "react";
import { createStoryClient, createStoryClientReadOnly, getStoryNFTContractAddress } from "@/lib/story/client";

/**
 * Hook to register IP with Story Protocol (mints NFT and registers as IP)
 * 
 * @param {string} network - Story network ('aeneid' or 'mainnet')
 * @returns {object} { registerIP, isLoading, error, result }
 */
export function useRegisterStoryIP(network = "aeneid") {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const registerIP = useCallback(
    async (params) => {
      if (!address) {
        const err = new Error("Wallet not connected");
        setError(err);
        throw err;
      }

      if (!walletClient) {
        const err = new Error("Wallet client not available");
        setError(err);
        throw err;
      }

      setIsLoading(true);
      setError(null);

      try {
        const client = createStoryClient(walletClient, network);
        
        // Get SPG NFT contract address (IP Asset Registry)
        const spgNftContract = getStoryNFTContractAddress(network);
        if (!spgNftContract) {
          throw new Error("Story NFT contract address not configured");
        }

        // Register IP Asset by minting NFT and registering it
        // This uses registerIpAsset with type: "mint" which mints and registers in one step
        const ipAsset = await client.ipAsset.registerIpAsset({
          nft: {
            type: "mint",
            spgNftContract: spgNftContract,
            recipient: address,
            allowDuplicates: false,
          },
          metadata: {
            name: params.name,
            description: params.description || "",
            mediaUrl: params.mediaUrl,
            ...params.metadata,
          },
        });

        const resultData = {
          ipId: ipAsset.ipId,
          tokenId: ipAsset.tokenId ? BigInt(ipAsset.tokenId.toString()) : undefined,
          txHash: ipAsset.txHash,
        };

        setResult(resultData);
        return resultData;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [address, walletClient, network]
  );

  return {
    registerIP,
    isLoading,
    error,
    result,
  };
}

/**
 * Hook to get Story IP Asset details
 * 
 * @param {string} ipAssetId - IP Asset ID (ipId)
 * @param {string} network - Story network ('aeneid' or 'mainnet')
 * @returns {object} { data, isLoading, error, refetch }
 */
export function useStoryIPAsset(ipAssetId, network = "aeneid") {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIPAsset = useCallback(async () => {
    if (!ipAssetId) return;

    setIsLoading(true);
    setError(null);

    try {
      const client = createStoryClientReadOnly(network);
      // Note: The SDK might have a different method for getting IP asset details
      // This is a placeholder - adjust based on actual SDK API
      if (client.ipAsset && typeof client.ipAsset.get === "function") {
        const ipAsset = await client.ipAsset.get(ipAssetId);
        setData(ipAsset || null);
      } else {
        // Fallback: try to read from contract directly if SDK doesn't have get method
        console.warn("Story SDK get method not available, skipping fetch");
        setData(null);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [ipAssetId, network]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchIPAsset,
  };
}

