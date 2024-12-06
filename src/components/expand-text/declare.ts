import { CSSProperties } from "react"
export interface ExpandTextProps {
  text: string,
  maxLines: number,
  style?: CSSProperties,
  lineHeight: number
}