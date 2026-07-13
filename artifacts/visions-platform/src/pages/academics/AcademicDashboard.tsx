import { BookOpen, Trophy, TrendingUp, AlertTriangle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const subjectScores = [
  { name: 'Tamil', score: 78 },
  { name: 'English', score: 65 },
  { name: 'Math', score: 72 },
  { name: 'Science', score: 75 },
  { name: 'Social', score: 81 },
];

const trendData = [
  { term: 'Term 1', 'Grade 5': 68, 'Grade 6': 72, 'Grade 7': 65 },
  { term: 'Term 2', 'Grade 5': 72, 'Grade 6': 75, 'Grade 7': 68 },
  { term: 'Term 3', 'Grade 5': 76, 'Grade 6': 80, 'Grade 7': 74 },
];

export default function AcademicDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader 
        title="Academic Dashboard" 
        subtitle="Overview of academic performance and assessment results."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Avg Score" value="74.2%" icon={Trophy} trend="+3.4% from T1" trendUp={true} />
        <StatCard title="Assessments Done" value="4" icon={BookOpen} />
        <StatCard title="Improving Students" value="68%" icon={TrendingUp} trendUp={true} />
        <StatCard title="Needs Intervention" value="12%" icon={AlertTriangle} trendUp={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Subject Averages</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectScores} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} domain={[0, 100]} />
                <Tooltip 
                  cursor={{fill: '#F1F5F9'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="score" fill="#4F46E5" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Class Performance Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="term" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} domain={[50, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="Grade 5" stroke="#4F46E5" strokeWidth={3} dot={{r:4}} />
                <Line type="monotone" dataKey="Grade 6" stroke="#10B981" strokeWidth={3} dot={{r:4}} />
                <Line type="monotone" dataKey="Grade 7" stroke="#F59E0B" strokeWidth={3} dot={{r:4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}