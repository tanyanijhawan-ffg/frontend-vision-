import { useState } from 'react';
import { Search, Plus, Filter, Edit2, Trash2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import StatusChip from '../../components/StatusChip';
import ConfirmDialog from '../../components/ConfirmDialog';
import { districts, regions } from '../../data/mockData';

export default function DistrictsList() {
  const [data, setData] = useState(districts);
  const [filterRegion, setFilterRegion] = useState('All');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const filteredData = filterRegion === 'All' 
    ? data 
    : data.filter(d => d.region === filterRegion);

  const handleDelete = () => {
    if (selectedDistrict) {
      setData(data.filter(d => d.id !== selectedDistrict));
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Districts" 
        subtitle="Manage operating districts within each region."
        action={
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus size={16} />
            Add District
          </button>
        }
      />

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 min-w-[240px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search districts..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select 
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="py-2 pl-3 pr-8 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm cursor-pointer"
            >
              <option value="All">All Regions</option>
              {regions.map(r => (
                <option key={r.id} value={r.name}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">District Name</th>
                <th className="px-6 py-3">Region</th>
                <th className="px-6 py-3">Centres</th>
                <th className="px-6 py-3">Students</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((district) => (
                <tr key={district.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{district.name}</td>
                  <td className="px-6 py-4">{district.region}</td>
                  <td className="px-6 py-4">{district.centres}</td>
                  <td className="px-6 py-4">{district.students}</td>
                  <td className="px-6 py-4">
                    <StatusChip status={district.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => { setSelectedDistrict(district.id); setIsDeleteOpen(true); }}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredData.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No districts found matching the selected criteria.
          </div>
        )}
      </div>

      <ConfirmDialog 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete District"
        message="Are you sure you want to delete this district? This action cannot be undone."
      />
    </div>
  );
}