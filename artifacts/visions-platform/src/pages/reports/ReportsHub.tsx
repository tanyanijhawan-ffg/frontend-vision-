import { FileText, Download, Users, Map, Building2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { Link } from 'react-router-dom';

const reports = [
  { id: 'students', name: 'Student Report', icon: Users, desc: 'Detailed data on demographics, attendance, and academics per student.', path: '/reports/students', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'centres', name: 'Centre Report', icon: Building2, desc: 'Aggregated centre performance, facilitator details, and risk flags.', path: '/reports/centres', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'districts', name: 'District Report', icon: Map, desc: 'District-wide metrics comparing multiple centres.', path: '/reports/districts', color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'regions', name: 'Regional Report', icon: FileText, desc: 'High-level regional overview for executive summary.', path: '/reports/regions', color: 'text-purple-600', bg: 'bg-purple-50' },
];

export default function ReportsHub() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader 
        title="Reports Hub" 
        subtitle="Generate and export data insights across the organization."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map(report => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col transition-shadow hover:shadow-md">
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-xl ${report.bg} ${report.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{report.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{report.desc}</p>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Export formats: PDF, Excel, CSV</span>
                <Link 
                  to={report.path}
                  className="px-4 py-2 bg-slate-50 hover:bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium transition-colors"
                >
                  View Report
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}