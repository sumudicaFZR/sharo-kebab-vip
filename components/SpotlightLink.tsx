"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { useCallback } from "react";

type SpotlightLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: React.ReactNode;
};

export function SpotlightLink({ href, children, className = "", onMouseMove, ...props }: SpotlightLinkProps) {
  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
      event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
      onMouseMove?.(event);
    },
    [onMouseMove]
  );

  const internal = href.startsWith("/");
  const baseClass = `spotlight-shell sound-hover sound-click ${className}`;

  if (internal) {
    return (
      <Link href={href} onMouseMove={handleMove} className={baseClass} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onMouseMove={handleMove} className={baseClass} {...props}>
      {children}
    </a>
  );
}
