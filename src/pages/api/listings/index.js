/**
 * API Route: Get Marketplace Listings
 * GET /api/listings
 * 
 * Returns active marketplace listings
 */

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { search, royaltyToken, seller, status = "active", limit = 20, offset = 0 } = req.query;

    // In a real implementation, this would:
    // 1. Query database for listings
    // 2. Filter by search, token, status, seller
    // 3. Paginate results
    // 4. Return formatted data

    // Mock data for now
    // TODO: Connect to database/indexer
    const mockListings = [
      {
        id: "1",
        listingId: "1",
        ipTitle: "Digital Artwork Collection",
        tokenSymbol: "DAC",
        seller: "0x742d35Cc6634C0532925a3b844Bc9e7595f9876",
        royaltyToken: "0xdef0...5678",
        dippChainId: "0x1a2b3c4d",
        amount: "50000",
        pricePerToken: "$0.048",
        paymentToken: "0x0000000000000000000000000000000000000000", // ETH
        totalValue: "$2,400",
        expiresAt: "2025-02-01",
        status: "active",
        imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop",
      },
      {
        id: "2",
        listingId: "2",
        ipTitle: "Music Album Rights",
        tokenSymbol: "MAR",
        seller: "0x1234567890123456789012345678901234567890",
        royaltyToken: "0x5678...9012",
        dippChainId: "0x5e6f7g8h",
        amount: "25000",
        pricePerToken: "$0.035",
        paymentToken: "0x0000000000000000000000000000000000000000",
        totalValue: "$875",
        expiresAt: "2025-01-28",
        status: "active",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
      },
    ];

    // Filter mock data
    let filtered = mockListings;
    if (seller) {
      const normalizedSeller = seller.toLowerCase();
      filtered = filtered.filter(
        (listing) => listing.seller?.toLowerCase() === normalizedSeller
      );
    }
    if (search) {
      filtered = filtered.filter(
        (listing) =>
          listing.ipTitle.toLowerCase().includes(search.toLowerCase()) ||
          listing.tokenSymbol.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (royaltyToken) {
      filtered = filtered.filter(
        (listing) => listing.royaltyToken?.toLowerCase() === royaltyToken.toLowerCase()
      );
    }
    if (status) {
      filtered = filtered.filter((listing) => listing.status === status);
    }

    const paginated = filtered.slice(parseInt(offset), parseInt(offset) + parseInt(limit));

    return res.status(200).json({
      success: true,
      data: {
        listings: paginated,
        total: filtered.length,
        limit: parseInt(limit),
        offset: parseInt(offset),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: error.message || "Failed to fetch listings",
      },
      timestamp: new Date().toISOString(),
    });
  }
}

