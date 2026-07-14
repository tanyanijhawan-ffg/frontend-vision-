import { useState, useMemo } from 'react';
import { Download, FileText, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../../components/PageHeader';
import { districts, regions, students, centres } from '../../data/mockData';

const sel = 'px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm';

export default function DistrictReport() {
  const [filterRegion, setFilterRegion] = useState('');

  const filteredDistricts = useMemo(
    () => districts.filter(d => !filterRegion || d.region === regions.find(r => r.id === filterRegion)?.name),
    [filterRegion]
  );

  const districtRows = useMemo(() => filteredDistricts.map(d => {
    const distStudents = students.filter(s => s.district === d.name);
    const distCentres = centres.filter(c => c.district === d.name);
    const avgAtt = distStudents.length ? Math.round(distStudents.reduce((a, s) => a + s.attendancePercent, 0) / distStudents.length) : 0;
    const avgScore = distStudents.length ? Math.round(distStudents.reduce((a, s) => a + s.academicScore, 0) / distStudents.length) : 0;
    const highRisk = distStudents.filter(s => s.attendancePercent < 75 || s.academicScore < 60).length;
    return { ...d, realStudents: distStudents.length, realCentres: distCentres.length, avgAtt, avgScore, highRisk };
  }), [filteredDistricts]);

  const totalStudents = districtRows.reduce((a, d) => a + d.realStudents, 0);
  const avgAtt = districtRows.length ? Math.round(districtRows.reduce((a, d) => a + d.avgAtt, 0) / districtRows.length) : 0;
  const avgScore = districtRows.length ? Math.round(districtRows.reduce((a, d) => a + d.avgScore, 0) / districtRows.length) : 0;

  const chartData = districtRows.slice(0, 12).map(d => ({
    name: d.name.length > 10 ? d.name.slice(0, 10) + '…' : d.name,
    attendance: d.avgAtt,
    score: d.avgScore,
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/reports" className="hover:text-indigo-600">Reports Hub</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">District Report</span>
      </div>

      <PageHeader
        title="District Report"
        subtitle={`${districtRows.length} districts · ${totalStudents} students · Avg Attendance ${avgAtt}% · Avg Score ${avgScore}%`}
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

      {/* Filter */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex gap-3">
        <div className="relative">
          <select className={sel} value={filterRegion} onChange={e => setFilterRegion(e.target.value)}>
            <option value="">All Regions</option>
            {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
        {filterRegion && (
          <button onClick={() => setFilterRegion('')} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium px-2">Clear</button>
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Districts', value: districtRows.length, color: 'text-indigo-600' },
          { label: 'Total Students', value: totalStudents, color: 'text-emerald-600' },
          { label: 'Avg Attendance', value: `${avgAtt}%`, color: avgAtt >= 85 ? 'text-emerald-600' : 'text-amber-600' },
          { label: 'Avg Academic Score', value: `${avgScore}%`, color: avgScore >= 70 ? 'text-emerald-600' : 'text-amber-600' },
        ].map(k => (
          <div key={k.label} className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <p className="text-sm text-slate-500 mb-1">{k.label}</p>
            <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-base font-bold text-slate-900 mb-5">District-wise Attendance & Score</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} dy={8} angle={-25} textAnchor="end" interval={0} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: 13 }}
                  cursor={{ fill: '#F1F5F9' }} formatter={(v) => [`${v}%`]} />
                <Bar dataKey="attendance" name="Attendance %" fill="#10B981" radius={[3, 3, 0, 0]} maxBarSize={22} />
                <Bar dataKey="score" name="Avg Score %" fill="#4F46E5" radius={[3, 3, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['District','Region','Centres','Students','Avg Attendance','Avg Score','High Risk','Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {districtRows.map(d => (
                <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900">{d.name}</td>
                  <td className="px-4 py-3 text-slate-600">{d.region}</td>
                  <td className="px-4 py-3 text-slate-700">{d.realCentres || d.centres}</td>
                  <td className="px-4 py-3 text-slate-700 font-semibold">{d.realStudents || d.students}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${d.avgAtt >= 85 ? 'bg-emerald-500' : d.avgAtt >= 75 ? 'bg-amber-400' : 'bg-red-400'}`}
                          style={{ width: `${d.avgAtt}%` }} />
                      </div>
                      <span className="tabular-nums text-xs font-semibold">{d.avgAtt}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold tabular-nums ${d.avgScore >= 75 ? 'text-emerald-600' : d.avgScore >= 60 ? 'text-indigo-600' : 'text-amber-600'}`}>
                      {d.avgScore}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {d.highRisk > 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">{d.highRisk}</span>
                    ) : <span className="text-slate-400 text-xs">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500">
          Showing {districtRows.length} districts
        </div>
      </div>
    </div>
  );
}
