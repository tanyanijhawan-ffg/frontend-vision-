import { Users, Building2, Map, CalendarCheck, Trophy, AlertTriangle, UserPlus, Activity } from 'lucide-react';
import StatCard from '../components/StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
import { activities } from '../data/mockData';

const studentGrowth = [
  { month: 'Jan', students: 950 },
  { month: 'Feb', students: 1020 },
  { month: 'Mar', students: 1105 },
  { month: 'Apr', students: 1180 },
  { month: 'May', students: 1247 },
];

const attendanceTrend = [
  { week: 'W1', percent: 88 },
  { week: 'W2', percent: 86 },
  { week: 'W3', percent: 89 },
  { week: 'W4', percent: 85 },
  { week: 'W5', percent: 87 },
  { week: 'W6', percent: 84 },
  { week: 'W7', percent: 88 },
  { week: 'W8', percent: 84 }, // current
];

const academicsBySubj = [
  { name: 'Tamil', score: 78 },
  { name: 'English', score: 65 },
  { name: 'Math', score: 72 },
  { name: 'Science', score: 75 },
  { name: 'Social', score: 81 },
];

const studentsByRegion = [
  { name: 'TN South', students: 850 },
  { name: 'TN North', students: 620 },
  { name: 'AP', students: 540 },
  { name: 'Karnataka', students: 480 },
  { name: 'Kerala', students: 380 },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, Kavitha. Here is what's happening across all regions.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value="1,247" icon={Users} trend="+43 this month" trendUp={true} />
        <StatCard title="Active Centres" value="34" icon={Building2} />
        <StatCard title="Regions & Districts" value="5 / 18" icon={Map} />
        <StatCard title="Attendance Today" value="84%" icon={CalendarCheck} trend="-2% from avg" trendUp={false} />
        <StatCard title="Avg Academic Score" value="72%" icon={Trophy} trend="+3% from T1" trendUp={true} />
        <StatCard title="High Risk Students" value="87" icon={AlertTriangle} trend="Needs review" trendUp={false} />
        <StatCard title="New Registrations" value="43" icon={UserPlus} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        
        {/* Student Growth */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-base font-bold text-slate-900 mb-6">Student Growth Trend</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={studentGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="students" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Trend */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-base font-bold text-slate-900 mb-6">Attendance Trend (8 Weeks)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} domain={[70, 100]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="percent" stroke="#10B981" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Academic Performance */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-base font-bold text-slate-900 mb-6">Academic Performance by Subject</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={academicsBySubj} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} domain={[0, 100]} />
                <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="score" fill="#F59E0B" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Students by Region */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-base font-bold text-slate-900 mb-6">Students by Region</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentsByRegion} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12, fontWeight: 500}} />
                <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="students" fill="#6366F1" radius={[0, 4, 4, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
      </div>

      {/* Recent Activities */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Recent Activities</h3>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
        </div>
        <div className="divide-y divide-slate-100">
          {activities.map(act => (
            <div key={act.id} className="p-4 px-6 hover:bg-slate-50 transition-colors flex items-start gap-4">
              <div className={`p-2 rounded-full shrink-0 ${
                act.icon === 'attendance' ? 'bg-emerald-100 text-emerald-600' :
                act.icon === 'student' ? 'bg-indigo-100 text-indigo-600' :
                act.icon === 'assessment' ? 'bg-amber-100 text-amber-600' :
                act.icon === 'alert' ? 'bg-red-100 text-red-600' :
                'bg-slate-100 text-slate-600'
              }`}>
                <Activity size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{act.text}</p>
                <p className="text-xs text-slate-500 mt-1">{act.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}