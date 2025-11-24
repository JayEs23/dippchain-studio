import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, Users, Lock, Zap, Globe } from "lucide-react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="gradient-mesh absolute inset-0" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-accent/10 text-accent hover:bg-accent/20 animate-fade-in">
              Powered by Story Protocol
            </Badge>
            <h1 className="mb-6 font-heading text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl animate-slide-up">
              Protect, Monetize & Trade Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Intellectual Property
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
              The complete Web3 platform for IP registration, fractionalization, and revenue distribution.
              Secure your creative rights on the blockchain.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button 
                size="lg" 
                className="gradient-primary border-0 text-white shadow-glow transition-smooth hover:scale-105"
                onClick={() => router.push("/register-ip")}
              >
                Register Your IP
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="transition-smooth hover:border-accent hover:text-accent"
                onClick={() => router.push("/marketplace")}
              >
                Explore Marketplace
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Card className="border-border/50 bg-card/50 backdrop-blur transition-smooth hover:border-accent/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-accent">1,247</div>
                  <div className="text-sm text-muted-foreground">Registered IPs</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur transition-smooth hover:border-accent/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-accent">$2.4M</div>
                  <div className="text-sm text-muted-foreground">Total Volume</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur transition-smooth hover:border-accent/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-accent">543</div>
                  <div className="text-sm text-muted-foreground">Active Traders</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              Complete IP Management Suite
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to protect and monetize your creative work
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group border-border/50 transition-smooth hover:border-accent/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-smooth group-hover:bg-primary/20">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>IP Registration</CardTitle>
                <CardDescription>
                  Register your Story Protocol NFTs on DippChain with watermark protection and content verification
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-border/50 transition-smooth hover:border-accent/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-smooth group-hover:bg-accent/20">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Fractionalization</CardTitle>
                <CardDescription>
                  Convert your IP into tradeable ERC-20 tokens and unlock liquidity while retaining ownership rights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-border/50 transition-smooth hover:border-accent/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-smooth group-hover:bg-primary/20">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Marketplace</CardTitle>
                <CardDescription>
                  Buy and sell fractional IP ownership with built-in slippage protection and fair pricing mechanisms
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-border/50 transition-smooth hover:border-accent/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-smooth group-hover:bg-accent/20">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>
                  Automatic proportional revenue sharing to all token holders based on snapshot balances
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-border/50 transition-smooth hover:border-accent/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-smooth group-hover:bg-primary/20">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Governance (IPDAO)</CardTitle>
                <CardDescription>
                  Token-based voting system for IP-related decisions with timelocked execution and quorum requirements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-border/50 transition-smooth hover:border-accent/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-smooth group-hover:bg-accent/20">
                  <Lock className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Violation Tracking</CardTitle>
                <CardDescription>
                  AI-powered monitoring and reporting system to detect and resolve IP violations with evidence verification
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20">
        <div className="gradient-mesh absolute inset-0 opacity-50" />
        <div className="container relative z-10 mx-auto px-4">
          <Card className="border-accent/20 bg-card/80 backdrop-blur">
            <CardContent className="p-12 text-center">
              <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                Ready to Protect Your IP?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join hundreds of creators securing their intellectual property on the blockchain
              </p>
              <Button 
                size="lg" 
                className="gradient-primary border-0 text-white shadow-glow transition-smooth hover:scale-105"
                onClick={() => router.push("/register-ip")}
              >
                Get Started Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-accent">
                  <span className="text-lg font-bold text-white">D</span>
                </div>
                <span className="font-heading text-xl font-bold">DippChain</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Protecting intellectual property rights on the blockchain
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/register-ip" className="transition-smooth hover:text-accent">Register IP</a></li>
                <li><a href="/marketplace" className="transition-smooth hover:text-accent">Marketplace</a></li>
                <li><a href="/governance" className="transition-smooth hover:text-accent">Governance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="transition-smooth hover:text-accent">Documentation</a></li>
                <li><a href="#" className="transition-smooth hover:text-accent">API Reference</a></li>
                <li><a href="#" className="transition-smooth hover:text-accent">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="transition-smooth hover:text-accent">Privacy Policy</a></li>
                <li><a href="#" className="transition-smooth hover:text-accent">Terms of Service</a></li>
                <li><a href="#" className="transition-smooth hover:text-accent">KYC Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            © 2025 DippChain. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
