/** A tiny wrapper for localStorage */
export const storage = {
  getItem(key: string) {
    return localStorage.getItem(key)
  },
  setItem(key: string, val: any) {
    localStorage.setItem(key, val)
  },
  removeItem(key: string) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  },
}

const TOKEN_NAME = 'accesstoken'

export function getAuthToken() {
  return storage.getItem(TOKEN_NAME)
}

export function setAuthToken(token: string) {
  storage.setItem(TOKEN_NAME, token)
}
