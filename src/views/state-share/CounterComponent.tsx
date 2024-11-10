import { useCounter } from "./CounterProvider";

function CounterComponent() {
  const { count, increment, decrement, reset, setIncrementStep } = useCounter();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>

      <div>
        <button onClick={() => setIncrementStep?.(2)}>Set Step to 2</button>
        <button onClick={() => setIncrementStep?.(5)}>Set Step to 5</button>
      </div>
    </div>
  );
}

export default CounterComponent;
