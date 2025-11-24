/**
 * Dynamic Sitemap Generation
 * Generates sitemap.xml for SEO
 */

function generateSiteMap() {
  const baseUrl = "https://dippchain.vercel.app";
  
  const staticPages = [
    "",
    "/ips",
    "/marketplace",
    "/governance",
    "/violations",
    "/register-ip",
    "/create-story-nft",
    "/profile",
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${staticPages
       .map(
         (page) => `
       <url>
           <loc>${baseUrl}${page}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>${page === "" ? "daily" : "weekly"}</changefreq>
           <priority>${page === "" ? "1.0" : "0.8"}</priority>
       </url>
     `
       )
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // Generate the XML sitemap
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

