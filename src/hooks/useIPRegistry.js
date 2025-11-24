/**
 * Hook: useIPRegistry
 * 
 * Provides hooks for interacting with IPRegistryAdapter contract
 */

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useAccount } from "wagmi";
import { DIPPCHAIN_CONTRACTS, IP_REGISTRY_ADAPTER_ABI } from "@/lib/dippchain/contracts";
import { parseEther } from "viem";

/**
 * Register Story Protocol IP on DippChain
 */
export function useRegisterIP() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  const registerIP = async (storyNftContract, tokenId, watermarkHash, contentCids) => {
    if (!DIPPCHAIN_CONTRACTS.IP_REGISTRY_ADAPTER) {
      throw new Error("IP_REGISTRY_ADAPTER contract not configured");
    }

    await writeContract({
      address: DIPPCHAIN_CONTRACTS.IP_REGISTRY_ADAPTER,
      abi: IP_REGISTRY_ADAPTER_ABI,
      functionName: "registerStoryIP",
      args: [storyNftContract, BigInt(tokenId), watermarkHash, contentCids],
    });
  };

  return {
    registerIP,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

/**
 * Get IP metadata
 */
export function useIPMetadata(dippChainId) {
  const { data, isLoading, error } = useReadContract({
    address: DIPPCHAIN_CONTRACTS.IP_REGISTRY_ADAPTER,
    abi: IP_REGISTRY_ADAPTER_ABI,
    functionName: "getMetadata",
    args: dippChainId ? [BigInt(dippChainId)] : undefined,
    query: {
      enabled: !!dippChainId && !!DIPPCHAIN_CONTRACTS.IP_REGISTRY_ADAPTER,
    },
  });

  return { metadata: data, isLoading, error };
}

/**
 * Get Story Protocol reference for IP
 */
export function useStoryReference(dippChainId) {
  const { data, isLoading, error } = useReadContract({
    address: DIPPCHAIN_CONTRACTS.IP_REGISTRY_ADAPTER,
    abi: IP_REGISTRY_ADAPTER_ABI,
    functionName: "getStoryReference",
    args: dippChainId ? [BigInt(dippChainId)] : undefined,
    query: {
      enabled: !!dippChainId && !!DIPPCHAIN_CONTRACTS.IP_REGISTRY_ADAPTER,
    },
  });

  return { reference: data, isLoading, error };
}

