import { ChatListItem, type Chat } from '@/entities/chat'
import { IconButton } from '@/shared/ui'
import {LogOut, MessageCircleMore, Plus} from "lucide-react";

interface SidebarProps {
  chats: Chat[]
  activeChatId: string | null
  onSelectChat: (chatId: string) => void
  onNewChat: () => void
  onLogout: () => void
}

export function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onLogout,
}: SidebarProps) {
  const sortedChats = [...chats].sort((a, b) => b.updatedAt - a.updatedAt)

  return (
    <aside className="flex min-h-0 w-[320px] shrink-0 flex-col border-r border-black/[0.065] bg-sidebar">
      <header className="flex h-[72px] shrink-0 items-center justify-between px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="min-w-0">
            <h1 className="text-[18px] font-semibold leading-5 tracking-[-0.02em] text-ink">
              Чаты
            </h1>
          </div>
        </div>

          <div className="flex items-center gap-1">
              <IconButton
                  onClick={onNewChat}
                  title="Новый чат"
                  aria-label="Новый чат"
                  className="text-[24px] text-ink hover:bg-black/[0.05]"
              >
                  <Plus size={18}></Plus>
              </IconButton>

              <IconButton
                  onClick={onLogout}
                  title="Выйти"
                  aria-label="Выйти"
                  className="text-ink-muted hover:bg-danger/[0.08] hover:text-danger"
              >
                  <LogOut size={18} strokeWidth={2} />
              </IconButton>
          </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-4">
        {sortedChats.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center  justify-center rounded-full bg-black/[0.045] text-xl font-light text-ink-muted">
                <MessageCircleMore size={24} />
            </div>
            <p className="mt-4 text-[14px] font-semibold text-ink">
              Пока нет чатов
            </p>
            <p className="mt-1 text-[13px] leading-5 text-ink-muted">
              Начните новую переписку по номеру телефона.
            </p>
          </div>
        ) : (
          sortedChats.map((chat) => (
            <ChatListItem
              key={chat.chatId}
              chat={chat}
              active={chat.chatId === activeChatId}
              onSelect={() => onSelectChat(chat.chatId)}
            />
          ))
        )}
      </div>
    </aside>
  )
}
