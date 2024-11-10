import { useEffect, useState } from 'react'

export interface ScreenRes {
  width: number
  height: number
  isMobileScreen: boolean
}

export function useMatchScreen(): ScreenRes {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return {
    ...windowSize,
    isMobileScreen: windowSize.width < 1024
  }
}