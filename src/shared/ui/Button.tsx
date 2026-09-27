import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-accent text-white shadow-[0_4px_10px_rgba(79,111,232,0.16)] hover:bg-accent-hover active:scale-[0.985] disabled:opacity-50',
  secondary:
    'border border-black/[0.08] bg-black/[0.025] text-ink hover:bg-black/[0.05] active:bg-black/[0.07] disabled:opacity-50',
  ghost:
    'text-accent hover:bg-accent/[0.08] active:bg-accent/[0.12]',
}

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-10 items-center justify-center rounded-[10px] px-4 text-[14px] font-semibold transition-all duration-150 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
