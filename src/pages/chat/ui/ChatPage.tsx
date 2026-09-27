import { useEffect, useState } from 'react'
import type { Credentials } from '@/entities/instance'
import {
    appendMessage,
    loadChats,
    saveChats,
    upsertChat,
    type Chat,
} from '@/entities/chat'
import { useIncomingMessages } from '@/features/receive-messages'
import { useSendMessage } from '@/features/send-message'
import { NewChatModal } from '@/features/create-chat'
import { useLogout } from '@/features/logout'
import { Sidebar } from '@/widgets/sidebar'
import { ChatWindow } from '@/widgets/chat-window'
import { generateLocalId, toChatId } from '@/shared/lib'

interface ChatPageProps {
    creds: Credentials
    onLoggedOut: () => void
}

export function ChatPage({creds, onLoggedOut }: ChatPageProps) {
    const [chats, setChats] = useState<Chat[]>([])
    const [activeChatId, setActiveChatId] = useState<string | null>(null)
    const [showNewChat, setShowNewChat] = useState(false)
    const [connectionOk, setConnectionOk] = useState(true)

    const logout = useLogout(onLoggedOut)

    useEffect(() => {
        setChats(loadChats(creds.idInstance))
        setActiveChatId(null)
    }, [creds.idInstance])

    useEffect(() => {
        saveChats(creds.idInstance, chats)
    }, [chats, creds.idInstance])

    useIncomingMessages(
        creds,
        (event) => {
            setConnectionOk(true)

            setChats((prev) =>
                appendMessage(
                    prev,
                    event.chatId,
                    event.chatName || event.chatId,
                    {
                        id: event.idMessage
                            ? `remote-${event.idMessage}`
                            : generateLocalId(),
                        chatId: event.chatId,
                        text: event.text,
                        fromMe: event.fromMe,
                        timestamp: event.timestamp,
                        status: 'sent',
                    },
                ),
            )
        },
        () => {
            setConnectionOk(false)
        },
    )

    const { send } = useSendMessage(
        creds,
        setChats,
        setConnectionOk,
    )

    function handleCreateChat(phone: string) {
        const chatId = toChatId(phone)

        setChats((prev) =>
            upsertChat(prev, chatId, phone),
        )

        setActiveChatId(chatId)
        setShowNewChat(false)
    }

    const activeChat =
        chats.find(
            (chat) => chat.chatId === activeChatId,
        ) ?? null

    return (
        <div className="flex h-full min-h-0 overflow-hidden bg-app">
            <Sidebar
                chats={chats}
                activeChatId={activeChatId}
                onSelectChat={setActiveChatId}
                onNewChat={() =>
                    setShowNewChat(true)
                }
                onLogout={logout}
            />

            <main className="min-w-0 flex-1">
                <ChatWindow
                    chat={activeChat}
                    connectionOk={connectionOk}
                    onSend={(text) => {
                        if (activeChatId) {
                            send(activeChatId, text)
                        }
                    }}
                />
            </main>

            {showNewChat && (
                <NewChatModal
                    onCreate={handleCreateChat}
                    onClose={() =>
                        setShowNewChat(false)
                    }
                />
            )}
        </div>
    )
}