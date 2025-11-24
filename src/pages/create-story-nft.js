/**
 * Create Story NFT Page
 * 
 * This page allows users to create a new Story Protocol NFT from scratch
 * using the Story Protocol SDK. After creation, users can register it with DippChain.
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Image as ImageIcon, FileText, Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRegisterStoryIP } from "@/hooks/useStoryIP";
import { getStoryExplorerUrl } from "@/lib/story/client";

export default function CreateStoryNFT() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { registerIP, isLoading, error, result } = useRegisterStoryIP("aeneid");
  
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    mediaFile: null,
    mediaUrl: "",
    mediaCid: "",
  });

  // Handle media file upload to IPFS
  const handleMediaUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("file", file);

      const response = await fetch("/api/ipfs/upload", {
        method: "POST",
        body: formDataObj,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error?.message || "Upload failed");
      }

      const cid = result.data.cids[0];
      const ipfsUrl = `https://ipfs.io/ipfs/${cid}`;
      
      setFormData((prev) => ({
        ...prev,
        mediaFile: file,
        mediaCid: cid,
        mediaUrl: ipfsUrl,
      }));

      toast.success("Media uploaded to IPFS", {
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

  // Handle Story NFT creation
  const handleCreateNFT = async () => {
    if (!isConnected) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet to create NFT",
      });
      return;
    }

    if (!formData.name || !formData.mediaUrl) {
      toast.error("Missing required fields", {
        description: "Please provide name and upload media",
      });
      return;
    }

    try {
      setStep(3); // Move to processing step
      
      const result = await registerIP({
        name: formData.name,
        description: formData.description || "",
        mediaUrl: formData.mediaUrl,
        metadata: {
          mediaCid: formData.mediaCid,
          fileName: formData.mediaFile?.name,
          fileType: formData.mediaFile?.type,
          fileSize: formData.mediaFile?.size,
        },
      });

      if (result?.ipId && result?.tokenId) {
        toast.success("Story NFT Created!", {
          description: "Your NFT has been minted on Story Protocol",
        });

        // Store result for next step
        setFormData((prev) => ({
          ...prev,
          storyIPId: result.ipId,
          storyTokenId: result.tokenId.toString(),
          storyTxHash: result.txHash,
        }));

        setStep(4); // Success step
      } else {
        throw new Error("Story Protocol registration did not return IP ID or token ID");
      }
    } catch (err) {
      console.error("NFT creation error:", err);
      toast.error("NFT creation failed", {
        description: err.message || "Failed to create Story NFT",
      });
      setStep(2); // Go back to form
    }
  };

  // Handle navigation to registration page
  const handleRegisterWithDippChain = () => {
    if (formData.storyIPId && formData.storyTokenId) {
      // Get Story NFT contract address from environment
      const storyNftContract = process.env.NEXT_PUBLIC_STORY_IP_ASSET_REGISTRY;
      
      // Navigate to registration page with pre-filled data
      router.push({
        pathname: "/register-ip",
        query: {
          storyNftContract: storyNftContract || "",
          tokenId: formData.storyTokenId,
          storyIPId: formData.storyIPId,
          name: formData.name,
          description: formData.description,
        },
      });
    }
  };

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
            <h1 className="mb-2 font-heading text-4xl font-bold flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-accent" />
              Create Story NFT
            </h1>
            <p className="text-muted-foreground">
              Mint a new Story Protocol NFT and register it with DippChain
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
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
                {s < 4 && (
                  <div
                    className={`h-0.5 w-16 transition-smooth ${
                      step > s ? "bg-accent" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Upload Media */}
          {step === 1 && (
            <Card className="animate-fade-in border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-accent" />
                  Upload Media
                </CardTitle>
                <CardDescription>
                  Upload your IP asset (image, video, audio, document, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Media File</Label>
                  <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-border p-12 transition-smooth hover:border-accent">
                    <div className="text-center">
                      <ImageIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="mb-2 text-sm font-medium">
                        Drop media file here or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Images, videos, audio, documents up to 100MB
                      </p>
                      <Input
                        type="file"
                        className="mt-4"
                        accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                        disabled={isUploading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleMediaUpload(file);
                          }
                        }}
                      />
                      {formData.mediaCid && (
                        <p className="mt-2 text-xs text-success">
                          ✓ Uploaded: {formData.mediaCid.slice(0, 20)}...
                        </p>
                      )}
                      {isUploading && (
                        <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Uploading to IPFS...
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full"
                  disabled={!formData.mediaUrl}
                >
                  Continue
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Metadata */}
          {step === 2 && (
            <Card className="animate-fade-in border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  NFT Metadata
                </CardTitle>
                <CardDescription>
                  Provide details about your intellectual property
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="My Awesome Creation"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
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
                  />
                </div>

                {formData.mediaFile && (
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm font-medium mb-2">Media Preview</p>
                    <p className="text-xs text-muted-foreground">
                      {formData.mediaFile.name} ({formData.mediaCid.slice(0, 20)}...)
                    </p>
                  </div>
                )}

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
                    onClick={handleCreateNFT}
                    className="flex-1"
                    disabled={!formData.name || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Story NFT"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Processing */}
          {step === 3 && (
            <Card className="animate-fade-in border-border/50">
              <CardContent className="py-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Creating Story NFT...</h3>
                  <p className="text-muted-foreground">
                    Please confirm the transaction in your wallet
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Success */}
          {step === 4 && result && (
            <Card className="animate-fade-in border-border/50 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <CheckCircle2 className="h-5 w-5" />
                  Story NFT Created Successfully!
                </CardTitle>
                <CardDescription>
                  Your NFT has been minted on Story Protocol
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">IP ID:</span>
                    <span className="text-sm font-mono">{result.ipId?.slice(0, 20)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Token ID:</span>
                    <span className="text-sm font-mono">{result.tokenId?.toString()}</span>
                  </div>
                  {result.txHash && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Transaction:</span>
                      <a
                        href={getStoryExplorerUrl("aeneid", "tx", result.txHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent hover:underline"
                      >
                        View on StoryScan
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/ips")}
                    className="flex-1"
                  >
                    View My IPs
                  </Button>
                  <Button
                    type="button"
                    onClick={handleRegisterWithDippChain}
                    className="flex-1"
                  >
                    Register with DippChain
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

