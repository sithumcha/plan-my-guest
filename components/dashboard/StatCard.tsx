import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  color?: 'gold' | 'emerald' | 'rose' | 'blue';
}

export default function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'gold' }: StatCardProps) {
  const colorMap = {
    gold: 'bg-[#FAF6E9] border-[#E9D69B] text-[#B89324]',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    rose: 'bg-[#F5E6E3] border-[#D5A49B] text-[#5C332D]',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
  };

  return (
    <div className="glass-card p-5 rounded-2xl border border-[#E8DEC8] flex items-start justify-between bg-white">
      <div>
        <span className="text-[11px] uppercase tracking-wider font-bold text-[#755D58]">{title}</span>
        <div className="text-3xl font-bold font-serif text-[#3A1E1A] mt-1">{value}</div>
        {subtitle && <p className="text-xs text-[#8C746E] mt-1 font-medium">{subtitle}</p>}
        {trend && <span className="text-xs text-emerald-700 mt-2 block font-bold">{trend}</span>}
      </div>
      <div className={`p-3 rounded-xl border ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
