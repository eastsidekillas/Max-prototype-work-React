import { FormEvent, useState } from 'react'
import { Button, ErrorText, Field, Modal } from '@/shared/ui'
import { formatPhone, normalizePhone} from '@/shared/lib'

interface NewChatModalProps {
  onCreate: (phone: string) => void
  onClose: () => void
}

export function NewChatModal({ onCreate, onClose }: NewChatModalProps) {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handlePhoneChange(value: string) {
      setPhone(formatPhone(value))
      setError(null)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const digits = normalizePhone(phone)

    if (digits.length < 10) {
      setError('Введите корректный номер телефона')
      return
    }

    onCreate(digits)
  }

  return (
    <Modal onClose={onClose}>
      <div>
        <h2 className="text-[22px] font-semibold tracking-[-0.025em] text-ink">
          Новый чат
        </h2>
        <p className="mt-1.5 text-[14px] leading-5 text-ink-muted">
          Введите номер телефона, чтобы начать переписку.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Field
            label="Номер телефона"
            value={phone}
            onChange={(event) => {
                handlePhoneChange(event.target.value)
            }}
            placeholder="+7 999 123 45 67"
            inputMode="tel"
            autoFocus
          />

          {error && <ErrorText>{error}</ErrorText>}

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="secondary" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit">Продолжить</Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
