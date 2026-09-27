export interface GreenApiCredentials {
  idInstance: string
  apiTokenInstance: string
  apiUrl: string
}

export interface GreenApiNotification {
  receiptId: number
  body: {
    typeWebhook: string
    idMessage?: string
    timestamp?: number
    senderData?: {
      chatId: string
      chatName?: string
      sender?: string
    }
    messageData?: {
      typeMessage: string
      textMessageData?: { textMessage: string }
      extendedTextMessageData?: { text: string }
    }
  }
}
