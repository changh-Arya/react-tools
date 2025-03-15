import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { routeNames } from './constant'
import { ContentSessionKey, getContentSessionValue, setContentSessionValue } from '@/utils/storage'

function useNavigationHistory(maxLevels: number) {
  const { formatMessage: f } = useIntl()
  const navigate = useNavigate()
  // const location = useLocation()
  const data = getContentSessionValue(ContentSessionKey.NavigationHistory)
  const history = useRef(data ? JSON.parse(data) : [])

  // useEffect(() => {
  //   history.current.push(location.pathname + location.search);
  //   sessionStorage.setItem('navigationHistory', JSON.stringify(history.current));
  // }, [location]);

  // useEffect(() => {
  //   sessionStorage.setItem('navigationHistory', JSON.stringify(history.current));
  // }, [history.current]);

  const setItem = () => {
    setContentSessionValue(ContentSessionKey.NavigationHistory, JSON.stringify(history.current))
  }

  const pushHistory = (path: string) => {
    if (history.current.length >= maxLevels) {
      history.current.shift()
    }
    history.current.push(path)
    setItem()
  }

  const replaceHistory = (path: string) => {
    history.current[history.current.length - 1] = path
    setItem()
    navigate(path, { replace: true })
  }

  const goBack = () => {
    if (history.current.length > 1) {
      history.current.pop()
      const previousPath = history.current.pop()
      setItem()

      navigate(previousPath)
    } else {
      navigate('/')
    }
  }

  const resetHistory = () => {
    history.current = []
    setItem()
  }

  const navigateToHome = () => {
    resetHistory()
    navigate('/')
  }

  const getPreviousRouteName = () => {
    const previousPath = history.current[history.current.length - 2]
    return f(routeNames[previousPath])
  }

  return { goBack, pushHistory, replaceHistory, navigateToHome, getPreviousRouteName }
}

export default useNavigationHistory
