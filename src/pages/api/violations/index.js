/**
 * API Route: Get Violations
 * GET /api/violations
 * 
 * Returns IP violations
 */

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { dippChainId, status, limit = 20, offset = 0 } = req.query;

    // In a real implementation, this would:
    // 1. Query database for violations
    // 2. Filter by dippChainId, status
    // 3. Paginate results
    // 4. Return formatted data

    // Mock data for now
    // TODO: Connect to database/indexer
    const mockViolations = [
      {
        id: "1",
        violationId: "1",
        dippChainId: "0x1a2b3c4d",
        ipTitle: "Digital Artwork Collection",
        detectedUrl: "https://example.com/stolen-art",
        similarityScore: 95,
        evidenceHash: "Qm...abc123",
        reportedAt: "2025-01-22T00:00:00Z",
        status: "pending",
        reporter: "AI Detection System",
      },
    ];

    let filtered = mockViolations;
    if (dippChainId) {
      filtered = filtered.filter((v) => v.dippChainId === dippChainId);
    }
    if (status) {
      filtered = filtered.filter((v) => v.status === status);
    }

    return res.status(200).json({
      success: true,
      data: {
        violations: filtered.slice(offset, offset + parseInt(limit)),
        total: filtered.length,
        limit: parseInt(limit),
        offset: parseInt(offset),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching violations:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: error.message || "Failed to fetch violations",
      },
      timestamp: new Date().toISOString(),
    });
  }
}

