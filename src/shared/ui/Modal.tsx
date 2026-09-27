import type { MouseEvent, ReactNode } from 'react'

interface ModalProps {
  onClose: () => void
  children: ReactNode
}

export function Modal({ onClose, children }: ModalProps) {
  function stopPropagation(event: MouseEvent) {
    event.stopPropagation()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#10131B]/35 p-4 backdrop-blur-[3px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-[400px] rounded-[18px] border border-black/[0.06] bg-white p-6 shadow-modal"
        onClick={stopPropagation}
      >
        {children}
      </div>
    </div>
  )
}
