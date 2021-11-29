import { toast } from '@zerodevx/svelte-toast'

export const success = m => toast.push(m, {
	theme: {

	}
})

export const warning = m => toast.push(m, { theme: {} })

export const failure = m => toast.push(m, { theme: {} })