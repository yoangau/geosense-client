const userIdKey = "@userId"

export const getUserId = (): string => localStorage.getItem(userIdKey) ?? ""

export const setUserId = (userId: string): void => localStorage.setItem(userIdKey, userId)
