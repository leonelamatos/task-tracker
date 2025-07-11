import { useCallback, useEffect, useState } from "react"

export default function useAsync<T>(callback: () => Promise<T>, dependencies = []): {
    loading: boolean
    error: Error | undefined
    value: T | undefined
} {
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ error, setError ] = useState<Error | undefined>()
    const [ value, setValue ] = useState<T | undefined>()

    const callbackMemoized = useCallback(() => {
        setLoading(true)
        setError(undefined)
        setValue(undefined)
        callback()
            .then(setValue)
            .catch(setError)
            .finally(() => setLoading(false))
    }, dependencies)

    useEffect(() => {
        callbackMemoized()
    }, [ callbackMemoized ])

    return { loading, error, value }
}