import { useState } from "react";
import { useRouter } from "next/router";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TrendingUp, Lock, Info } from "lucide-react";
import { toast } from "sonner";

export default function Fractionalize() {
  const router = useRouter();
  const { id } = router.query;
  const [lockNFT, setLockNFT] = useState(true);
  const [formData, setFormData] = useState({
    tokenName: "",
    tokenSymbol: "",
    totalSupply: "1000000",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    toast.success("Fractionalization Successful!", {
      description: `Created ${formData.totalSupply} ${formData.tokenSymbol} tokens`,
    });
    
    setTimeout(() => {
      router.push(`/ips/${id || "1"}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="mb-2 font-heading text-4xl font-bold">Fractionalize IP</h1>
            <p className="text-muted-foreground">
              Convert your IP into tradeable ERC-20 tokens
            </p>
          </div>

          <div className="grid gap-6">
            {/* IP Preview */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Selected IP Asset</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop"
                    alt="IP Asset"
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">Digital Artwork Collection</h3>
                    <p className="text-sm text-muted-foreground">DippChain ID: 0x1a2b3c4d</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fractionalization Form */}
            <form onSubmit={handleSubmit}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Token Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure your fractional ownership tokens
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="tokenName">Token Name</Label>
                    <Input
                      id="tokenName"
                      placeholder="My IP Token"
                      value={formData.tokenName}
                      onChange={(e) =>
                        setFormData({ ...formData, tokenName: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="tokenSymbol">Token Symbol</Label>
                    <Input
                      id="tokenSymbol"
                      placeholder="MIP"
                      value={formData.tokenSymbol}
                      onChange={(e) =>
                        setFormData({ ...formData, tokenSymbol: e.target.value.toUpperCase() })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="totalSupply">Total Supply</Label>
                    <Input
                      id="totalSupply"
                      type="number"
                      placeholder="1000000"
                      value={formData.totalSupply}
                      onChange={(e) =>
                        setFormData({ ...formData, totalSupply: e.target.value })
                      }
                      required
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      You will receive all tokens initially
                    </p>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium">Lock NFT</p>
                        <p className="text-sm text-muted-foreground">
                          Prevent NFT transfer during fractionalization
                        </p>
                      </div>
                    </div>
                    <Switch checked={lockNFT} onCheckedChange={setLockNFT} />
                  </div>

                  <Card className="border-accent/20 bg-accent/5">
                    <CardContent className="flex gap-3 pt-6">
                      <Info className="h-5 w-5 shrink-0 text-accent" />
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">Important Information</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• All tokens will be sent to your wallet</li>
                          <li>• You can trade tokens on the marketplace</li>
                          <li>• Token holders can vote on governance proposals</li>
                          <li>• Revenue is distributed proportionally</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    type="submit"
                    className="w-full gradient-primary border-0 text-white shadow-glow"
                  >
                    Fractionalize IP
                  </Button>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

