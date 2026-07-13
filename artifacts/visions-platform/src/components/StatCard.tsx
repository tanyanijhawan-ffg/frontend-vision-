import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
          
          {trend && (
            <div className="mt-2 flex items-center gap-1.5">
              <span className={clsx(
                "inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium",
                trendUp === true ? "bg-emerald-50 text-emerald-700" : 
                trendUp === false ? "bg-red-50 text-red-700" : 
                "bg-slate-100 text-slate-700"
              )}>
                {trend}
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
}