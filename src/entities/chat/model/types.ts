import type { ChatMessage } from '@/entities/message'

export interface Chat {
  chatId: string
  phone: string
  title: string
  messages: ChatMessage[]
  updatedAt: number
}
