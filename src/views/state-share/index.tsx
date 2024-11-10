import CounterComponent from "./CounterComponent"
import { CounterProvider } from "./CounterProvider"
import OtherComponent from "./OtherComponent"

export const StateShare = () => {
  return <CounterProvider>
    <CounterComponent />
    <OtherComponent />
  </CounterProvider>
}

