'use client';

export type DataFieldProps = {
  label: string;
  value: string;
};

export function DataField({ label, value }: DataFieldProps) {
  return (
    <div className="flex items-start gap-2 border-b border-gray-200 py-2">
      <div className="font-bold uppercase w-1/2">{label}:</div>
      <div className="w-1/2">{value}</div>
    </div>
  );
}
