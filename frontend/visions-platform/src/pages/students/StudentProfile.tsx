import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, BookOpen, FileText } from 'lucide-react';
import StatusChip from '../../components/StatusChip';
import { students } from '../../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const attendanceData = [
  { month: 'Jan', percent: 95 },
  { month: 'Feb', percent: 92 },
  { month: 'Mar', percent: 88 },
  { month: 'Apr', percent: 96 },
  { month: 'May', percent: 90 },
];

const academicData = [
  { subject: 'Tamil', score: 85 },
  { subject: 'English', score: 72 },
  { subject: 'Math', score: 90 },
  { subject: 'Science', score: 88 },
  { subject: 'Social', score: 82 },
];

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = students.find(s => s.id === id) || students[0];
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'attendance', name: 'Attendance', icon: Calendar },
    { id: 'academics', name: 'Academics', icon: BookOpen },
    { id: 'notes', name: 'Notes', icon: FileText },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-6 flex items-center gap-4">
        <button 
          onClick={() => navigate('/students')}
          className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors text-slate-500"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-slate-500">Back to Students</span>
      </div>

      {/* Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
        <div className="h-24 w-24 rounded-full bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600 shrink-0">
          {student.name.charAt(0)}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{student.name}</h1>
              <p className="text-sm text-slate-500 mt-1">{student.id} &bull; {student.centre}</p>
            </div>
            <div>
              <StatusChip status={student.status} />
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
            {student.vulnerabilities.map(v => (
              <span key={v} className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-xs font-medium">
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="flex border-b border-slate-200 overflow-x-auto custom-scrollbar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                  isActive 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon size={16} />
                {tab.name}
              </button>
            );
          })}
        </div>

        <div className="p-6 md:p-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-4">Demographics</h3>
                <dl className="space-y-3 text-sm">
                  <div className="grid grid-cols-3"><dt className="text-slate-500">Gender</dt><dd className="col-span-2 font-medium text-slate-900">{student.gender}</dd></div>
                  <div className="grid grid-cols-3"><dt className="text-slate-500">Age</dt><dd className="col-span-2 font-medium text-slate-900">{student.age} years</dd></div>
                  <div className="grid grid-cols-3"><dt className="text-slate-500">Class</dt><dd className="col-span-2 font-medium text-slate-900">{student.class}</dd></div>
                  <div className="grid grid-cols-3"><dt className="text-slate-500">Registered</dt><dd className="col-span-2 font-medium text-slate-900">{student.date}</dd></div>
                </dl>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-4">Location</h3>
                <dl className="space-y-3 text-sm">
                  <div className="grid grid-cols-3"><dt className="text-slate-500">Region</dt><dd className="col-span-2 font-medium text-slate-900">{student.region}</dd></div>
                  <div className="grid grid-cols-3"><dt className="text-slate-500">District</dt><dd className="col-span-2 font-medium text-slate-900">{student.district}</dd></div>
                  <div className="grid grid-cols-3"><dt className="text-slate-500">Centre</dt><dd className="col-span-2 font-medium text-slate-900">{student.centre}</dd></div>
                </dl>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Attendance History</h3>
                  <p className="text-sm text-slate-500">Current average: <span className="font-bold text-indigo-600">{student.attendancePercent}%</span></p>
                </div>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attendanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPercent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} dx={-10} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#4F46E5', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="percent" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorPercent)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'academics' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Latest Assessment</h3>
                  <p className="text-sm text-slate-500">Overall Score: <span className="font-bold text-indigo-600">{student.academicScore}%</span></p>
                </div>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={academicData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} dx={-10} domain={[0, 100]} />
                    <Tooltip 
                      cursor={{fill: '#F1F5F9'}}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="score" fill="#4F46E5" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <FileText size={24} />
              </div>
              <h3 className="text-slate-900 font-medium mb-1">No notes yet</h3>
              <p className="text-slate-500 text-sm mb-4">Add qualitative observations about the student.</p>
              <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 transition-colors">
                Add Note
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}