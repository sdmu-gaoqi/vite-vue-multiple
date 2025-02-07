import type { Env } from '@/types'

export const mode = import.meta.env.MODE as unknown as Env
export const env = import.meta.env
