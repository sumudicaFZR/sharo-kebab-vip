import { FloatingParticles } from "@/components/FloatingParticles";

export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-coal">
      <div className="sharo-photo-bg" />
      <div className="background-dark-overlay absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_4%,rgba(255,122,26,0.34),transparent_36rem),radial-gradient(circle_at_84%_22%,rgba(225,45,33,0.3),transparent_34rem),radial-gradient(circle_at_50%_120%,rgba(255,122,26,0.12),transparent_30rem),linear-gradient(180deg,rgba(11,9,8,0.02),rgba(11,9,8,0.82))]" />
      <div className="cinematic-vignette" />
      <div className="smoke-layer smoke-layer-a" />
      <div className="smoke-layer smoke-layer-b" />
      <div className="noise-layer" />
      <div className="atmosphere-blob left-[8%] top-[10%] h-72 w-72 bg-ember/22" />
      <div className="atmosphere-blob animation-delay-2000 right-[8%] top-[22%] h-96 w-96 bg-chili/20" />
      <div className="atmosphere-blob animation-delay-4000 bottom-[8%] left-[35%] h-80 w-80 bg-orange-300/12" />
      <FloatingParticles />
    </div>
  );
}
