import { useEffect, useRef } from 'react'
import { ChatAvatar, type Chat } from '@/entities/chat'
import { MessageBubble } from '@/entities/message'
import { MessageComposer } from '@/features/send-message'
import { IconButton, MaxLogo } from '@/shared/ui'

interface ChatWindowProps {
  chat: Chat | null
  connectionOk: boolean
  onSend: (text: string) => void
}

export function ChatWindow({ chat, connectionOk, onSend }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [chat?.messages.length, chat?.chatId])

  if (!chat) {
    return (
      <div className="max-shell flex h-full min-h-0 flex-col items-center justify-center px-6">
        <div className="flex max-w-[380px] flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white shadow-[0_8px_26px_rgba(25,31,45,0.08)]">
            <MaxLogo size={48} />
          </div>
          <h2 className="mt-5 text-[21px] font-semibold tracking-[-0.025em] text-ink">
            Начните переписку
          </h2>
          <p className="mt-2 text-[14px] leading-6 text-ink-muted">
            Выберите чат слева или создайте новый, чтобы отправить сообщение.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-chat">
      <header className="flex h-[72px] shrink-0 items-center gap-3 border-b border-black/[0.06] bg-white/90 px-5 backdrop-blur">
        <ChatAvatar title={chat.title} />

        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-semibold leading-5 text-ink">
            {chat.title}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[12px] text-ink-muted">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                connectionOk ? 'bg-accent-online' : 'bg-danger'
              }`}
            />
              {connectionOk ? 'В сети' : 'Не в сети'}
          </div>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8"
      >
        <div className="mx-auto flex w-full max-w-[760px] flex-col gap-1">
          {chat.messages.length === 0 && (
            <div className="my-auto flex min-h-[260px] flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink-muted shadow-[0_4px_16px_rgba(25,31,45,0.05)]">
                <span className="text-[18px]">✦</span>
              </div>
              <p className="mt-4 text-[14px] font-semibold text-ink">
                Пока нет сообщений
              </p>
              <p className="mt-1 text-[13px] text-ink-muted">
                Напишите первое сообщение ниже.
              </p>
            </div>
          )}

          {chat.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </div>

      <MessageComposer onSend={onSend} />
    </div>
  )
}
