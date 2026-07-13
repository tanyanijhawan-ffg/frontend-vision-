import { Download, FileText } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { students } from '../../data/mockData';

export default function StudentReport() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader 
        title="Student Report" 
        subtitle="Comprehensive student data export."
        action={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
              <FileText size={16} />
              Export PDF
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
              <Download size={16} />
              Export Excel
            </button>
          </div>
        }
      />
      
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
           <span className="text-sm font-medium text-slate-700">Preview (Top 10 rows)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Centre</th>
                <th className="px-6 py-3">Region</th>
                <th className="px-6 py-3">Attendance %</th>
                <th className="px-6 py-3">Academic %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.slice(0, 10).map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">{s.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{s.name}</td>
                  <td className="px-6 py-4">{s.centre}</td>
                  <td className="px-6 py-4">{s.region}</td>
                  <td className="px-6 py-4">{s.attendancePercent}%</td>
                  <td className="px-6 py-4">{s.academicScore}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}