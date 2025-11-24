/**
 * DippChain Smart Contract Utilities
 * 
 * This module provides utilities for interacting with DippChain smart contracts
 * using wagmi and viem.
 * 
 * ABIs are imported from compiled contract artifacts
 */

// Contract ABIs - Import from contracts directory
// These will be populated from web/contracts or deployed artifacts
import IPRegistryAdapterArtifact from "../../../contracts/IPRegistryAdapter.sol/IPRegistryAdapter.json";
import IPEnforcerArtifact from "../../../contracts/IPEnforcer.sol/IPEnforcer.json";
import FractionalizerArtifact from "../../../contracts/Fractionalizer.sol/Fractionalizer.json";
import IPMarketplaceArtifact from "../../../contracts/IPMarketplace.sol/IPMarketplace.json";
import RevenueDistributorArtifact from "../../../contracts/RevenueDistributor.sol/RevenueDistributor.json";
import YieldVaultArtifact from "../../../contracts/YieldVault.sol/YieldVault.json";
import IPDAOArtifact from "../../../contracts/IPDAO.sol/IPDAO.json";
import RoyaltyTokenArtifact from "../../../contracts/Fractionalizer.sol/RoyaltyToken.json";

// DippChain contract addresses (set via environment variables)
export const DIPPCHAIN_CONTRACTS = {
  IP_REGISTRY_ADAPTER: process.env.NEXT_PUBLIC_IP_REGISTRY_ADAPTER || "",
  IP_ENFORCER: process.env.NEXT_PUBLIC_IP_ENFORCER || "",
  FRACTIONALIZER: process.env.NEXT_PUBLIC_FRACTIONALIZER || "",
  MARKETPLACE: process.env.NEXT_PUBLIC_MARKETPLACE || "",
  YIELD_VAULT: process.env.NEXT_PUBLIC_YIELD_VAULT || "",
  REVENUE_DISTRIBUTOR: process.env.NEXT_PUBLIC_REVENUE_DISTRIBUTOR || "",
  IPDAO: process.env.NEXT_PUBLIC_IPDAO || "",
};

// Contract ABIs
export const IP_REGISTRY_ADAPTER_ABI = IPRegistryAdapterArtifact.abi;
export const IP_ENFORCER_ABI = IPEnforcerArtifact.abi;
export const FRACTIONALIZER_ABI = FractionalizerArtifact.abi;
export const MARKETPLACE_ABI = IPMarketplaceArtifact.abi;
export const REVENUE_DISTRIBUTOR_ABI = RevenueDistributorArtifact.abi;
export const YIELD_VAULT_ABI = YieldVaultArtifact.abi;
export const IPDAO_ABI = IPDAOArtifact.abi;
export const ROYALTY_TOKEN_ABI = RoyaltyTokenArtifact.abi;

