/**
 * API Route: Get Governance Proposals
 * GET /api/governance/proposals
 * 
 * Returns IPDAO proposals
 */

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { status, dippChainId, limit = 20, offset = 0 } = req.query;

    // In a real implementation, this would:
    // 1. Query database for proposals
    // 2. Filter by status, dippChainId
    // 3. Paginate results
    // 4. Return formatted data

    // Mock data for now
    // TODO: Connect to database/indexer
    const mockProposals = [
      {
        id: "1",
        proposalId: "1",
        dippChainId: "0x1a2b3c4d",
        ipTitle: "Digital Artwork Collection",
        title: "Increase Revenue Distribution Frequency",
        description: "Proposal to distribute revenue monthly instead of quarterly",
        proposer: "0x742d...9876",
        status: "active",
        votesFor: "750000",
        votesAgainst: "150000",
        quorum: "500000",
        totalSupply: "1000000",
        endsAt: "1738368000",
      },
    ];

    let filtered = mockProposals;
    if (status) {
      filtered = filtered.filter((p) => p.status === status);
    }
    if (dippChainId) {
      filtered = filtered.filter((p) => p.dippChainId === dippChainId);
    }

    return res.status(200).json({
      success: true,
      data: {
        proposals: filtered.slice(offset, offset + parseInt(limit)),
        total: filtered.length,
        limit: parseInt(limit),
        offset: parseInt(offset),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching proposals:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: error.message || "Failed to fetch proposals",
      },
      timestamp: new Date().toISOString(),
    });
  }
}

