import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, TrendingUp, Clock, User } from "lucide-react";

export default function Marketplace() {
  const [selectedListing, setSelectedListing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch listings from API
  const { data, isLoading, error } = useQuery({
    queryKey: ["listings", searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      
      const response = await fetch(`/api/listings?${params.toString()}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || "Failed to fetch listings");
      }
      
      return result.data;
    },
  });

  const listings = data?.listings || [];
  const mockListings = [
    {
      id: "1",
      ipTitle: "Digital Artwork Collection",
      tokenSymbol: "DAC",
      seller: "0x742d...9876",
      amount: "50000",
      pricePerToken: "$0.048",
      totalValue: "$2,400",
      expiresAt: "2025-02-01",
      imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop",
    },
    {
      id: "2",
      ipTitle: "Music Album Rights",
      tokenSymbol: "MAR",
      seller: "0x1234...5678",
      amount: "25000",
      pricePerToken: "$0.035",
      totalValue: "$875",
      expiresAt: "2025-01-28",
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
    },
    {
      id: "3",
      ipTitle: "Film Production Rights",
      tokenSymbol: "FPR",
      seller: "0xabcd...efgh",
      amount: "100000",
      pricePerToken: "$0.052",
      totalValue: "$5,200",
      expiresAt: "2025-02-15",
      imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=400&fit=crop",
    },
  ];

  const mockUserListings = [
    {
      id: "4",
      ipTitle: "Digital Artwork Collection",
      tokenSymbol: "DAC",
      amount: "10000",
      pricePerToken: "$0.045",
      totalValue: "$450",
      status: "active",
      listedAt: "2025-01-20",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="mb-2 font-heading text-4xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground">Trade fractional IP ownership tokens</p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Listings</TabsTrigger>
            <TabsTrigger value="myListings">My Listings</TabsTrigger>
            <TabsTrigger value="create">Create Listing</TabsTrigger>
          </TabsList>

          {/* Browse Listings */}
          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by IP title or token..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Listings Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <Card className="border-destructive/50">
                <CardContent className="py-12 text-center">
                  <p className="text-destructive">Error loading listings</p>
                  <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
                </CardContent>
              </Card>
            ) : listings.length === 0 ? (
              <Card className="border-border/50">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No active listings found</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing, idx) => (
                <Card
                  key={listing.id}
                  className="group overflow-hidden border-border/50 transition-smooth hover:border-accent/50 hover:shadow-lg animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={listing.imageUrl}
                      alt={listing.ipTitle}
                      className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{listing.ipTitle}</CardTitle>
                      <Badge className="bg-accent/10 text-accent">{listing.tokenSymbol}</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      {listing.seller}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-semibold">{listing.amount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Price/Token</p>
                        <p className="font-semibold">{listing.pricePerToken}</p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Value</span>
                        <span className="font-bold text-accent">{listing.totalValue}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Expires {listing.expiresAt}
                      </div>
                    </div>

                    <Button className="w-full gradient-primary border-0 text-white">
                      Buy Tokens
                    </Button>
                  </CardContent>
                </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* My Listings */}
          <TabsContent value="myListings" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Your Active Listings</CardTitle>
                <CardDescription>Manage your marketplace listings</CardDescription>
              </CardHeader>
              <CardContent>
                {mockUserListings.length > 0 ? (
                  <div className="space-y-4">
                    {mockUserListings.map((listing) => (
                      <div
                        key={listing.id}
                        className="flex items-center justify-between rounded-lg border border-border/50 p-4"
                      >
                        <div>
                          <h3 className="font-semibold">{listing.ipTitle}</h3>
                          <p className="text-sm text-muted-foreground">
                            {listing.amount} {listing.tokenSymbol} @ {listing.pricePerToken}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-semibold">{listing.totalValue}</p>
                            <Badge className="bg-success/10 text-success">
                              {listing.status}
                            </Badge>
                          </div>
                          <Button variant="destructive" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <TrendingUp className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground">No active listings</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Listing */}
          <TabsContent value="create" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Create New Listing</CardTitle>
                <CardDescription>
                  List your fractional IP tokens for sale
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium">Select Token</label>
                  <select className="w-full rounded-lg border border-input bg-background px-3 py-2">
                    <option>DAC - Digital Artwork Collection (Balance: 450,000)</option>
                    <option>MAR - Music Album Rights (Balance: 200,000)</option>
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Amount to Sell</label>
                    <Input type="number" placeholder="50000" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Price per Token ($)
                    </label>
                    <Input type="number" step="0.001" placeholder="0.048" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Expiration Date (Optional)
                  </label>
                  <Input type="date" />
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Value</span>
                    <span className="text-xl font-bold">$2,400</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Marketplace Fee (2%)</span>
                    <span>$48</span>
                  </div>
                </div>

                <Button className="w-full gradient-primary border-0 text-white shadow-glow">
                  Create Listing
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

