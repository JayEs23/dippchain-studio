import { Button } from "@/components/ui/button";
import { Wallet, Menu, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Dynamically import WalletConnect to avoid SSR issues with AppKit
const WalletConnect = dynamic(
  () => import("@/components/wallet/WalletConnect").then((mod) => ({ default: mod.WalletConnect })),
  { ssr: false }
);

export function Header() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <NavLink href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-accent">
                <span className="text-lg font-bold text-white">D</span>
              </div>
              <span className="font-heading text-xl font-bold">DippChain</span>
            </NavLink>

            <nav className="hidden items-center gap-6 md:flex">
              <NavLink
                href="/ips"
                className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
                activeClassName="text-foreground"
              >
                IP Assets
              </NavLink>
              <NavLink
                href="/marketplace"
                className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
                activeClassName="text-foreground"
              >
                Marketplace
              </NavLink>
              <NavLink
                href="/governance"
                className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
                activeClassName="text-foreground"
              >
                Governance
              </NavLink>
              <NavLink
                href="/violations"
                className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
                activeClassName="text-foreground"
              >
                Violations
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => router.push("/profile")}
            >
              <User className="h-5 w-5" />
            </Button>
            <WalletConnect />
            <Button
              size="sm"
              className="gradient-primary border-0 text-white shadow-glow"
              onClick={() => router.push("/register-ip")}
            >
              Register IP
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

