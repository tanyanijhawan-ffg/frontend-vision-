import clsx from 'clsx';

interface StatusChipProps {
  status: string;
}

export default function StatusChip({ status }: StatusChipProps) {
  const getStyles = () => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'present':
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'warning':
      case 'late':
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'inactive':
      case 'absent':
      case 'at risk':
      case 'high risk':
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <span className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", getStyles())}>
      {status}
    </span>
  );
}