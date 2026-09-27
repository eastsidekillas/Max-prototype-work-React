import { Button, ErrorText, Field } from '@/shared/ui'
import type { Credentials } from '@/entities/instance'
import { useAuthByInstance } from '../model/useAuthByInstance'

export function LoginForm({ onSuccess }: { onSuccess: (creds: Credentials) => void }) {
    const {
        idInstance,
        setIdInstance,
        apiTokenInstance,
        setApiTokenInstance,
        apiUrl,
        setApiUrl,
        isChecking,
        error,
        handleSubmit,
    } = useAuthByInstance(onSuccess)

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <Field
                label="idInstance"
                value={idInstance}
                onChange={(e) => setIdInstance(e.target.value)}
                placeholder="1101234567"
                inputMode="numeric"
                mono
                autoFocus
            />

            <Field
                label="apiTokenInstance"
                value={apiTokenInstance}
                onChange={(e) => setApiTokenInstance(e.target.value)}
                placeholder="d75b3a66374942c5b3c019c698abc..."
                type="password"
                mono
            />

            <Field
                label="apiUrl"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                mono
            />

            {error && <ErrorText>{error}</ErrorText>}

            <Button type="submit" disabled={isChecking} className="mt-1">
                {isChecking ? 'Проверяем…' : 'Войти'}
            </Button>
        </form>
    )
}
