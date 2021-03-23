const userIdKey = "@userToken"

export const getUserToken = (): string | null => localStorage.getItem(userIdKey)

export const setUserToken = (userToken: string): void => localStorage.setItem(userIdKey, userToken)
