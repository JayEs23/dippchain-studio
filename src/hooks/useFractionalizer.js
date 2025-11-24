/**
 * Hook: useFractionalizer
 * 
 * Provides hooks for fractionalizing IP into ERC-20 tokens
 */

import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { DIPPCHAIN_CONTRACTS, FRACTIONALIZER_ABI } from "@/lib/dippchain/contracts";

/**
 * Fractionalize IP
 */
export function useFractionalize() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  const fractionalize = async (dippChainId, totalSupply, tokenName, tokenSymbol, lockNFT) => {
    if (!DIPPCHAIN_CONTRACTS.FRACTIONALIZER) {
      throw new Error("FRACTIONALIZER contract not configured");
    }

    await writeContract({
      address: DIPPCHAIN_CONTRACTS.FRACTIONALIZER,
      abi: FRACTIONALIZER_ABI,
      functionName: "fractionalize",
      args: [
        BigInt(dippChainId),
        BigInt(totalSupply),
        tokenName,
        tokenSymbol,
        lockNFT,
      ],
    });
  };

  return {
    fractionalize,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

/**
 * Get fractionalization data for IP
 */
export function useFractionalizedIP(dippChainId) {
  const { data, isLoading, error } = useReadContract({
    address: DIPPCHAIN_CONTRACTS.FRACTIONALIZER,
    abi: FRACTIONALIZER_ABI,
    functionName: "getFractionalizedIP",
    args: dippChainId ? [BigInt(dippChainId)] : undefined,
    query: {
      enabled: !!dippChainId && !!DIPPCHAIN_CONTRACTS.FRACTIONALIZER,
    },
  });

  return { fractionalization: data, isLoading, error };
}

