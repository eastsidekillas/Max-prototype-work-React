import { FormEvent, useState } from 'react'
import { checkStateInstance, GreenApiError } from '@/shared/api/green-api'
import { DEFAULT_GREEN_API_URL } from '@/shared/config'
import { saveCredentials, type Credentials } from '@/entities/instance'

export function useAuthByInstance(onSuccess: (creds: Credentials) => void) {
  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')
  const [apiUrl, setApiUrl] = useState(DEFAULT_GREEN_API_URL)
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    if (!idInstance.trim() || !apiTokenInstance.trim()) {
      setError('Заполните idInstance и apiTokenInstance')
      return
    }

    const creds: Credentials = {
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
      apiUrl: apiUrl.trim() || DEFAULT_GREEN_API_URL,
    }

    setIsChecking(true)
    try {
      const { stateInstance } = await checkStateInstance(creds)
      if (stateInstance !== 'authorized') {
        setError(
          `Инстанс не авторизован в MAX (статус: ${stateInstance}). Откройте личный кабинет GREEN-API и отсканируйте QR-код в приложении MAX.`
        )
        return
      }
      saveCredentials(creds)
      onSuccess(creds)
    } catch (err) {
      setError(
        err instanceof GreenApiError
          ? err.message
          : 'Не удалось подключиться к GREEN-API. Проверьте apiUrl и подключение к интернету.'
      )
    } finally {
      setIsChecking(false)
    }
  }

  return {
    idInstance,
    setIdInstance,
    apiTokenInstance,
    setApiTokenInstance,
    apiUrl,
    setApiUrl,
    isChecking,
    error,
    handleSubmit,
  }
}
