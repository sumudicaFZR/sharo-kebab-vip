"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useCallback } from "react";

type PremiumButtonProps = HTMLMotionProps<"button"> & {
  children: React.ReactNode;
};

export function PremiumButton({ children, className = "", onMouseMove, ...props }: PremiumButtonProps) {
  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
      event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
      onMouseMove?.(event);
    },
    [onMouseMove]
  );

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.018 }}
      whileTap={{ y: 1, scale: 0.982 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      onMouseMove={handleMove}
      className={`spotlight-shell sound-hover sound-click ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
