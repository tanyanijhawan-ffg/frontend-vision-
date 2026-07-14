import { useState, useMemo } from 'react';
import { Download, FileText, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { students, regions, districts, centres } from '../../data/mockData';

const sel = 'px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm';

export default function StudentReport() {
  const [filterRegion, setFilterRegion] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterCentre, setFilterCentre] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredDistricts = useMemo(
    () => districts.filter(d => !filterRegion || d.region === regions.find(r => r.id === filterRegion)?.name),
    [filterRegion]
  );
  const filteredCentres = useMemo(
    () => centres.filter(c =>
      (!filterRegion || c.region === regions.find(r => r.id === filterRegion)?.name) &&
      (!filterDistrict || c.district === districts.find(d => d.id === filterDistrict)?.name)
    ),
    [filterRegion, filterDistrict]
  );
  const filtered = useMemo(
    () => students.filter(s =>
      (!filterRegion || s.region === regions.find(r => r.id === filterRegion)?.name) &&
      (!filterDistrict || s.district === districts.find(d => d.id === filterDistrict)?.name) &&
      (!filterCentre || s.centre === centres.find(c => c.id === filterCentre)?.name) &&
      (!filterClass || s.class === filterClass) &&
      (!filterStatus || s.status === filterStatus)
    ),
    [filterRegion, filterDistrict, filterCentre, filterClass, filterStatus]
  );

  const avgAtt = filtered.length ? Math.round(filtered.reduce((a, s) => a + s.attendancePercent, 0) / filtered.length) : 0;
  const avgAcad = filtered.length ? Math.round(filtered.reduce((a, s) => a + s.academicScore, 0) / filtered.length) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/reports" className="hover:text-indigo-600">Reports Hub</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Student Report</span>
      </div>

      <PageHeader
        title="Student Report"
        subtitle={`${filtered.length} students · Avg Attendance ${avgAtt}% · Avg Score ${avgAcad}%`}
        action={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
              <FileText size={15} /> Export PDF
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
              <Download size={15} /> Export Excel
            </button>
          </div>
        }
      />

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <select className={sel} value={filterRegion} onChange={e => { setFilterRegion(e.target.value); setFilterDistrict(''); setFilterCentre(''); }}>
              <option value="">All Regions</option>
              {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className={sel} value={filterDistrict} onChange={e => { setFilterDistrict(e.target.value); setFilterCentre(''); }} disabled={!filterRegion}>
              <option value="">All Districts</option>
              {filteredDistricts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className={sel} value={filterCentre} onChange={e => setFilterCentre(e.target.value)} disabled={!filterRegion}>
              <option value="">All Centres</option>
              {filteredCentres.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className={sel} value={filterClass} onChange={e => setFilterClass(e.target.value)}>
              <option value="">All Classes</option>
              {['3','4','5','6','7','8','9','10','11'].map(c => <option key={c} value={c}>Class {c}</option>)}
            </select>
          </div>
          <div className="relative">
            <select className={sel} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All Status</option>
              <option>Active</option>
              <option>Warning</option>
              <option>At Risk</option>
            </select>
          </div>
          {(filterRegion || filterDistrict || filterCentre || filterClass || filterStatus) && (
            <button onClick={() => { setFilterRegion(''); setFilterDistrict(''); setFilterCentre(''); setFilterClass(''); setFilterStatus(''); }}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium px-2">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['ID','Student','Class','Centre','District','Region','Attendance','Score','Vulnerabilities','Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 text-slate-400 font-mono text-xs">{s.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0">
                        {s.name.charAt(0)}
                      </span>
                      {s.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{s.class}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-[140px] truncate">{s.centre}</td>
                  <td className="px-4 py-3 text-slate-600">{s.district}</td>
                  <td className="px-4 py-3 text-slate-600">{s.region}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${s.attendancePercent >= 85 ? 'bg-emerald-500' : s.attendancePercent >= 75 ? 'bg-amber-400' : 'bg-red-400'}`}
                          style={{ width: `${s.attendancePercent}%` }} />
                      </div>
                      <span className="text-xs font-semibold tabular-nums">{s.attendancePercent}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold tabular-nums text-sm ${s.academicScore >= 80 ? 'text-emerald-600' : s.academicScore >= 65 ? 'text-indigo-600' : s.academicScore >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                      {s.academicScore}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap max-w-[160px]">
                      {s.vulnerabilities.slice(0, 2).map(v => (
                        <span key={v} className="px-1.5 py-0.5 bg-orange-50 text-orange-700 text-xs rounded border border-orange-100 whitespace-nowrap">
                          {v.length > 18 ? v.slice(0, 17) + '…' : v}
                        </span>
                      ))}
                      {s.vulnerabilities.length > 2 && (
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-xs rounded">+{s.vulnerabilities.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      s.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                      s.status === 'Warning' ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-700'
                    }`}>{s.status}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} className="px-4 py-10 text-center text-slate-400 text-sm">No students match the selected filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500">
          Showing {filtered.length} of {students.length} students
        </div>
      </div>
    </div>
  );
}
