import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Image as ImageIcon, Link as LinkIcon, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRegisterIP } from "@/hooks/useIPRegistry";

export default function RegisterIP() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { registerIP, isPending, isConfirming, isConfirmed, error } = useRegisterIP();
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    storyNftContract: "",
    tokenId: "",
    title: "",
    description: "",
    watermarkFile: null,
    contentFiles: [],
    watermarkHash: "",
    contentCids: [],
  });

  // Pre-fill form from query parameters (when coming from create-story-nft page)
  useEffect(() => {
    if (router.isReady) {
      const { storyNftContract, tokenId, name, description } = router.query;
      if (storyNftContract && tokenId) {
        setFormData((prev) => ({
          ...prev,
          storyNftContract: storyNftContract,
          tokenId: tokenId,
          title: name || prev.title,
          description: description || prev.description,
        }));
        // Auto-advance to step 2 if NFT details are provided
        if (storyNftContract && tokenId) {
          setStep(2);
        }
      }
    }
  }, [router.isReady, router.query]);

  // Handle file uploads to IPFS
  const handleFileUpload = async (file, type) => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/ipfs/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error?.message || "Upload failed");
      }

      const cid = result.data.cids[0];
      
      if (type === "watermark") {
        setFormData((prev) => ({ ...prev, watermarkHash: cid }));
      } else {
        setFormData((prev) => ({ ...prev, contentCids: [...prev.contentCids, cid] }));
      }

      toast.success("File uploaded to IPFS", {
        description: `CID: ${cid.slice(0, 10)}...`,
      });
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed", {
        description: err.message,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConnected) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet to register IP",
      });
      return;
    }

    if (!formData.watermarkHash || formData.contentCids.length === 0) {
      toast.error("Files required", {
        description: "Please upload watermark and content files",
      });
      return;
    }

    try {
      // Register on-chain
      await registerIP(
        formData.storyNftContract,
        formData.tokenId,
        formData.watermarkHash,
        formData.contentCids
      );
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Registration failed", {
        description: err.message || "Failed to register IP",
      });
    }
  };

  // Handle successful registration
  useEffect(() => {
    if (isConfirmed) {
      toast.success("IP Registration Successful!", {
        description: "Your IP has been registered on DippChain",
      });
      
      // TODO: Extract dippChainId from transaction receipt
      // For now, redirect to IPs page
      setTimeout(() => {
        router.push("/ips");
      }, 2000);
    }
  }, [isConfirmed, router]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error("Transaction failed", {
        description: error.message || "Please try again",
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="mb-2 font-heading text-4xl font-bold">Register IP Asset</h1>
            <p className="text-muted-foreground">
              Register your Story Protocol NFT on DippChain
            </p>
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => router.push("/create-story-nft")}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Create New Story NFT First
              </Button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-smooth ${
                    step >= s
                      ? "border-accent bg-accent text-white"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-0.5 w-24 transition-smooth ${
                      step > s ? "bg-accent" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Story NFT Details */}
            {step === 1 && (
              <Card className="animate-fade-in border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5 text-accent" />
                    Connect Story NFT
                  </CardTitle>
                  <CardDescription>
                    Enter your Story Protocol NFT details, or{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/create-story-nft")}
                      className="text-accent hover:underline"
                    >
                      create a new one
                    </button>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="contract">Story NFT Contract Address</Label>
                    <Input
                      id="contract"
                      placeholder="0x..."
                      value={formData.storyNftContract}
                      onChange={(e) =>
                        setFormData({ ...formData, storyNftContract: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="tokenId">Token ID</Label>
                    <Input
                      id="tokenId"
                      type="number"
                      placeholder="1"
                      value={formData.tokenId}
                      onChange={(e) =>
                        setFormData({ ...formData, tokenId: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full gradient-primary border-0 text-white"
                    disabled={!formData.storyNftContract || !formData.tokenId}
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: IP Metadata */}
            {step === 2 && (
              <Card className="animate-fade-in border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    IP Metadata
                  </CardTitle>
                  <CardDescription>
                    Provide details about your intellectual property
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="My Awesome Creation"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your IP asset..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 gradient-primary border-0 text-white"
                      disabled={!formData.title || !formData.description}
                    >
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Upload Files */}
            {step === 3 && (
              <Card className="animate-fade-in border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-accent" />
                    Upload Files
                  </CardTitle>
                  <CardDescription>
                    Upload watermark and content files
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Watermark File</Label>
                    <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-border p-12 transition-smooth hover:border-accent">
                      <div className="text-center">
                        <ImageIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                        <p className="mb-2 text-sm font-medium">
                          Drop watermark file here or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                        <Input
                          type="file"
                          className="mt-4"
                          accept="image/*"
                          disabled={isUploading}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFormData({ ...formData, watermarkFile: file });
                              handleFileUpload(file, "watermark");
                            }
                          }}
                        />
                        {formData.watermarkHash && (
                          <p className="mt-2 text-xs text-success">
                            ✓ Uploaded: {formData.watermarkHash.slice(0, 20)}...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Content Files</Label>
                    <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-border p-12 transition-smooth hover:border-accent">
                      <div className="text-center">
                        <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                        <p className="mb-2 text-sm font-medium">
                          Drop content files here or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Multiple files supported
                        </p>
                        <Input
                          type="file"
                          className="mt-4"
                          multiple
                          disabled={isUploading}
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            setFormData({ ...formData, contentFiles: files });
                            files.forEach((file) => handleFileUpload(file, "content"));
                          }}
                        />
                        {formData.contentCids.length > 0 && (
                          <p className="mt-2 text-xs text-success">
                            ✓ Uploaded {formData.contentCids.length} file(s)
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 gradient-primary border-0 text-white shadow-glow"
                      disabled={isPending || isConfirming || isUploading || !isConnected}
                    >
                      {(isPending || isConfirming) ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {isPending ? "Confirming..." : "Processing..."}
                        </>
                      ) : (
                        "Register IP"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

