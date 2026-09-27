import { formatTime } from '@/shared/lib'
import type { Chat } from '../model/types'
import { ChatAvatar } from './ChatAvatar'

interface ChatListItemProps {
  chat: Chat
  active: boolean
  onSelect: () => void
}

export function ChatListItem({ chat, active, onSelect }: ChatListItemProps) {
  const lastMessage = chat.messages[chat.messages.length - 1]
  const preview = lastMessage
    ? `${lastMessage.fromMe ? 'Вы: ' : ''}${lastMessage.text}`
    : 'Нет сообщений'

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group mb-0.5 flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left transition-colors duration-150 ${
        active
          ? 'bg-[#EEF1F9]'
          : 'hover:bg-black/[0.035] active:bg-black/[0.055]'
      }`}
    >
      <ChatAvatar title={chat.title} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="min-w-0 flex-1 truncate text-[14.5px] font-semibold leading-5 text-ink">
            {chat.title}
          </span>
          {lastMessage && (
            <span className="shrink-0 text-[11px] font-medium leading-5 text-ink-faint">
              {formatTime(lastMessage.timestamp)}
            </span>
          )}
        </div>

        <div className="mt-0.5 truncate text-[12.5px] leading-5 text-ink-muted">
          {preview}
        </div>
      </div>
    </button>
  )
}
