import React, { Fragment, useEffect, useRef, useState } from 'react'
import styles from './test.module.scss'
import { data } from './mock'

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [isTouching, setIsTouching] = useState(false)

  const screenWidth = window.innerWidth

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current

    const handleTouchStart = (e: TouchEvent) => {
      setStartX(e.touches[0].clientX)
      setStartY(e.touches[0].clientY)
      setIsTouching(true)
      console.log('touchstart:', e.touches[0].clientX)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching) {
        return
      }

      const moveX = e.touches[0].clientX - startX
      const moveY = e.touches[0].clientY - startY

      // 只有在水平移动距离大于垂直移动距离时才进行左右滚动
      if (Math.abs(moveX) > Math.abs(moveY)) {
        if (scrollContainer) {
          scrollContainer.scrollLeft -= moveX
        }
        setStartX(e.touches[0].clientX)
        console.log('touchmove:', e.touches[0].clientX)
      }
      // if (!isTouching) {
      //   return
      // }

      // const moveX = e.touches[0].clientX - startX
      // if (scrollContainer) {
      //   scrollContainer.scrollLeft -= moveX
      // }
      // setStartX(e.touches[0].clientX)
      // console.log('touchmove:', e.touches[0].clientX)
    }

    const handleTouchEnd = () => {
      setIsTouching(false)
      if (scrollContainer) {
        const currentPosition = scrollContainer.scrollLeft
        const nearestScreenWidth = Math.round(currentPosition / screenWidth) * screenWidth
        scrollContainer.scrollTo({
          left: nearestScreenWidth,
          behavior: 'smooth'
        })
      }
      console.log('touchend')
    }

    if (scrollContainer) {
      scrollContainer.addEventListener('touchstart', handleTouchStart)
      scrollContainer.addEventListener('touchmove', handleTouchMove)
      scrollContainer.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('touchstart', handleTouchStart)
        scrollContainer.removeEventListener('touchmove', handleTouchMove)
        scrollContainer.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isTouching, startX, screenWidth, startY])
  return (
    <div className={styles.scrollContainer} ref={scrollContainerRef}>
      <div className={styles.content}>
        {
          data.map((item, index) => {
            return <div className={`${styles.headerTop}`} key={index}>{item.name}</div>
          })
        }
        <hr />
        {
          data[0].list?.map((ele, ind) => {
            return (
              <Fragment key={ind}>
                <div className={styles.headerItem}>
                  {ele.title}
                </div>
                {
                  data.map((item, index) => {
                    return <div className={styles.item} key={index}>{item.list[ind].desc}</div>
                  })
                }
              </Fragment>
            )
          })
        }
      </div>
    </div>
  )
}

export default App
