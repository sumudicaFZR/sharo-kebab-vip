"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export function MotionSection({ children, className = "", ...props }: HTMLMotionProps<"section">) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
