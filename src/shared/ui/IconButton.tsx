import type { ButtonHTMLAttributes } from 'react'

export function IconButton({
  className = '',
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-muted transition-all duration-150 hover:bg-[#6682ed] hover:text-ink active:bg-[#3f5fd5] disabled:cursor-not-allowed disabled:opacity-45 ${className}`}
      {...props}
    />
  )
}
