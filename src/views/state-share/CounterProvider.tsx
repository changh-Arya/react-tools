import { useCallback, useContext, useState } from 'react';
import { CounterContext } from './CounterContext';



// 创建 Provider 组件
export function CounterProvider({ children }: any) {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = useCallback(() => {
    setCount(prevCount => prevCount + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount(prevCount => prevCount - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const setIncrementStep = useCallback((newStep: number) => {
    setStep(newStep);
  }, []);

  // 提供给所有子组件的数据
  return (
    <CounterContext.Provider value={{ count, increment, decrement, reset, setIncrementStep }}>
      {children}
    </CounterContext.Provider>
  );
}

// 自定义 hook，方便组件消费 Context
export function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
}
