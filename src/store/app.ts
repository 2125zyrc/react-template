import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { storage } from '@/utils/storage'

export const accessTokenAtom = atomWithStorage('accesstoken', '', storage)
export const userAtom = atomWithStorage('user', '{}', storage)

// export const userAtom = atom({
//   userIconUrl: '',
//   openId: '',
//   nickName: '',
//   userIconUrl3: '',
//   userIconUrl2: '',
//   mobile: '',
//   email: '',
//   operator: '',
// })

// interface UserInfo {
//   name?: string
//   age?: number
//   // permission: string[]
//   [key: string]: any
// }

// export const atomUserInfo = atom<UserInfo>({
//   permission: [],
// })

// export const atomUserPermission = atom<string[]>((get) => {
//   return get(atomUserInfo).permission || []
// })

// export const atomNoticeCount = atom<number>((get) => {
//   return get(atomUserInfo).unread || 0
// })
