export function AmbientGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      <div className="hero-glow-orbit left-[2%] top-[8%]" />
      <div className="hero-glow-orbit animation-delay-2000 right-[7%] top-[22%]" />
      <div className="floating-flame">🔥</div>
      <div className="neural-line left-[14%] top-[24%] w-44 rotate-12" />
      <div className="neural-line right-[10%] top-[44%] w-56 -rotate-12" />
    </div>
  );
}
