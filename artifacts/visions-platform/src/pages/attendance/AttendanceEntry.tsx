import { useState } from 'react';
import { Search, Save } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { students, centres } from '../../data/mockData';

export default function AttendanceEntry() {
  const [selectedCentre, setSelectedCentre] = useState(centres[0].name);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Filter students by selected centre
  const filteredStudents = students.filter(s => s.centre === selectedCentre);
  
  // Local state for attendance marking
  const [attendance, setAttendance] = useState<Record<string, { status: string, remark: string }>>(
    Object.fromEntries(filteredStudents.map(s => [s.id, { status: 'Present', remark: '' }]))
  );

  const handleStatusChange = (id: string, status: string) => {
    setAttendance(prev => ({ ...prev, [id]: { ...prev[id], status } }));
  };

  const handleRemarkChange = (id: string, remark: string) => {
    setAttendance(prev => ({ ...prev, [id]: { ...prev[id], remark } }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PageHeader 
        title="Mark Attendance" 
        subtitle="Record daily student attendance for a centre."
        action={
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Save size={16} />
            Save Attendance
          </button>
        }
      />

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Select Centre</label>
            <select 
              value={selectedCentre}
              onChange={(e) => setSelectedCentre(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm cursor-pointer"
            >
              {centres.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Date</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search students..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-900">{filteredStudents.length}</span> students
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 min-w-[800px]">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 w-1/3">Student</th>
                <th className="px-6 py-3 w-1/3">Status</th>
                <th className="px-6 py-3 w-1/3">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => {
                const att = attendance[student.id] || { status: 'Present', remark: '' };
                return (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{student.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{student.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {['Present', 'Absent', 'Late'].map(status => (
                          <label key={status} className="flex items-center gap-1.5 cursor-pointer">
                            <input 
                              type="radio" 
                              name={`status-${student.id}`} 
                              value={status}
                              checked={att.status === status}
                              onChange={() => handleStatusChange(student.id, status)}
                              className={`w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 ${
                                status === 'Absent' ? 'text-red-600 focus:ring-red-500' :
                                status === 'Late' ? 'text-amber-500 focus:ring-amber-500' : ''
                              }`}
                            />
                            <span className="text-sm">{status}</span>
                          </label>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        type="text" 
                        placeholder={att.status === 'Absent' ? "Reason for absence..." : "Optional remarks"}
                        value={att.remark}
                        onChange={(e) => handleRemarkChange(student.id, e.target.value)}
                        className={`w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors ${
                          att.status === 'Absent' && !att.remark ? 'border-red-300 bg-red-50/50' : ''
                        }`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}