import { useState } from 'react';
import { Search, Plus, Filter, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import StatusChip from '../../components/StatusChip';
import { students, regions, centres } from '../../data/mockData';

export default function StudentsList() {
  const [data] = useState(students);
  const [filterRegion, setFilterRegion] = useState('All');
  const [filterCentre, setFilterCentre] = useState('All');
  const navigate = useNavigate();

  const filteredData = data.filter(s => 
    (filterRegion === 'All' || s.region === filterRegion) &&
    (filterCentre === 'All' || s.centre === filterCentre)
  );

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Students" 
        subtitle="Manage student profiles, academic records, and attendance."
        action={
          <Link 
            to="/students/new"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus size={16} />
            Register Student
          </Link>
        }
      />

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 min-w-[240px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, ID..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400" />
              <select 
                value={filterRegion}
                onChange={(e) => { setFilterRegion(e.target.value); setFilterCentre('All'); }}
                className="py-2 pl-3 pr-8 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm cursor-pointer"
              >
                <option value="All">All Regions</option>
                {regions.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
              </select>
            </div>
            
            <select 
              value={filterCentre}
              onChange={(e) => setFilterCentre(e.target.value)}
              className="py-2 pl-3 pr-8 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm cursor-pointer"
              disabled={filterRegion === 'All'}
            >
              <option value="All">All Centres</option>
              {centres.filter(c => filterRegion === 'All' || c.region === filterRegion).map(c => 
                <option key={c.id} value={c.name}>{c.name}</option>
              )}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Demographics</th>
                <th className="px-6 py-3">Centre & Class</th>
                <th className="px-6 py-3">Attendance</th>
                <th className="px-6 py-3">Avg Score</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((student) => {
                const isRisk = student.status === 'Warning' || student.attendancePercent < 75;
                return (
                  <tr 
                    key={student.id} 
                    onClick={() => navigate(`/students/${student.id}`)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm border border-slate-200 shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {student.name}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">{student.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900">{student.gender}, {student.age} yrs</div>
                      {student.vulnerabilities.length > 0 && (
                        <div className="text-[10px] text-amber-600 font-medium mt-1 max-w-[150px] truncate" title={student.vulnerabilities.join(', ')}>
                          {student.vulnerabilities[0]} {student.vulnerabilities.length > 1 && `+${student.vulnerabilities.length - 1}`}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900">{student.centre}</div>
                      <div className="text-xs text-slate-500 mt-0.5">Class {student.class}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${student.attendancePercent >= 90 ? 'bg-emerald-500' : student.attendancePercent >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} 
                            style={{ width: `${student.attendancePercent}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-medium ${student.attendancePercent < 75 ? 'text-red-600' : ''}`}>
                          {student.attendancePercent}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        student.academicScore >= 80 ? 'bg-emerald-50 text-emerald-700' :
                        student.academicScore >= 60 ? 'bg-indigo-50 text-indigo-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {student.academicScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusChip status={isRisk ? 'At Risk' : 'Active'} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors inline-block" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredData.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-slate-400 mb-2">No students found matching filters.</div>
          </div>
        )}
      </div>
    </div>
  );
}