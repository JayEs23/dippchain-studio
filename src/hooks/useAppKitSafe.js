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

  // Always call the hook unconditionally (React rules)
  // The hook must be called at the top level, not conditionally
  let appKit;
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
    appKit = null;
  }

  // Return null if not mounted or if there was an error
  if (!mounted || hasError || !appKit) {
    return null;
  }

  return appKit;
}

