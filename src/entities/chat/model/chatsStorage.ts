import { readJson, writeJson } from '@/shared/lib'
import type { Chat } from './types'

function chatsKey(idInstance: string): string {
  return `maxChat.chats.${idInstance}`
}

export function loadChats(idInstance: string): Chat[] {
  return readJson<Chat[]>(chatsKey(idInstance)) ?? []
}

export function saveChats(idInstance: string, chats: Chat[]): void {
  writeJson(chatsKey(idInstance), chats)
}
