"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useCallback } from "react";

type SpotlightCardProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

export function SpotlightCard({ children, className = "", onMouseMove, ...props }: SpotlightCardProps) {
  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
      event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
      event.currentTarget.style.setProperty("--tilt-x", `${((event.clientY - rect.top) / rect.height - 0.5) * -4}deg`);
      event.currentTarget.style.setProperty("--tilt-y", `${((event.clientX - rect.left) / rect.width - 0.5) * 4}deg`);
      onMouseMove?.(event);
    },
    [onMouseMove]
  );

  return (
    <motion.div
      onMouseMove={handleMove}
      whileHover={{ y: -4, scale: 1.014, rotateX: "var(--tilt-x)", rotateY: "var(--tilt-y)" }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={`spotlight-shell ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
