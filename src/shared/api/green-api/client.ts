import type { GreenApiCredentials, GreenApiNotification } from './types'

function normalizeBaseUrl(apiUrl: string): string {
  return apiUrl.trim().replace(/\/+$/, '')
}

function instanceRoot({ apiUrl, idInstance }: GreenApiCredentials): string {
  return `${normalizeBaseUrl(apiUrl)}/waInstance${idInstance}`
}

export class GreenApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'GreenApiError'
  }
}

async function parseJsonOrThrow(response: Response) {
  const text = await response.text()
  let data: unknown = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {

  }
  if (!response.ok) {
    const message =
      (data as { message?: string } | null)?.message ??
      `Произошла ошибка ${response.status}`
    throw new GreenApiError(message, response.status)
  }
  return data
}


export async function checkStateInstance(
  creds: GreenApiCredentials
): Promise<{ stateInstance: string }> {
  const url = `${instanceRoot(creds)}/getStateInstance/${creds.apiTokenInstance}`
  const response = await fetch(url)
  const data = await parseJsonOrThrow(response)
  return data as { stateInstance: string }
}

export async function sendTextMessage(
  creds: GreenApiCredentials,
  chatId: string,
  message: string
): Promise<{ idMessage: string }> {
  const url = `${instanceRoot(creds)}/sendMessage/${creds.apiTokenInstance}`
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, message }),
  })
  const data = await parseJsonOrThrow(response)
  return data as { idMessage: string }
}

export async function receiveNotification(
  creds: GreenApiCredentials,
  receiveTimeout = 20,
  signal?: AbortSignal
): Promise<GreenApiNotification | null> {
  const url = `${instanceRoot(creds)}/receiveNotification/${creds.apiTokenInstance}?receiveTimeout=${receiveTimeout}`
  const response = await fetch(url, { signal })
  const data = await parseJsonOrThrow(response)
  return (data as GreenApiNotification | null) ?? null
}

export async function deleteNotification(
  creds: GreenApiCredentials,
  receiptId: number
): Promise<void> {
  const url = `${instanceRoot(creds)}/deleteNotification/${creds.apiTokenInstance}/${receiptId}`
  const response = await fetch(url, { method: 'DELETE' })
  await parseJsonOrThrow(response)
}
