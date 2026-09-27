import { readJson, removeItem, writeJson } from '@/shared/lib'
import type { Credentials } from './types'

const CREDENTIALS_KEY = 'maxChat.credentials'

export function loadCredentials(): Credentials | null {
  return readJson<Credentials>(CREDENTIALS_KEY)
}

export function saveCredentials(creds: Credentials): void {
  writeJson(CREDENTIALS_KEY, creds)
}

export function clearCredentials(): void {
  removeItem(CREDENTIALS_KEY)
}
