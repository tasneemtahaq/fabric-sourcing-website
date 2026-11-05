import { Code2, ShoppingCart, TrendingUp } from "lucide-react";

const services = [
  { icon: Code2, label: "Development" },
  { icon: ShoppingCart, label: "E-Commerce" },
  { icon: TrendingUp, label: "Digital Growth" },
] as const;

export default function BottomStrip() {
  return (
    <div className="mt-5 hidden items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-3.5 backdrop-blur-xl sm:flex">
      <p className="text-sm font-semibold text-white">Better Ideas. Bigger Dreams.</p>
      <ul className="flex gap-x-8">
        {services.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2 text-sm text-slate-200/80">
            <Icon size={16} className="text-cyan-300" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
