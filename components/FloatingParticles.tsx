const particles = Array.from({ length: 52 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: `${(index % 13) * 0.72}s`,
  duration: `${10 + (index % 12)}s`,
  size: `${index % 5 === 0 ? 5 : 2 + (index % 3)}px`,
  layer: index % 3
}));

export function FloatingParticles() {
  return (
    <div className="absolute inset-0">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="spark-particle"
          style={{
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            width: particle.size,
            height: particle.size,
            filter: `blur(${particle.layer}px)`,
            opacity: particle.layer === 0 ? 0.22 : 0.12
          }}
        />
      ))}
    </div>
  );
}
