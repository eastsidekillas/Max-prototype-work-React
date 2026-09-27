import { useEffect, useRef } from 'react'
import {
  deleteNotification,
  receiveNotification,
  type GreenApiNotification,
} from '@/shared/api/green-api'
import type { Credentials } from '@/entities/instance'

const MESSAGE_WEBHOOK_TYPES = new Set([
  'incomingMessageReceived',
  'outgoingMessageReceived',
  'outgoingAPIMessageReceived',
])

export interface IncomingTextEvent {
  chatId: string
  chatName?: string
  text: string
  idMessage?: string
  timestamp: number
  fromMe: boolean
}

function extractText(body: GreenApiNotification['body']): string | null {
  const messageData = body.messageData
  if (!messageData) return null
  if (messageData.typeMessage === 'textMessage') {
    return messageData.textMessageData?.textMessage ?? null
  }
  if (messageData.typeMessage === 'extendedTextMessage') {
    return messageData.extendedTextMessageData?.text ?? null
  }
  return null
}


export function useIncomingMessages(
  creds: Credentials | null,
  onMessage: (event: IncomingTextEvent) => void,
  onError?: (error: unknown) => void
) {
  const onMessageRef = useRef(onMessage)
  onMessageRef.current = onMessage
  const onErrorRef = useRef(onError)
  onErrorRef.current = onError

  useEffect(() => {
    if (!creds) return
    const controller = new AbortController()
    let cancelled = false

    async function poll() {
      while (!cancelled) {
        try {
          const notification = await receiveNotification(creds!, 20, controller.signal)
          if (cancelled) break
          if (!notification) continue // таймаут, ничего не пришло - опрашиваем заново

          const { body, receiptId } = notification
          if (MESSAGE_WEBHOOK_TYPES.has(body.typeWebhook) && body.senderData) {
            const text = extractText(body)
            if (text) {
              onMessageRef.current({
                chatId: body.senderData.chatId,
                chatName: body.senderData.chatName,
                text,
                idMessage: body.idMessage,
                timestamp: (body.timestamp ?? Date.now() / 1000) * 1000,
                fromMe: body.typeWebhook !== 'incomingMessageReceived',
              })
            }
          }
          await deleteNotification(creds!, receiptId)
        } catch (error) {
          if (cancelled) break
          onErrorRef.current?.(error)
          await new Promise((resolve) => setTimeout(resolve, 3000))
        }
      }
    }

    poll()
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [creds?.idInstance, creds?.apiTokenInstance, creds?.apiUrl])
}
