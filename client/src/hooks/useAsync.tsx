import { useAppStore } from "@/states/appState"
import { useCallback, useEffect, useState } from "react"

export default function useAsync<T>(callback: () => Promise<T>, dependencies = []): {
    isLoading: boolean
    error: Error | undefined
    value: T | undefined
} {
    const isLoading = useAppStore(state => state.isLoading)
    const setIsLoading = useAppStore(state => state.setIsLoading)
    // const [ loading, setLoading ] = useState<boolean>(true)
    const [ error, setError ] = useState<Error | undefined>()
    const [ value, setValue ] = useState<T | undefined>()

    const callbackMemoized = useCallback(() => {
        setIsLoading(true)
        setError(undefined)
        setValue(undefined)
        callback()
            .then(setValue)
            .catch(setError)
            .finally(() => setIsLoading(false))
    }, dependencies)

    useEffect(() => {
        callbackMemoized()
    }, [ callbackMemoized ])

    return { isLoading, error, value }
}