import { useState } from 'react';
import { Save } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { students, centres } from '../../data/mockData';

export default function AssessmentEntry() {
  const [selectedCentre, setSelectedCentre] = useState(centres[0].name);
  const [assessmentName, setAssessmentName] = useState('Term 1 Final');
  
  const filteredStudents = students.filter(s => s.centre === selectedCentre);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <PageHeader 
        title="Enter Assessment Scores" 
        subtitle="Record academic performance for individual students."
        action={
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Save size={16} />
            Save Scores
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
            <label className="block text-sm font-medium text-slate-700">Assessment Name</label>
            <input 
              type="text" 
              value={assessmentName}
              onChange={(e) => setAssessmentName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm"
              placeholder="e.g. Mid-Term 1"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 min-w-[900px]">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 w-1/4">Student</th>
                <th className="px-4 py-3 text-center">Tamil</th>
                <th className="px-4 py-3 text-center">English</th>
                <th className="px-4 py-3 text-center">Math</th>
                <th className="px-4 py-3 text-center">Science</th>
                <th className="px-4 py-3 text-center">Social</th>
                <th className="px-6 py-3 text-right">Total %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => {
                const baseScore = Math.floor(student.academicScore * 0.9);
                return (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{student.name}</div>
                      <div className="text-xs text-slate-500">{student.id}</div>
                    </td>
                    {[baseScore, baseScore+5, baseScore-2, baseScore+8, baseScore+1].map((s, i) => (
                      <td key={i} className="px-4 py-3">
                        <input 
                          type="number" 
                          defaultValue={Math.min(100, Math.max(0, s))}
                          min="0" max="100"
                          className="w-16 mx-auto block px-2 py-1 text-center bg-white border border-slate-300 rounded text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                        />
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right font-bold text-indigo-600">
                      {student.academicScore}%
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