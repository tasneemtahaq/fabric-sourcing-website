import { Code2, ShoppingCart, TrendingUp } from "lucide-react";

const services = [
  { icon: Code2, label: "Development" },
  { icon: ShoppingCart, label: "E-Commerce" },
  { icon: TrendingUp, label: "Digital Growth" },
] as const;

export default function BottomStrip() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-6 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-white">
          Better Ideas. Bigger Dreams.
        </p>
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {services.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm text-slate-200/80">
              <Icon size={16} className="text-cyan-300" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
