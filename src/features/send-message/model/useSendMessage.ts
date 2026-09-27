import { Dispatch, SetStateAction, useCallback } from 'react'
import { GreenApiError, sendTextMessage } from '@/shared/api/green-api'
import { generateLocalId } from '@/shared/lib'
import { appendMessage, updateMessageStatus, type Chat } from '@/entities/chat'
import type { Credentials } from '@/entities/instance'

export function useSendMessage(
  creds: Credentials | null,
  setChats: Dispatch<SetStateAction<Chat[]>>,
  onConnectionChange?: (ok: boolean) => void
) {
  const send = useCallback(
    async (chatId: string, text: string) => {
      if (!creds) return
      const localId = generateLocalId()
      const now = Date.now()

      setChats((prev) =>
        appendMessage(prev, chatId, chatId, {
          id: localId,
          chatId,
          text,
          fromMe: true,
          timestamp: now,
          status: 'sending',
        })
      )

      try {
        await sendTextMessage(creds, chatId, text)
        onConnectionChange?.(true)
        setChats((prev) => updateMessageStatus(prev, chatId, localId, 'sent'))
      } catch (error) {
        if (error instanceof GreenApiError) onConnectionChange?.(false)
        setChats((prev) => updateMessageStatus(prev, chatId, localId, 'error'))
      }
    },
    [creds, setChats, onConnectionChange]
  )

  return { send }
}
