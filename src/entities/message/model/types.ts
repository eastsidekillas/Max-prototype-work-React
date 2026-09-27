export type MessageStatus = 'sending' | 'sent' | 'error'

export interface ChatMessage {
  id: string
  chatId: string
  text: string
  fromMe: boolean
  timestamp: number
  status: MessageStatus
}
