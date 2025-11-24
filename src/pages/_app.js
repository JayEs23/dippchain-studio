import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiAdapter, initializeAppKit } from "@/lib/web3/config";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: 1,
            retryDelay: 1000,
          },
          mutations: {
            retry: 1,
            retryDelay: 1000,
          },
        },
      })
  );

  // Ensure AppKit is initialized on client mount
  useEffect(() => {
    initializeAppKit();
  }, []);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Toaster />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
