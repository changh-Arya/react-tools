export interface BackTopProps {
  target?: () => Element | HTMLElement | Window | null
  onClick?: React.MouseEventHandler<HTMLElement>
  footerTarget?: () => HTMLElement
  visibilityHeight?: number
  duration?: number
  children?: React.ReactNode
  className?: string
  scrollBehavior?: ScrollBehavior
  fixedBottomPosition?: number
}