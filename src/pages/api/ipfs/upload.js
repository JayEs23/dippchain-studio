/**
 * API Route: Upload to IPFS
 * POST /api/ipfs/upload
 * 
 * Uploads files to IPFS and returns CIDs
 */

// Disable the default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse multipart/form-data using FormData API
    // In Next.js API routes, we need to handle FormData manually
    const contentType = req.headers["content-type"] || "";
    
    if (!contentType.includes("multipart/form-data")) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_CONTENT_TYPE",
          message: "Content-Type must be multipart/form-data",
        },
      });
    }

    // For Next.js, we'll use a simpler approach with form-data parsing
    // In production, you'd use formidable or multer
    // For now, we'll read the raw body and parse it
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    
    // Simple boundary parsing (for production, use a proper library)
    const boundary = contentType.split("boundary=")[1];
    if (!boundary) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_FORMAT",
          message: "Invalid multipart form data",
        },
      });
    }

    // For now, return mock CIDs
    // TODO: Implement proper file parsing and IPFS upload
    // In production, use formidable or multer to parse files
    
    // Check if there's any file data in the request
    const hasFileData = buffer.length > 0 && buffer.toString().includes("Content-Disposition: form-data");
    
    if (!hasFileData) {
      return res.status(400).json({
        success: false,
        error: {
          code: "NO_FILES",
          message: "No files provided",
        },
      });
    }

    // Generate mock CIDs (one per file detected)
    // In production, parse actual files and upload to IPFS
    const fileCount = (buffer.toString().match(/Content-Disposition: form-data/g) || []).length;
    const cids = Array.from({ length: fileCount }, () => {
      const hash = Math.random().toString(16).substring(2, 66);
      return `Qm${hash}`;
    });

    return res.status(200).json({
      success: true,
      data: {
        cids,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: error.message || "Failed to upload to IPFS",
      },
      timestamp: new Date().toISOString(),
    });
  }
}

