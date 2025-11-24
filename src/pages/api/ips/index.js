/**
 * API Route: List IPs
 * GET /api/ips
 * 
 * Returns list of registered IPs
 */

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { search, fractionalized, owner, limit = 20, offset = 0 } = req.query;

    // In a real implementation, this would:
    // 1. Query database for IPs
    // 2. Filter by search term, fractionalized status, owner
    // 3. Paginate results
    // 4. Return formatted data

    // Mock data for now
    // TODO: Connect to database/indexer
    const mockIPs = [
      {
        id: "1",
        dippChainId: "0x1a2b3c4d",
        title: "Digital Artwork Collection",
        description: "Exclusive NFT collection featuring cyberpunk themes",
        imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop",
        storyNftContract: "0xabcd...1234",
        storyTokenId: "42",
        registeredBy: "0x742d35Cc6634C0532925a3b844Bc9e7595f9876",
        registeredAt: "2025-01-15T00:00:00Z",
        fractionalized: true,
        detectionEnabled: true,
        volume: "$45,000",
        holders: 127,
        value: "$20,250",
      },
      {
        id: "2",
        dippChainId: "0x5e6f7g8h",
        title: "Music Album Rights",
        description: "Original soundtrack for indie game project",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
        storyNftContract: "0x5678...9012",
        storyTokenId: "15",
        registeredBy: "0x1234567890123456789012345678901234567890",
        registeredAt: "2025-01-10T00:00:00Z",
        fractionalized: true,
        detectionEnabled: false,
        volume: "$32,000",
        holders: 89,
        value: "$7,000",
      },
    ];

    // Filter mock data
    let filtered = mockIPs;
    if (search) {
      filtered = filtered.filter(
        (ip) =>
          ip.title.toLowerCase().includes(search.toLowerCase()) ||
          ip.dippChainId.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (fractionalized !== undefined) {
      filtered = filtered.filter((ip) => ip.fractionalized === (fractionalized === "true"));
    }
    if (owner) {
      // Normalize addresses for comparison (case-insensitive)
      const normalizedOwner = owner.toLowerCase();
      filtered = filtered.filter(
        (ip) => ip.registeredBy?.toLowerCase() === normalizedOwner
      );
    }

    return res.status(200).json({
      success: true,
      data: {
        ips: filtered.slice(offset, offset + parseInt(limit)),
        total: filtered.length,
        limit: parseInt(limit),
        offset: parseInt(offset),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching IPs:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: error.message || "Failed to fetch IPs",
      },
      timestamp: new Date().toISOString(),
    });
  }
}

