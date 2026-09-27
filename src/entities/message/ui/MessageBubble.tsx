import { formatTime } from '@/shared/lib'
import type { ChatMessage } from '../model/types'

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isMine = message.fromMe
  const isError = message.status === 'error'

  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} py-0.5`}>
      <div
        className={`flex max-w-[80%] flex-col gap-1 px-3.5 py-2.5 text-[14px] leading-[1.45] shadow-[0_1px_2px_rgba(20,25,40,0.035)] sm:max-w-[520px] ${
          isMine
            ? `rounded-[17px] rounded-br-[6px] ${isError ? 'bg-danger/10 text-danger' : 'bg-accent text-white'}`
            : 'rounded-[17px] rounded-bl-[6px] border border-black/[0.035] bg-white text-ink'
        }`}
      >
        <span className="whitespace-pre-wrap break-words">
          {message.text}
        </span>

        <span
          className={`self-end text-[10.5px] font-medium ${
            isMine ? 'text-white/65' : 'text-ink-faint'
          }`}
        >
          {formatTime(message.timestamp)}
          {isMine && message.status === 'sending' && ' · отправка…'}
          {isMine && isError && ' · ошибка'}
        </span>
      </div>
    </div>
  )
}
