import { useCounter } from "./CounterProvider";

function OtherComponent() {
  const { count, increment } = useCounter();

  return (
    <div>
      <h2>Other Component</h2>
      <p>Shared Count: {count}</p>
      <button onClick={increment}>Increment from Other Component</button>
    </div>
  );
}

export default OtherComponent;
