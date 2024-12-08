import { Fragment, useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import styles from './test2.module.scss'
import { List, TypeList } from './mock'
import ExpandableText from './components/ExpendText'

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const headerTopRef = useRef<HTMLDivElement>(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [startX, setStartX] = useState(0)
  // const [moveX, setMoveX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [isTouching, setIsTouching] = useState(false)
  const [typeList, setTypeList] = useState(TypeList)
  const moveXRef = useRef(0)

  const screenWidth = window.innerWidth

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current

    const handleTouchStart = (e: TouchEvent) => {
      moveXRef.current = 0
      setStartX(e.touches[0].clientX)
      setStartY(e.touches[0].clientY)
      setIsTouching(true)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching) {
        return
      }

      const _moveX = e.touches[0].clientX - startX
      const _moveY = e.touches[0].clientY - startY
      console.log('move x Y:', _moveX, _moveY)
      // 只有在水平移动距离大于垂直移动距离时才进行左右滚动
      const isScrolling = Math.abs(_moveX) > Math.abs(_moveY) ? 'horizontal' : 'vertical'
      if (Math.abs(_moveX) > Math.abs(_moveY)) {
        moveXRef.current = _moveX
      }
      if (isScrolling === 'horizontal') {
        e.preventDefault() // 阻止默认的垂直滚动
        // scrollContainer.current.style
        // setStartX(e.touches[0])
        // console.log('horizontal：', e.touches[0], clientY)
        // setStartY(e.touches[0].clientY)
      } else if (isScrolling === 'vertical') {
        e.preventDefault() // 阻止默认的水平滚动
        // scrollContainer.scrollTop -= e.touches[0].clientY - startY;
        // startY = e.touches[0].clientY;
      }
    }

    const debouncedHandleTouchMove = debounce(handleTouchMove, 100) // 100ms防抖

    const handleTouchEnd = (e: TouchEvent) => {
      setIsTouching(false)
      const moveX = moveXRef.current
      console.log('touchend:', moveX)
      if (moveX) {
        if (moveX < 0 && currentIndex < (List.length / 2 - 1)) {
          console.log(' set currentIndex:', currentIndex + 1)
          setCurrentIndex(currentIndex + 1)
        } else if (moveX > 0 && currentIndex > 0) {
          console.log(' set currentIndex:', currentIndex - 1)
          setCurrentIndex(currentIndex - 1)
        }
      }
    }

    const debouncedHandleTouchEnd = debounce(handleTouchEnd, 100) // 100ms防抖

    if (scrollContainer) {
      scrollContainer.addEventListener('touchstart', handleTouchStart)
      scrollContainer.addEventListener('touchmove', debouncedHandleTouchMove)
      scrollContainer.addEventListener('touchend', debouncedHandleTouchEnd)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('touchstart', handleTouchStart)
        scrollContainer.removeEventListener('touchmove', debouncedHandleTouchMove)
        scrollContainer.removeEventListener('touchend', debouncedHandleTouchEnd)
      }
    }
  }, [currentIndex, isTouching, screenWidth, startX, startY])

  useEffect(() => {
    const headerContainer = headerTopRef.current
    if (headerContainer) {
      const childList = headerContainer.children
      childList[currentIndex * 2].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }
  }, [currentIndex])

  const expendHandle = (index: number) => {
    const newTypeList = [...typeList]
    newTypeList[index] = { ...newTypeList[index], expend: !newTypeList[index].expend }
    setTypeList(newTypeList)
  }
  return (
    <div className={styles.scrollContainer}>
      <div className={styles.content} ref={scrollContainerRef}>
        <div className={styles.currentIndex}>{currentIndex}</div>
        <div className={styles.headerTop} ref={headerTopRef}>
          {
            List.map((item, index) => {
              return <div className={`${styles.headerTopItem}`} key={index}>{item.name}</div>
            })
          }
        </div>

        <hr />
        {
          typeList?.map((ele, ind) => {
            return (
              <Fragment key={ind}>
                <div className={styles.headerItem} onClick={() => expendHandle(ind)}>
                  {ele.title}
                </div>
                {ele.expend && (
                  <div className={styles.contentLayout}>
                    {
                      List.map((item, index) => {
                        return (
                          <div className={styles.item} key={index}>
                            <ExpandableText text={item[ele.key]} maxLines={8} />
                          </div>
                        )
                      })
                    }
                  </div>
                )}
              </Fragment>
            )
          })
        }
      </div>
    </div>
  )
}

export default App
