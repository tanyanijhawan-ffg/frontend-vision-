export default function ProfileSettings() {
  return (
    <div className="p-6 md:p-8">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Profile Settings</h2>
      <div className="space-y-6 max-w-lg">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold border border-indigo-200">
            KM
          </div>
          <div>
            <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 transition-colors">
              Change Avatar
            </button>
            <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
          </div>
        </div>
        
        <div className="space-y-4 border-t border-slate-100 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">First Name</label>
              <input type="text" defaultValue="Kavitha" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Last Name</label>
              <input type="text" defaultValue="Mani" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Email Address</label>
            <input type="email" defaultValue="kavitha@visionsglobal.org" disabled className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-500 rounded-lg text-sm cursor-not-allowed" />
          </div>
        </div>
        
        <div className="pt-6 flex justify-end">
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}