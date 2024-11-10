

import React, { useState } from 'react';
import HighlightText from '../../components/highlight/HightlightText';

const HighlightDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightTerm, setHighlightTerm] = useState(''); // 新增状态用于高亮显示
  const text = "这是一个示例文本，用于演示如何在 React 中高亮匹配的文字。";

  const handleInputChange = (event:any) => {
    setSearchTerm(event?.target.value);
  };

  const handleKeyPress = (event:any) => {
    if (event.key === 'Enter') {
      setHighlightTerm(searchTerm); // 在按下 Enter 时设置高亮文本
    }
  };

  return (
    <div>
      <h1>文本高亮搜索示例</h1>
      <input
        type="text"
        placeholder="输入搜索内容并按 Enter"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} // 监听按键事件
      />
      <HighlightText text={text} searchTerm={highlightTerm} styles={{backgroundColor: 'green',color:"#fff" }} /> {/* 使用 highlightTerm */}
      <HighlightText text={'akjsd,是看京东分，萨迪家地方，是大姐夫kjas金山地方sjdhfs,sdjfh '} searchTerm={highlightTerm} styles={{backgroundColor: 'green',color:"#fff" }} /> {/* 使用 highlightTerm */}
    </div>
  );
};

export default HighlightDemo;
