import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Simple strength check
  const strength = Math.min(password.length * 10, 100);
  let strengthColor = 'bg-slate-200';
  if (strength > 0) strengthColor = 'bg-red-500';
  if (strength > 40) strengthColor = 'bg-amber-500';
  if (strength > 80) strengthColor = 'bg-emerald-500';

  if (submitted) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 font-sans text-slate-900">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center"
        >
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Password reset</h1>
          <p className="text-slate-500 text-sm mb-8">
            Your password has been successfully reset. Click below to log in magically.
          </p>
          <Link to="/login" className="block w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors">
            Continue to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 font-sans text-slate-900">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
      >
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
          <Lock size={24} />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Set new password</h1>
        <p className="text-slate-500 text-sm mb-6">
          Must be at least 8 characters.
        </p>
        
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
              required
            />
            {/* Strength Bar */}
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden flex">
              <div 
                className={`h-full transition-all duration-300 ${strengthColor}`} 
                style={{ width: `${strength}%` }}
              ></div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 outline-none"
          >
            Reset password
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}