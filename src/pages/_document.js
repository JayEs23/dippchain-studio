import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4BE38B" />
        
        {/* SEO Meta Tags */}
        <meta
          name="description"
          content="DippChain - AI-Powered IP Protection & IPFi Marketplace. Protect, enforce, and monetize your intellectual property automatically. Built on Story Protocol."
        />
        <meta
          name="keywords"
          content="IP protection, intellectual property, blockchain, NFT, Story Protocol, IPFi, fractionalization, marketplace, Web3, AI detection, copyright protection"
        />
        <meta name="author" content="DippChain" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://dippchain.vercel.app" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dippchain.vercel.app" />
        <meta property="og:title" content="DippChain - AI-Powered IP Protection & IPFi Marketplace" />
        <meta
          property="og:description"
          content="Protect, enforce, and monetize your intellectual property—automatically. Built on Story Protocol."
        />
        <meta property="og:image" content="https://dippchain.vercel.app/dippchainlogo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DippChain Logo" />
        <meta property="og:site_name" content="DippChain" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://dippchain.vercel.app" />
        <meta name="twitter:title" content="DippChain - AI-Powered IP Protection & IPFi Marketplace" />
        <meta
          name="twitter:description"
          content="Protect, enforce, and monetize your intellectual property—automatically. Built on Story Protocol."
        />
        <meta name="twitter:image" content="https://dippchain.vercel.app/dippchainlogo.png" />
        <meta name="twitter:image:alt" content="DippChain Logo" />
        <meta name="twitter:creator" content="@dippchain" />
        <meta name="twitter:site" content="@dippchain" />

        {/* Favicon */}
        <link rel="icon" type="image/png" href="/dippchainlogo.png" />
        <link rel="apple-touch-icon" href="/dippchainlogo.png" />
        <link rel="shortcut icon" href="/dippchainlogo.png" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DippChain",
              url: "https://dippchain.vercel.app",
              logo: "https://dippchain.vercel.app/dippchainlogo.png",
              description:
                "AI-Powered IP Protection & IPFi Marketplace. Protect, enforce, and monetize your intellectual property automatically.",
              sameAs: [
                "https://twitter.com/dippchain",
                "https://github.com/dippchain",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                availableLanguage: "English",
              },
            }),
          }}
        />

        {/* Structured Data - WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "DippChain Studio",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description:
                "Protect, enforce, and monetize your intellectual property—automatically. Built on Story Protocol.",
              url: "https://dippchain.vercel.app",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
            }),
          }}
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://aeneid.storyrpc.io" />
        <link rel="dns-prefetch" href="https://ipfs.io" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
