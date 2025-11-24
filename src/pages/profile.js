"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  ShieldCheck,
  Settings,
  DollarSign,
  TrendingUp,
  Copy,
  Wallet,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { formatAddress } from "@/lib/utils";

export default function Profile() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if not connected
  useEffect(() => {
    if (mounted && !isConnected) {
      router.push("/");
    }
  }, [mounted, isConnected, router]);

  // Fetch user's IPs
  const { data: userIPs, isLoading: loadingIPs } = useQuery({
    queryKey: ["user-ips", address],
    queryFn: async () => {
      if (!address) return { ips: [] };
      const response = await fetch(`/api/ips?owner=${address}`);
      const result = await response.json();
      return result.success ? result.data : { ips: [] };
    },
    enabled: !!address && mounted,
  });

  // Fetch user's listings
  const { data: userListings, isLoading: loadingListings } = useQuery({
    queryKey: ["user-listings", address],
    queryFn: async () => {
      if (!address) return { listings: [] };
      const response = await fetch(`/api/listings?seller=${address}`);
      const result = await response.json();
      return result.success ? result.data : { listings: [] };
    },
    enabled: !!address && mounted,
  });

  // Fetch claimable revenue
  const { data: claimableRevenue, isLoading: loadingRevenue } = useQuery({
    queryKey: ["claimable-revenue", address],
    queryFn: async () => {
      if (!address) return { claims: [] };
      // TODO: Implement API endpoint for claimable revenue
      return { claims: [] };
    },
    enabled: !!address && mounted,
  });

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard!");
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </main>
      </div>
    );
  }

  if (!isConnected || !address) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <Wallet className="h-12 w-12 text-muted-foreground" />
            <h2 className="text-2xl font-bold">Please connect your wallet</h2>
            <p className="text-muted-foreground">
              Connect your wallet to view your profile
            </p>
          </div>
        </main>
      </div>
    );
  }

  const ownedIPs = userIPs?.ips || [];
  const listings = userListings?.listings || [];
  const claims = claimableRevenue?.claims || [];

  // Calculate stats
  const totalPortfolioValue = ownedIPs.reduce((sum, ip) => {
    const value = parseFloat(ip.value?.replace(/[^0-9.]/g, "") || "0");
    return sum + value;
  }, 0);

  const totalClaimable = claims.reduce((sum, claim) => {
    const value = parseFloat(claim.value?.replace(/[^0-9.]/g, "") || "0");
    return sum + value;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mx-auto max-w-5xl">
          {/* Profile Header */}
          <Card className="mb-8 border-border/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-accent">
                  <User className="h-12 w-12 text-white" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h1 className="font-heading text-3xl font-bold">
                      {formatAddress(address)}
                    </h1>
                    <Badge className="bg-success/10 text-success">
                      <ShieldCheck className="mr-1 h-3 w-3" />
                      Connected
                    </Badge>
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                      {address}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyAddress}
                      className="h-auto p-1"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground">
                    Manage your IP assets, revenue, and profile settings
                  </p>
                </div>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="mb-8 grid gap-6 sm:grid-cols-3">
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <TrendingUp className="mx-auto mb-2 h-8 w-8 text-accent" />
                  <div className="mb-1 text-2xl font-bold">
                    ${totalPortfolioValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Portfolio Value
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <User className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <div className="mb-1 text-2xl font-bold">{ownedIPs.length}</div>
                  <div className="text-sm text-muted-foreground">Owned IPs</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <DollarSign className="mx-auto mb-2 h-8 w-8 text-success" />
                  <div className="mb-1 text-2xl font-bold">
                    ${totalClaimable.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Claimable Revenue
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="portfolio" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Portfolio */}
            <TabsContent value="portfolio" className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>My IP Assets</CardTitle>
                  <CardDescription>
                    IP assets you own and their token holdings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingIPs ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-muted-foreground">Loading...</div>
                    </div>
                  ) : ownedIPs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <User className="mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="mb-4 text-muted-foreground">
                        You don&apos;t own any IP assets yet
                      </p>
                      <Button
                        onClick={() => router.push("/register-ip")}
                        className="gradient-primary border-0 text-white"
                      >
                        Register Your First IP
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                      {ownedIPs.map((ip) => (
                        <Card
                          key={ip.id}
                          className="overflow-hidden border-border/50 transition-smooth hover:shadow-lg"
                        >
                          {ip.imageUrl && (
                            <img
                              src={ip.imageUrl}
                              alt={ip.title}
                              className="aspect-square w-full object-cover"
                            />
                          )}
                          <CardHeader>
                            <CardTitle className="text-lg">{ip.title}</CardTitle>
                            {ip.description && (
                              <CardDescription>{ip.description}</CardDescription>
                            )}
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">DippChain ID</p>
                                <p className="font-mono text-xs">{ip.dippChainId}</p>
                              </div>
                              {ip.value && (
                                <div>
                                  <p className="text-muted-foreground">Value</p>
                                  <p className="font-semibold text-accent">
                                    {ip.value}
                                  </p>
                                </div>
                              )}
                            </div>
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => router.push(`/ips/${ip.id}`)}
                            >
                              View Details
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Listings */}
            <TabsContent value="listings" className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>My Marketplace Listings</CardTitle>
                  <CardDescription>
                    Active listings you&apos;ve created on the marketplace
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingListings ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-muted-foreground">Loading...</div>
                    </div>
                  ) : listings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <TrendingUp className="mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="mb-4 text-muted-foreground">
                        You don&apos;t have any active listings
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => router.push("/marketplace")}
                      >
                        Browse Marketplace
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {listings.map((listing) => (
                        <div
                          key={listing.id}
                          className="flex items-center justify-between rounded-lg border border-border/50 p-4"
                        >
                          <div className="flex items-center gap-4">
                            {listing.imageUrl && (
                              <img
                                src={listing.imageUrl}
                                alt={listing.ipTitle}
                                className="h-16 w-16 rounded-lg object-cover"
                              />
                            )}
                            <div>
                              <h3 className="font-semibold">{listing.ipTitle}</h3>
                              <p className="text-sm text-muted-foreground">
                                {listing.amount} {listing.tokenSymbol} tokens
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {listing.pricePerToken} per token
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="font-semibold">{listing.totalValue}</p>
                              <Badge variant="outline" className="mt-1">
                                {listing.status || "active"}
                              </Badge>
                            </div>
                            <Button variant="outline" size="sm">
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Revenue */}
            <TabsContent value="revenue" className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Claimable Revenue</CardTitle>
                  <CardDescription>
                    Available revenue distributions from your IP holdings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingRevenue ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-muted-foreground">Loading...</div>
                    </div>
                  ) : claims.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <DollarSign className="mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        No claimable revenue at this time
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        {claims.map((claim) => (
                          <div
                            key={claim.id}
                            className="flex items-center justify-between rounded-lg border border-border/50 p-4"
                          >
                            <div>
                              <h3 className="font-semibold">{claim.ipTitle}</h3>
                              <p className="text-sm text-muted-foreground">
                                Distributed on {claim.distributionDate}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="font-semibold">{claim.amount}</p>
                                <p className="text-sm text-muted-foreground">
                                  {claim.value}
                                </p>
                              </div>
                              <Button className="gradient-primary border-0 text-white">
                                Claim
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Total Claimable</span>
                          <span className="text-xl font-bold text-accent">
                            ${totalClaimable.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      placeholder="Your name"
                      defaultValue=""
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      defaultValue=""
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      rows={4}
                      defaultValue=""
                    />
                  </div>

                  <Button className="gradient-primary border-0 text-white">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

