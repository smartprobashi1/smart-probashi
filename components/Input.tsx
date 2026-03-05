import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface BaseFieldProps {
  label?: string;
  helperText?: string;
  error?: string;
}

type InputProps = BaseFieldProps & InputHTMLAttributes<HTMLInputElement>;
type TextAreaProps = BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helperText, error, className = '', ...props },
  ref,
) {
  return (
    <div className="flex flex-col gap-1">
      {label ? <label className="text-[11px] text-muted">{label}</label> : null}
      <input
        ref={ref}
        className={`border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-white dark:bg-slate-900 ${className}`}
        {...props}
      />
      {helperText && !error ? (
        <p className="text-[10px] text-muted/80">{helperText}</p>
      ) : null}
      {error ? <p className="text-[10px] text-red-500">{error}</p> : null}
    </div>
  );
});

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, helperText, error, className = '', ...props },
  ref,
) {
  return (
    <div className="flex flex-col gap-1">
      {label ? <label className="text-[11px] text-muted">{label}</label> : null}
      <textarea
        ref={ref}
        className={`border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-white dark:bg-slate-900 min-h-[70px] ${className}`}
        {...props}
      />
      {helperText && !error ? (
        <p className="text-[10px] text-muted/80">{helperText}</p>
      ) : null}
      {error ? <p className="text-[10px] text-red-500">{error}</p> : null}
    </div>
  );
});

