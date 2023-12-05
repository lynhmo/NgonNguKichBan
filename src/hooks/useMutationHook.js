import { useMutation } from '@tanstack/react-query'

export const useMutaionHook = (functionCallback) => {
    const mutation = useMutation({
        mutationFn: functionCallback
    })
    return mutation
}