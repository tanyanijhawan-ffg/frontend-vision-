import { Download, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import PageHeader from '../../components/PageHeader';
import { regions, students, centres, districts } from '../../data/mockData';

export default function RegionReport() {
  const regionRows = regions.map(r => {
    const regStudents = students.filter(s => s.region === r.name);
    const regCentres = centres.filter(c => c.region === r.name);
    const regDistricts = districts.filter(d => d.region === r.name);
    const avgAtt = regStudents.length ? Math.round(regStudents.reduce((a, s) => a + s.attendancePercent, 0) / regStudents.length) : 0;
    const avgScore = regStudents.length ? Math.round(regStudents.reduce((a, s) => a + s.academicScore, 0) / regStudents.length) : 0;
    const highRisk = regStudents.filter(s => s.attendancePercent < 75 || s.academicScore < 60).length;
    const topPerformers = regStudents.filter(s => s.academicScore >= 80).length;
    return { ...r, realStudents: regStudents.length, realCentres: regCentres.length, realDistricts: regDistricts.length, avgAtt, avgScore, highRisk, topPerformers };
  });

  const totalStudents = regionRows.reduce((a, r) => a + r.realStudents, 0);
  const overallAtt = regionRows.length ? Math.round(regionRows.reduce((a, r) => a + r.avgAtt, 0) / regionRows.length) : 0;
  const overallScore = regionRows.length ? Math.round(regionRows.reduce((a, r) => a + r.avgScore, 0) / regionRows.length) : 0;

  const barData = regionRows.map(r => ({
    name: r.name.replace('Tamil Nadu ', 'TN '),
    attendance: r.avgAtt,
    score: r.avgScore,
    students: r.realStudents,
  }));

  const radarData = [
    { metric: 'Attendance', ...Object.fromEntries(regionRows.map(r => [r.name.replace('Tamil Nadu ', 'TN '), r.avgAtt])) },
    { metric: 'Acad Score', ...Object.fromEntries(regionRows.map(r => [r.name.replace('Tamil Nadu ', 'TN '), r.avgScore])) },
    { metric: 'Coverage', ...Object.fromEntries(regionRows.map(r => [r.name.replace('Tamil Nadu ', 'TN '), Math.min(100, Math.round(r.realStudents / 12))])) },
    { metric: 'Top Perf%', ...Object.fromEntries(regionRows.map(r => [r.name.replace('Tamil Nadu ', 'TN '), r.realStudents ? Math.round(r.topPerformers / r.realStudents * 100) : 0])) },
    { metric: 'Low Risk%', ...Object.fromEntries(regionRows.map(r => [r.name.replace('Tamil Nadu ', 'TN '), r.realStudents ? Math.round((1 - r.highRisk / r.realStudents) * 100) : 0])) },
  ];

  const REGION_COLORS: Record<string, string> = {
    'TN South': '#4F46E5', 'TN North': '#10B981', 'Karnataka': '#F59E0B',
    'Andhra Pradesh': '#EF4444', 'Kerala': '#8B5CF6',
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/reports" className="hover:text-indigo-600">Reports Hub</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Regional Report</span>
      </div>

      <PageHeader
        title="Regional Report"
        subtitle={`${regionRows.length} regions · ${totalStudents} students · Avg Attendance ${overallAtt}% · Avg Score ${overallScore}%`}
        action={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
              <FileText size={15} /> PDF
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
              <Download size={15} /> Excel
            </button>
          </div>
        }
      />

      {/* Region Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {regionRows.map(r => (
          <div key={r.id} className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <p className="text-xs font-semibold text-slate-500 mb-2 truncate">{r.name}</p>
            <p className="text-2xl font-bold text-slate-900 mb-3">{r.realStudents}</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Attendance</span>
                <span className={`font-semibold ${r.avgAtt >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>{r.avgAtt}%</span>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${r.avgAtt >= 85 ? 'bg-emerald-500' : 'bg-amber-400'}`} style={{ width: `${r.avgAtt}%` }} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Avg Score</span>
                <span className={`font-semibold ${r.avgScore >= 70 ? 'text-indigo-600' : 'text-amber-600'}`}>{r.avgScore}%</span>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-indigo-500" style={{ width: `${r.avgScore}%` }} />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-400">
              <span>{r.realDistricts} districts</span>
              <span>{r.realCentres} centres</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-base font-bold text-slate-900 mb-5">Region Comparison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: 13 }}
                  cursor={{ fill: '#F1F5F9' }} formatter={(v) => [`${v}%`]} />
                <Bar dataKey="attendance" name="Attendance %" fill="#10B981" radius={[3, 3, 0, 0]} maxBarSize={26} />
                <Bar dataKey="score" name="Avg Score %" fill="#4F46E5" radius={[3, 3, 0, 0]} maxBarSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-base font-bold text-slate-900 mb-5">Multi-metric Radar</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 10 }} />
                {regionRows.map(r => {
                  const key = r.name.replace('Tamil Nadu ', 'TN ');
                  return (
                    <Radar key={r.id} name={key} dataKey={key}
                      stroke={REGION_COLORS[key] || '#4F46E5'}
                      fill={REGION_COLORS[key] || '#4F46E5'}
                      fillOpacity={0.1} strokeWidth={2} />
                  );
                })}
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Region','State','Districts','Centres','Students','Avg Attendance','Avg Score','Top Performers','High Risk'].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {regionRows.map(r => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900">{r.name}</td>
                  <td className="px-4 py-3 text-slate-600">{r.state}</td>
                  <td className="px-4 py-3 text-slate-700">{r.realDistricts}</td>
                  <td className="px-4 py-3 text-slate-700">{r.realCentres}</td>
                  <td className="px-4 py-3 text-slate-700 font-semibold">{r.realStudents}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${r.avgAtt >= 85 ? 'bg-emerald-500' : r.avgAtt >= 75 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${r.avgAtt}%` }} />
                      </div>
                      <span className="tabular-nums text-xs font-semibold">{r.avgAtt}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold tabular-nums ${r.avgScore >= 75 ? 'text-emerald-600' : 'text-amber-600'}`}>{r.avgScore}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-emerald-700 font-semibold">{r.topPerformers}</span>
                    <span className="text-slate-400 text-xs ml-1">
                      ({r.realStudents ? Math.round(r.topPerformers / r.realStudents * 100) : 0}%)
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {r.highRisk > 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">{r.highRisk}</span>
                    ) : <span className="text-slate-400 text-xs">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
