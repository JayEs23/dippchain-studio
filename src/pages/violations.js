import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, CheckCircle2, XCircle, ExternalLink } from "lucide-react";

export default function Violations() {
  const mockViolations = [
    {
      id: "1",
      ipTitle: "Digital Artwork Collection",
      dippChainId: "0x1a2b3c4d",
      detectedUrl: "https://example.com/stolen-art",
      similarityScore: 95,
      evidenceHash: "Qm...abc123",
      reportedAt: "2025-01-22",
      status: "pending",
      reporter: "AI Detection System",
    },
    {
      id: "2",
      ipTitle: "Music Album Rights",
      dippChainId: "0x5e6f7g8h",
      detectedUrl: "https://pirate-site.com/album",
      similarityScore: 88,
      evidenceHash: "Qm...def456",
      reportedAt: "2025-01-20",
      status: "challenged",
      reporter: "AI Detection System",
      challengeNote: "Similar but different artist",
    },
    {
      id: "3",
      ipTitle: "Digital Artwork Collection",
      dippChainId: "0x1a2b3c4d",
      detectedUrl: "https://marketplace.com/copy",
      similarityScore: 92,
      evidenceHash: "Qm...ghi789",
      reportedAt: "2025-01-18",
      status: "resolved",
      reporter: "AI Detection System",
      resolution: "Confirmed violation, taken down",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning/10 text-warning";
      case "challenged":
        return "bg-accent/10 text-accent";
      case "resolved":
        return "bg-success/10 text-success";
      case "dismissed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted";
    }
  };

  const getSimilarityColor = (score) => {
    if (score >= 90) return "text-destructive";
    if (score >= 75) return "text-warning";
    return "text-accent";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="mb-2 font-heading text-4xl font-bold">IP Violations</h1>
          <p className="text-muted-foreground">
            Monitor and resolve AI-detected IP violations
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-4">
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-warning">3</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-accent">1</div>
                <div className="text-sm text-muted-foreground">Challenged</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-success">12</div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-muted-foreground">5</div>
                <div className="text-sm text-muted-foreground">Dismissed</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Violations</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {mockViolations.map((violation, idx) => (
              <Card
                key={violation.id}
                className="border-border/50 transition-smooth hover:border-accent/50 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge className={getStatusColor(violation.status)}>
                          {violation.status}
                        </Badge>
                        <Badge variant="outline">{violation.ipTitle}</Badge>
                      </div>
                      <CardTitle className="mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-warning" />
                        Potential IP Violation Detected
                      </CardTitle>
                      <CardDescription>
                        Reported by {violation.reporter} on {violation.reportedAt}
                      </CardDescription>
                    </div>
                    <div
                      className={`text-right ${getSimilarityColor(violation.similarityScore)}`}
                    >
                      <div className="text-3xl font-bold">{violation.similarityScore}%</div>
                      <div className="text-xs">Similarity</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="mb-1 text-sm text-muted-foreground">Detected URL</p>
                      <a
                        href={violation.detectedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                      >
                        {violation.detectedUrl}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-muted-foreground">DippChain ID</p>
                      <code className="block rounded bg-muted px-3 py-1 font-mono text-sm">
                        {violation.dippChainId}
                      </code>
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-muted-foreground">Evidence Hash (IPFS)</p>
                    <code className="block rounded bg-muted px-3 py-1 font-mono text-sm">
                      {violation.evidenceHash}
                    </code>
                  </div>

                  {violation.challengeNote && (
                    <Card className="border-accent/20 bg-accent/5">
                      <CardContent className="flex gap-3 pt-6">
                        <Shield className="h-5 w-5 shrink-0 text-accent" />
                        <div>
                          <p className="mb-1 text-sm font-medium">Challenge Note</p>
                          <p className="text-sm text-muted-foreground">
                            {violation.challengeNote}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {violation.resolution && (
                    <Card className="border-success/20 bg-success/5">
                      <CardContent className="flex gap-3 pt-6">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                        <div>
                          <p className="mb-1 text-sm font-medium">Resolution</p>
                          <p className="text-sm text-muted-foreground">
                            {violation.resolution}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {violation.status === "pending" && (
                    <div className="flex gap-3">
                      <Button className="flex-1 border-success bg-success/10 text-success hover:bg-success/20">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Accept Violation
                      </Button>
                      <Button className="flex-1 border-warning bg-warning/10 text-warning hover:bg-warning/20">
                        <Shield className="mr-2 h-4 w-4" />
                        Challenge
                      </Button>
                      <Button className="flex-1 border-destructive bg-destructive/10 text-destructive hover:bg-destructive/20">
                        <XCircle className="mr-2 h-4 w-4" />
                        Dismiss
                      </Button>
                    </div>
                  )}

                  {violation.status === "challenged" && (
                    <Button className="w-full gradient-primary border-0 text-white">
                      Resolve Violation
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            {mockViolations
              .filter((v) => v.status === "pending")
              .map((violation) => (
                <Card key={violation.id} className="border-border/50">
                  <CardHeader>
                    <CardTitle>{violation.ipTitle}</CardTitle>
                    <CardDescription>{violation.detectedUrl}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-6">
            {mockViolations
              .filter((v) => v.status === "resolved")
              .map((violation) => (
                <Card key={violation.id} className="border-border/50">
                  <CardHeader>
                    <CardTitle>{violation.ipTitle}</CardTitle>
                    <CardDescription>{violation.resolution}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

