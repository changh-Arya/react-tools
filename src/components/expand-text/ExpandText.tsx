import { useEffect, useRef, useState } from "react"
import { ExpandTextProps } from "./declare"


const ExpandText: React.FC<ExpandTextProps> = ({ text, maxLines, style }) => {
  const textRef = useRef<HTMLDivElement>(null)
  const [isTruncated, setTruncated] = useState(false)
  const [isExpand, setExpand] = useState(false)
  // const [lineHeight, setLineHeight] = useState(24)

  const toggleExpand = () => {
    setExpand(!isExpand)
  }

  useEffect(() => {
    if (textRef.current) {
      const _lineHeight = Number.parseInt(window.getComputedStyle(textRef.current).lineHeight, 10)
      // setLineHeight(_lineHeight)
      const maxHeight = _lineHeight * maxLines
      if (textRef.current.scrollHeight > maxHeight) {
        setTruncated(true)
      }
    }
  }, [maxLines, text])

  return (
    <div>
      <div
        ref={textRef}
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: `1.5em`,
          // WebkitLineClamp: 'none',
          WebkitLineClamp: isExpand ? 'none' : maxLines,
          maxHeight: isExpand ? 'none' : `${1.5 * maxLines}em`
        }}
      >
        {text}
      </div>
      {isTruncated && <button onClick={toggleExpand}>
        {isExpand ? 'View Less' : 'View All'}
      </button>}
    </div>
  )
}

export default ExpandText