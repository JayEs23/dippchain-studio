import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Vote, Plus, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function Governance() {
  const mockProposals = [
    {
      id: "1",
      title: "Increase Revenue Distribution Frequency",
      description: "Proposal to distribute revenue monthly instead of quarterly to provide more regular returns to token holders.",
      ipTitle: "Digital Artwork Collection",
      proposer: "0x742d...9876",
      status: "active",
      votesFor: 750000,
      votesAgainst: 150000,
      quorum: 500000,
      totalSupply: 1000000,
      endsAt: "2025-01-30",
    },
    {
      id: "2",
      title: "Partner with Major Gallery",
      description: "Approve partnership with prestigious gallery for physical exhibition, requiring 5% commission on sales.",
      ipTitle: "Digital Artwork Collection",
      proposer: "0x1234...5678",
      status: "active",
      votesFor: 450000,
      votesAgainst: 250000,
      quorum: 500000,
      totalSupply: 1000000,
      endsAt: "2025-02-05",
    },
    {
      id: "3",
      title: "Update License Terms",
      description: "Modify licensing agreement to allow commercial use with attribution.",
      ipTitle: "Music Album Rights",
      proposer: "0xabcd...efgh",
      status: "passed",
      votesFor: 820000,
      votesAgainst: 80000,
      quorum: 500000,
      totalSupply: 1000000,
      endsAt: "2025-01-15",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-accent/10 text-accent";
      case "passed":
        return "bg-success/10 text-success";
      case "rejected":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted";
    }
  };

  const calculateProgress = (votesFor, votesAgainst) => {
    const total = votesFor + votesAgainst;
    return total > 0 ? (votesFor / total) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 font-heading text-4xl font-bold">Governance</h1>
            <p className="text-muted-foreground">
              Vote on IP-related proposals via IPDAO
            </p>
          </div>
          <Button className="gradient-primary border-0 text-white shadow-glow">
            <Plus className="mr-2 h-4 w-4" />
            Create Proposal
          </Button>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Proposals</TabsTrigger>
            <TabsTrigger value="closed">Closed Proposals</TabsTrigger>
            <TabsTrigger value="myVotes">My Votes</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {mockProposals
              .filter((p) => p.status === "active")
              .map((proposal, idx) => (
                <Card
                  key={proposal.id}
                  className="border-border/50 transition-smooth hover:border-accent/50 animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <Badge className={getStatusColor(proposal.status)}>
                            {proposal.status}
                          </Badge>
                          <Badge variant="outline">{proposal.ipTitle}</Badge>
                        </div>
                        <CardTitle className="mb-2">{proposal.title}</CardTitle>
                        <CardDescription>{proposal.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-lg border border-border/50 p-4">
                        <div className="mb-1 flex items-center gap-2 text-success">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-sm font-medium">For</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {proposal.votesFor.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {((proposal.votesFor / proposal.totalSupply) * 100).toFixed(1)}%
                        </p>
                      </div>

                      <div className="rounded-lg border border-border/50 p-4">
                        <div className="mb-1 flex items-center gap-2 text-destructive">
                          <XCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Against</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {proposal.votesAgainst.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {((proposal.votesAgainst / proposal.totalSupply) * 100).toFixed(1)}%
                        </p>
                      </div>

                      <div className="rounded-lg border border-border/50 p-4">
                        <div className="mb-1 flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm font-medium">Ends</span>
                        </div>
                        <p className="text-2xl font-bold">{proposal.endsAt}</p>
                        <p className="text-xs text-muted-foreground">Voting deadline</p>
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Voting Progress</span>
                        <span className="font-medium">
                          {calculateProgress(proposal.votesFor, proposal.votesAgainst).toFixed(1)}% For
                        </span>
                      </div>
                      <Progress
                        value={calculateProgress(proposal.votesFor, proposal.votesAgainst)}
                        className="h-3"
                      />
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Quorum: {proposal.quorum.toLocaleString()} votes</span>
                        <span>
                          {proposal.votesFor + proposal.votesAgainst >= proposal.quorum
                            ? "✓ Quorum met"
                            : "Quorum not met"}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 border-success bg-success/10 text-success hover:bg-success/20">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Vote For
                      </Button>
                      <Button className="flex-1 border-destructive bg-destructive/10 text-destructive hover:bg-destructive/20">
                        <XCircle className="mr-2 h-4 w-4" />
                        Vote Against
                      </Button>
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
                      <span>Proposed by {proposal.proposer}</span>
                      <Button variant="link" className="h-auto p-0 text-accent">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="closed" className="space-y-6">
            {mockProposals
              .filter((p) => p.status !== "active")
              .map((proposal) => (
                <Card key={proposal.id} className="border-border/50">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <Badge className={getStatusColor(proposal.status)}>
                            {proposal.status}
                          </Badge>
                          <Badge variant="outline">{proposal.ipTitle}</Badge>
                        </div>
                        <CardTitle className="mb-2">{proposal.title}</CardTitle>
                        <CardDescription>{proposal.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="mb-1 text-sm text-muted-foreground">Final Result</p>
                        <div className="flex items-center gap-3">
                          <div>
                            <span className="text-sm text-success">For: </span>
                            <span className="font-semibold">
                              {proposal.votesFor.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm text-destructive">Against: </span>
                            <span className="font-semibold">
                              {proposal.votesAgainst.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-muted-foreground">Ended</p>
                        <p className="font-semibold">{proposal.endsAt}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="myVotes">
            <Card className="border-border/50">
              <CardContent className="py-12 text-center">
                <Vote className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No voting history yet</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

