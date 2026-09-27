import { FormEvent, useState } from 'react'
import { IconButton } from '@/shared/ui'
import {ArrowUp} from "lucide-react";

interface MessageComposerProps {
  onSend: (text: string) => void
}

export function MessageComposer({ onSend }: MessageComposerProps) {
  const [draft, setDraft] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    onSend(text)
    setDraft('')
  }

  const canSend = Boolean(draft.trim())

  return (
    <div className="shrink-0 px-4 py-3.5 backdrop-blur sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-[760px] items-end gap-2 rounded-[17px] border border-black/[0.08] bg-[#F8F9FB] p-1.5 pl-4 shadow-[0_2px_10px_rgba(25,30,45,0.035)] transition-all focus-within:border-accent/35 focus-within:bg-white focus-within:ring-2 focus-within:ring-accent/[0.08]"
      >
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Написать сообщение…"
          aria-label="Сообщение"
          className="min-h-9 flex-1 bg-transparent py-2 text-[14px] leading-5 text-ink outline-none placeholder:text-ink-faint"
        />

        <IconButton
          type="submit"
          disabled={!canSend}
          aria-label="Отправить сообщение"
          title="Отправить"
          className={`
          h-9 w-9 transition-all 
          
          ${
              canSend ? `bg-accent text-white hover:bg-[#6682ed] active:bg-[#3f5fd5]` : `bg-black/[0.045] text-ink-faint`
          }
          `}
        >
          <span className="-translate-x-[1px] -translate-y-[1px] text-[18px] leading-none">
           <ArrowUp size={20} />
          </span>
        </IconButton>
      </form>
    </div>
  )
}
