import type { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mono?: boolean
}

export function Input({ mono = false, className = '', ...props }: InputProps) {
  return (
    <input
      className={`h-11 w-full rounded-[10px] border border-black/[0.09] bg-[#F8F9FB] px-3.5 text-[14px] text-ink outline-none transition-all duration-150 placeholder:text-ink-faint hover:border-black/[0.14] focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/[0.12] disabled:cursor-not-allowed disabled:opacity-50 ${mono ? 'font-mono' : ''} ${className}`}
      {...props}
    />
  )
}

interface FieldProps extends InputProps {
  label: ReactNode
}

export function Field({ label, ...inputProps }: FieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-ink-muted">{label}</span>
      <Input {...inputProps} />
    </label>
  )
}
