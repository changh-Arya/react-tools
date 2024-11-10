import React from 'react';
import { IHightlightProps } from './declare';


const HighlightText = ({ text, searchTerm, styles }:IHightlightProps) => {
  const getHighlightedText = (text:string, searchTerm:string) => {
    if (!searchTerm) return text; // 如果没有搜索词，返回原文本

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi')); // 分割文本为数组
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} style={styles || { backgroundColor: 'yellow' }}>{part}</span>
      ) : (
        part
      )
    );
  };

  return <p>{getHighlightedText(text, searchTerm)}</p>;
};

export default HighlightText;