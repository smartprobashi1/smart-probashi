import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const baseClasses =
  'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary/90 shadow-soft-card',
  secondary: 'bg-white text-primary border border-slate-200 hover:bg-slate-50',
  ghost: 'bg-transparent text-primary hover:bg-primarySoft/40',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

export function Button({
  children,
  className = '',
  variant = 'primary',
  fullWidth,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${widthClass} px-4 py-2.5 ${className}`}
      {...props}
    >
      {leftIcon ? <span className="mr-2 text-base">{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span className="ml-2 text-base">{rightIcon}</span> : null}
    </button>
  );
}

