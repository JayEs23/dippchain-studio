/**
 * Hook: useMarketplace
 * 
 * Provides hooks for marketplace operations
 */

import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { DIPPCHAIN_CONTRACTS, MARKETPLACE_ABI } from "@/lib/dippchain/contracts";
import { parseEther } from "viem";

/**
 * Create marketplace listing
 */
export function useCreateListing() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  const createListing = async (
    royaltyToken,
    amount,
    pricePerToken,
    paymentToken,
    expiresAt,
    slippageToleranceBps
  ) => {
    if (!DIPPCHAIN_CONTRACTS.MARKETPLACE) {
      throw new Error("MARKETPLACE contract not configured");
    }

    await writeContract({
      address: DIPPCHAIN_CONTRACTS.MARKETPLACE,
      abi: MARKETPLACE_ABI,
      functionName: "createListing",
      args: [
        royaltyToken,
        BigInt(amount),
        BigInt(pricePerToken),
        paymentToken,
        BigInt(expiresAt),
        BigInt(slippageToleranceBps),
      ],
    });
  };

  return {
    createListing,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

/**
 * Buy marketplace listing
 */
export function useBuyListing() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  const buyListing = async (listingId, amount, maxPricePerToken) => {
    if (!DIPPCHAIN_CONTRACTS.MARKETPLACE) {
      throw new Error("MARKETPLACE contract not configured");
    }

    await writeContract({
      address: DIPPCHAIN_CONTRACTS.MARKETPLACE,
      abi: MARKETPLACE_ABI,
      functionName: "buyListing",
      args: [BigInt(listingId), BigInt(amount), BigInt(maxPricePerToken)],
    });
  };

  return {
    buyListing,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

/**
 * Get listing details
 */
export function useListing(listingId) {
  const { data, isLoading, error } = useReadContract({
    address: DIPPCHAIN_CONTRACTS.MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "getListing",
    args: listingId ? [BigInt(listingId)] : undefined,
    query: {
      enabled: !!listingId && !!DIPPCHAIN_CONTRACTS.MARKETPLACE,
    },
  });

  return { listing: data, isLoading, error };
}

