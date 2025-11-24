import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function IPAssets() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch IPs from API
  const { data, isLoading, error } = useQuery({
    queryKey: ["ips", searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      
      const response = await fetch(`/api/ips?${params.toString()}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || "Failed to fetch IPs");
      }
      
      return result.data;
    },
  });

  const ips = data?.ips || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 font-heading text-4xl font-bold">IP Assets</h1>
            <p className="text-muted-foreground">
              Browse and manage registered intellectual property
            </p>
          </div>
          <Button 
            className="gradient-primary border-0 text-white shadow-glow"
            onClick={() => router.push("/register-ip")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Register New IP
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-border/50">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by title, ID, or creator..."
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

        {/* IP Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <Card className="border-destructive/50">
            <CardContent className="py-12 text-center">
              <p className="text-destructive">Error loading IPs</p>
              <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
            </CardContent>
          </Card>
        ) : ips.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No IP assets found</p>
              <Button
                className="mt-4 gradient-primary border-0 text-white"
                onClick={() => router.push("/register-ip")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Register Your First IP
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ips.map((ip, index) => (
            <Card
              key={ip.id}
              className="group overflow-hidden border-border/50 transition-smooth hover:border-accent/50 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={ip.imageUrl}
                  alt={ip.title}
                  className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{ip.title}</CardTitle>
                  {ip.fractionalized && (
                    <Badge className="bg-accent/10 text-accent hover:bg-accent/20">
                      Fractionalized
                    </Badge>
                  )}
                </div>
                <CardDescription className="line-clamp-2">
                  {ip.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ip.fractionalized && (
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <div>
                      <div className="text-muted-foreground">Volume</div>
                      <div className="font-semibold">{ip.volume || "-"}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-muted-foreground">Holders</div>
                      <div className="font-semibold">{ip.holders || 0}</div>
                    </div>
                  </div>
                )}
                <div className="mb-4 rounded-lg bg-muted/50 px-3 py-2">
                  <div className="text-xs text-muted-foreground">DippChain ID</div>
                  <div className="font-mono text-sm">{ip.dippChainId}</div>
                </div>
                <Button
                  variant="outline"
                  className="w-full transition-smooth hover:border-accent hover:text-accent"
                  onClick={() => router.push(`/ips/${ip.id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Load More Assets
          </Button>
        </div>
      </main>
    </div>
  );
}

