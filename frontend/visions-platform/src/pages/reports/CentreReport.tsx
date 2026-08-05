import { useState, useMemo } from 'react';
import { Download, FileText, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../../components/PageHeader';
import { centres, regions, districts } from '../../data/mockData';

const sel = 'px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm';

export default function CentreReport() {
  const [filterRegion, setFilterRegion] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterType, setFilterType] = useState('');

  const filteredDistricts = useMemo(
    () => districts.filter(d => !filterRegion || d.region === regions.find(r => r.id === filterRegion)?.name),
    [filterRegion]
  );
  const filtered = useMemo(
    () => centres.filter(c =>
      (!filterRegion || c.region === regions.find(r => r.id === filterRegion)?.name) &&
      (!filterDistrict || c.district === districts.find(d => d.id === filterDistrict)?.name) &&
      (!filterType || c.type === filterType)
    ),
    [filterRegion, filterDistrict, filterType]
  );

  const avgAtt = filtered.length ? Math.round(filtered.reduce((a, c) => a + c.attendance, 0) / filtered.length) : 0;
  const avgScore = filtered.length ? Math.round(filtered.reduce((a, c) => a + c.avgScore, 0) / filtered.length) : 0;
  const totalStudents = filtered.reduce((a, c) => a + c.students, 0);
  const totalHighRisk = filtered.reduce((a, c) => a + c.highRisk, 0);

  const chartData = filtered.slice(0, 10).map(c => ({
    name: c.name.replace(' Centre', '').replace(' Hub', ''),
    attendance: c.attendance,
    score: c.avgScore,
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/reports" className="hover:text-indigo-600">Reports Hub</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Centre Report</span>
      </div>

      <PageHeader
        title="Centre Report"
        subtitle={`${filtered.length} centres · ${totalStudents} students · Avg Attendance ${avgAtt}% · Avg Score ${avgScore}%`}
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

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-wrap gap-3">
        <div className="relative">
          <select className={sel} value={filterRegion} onChange={e => { setFilterRegion(e.target.value); setFilterDistrict(''); }}>
            <option value="">All Regions</option>
            {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select className={sel} value={filterDistrict} onChange={e => setFilterDistrict(e.target.value)} disabled={!filterRegion}>
            <option value="">All Districts</option>
            {filteredDistricts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select className={sel} value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="">All Types</option>
            <option>Urban</option>
            <option>Semi-Urban</option>
            <option>Rural</option>
          </select>
        </div>
        {(filterRegion || filterDistrict || filterType) && (
          <button onClick={() => { setFilterRegion(''); setFilterDistrict(''); setFilterType(''); }}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium px-2">Clear</button>
        )}
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Centres', value: filtered.length, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Total Students', value: totalStudents, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg Attendance', value: `${avgAtt}%`, color: avgAtt >= 85 ? 'text-emerald-600' : 'text-amber-600', bg: avgAtt >= 85 ? 'bg-emerald-50' : 'bg-amber-50' },
          { label: 'High Risk Students', value: totalHighRisk, color: 'text-red-600', bg: 'bg-red-50' },
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
          <h3 className="text-base font-bold text-slate-900 mb-5">Attendance vs Score by Centre</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} dy={8} angle={-30} textAnchor="end" interval={0} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: 13 }}
                  cursor={{ fill: '#F1F5F9' }} formatter={(v) => [`${v}%`]} />
                <Bar dataKey="attendance" name="Attendance %" fill="#10B981" radius={[3, 3, 0, 0]} maxBarSize={24} />
                <Bar dataKey="score" name="Avg Score %" fill="#4F46E5" radius={[3, 3, 0, 0]} maxBarSize={24} />
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
                {['Centre Name','Type','Region','District','Facilitator','Students','Attendance','Avg Score','High Risk','Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      c.type === 'Urban' ? 'bg-blue-50 text-blue-700' :
                      c.type === 'Semi-Urban' ? 'bg-purple-50 text-purple-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>{c.type}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{c.region}</td>
                  <td className="px-4 py-3 text-slate-600">{c.district}</td>
                  <td className="px-4 py-3 text-slate-600">{c.facilitator}</td>
                  <td className="px-4 py-3 text-slate-700 font-semibold">{c.students}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${c.attendance >= 85 ? 'bg-emerald-500' : c.attendance >= 75 ? 'bg-amber-400' : 'bg-red-400'}`}
                          style={{ width: `${c.attendance}%` }} />
                      </div>
                      <span className="tabular-nums text-xs font-semibold">{c.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold tabular-nums ${c.avgScore >= 75 ? 'text-emerald-600' : c.avgScore >= 60 ? 'text-indigo-600' : 'text-amber-600'}`}>
                      {c.avgScore}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {c.highRisk > 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">{c.highRisk} students</span>
                    ) : (
                      <span className="text-slate-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500">
          Showing {filtered.length} centres
        </div>
      </div>
    </div>
  );
}
