const tableWrapper = document.querySelector('.table-wrapper');
const leftButton = document.querySelector('.scroll-btn.left');
const rightButton = document.querySelector('.scroll-btn.right');

let currentIndex = 0;  // 当前显示列的起始位置
const totalColumns = 3;  // 这里假设有三列需要滑动
const columnWidth = 100;  // 每列的宽度

// 计算table的总宽度
const tableWidth = columnWidth * totalColumns;

// 左滑函数
function slideLeft() {
  if (currentIndex > 0) {
    currentIndex--;
    updateTablePosition();
  }
}

// 右滑函数
function slideRight() {
  if (currentIndex < totalColumns - 2) { // 确保滑动不超出表格
    currentIndex++;
    updateTablePosition();
  }
}

// 更新表格位置
function updateTablePosition() {
  tableWrapper.style.transform = `translateX(-${currentIndex * columnWidth * 2}px)`;  // 每次滑动2列
}

// 按钮事件监听
leftButton.addEventListener('click', slideLeft);
rightButton.addEventListener('click', slideRight);

// 手指触摸滑动效果
let startX = 0;
tableWrapper.addEventListener('touchstart', (event) => {
  startX = event.touches[0].pageX;
});

tableWrapper.addEventListener('touchmove', (event) => {
  if (startX === 0) return;
  const moveX = event.touches[0].pageX - startX;
  if (Math.abs(moveX) > 30) {  // 如果滑动的距离超过一定阈值
    if (moveX > 0) {
      slideLeft();  // 向右滑动，显示左侧的列
    } else {
      slideRight(); // 向左滑动，显示右侧的列
    }
    startX = event.touches[0].pageX;  // 重置起始位置
  }
});

tableWrapper.addEventListener('touchend', () => {
  startX = 0;
});
