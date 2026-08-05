import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 font-sans text-slate-900">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
      >
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
          <Mail size={24} />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Forgot password?</h1>
        <p className="text-slate-500 text-sm mb-6">
          No worries, we'll send you reset instructions.
        </p>
        
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
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