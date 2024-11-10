import { createContext } from "react";

interface ICounterProps {
  count?: number,
  increment?: () => void
  decrement?: () => void
  reset?: () => void
  setIncrementStep?: (newStep: number) => void
}
// 创建 Context
export const CounterContext = createContext<ICounterProps>({});