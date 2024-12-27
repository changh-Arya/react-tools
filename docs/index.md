---
hero:
    title: AryaStudy
    description: study

## js基础

##

js打开email
const mailToLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
window.location.href = mailToLink

调用copy link
利用react use 里面的方法
import copy from 'copy-to-clipboard'

const currentLink = window.location.href      
copy(currentLink) 
if (toastMsgRef.current?.show) {
toastMsgRef.current.show()
}
