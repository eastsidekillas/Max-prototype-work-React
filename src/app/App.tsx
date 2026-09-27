import { useState } from 'react'
import { loadCredentials, type Credentials } from '@/entities/instance'
import { LoginPage } from '@/pages/login'
import { ChatPage } from '@/pages/chat'

export function App() {
  const [creds, setCreds] = useState<Credentials | null>(() => loadCredentials())

  if (!creds) {
    return <LoginPage onSuccess={setCreds} />
  }

  return <ChatPage creds={creds} onLoggedOut={() => setCreds(null)} />
}
