import { LoginForm } from '@/features/auth-by-instance'
import { MaxLogo } from '@/shared/ui'
import type { Credentials } from '@/entities/instance'

export function LoginPage({ onSuccess }: { onSuccess: (creds: Credentials) => void }) {
  return (
    <div className="flex min-h-full items-center justify-center bg-app p-6">
      <div className="w-full max-w-[690px] rounded-[20px] border border-black/[0.06] bg-white p-8 shadow-[0_18px_55px_rgba(25,31,45,0.10)]">
        <div className="flex items-center justify-center">
            <MaxLogo size={46} />
        </div>
        <h1 className="mt-5 text-center text-[22px] font-semibold tracking-[-0.025em] text-ink">
          Подключение
        </h1>
        <p className="mt-2 text-center text-[13.5px] leading-5 text-ink-muted">
          Подключите GREEN-API, чтобы открыть чат.
        </p>
        <div className="mt-6">
          <LoginForm onSuccess={onSuccess} />
        </div>
      </div>
    </div>
  )
}
