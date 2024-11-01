import { useEffect, useState } from 'react'

const useDebouncedValue = (input: string = '', ms: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState('')
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(input)
    }, ms)

    return () => {
      clearTimeout(timeout)
    }

  }, [input])

  return debouncedValue
}
export default useDebouncedValue