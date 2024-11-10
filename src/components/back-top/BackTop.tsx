import { throttle } from "lodash"
import { useState,useEffect } from "react"
import { useMatchScreen } from "../../hooks"
import { BackTopProps } from "./declare"
import c from 'classnames'
import styles from './index.module.scss'
import backTopIcon from '../../assets/svg/backtop.svg'

function BackTop(props: BackTopProps) {
  const {
    onClick,
    target,
    footerTarget,
    duration = 0,
    visibilityHeight = 2000,
    className,
    children,
    scrollBehavior = 'smooth',
    fixedBottomPosition = 40
  } = props

  const [visible, setVisible] = useState<boolean>(false)
  const [footerHeight, setFooterHeight] = useState(0)
  const [bottomPosition, setBottomPosition] = useState<number>(fixedBottomPosition)

  const { isMobileScreen } = useMatchScreen()

  const getDefaultTarget = () => window
  const getDefaultFooterTarget = () => document.querySelector('ado-web-footer') as HTMLElement

  const handleScroll = throttle((e: Event) => {
    const target = e.target as HTMLElement
    const scrollTop = target?.scrollTop

    setVisible(scrollTop >= visibilityHeight)

    if (isMobileScreen || !target || footerHeight <= 0) {
      return
    }
    const scrollHeight = target.scrollHeight
    const screenHeight = target.clientHeight
    const footerPosition = scrollHeight - (scrollTop + screenHeight)
    if (footerPosition < footerHeight) {
      setBottomPosition(footerHeight - footerPosition + fixedBottomPosition)
    } else {
      setBottomPosition(fixedBottomPosition)
    }
  }, duration)

  useEffect(() => {
    const getTarget = target || getDefaultTarget
    const container = getTarget()

    const getFooterTarget = footerTarget || getDefaultFooterTarget

    const footerElement: HTMLElement | null = getFooterTarget()
    if (footerElement) {
      const footerHeight = footerElement.offsetHeight
      setFooterHeight(footerHeight)
    }

    container?.addEventListener('scroll', handleScroll)
    return () => {
      container?.removeEventListener('scroll', handleScroll)
    }
  }, [footerTarget, handleScroll, target])

  const scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e)
      return
    }
    const getTarget = target || getDefaultTarget
    const container = getTarget()
    if (container) {
      container.scrollTo({ top: 0, behavior: scrollBehavior })
    }
  }

  // web has footer, backtop botton need top of footer
  const btnStyles = isMobileScreen
    ? {}
    : {
        bottom: `${bottomPosition}px`
      }
  const combinedClassName = c(className, styles.backTop)

  return (
    visible ? (
      <div className={combinedClassName} onClick={scrollToTop} style={btnStyles}>
        {children || <img className={styles.backTopIcon} src={backTopIcon} alt="back top" />}
      </div>
    ): null
  )
}

export default BackTop



