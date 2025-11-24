import { useRouter } from "next/router";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  BarChart3,
  Vote,
  AlertTriangle,
  ExternalLink,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

export default function IPDetail() {
  const router = useRouter();
  const { id } = router.query;

  const mockIP = {
    id: "1",
    dippChainId: "0x1a2b3c4d5e6f7g8h",
    title: "Digital Artwork Collection",
    description: "Exclusive NFT collection featuring cyberpunk themes with unique character designs and backgrounds. This collection represents hours of detailed artistic work.",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&h=800&fit=crop",
    storyNftContract: "0xabcd...1234",
    storyTokenId: "42",
    registeredBy: "0x742d...9876",
    registeredAt: "2025-01-15",
    fractionalized: true,
    detectionEnabled: true,
    royaltyToken: "0xdef0...5678",
    totalSupply: "1000000",
    currentPrice: "$0.045",
    volume24h: "$12,450",
    holders: 127,
    violations: 2,
  };

  const mockHolders = [
    { address: "0x742d...9876", balance: "450000", percentage: 45 },
    { address: "0x1234...5678", balance: "200000", percentage: 20 },
    { address: "0xabcd...efgh", balance: "150000", percentage: 15 },
    { address: "0x9876...5432", balance: "100000", percentage: 10 },
    { address: "0xfedc...ba98", balance: "100000", percentage: 10 },
  ];

  const mockRevenue = [
    { id: "1", date: "2025-01-20", amount: "5.2 ETH", claimed: true },
    { id: "2", date: "2025-01-10", amount: "3.8 ETH", claimed: true },
    { id: "3", date: "2024-12-25", amount: "7.5 ETH", claimed: false },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header Section */}
        <div className="mb-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge className="bg-success/10 text-success hover:bg-success/20">
                Fractionalized
              </Badge>
              <Badge className="bg-accent/10 text-accent hover:bg-accent/20">
                Detection Enabled
              </Badge>
            </div>
            <h1 className="mb-4 font-heading text-4xl font-bold">{mockIP.title}</h1>
            <p className="mb-6 text-lg text-muted-foreground">{mockIP.description}</p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-accent/10 p-2">
                      <DollarSign className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="text-lg font-semibold">{mockIP.currentPrice}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">24h Volume</p>
                      <p className="text-lg font-semibold">{mockIP.volume24h}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-accent/10 p-2">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Holders</p>
                      <p className="text-lg font-semibold">{mockIP.holders}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-warning/10 p-2">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Violations</p>
                      <p className="text-lg font-semibold">{mockIP.violations}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="overflow-hidden border-border/50">
              <img
                src={mockIP.imageUrl}
                alt={mockIP.title}
                className="aspect-square w-full object-cover"
              />
              <CardContent className="space-y-3 pt-6">
                <Button
                  className="w-full gradient-primary border-0 text-white shadow-glow"
                  onClick={() => router.push("/marketplace")}
                >
                  Trade Tokens
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/governance")}
                >
                  <Vote className="mr-2 h-4 w-4" />
                  View Governance
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Claim Revenue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="holders">Holders</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Token Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHolders.map((holder, idx) => (
                    <div key={idx}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-mono">{holder.address}</span>
                        <span className="font-semibold">{holder.percentage}%</span>
                      </div>
                      <Progress value={holder.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="holders" className="mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Token Holders ({mockIP.holders})</CardTitle>
                <CardDescription>
                  All addresses holding fractional ownership tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockHolders.map((holder, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border border-border/50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-mono text-sm font-medium">{holder.address}</p>
                          <p className="text-xs text-muted-foreground">
                            {holder.balance} tokens
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{holder.percentage}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Revenue Distributions</CardTitle>
                <CardDescription>History of revenue sharing events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRevenue.map((rev) => (
                    <div
                      key={rev.id}
                      className="flex items-center justify-between rounded-lg border border-border/50 p-4"
                    >
                      <div>
                        <p className="font-semibold">{rev.amount}</p>
                        <p className="text-sm text-muted-foreground">{rev.date}</p>
                      </div>
                      <Badge
                        className={
                          rev.claimed
                            ? "bg-success/10 text-success"
                            : "bg-warning/10 text-warning"
                        }
                      >
                        {rev.claimed ? "Claimed" : "Available"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Contract Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">DippChain ID</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded bg-muted px-3 py-2 font-mono text-sm">
                      {mockIP.dippChainId}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(mockIP.dippChainId)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Royalty Token</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded bg-muted px-3 py-2 font-mono text-sm">
                      {mockIP.royaltyToken}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(mockIP.royaltyToken)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Story NFT Contract</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded bg-muted px-3 py-2 font-mono text-sm">
                      {mockIP.storyNftContract}
                    </code>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 pt-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-sm text-muted-foreground">Registered By</p>
                    <code className="block rounded bg-muted px-3 py-2 font-mono text-sm">
                      {mockIP.registeredBy}
                    </code>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-muted-foreground">Registered Date</p>
                    <code className="block rounded bg-muted px-3 py-2 font-mono text-sm">
                      {mockIP.registeredAt}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

