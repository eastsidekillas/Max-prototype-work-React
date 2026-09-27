import type { ChatMessage } from '@/entities/message'
import type { Chat } from './types'

export function upsertChat(chats: Chat[], phone: string, title: string): Chat[] {
    const chatId = phone.includes('@') ? phone : `${phone}@c.us`
    if (chats.some((c) => c.chatId === chatId)) return chats
    const newChat: Chat = { chatId, phone, title, messages: [], updatedAt: Date.now() }
    return [newChat, ...chats]
}

export function appendMessage(
  chats: Chat[],
  chatId: string,
  title: string,
  message: ChatMessage
): Chat[] {
  const withChat = upsertChat(chats, chatId, title)
  return withChat.map((chat) =>
    chat.chatId === chatId
      ? { ...chat, messages: [...chat.messages, message], updatedAt: message.timestamp }
      : chat
  )
}

export function updateMessageStatus(
  chats: Chat[],
  chatId: string,
  messageId: string,
  status: ChatMessage['status']
): Chat[] {
  return chats.map((chat) =>
    chat.chatId === chatId
      ? {
          ...chat,
          messages: chat.messages.map((m) => (m.id === messageId ? { ...m, status } : m)),
        }
      : chat
  )
}
