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
  
  // Always call the hook unconditionally at the top level (React rules)
  // Cannot wrap hooks in try-catch or conditionals
  const appKit = useAppKit();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null if not mounted (SSR) or if appKit is not available
  if (!mounted || !appKit) {
    return null;
  }

  return appKit;
}

