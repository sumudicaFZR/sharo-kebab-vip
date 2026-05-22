import { QrCode, Sandwich, Star } from "lucide-react";

const steps = [
  { icon: Sandwich, title: "Mănânci", text: "ce-ți place" },
  { icon: QrCode, title: "Scanezi", text: "QR-ul" },
  { icon: Star, title: "Primești", text: "reward-uri" }
];

export function HeroSteps() {
  return (
    <div className="hero-steps mt-7 grid gap-3 sm:grid-cols-3">
      {steps.map((step) => {
        const Icon = step.icon;
        return (
          <div key={step.title} className="flex items-center gap-3 rounded-lg border border-cream/10 bg-coal/35 p-3 backdrop-blur-xl">
            <Icon className="h-7 w-7 text-ember" />
            <div>
              <strong className="block text-cream">{step.title}</strong>
              <span className="text-sm text-smoke">{step.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
