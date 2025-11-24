/**
 * Safe wrapper for useAppKit hook that handles SSR and initialization
 * Use this instead of useAppKit directly to avoid SSR errors
 * 
 * Note: React hooks must be called unconditionally, so we always call useAppKit
 * but handle errors gracefully
 */

import { useAppKit } from "@reown/appkit/react";
import { useEffect, useState } from "react";

/**
 * Safely use AppKit hook with SSR protection
 * @returns {Object|null} AppKit instance or null if not ready
 */
export function useAppKitSafe() {
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always call the hook (React rules) - must be unconditional
  let appKit = null;
  try {
    appKit = useAppKit();
    if (hasError) setHasError(false); // Clear error if hook succeeds
  } catch (err) {
    if (!hasError) {
      setHasError(true);
      if (typeof window !== "undefined") {
        console.warn("AppKit not initialized:", err);
      }
    }
  }

  // Return null if not mounted or if there was an error
  if (!mounted || hasError) {
    return null;
  }

  return appKit;
}

