import type { ReactNode } from 'react'

export function ErrorText({ children }: { children: ReactNode }) {
  return <p className="text-[13px] leading-5 text-danger">{children}</p>
}
