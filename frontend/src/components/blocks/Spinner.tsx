import { cn } from '@/lib/utils';

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn('h-12 w-12 animate-spin rounded-full border-4 border-foreground border-t-transparent', className)}
      ></div>
    </div>
  );
};
