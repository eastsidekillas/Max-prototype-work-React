import { clearCredentials } from '@/entities/instance'

export function useLogout(onLoggedOut: () => void) {
  return function logout() {
    clearCredentials()
    onLoggedOut()
  }
}
