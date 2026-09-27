export function normalizePhone(input: string): string {
  return input.replace(/\D/g, '')
}

export function toChatId(phone: string): string {
  return normalizePhone(phone)
}

export function formatPhone(value: string): string {
    const digits = value.replace(/\D/g, '')

    if (!digits) return ''

    let normalized = digits

    if (normalized.startsWith('8')) {
        normalized = `7${normalized.slice(1)}`
    }

    if (!normalized.startsWith('7')) {
        normalized = `7${normalized}`
    }

    normalized = normalized.slice(0, 11)

    let result = '+7'

    if (normalized.length > 1) {
        result += ` ${normalized.slice(1, 4)}`
    }

    if (normalized.length > 4) {
        result += ` ${normalized.slice(4, 7)}`
    }

    if (normalized.length > 7) {
        result += ` ${normalized.slice(7, 9)}`
    }

    if (normalized.length > 9) {
        result += ` ${normalized.slice(9, 11)}`
    }

    return result
}
