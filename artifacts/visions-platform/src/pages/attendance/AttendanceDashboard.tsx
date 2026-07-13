import { CheckCircle2, XCircle, AlertCircle, Clock } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { day: 'Mon', percent: 85 },
  { day: 'Tue', percent: 82 },
  { day: 'Wed', percent: 88 },
  { day: 'Thu', percent: 84 },
  { day: 'Fri', percent: 89 },
  { day: 'Sat', percent: 76 },
  { day: 'Sun', percent: 0 },
];

export default function AttendanceDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader 
        title="Attendance Dashboard" 
        subtitle="Monitor student participation across all centres."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Present Today" value="1,048" icon={CheckCircle2} trend="84%" trendUp={true} />
        <StatCard title="Absent Today" value="199" icon={XCircle} trend="16%" trendUp={false} />
        <StatCard title="Consecutive Absences" value="45" icon={AlertCircle} trend="+12 this week" trendUp={false} />
        <StatCard title="Avg Monthly" value="86%" icon={Clock} trend="+2%" trendUp={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">7-Day Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="percent" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">High Risk Alert</h3>
            <p className="text-sm text-slate-500 mb-4">Centres below 70% attendance today.</p>
            <div className="space-y-3">
              {[
                { name: 'Kanchipuram Centre', val: '62%' },
                { name: 'Dindigul Community', val: '68%' },
                { name: 'Chennai North', val: '69%' }
              ].map(c => (
                <div key={c.name} className="flex items-center justify-between p-3 bg-red-50 text-red-900 rounded-lg border border-red-100">
                  <span className="font-medium text-sm">{c.name}</span>
                  <span className="font-bold">{c.val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View detailed report</button>
          </div>
        </div>
      </div>
    </div>
  );
}