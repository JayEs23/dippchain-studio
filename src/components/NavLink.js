import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

/**
 * NavLink component for Next.js Pages Router
 * Provides active state styling similar to React Router's NavLink
 */
export function NavLink({ href, className, activeClassName, children, ...props }) {
  const router = useRouter();
  const isActive = router.pathname === href || (href !== "/" && router.pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(className, isActive && activeClassName)}
      {...props}
    >
      {children}
    </Link>
  );
}

