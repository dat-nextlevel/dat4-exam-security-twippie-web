import { toast } from "../../external-packages/svelte-toast"

export const success = m => toast.push(m, {
})

export const warning = m => toast.push(m, { pausable: true, className: "warning" })

export const failure = m => toast.push(m, { pausable: true, className: "error" })