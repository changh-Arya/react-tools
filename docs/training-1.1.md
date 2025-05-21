

Introduction

In this course, we’ll be using function components exclusively. Before diving into Hooks, let’s clarify how function components differ from regular JavaScript functions.

Function Components vs. Regular Functions

Feature

Function Component

Regular Function

Return Value

Returns JSX (UI)

Returns primitive values or objects

Lifecycle

Can use lifecycle logic via Hooks

No lifecycle awareness

State

Can manage state with useState and others

No built-in state

Props & Context

Receives props and can consume context

Accepts arguments only

In short, function components are designed for rendering UI in React, while regular functions are general-purpose.


Why Hooks?

Hooks unlock powerful features in function components:

Stateful logic with useState

Side effects with useEffect

Context access with useContext

Reusable logic via custom hooks

Hooks make function components more expressive, modular, and easier to test—without needing class components.

Course Objectives

By the end of this course, you’ll be able to:

Use essential React Hooks: useState, useEffect, useContext, useReducer, useRef, useMemo, useCallback, and memo

Understand how these hooks work together through real-world examples

Use the native fetch API to call backend endpoints and render the response

Build a complete Todo List app using Hooks

1. useState: Managing Local State

What It Does

useState lets you add state to function components. It returns a pair: the current state and a function to update it.

const [state, setState] = useState(initialValue)

It returns a pair: the current state value and a function to update it.

Basic Example

import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

Managing Complex State (e.g. Arrays)

import React, { useState } from 'react';

function ProfileEditor() {
  const [profile, setProfile] = useState({
    name: 'Alice',
    age: 25,
  });

  const updateName = () => {
    setProfile(prev => ({
      ...prev,
      name: 'Bob',
    }));
  };

  return (
    <div>
      <p>Name: {profile.name}</p>
      <p>Age: {profile.age}</p>
      <button onClick={updateName}>Change Name</button>
    </div>
  );
}

✅ useState is used here to manage a list of tasks. Clicking the button adds a new task to the list.

2. useEffect: Handling Side Effects

Overview

useEffect lets you perform side effects in function components—like data fetching, subscriptions, or manually updating the DOM.

useEffect(() => {
  // side effect logic
  return () => {
    // cleanup logic (optional)
  }
}, [dependencies])

1. Simulating Lifecycle Events

useEffect can mimic traditional class component lifecycle methods such as componentDidMount, componentDidUpdate, and componentWillUnmount.

Example: Run on Mount and Cleanup on Unmount

import React, { useEffect } from 'react';

function LifecycleExample() {
  useEffect(() => {
    console.log('Component mounted');
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  return (
    <div>
      <h2>Lifecycle Simulation</h2>
      <p>Open the console to see lifecycle logs.</p>
    </div>
  );
}

The empty dependency array [] ensures this effect runs only once after the component mounts.

The return function is called when the component unmounts, useful for cleanup (e.g., removing event listeners, canceling timers).

2. Listening to Variable Changes to Handle Side Effects

You can pass variables to the dependency array to trigger the effect whenever those variables change.

Example: React to State Changes

import React, { useState, useEffect } from 'react';

function VariableWatcher() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]);

  return (
    <div>
      <h2>Variable Change Watcher</h2>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

This effect runs every time count changes.

Useful for syncing state with external systems, triggering animations, or fetching data based on user input.

3. useRef: Accessing DOM Elements or Persistent Values

Goal

Use useRef to reference a DOM element (e.g., an input field) and persist values across renders without triggering re-renders.


Overview

useRef serves two main purposes:

Accessing DOM nodes (like document.querySelector)

Storing mutable values that persist across renders but don’t cause re-renders when updated

Unlike useState, updating a ref does not trigger a component re-render.

Example: Auto-Focus and Clear Input Field

import React, { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} placeholder="Auto focus input" />;
}

✅ useRef is used here to directly access the input element, allowing us to read and reset its value without re-rendering the component.

Example: 

Storing mutable values that persist across renders but don’t cause re-renders when updated

import React, { useRef, useEffect } from 'react';

function TimerComponent() {
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      console.log('Tick');
    }, 1000);

    return () => {
      clearInterval(timerRef.current); // clear interval
      console.log('Timer cleared');
    };
  }, []);

  return <div>interval</div>;
}

✅ Using useRef to store timer IDs (like those from setTimeout or setInterval) is mainly to avoid unnecessary re-renders and to ensure the value remains accessible throughout the component's lifecycle.

4. useMemo: Optimize Expensive Calculations

Goal

Use useMemo to avoid unnecessary recalculations—especially when dealing with derived data like filtered lists.

Overview

useMemo lets you memoize the result of a computation. It only recalculates the value when one of its dependencies changes.

const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])

Example: Memoizing Incomplete Todos

import React, { useState, useMemo } from 'react';

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  const expensiveValue = useMemo(() => {
    console.log('Calculating...');
    return count * 2;
  }, [count]);

  return (
    <div>
      <p>Expensive value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <button onClick={() => setOther(other + 1)}>Change Other</button>
    </div>
  );
}

✅ useMemo ensures the filtered list of incomplete todos is only recalculated when the todos array changes.

5. useCallback: Memoize Functions to Prevent Re-Creation

Goal

Use useCallback to memoize functions so they aren’t recreated on every render—especially useful when passing callbacks to child components.

Overview

useCallback returns a memoized version of a callback function. It only changes if one of its dependencies changes. This helps avoid unnecessary re-renders in child components that rely on reference equality.

const memoizedCallback = useCallback(() => {
  doSomething()
}, [dependency])

Example: Memoizing a Toggle Handler

import React, { useState, useCallback } from 'react';

function Button({ onClick }) {
  console.log('Button rendered');
  return <button onClick={onClick}>Click me</button>;
}

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
}

✅ useCallback What it teaches: How to memoize a function to prevent unnecessary re-renders of child components.

6. memo: Prevent Unnecessary Component Re-Renders

Goal

Use React.memo to prevent re-rendering of function components when their props haven’t changed.

Overview

React.memo is a higher-order component that wraps a function component and memoizes its rendered output. If the component receives the same props as the previous render, React skips rendering and reuses the last rendered result.

This is especially useful for optimizing performance in components that:

Render frequently

Receive the same props repeatedly

Are part of a large list or complex UI

const MemoizedComponent = React.memo(MyComponent)

Example: Memoizing a Task Item Component

import React, { useState } from 'react';

const Child = React.memo(({ name }) => {
  console.log('Child rendered');
  return <p>Hello, {name}</p>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Child name="React" />
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
}

✅ React.memo ensures that TaskItem only re-renders when its task prop changes. This can significantly improve performance in lists or UIs with many child components.

7. useContext: Sharing Global State

Goal

Use useContext to manage global state—such as toggling the theme of the Todo List UI—without prop drilling.

Overview

useContext allows you to access context values directly in any component, avoiding the need to pass props through multiple layers.

To use it:

Create a context with  createContext()

Wrap your component tree with a Context.Provider

Access the context value using useContext(SomeContext)

Example: Theme Switching with Context

import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function ThemedText() {
  const theme = useContext(ThemeContext);
  return <p>The current theme is: {theme}</p>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedText />
    </ThemeContext.Provider>
  );
}

✅ useContext is used here to share and update the theme across components without prop drilling.

8. useReducer: Manage Complex State Logic

Goal

Use useReducer to manage more complex state transitions—such as toggling task completion or handling multiple action types—in a predictable and scalable way.

Overview

useReducer is an alternative to useState for managing state. It’s especially useful when:

The state logic is complex (e.g. involves multiple sub-values or actions)

The next state depends on the previous one

You want to centralize state updates in a single function (the reducer)

const [state, dispatch] = useReducer(reducer, initialState)

reducer is a pure function that takes the current state and an action, and returns the new state.

dispatch is used to send actions to the reducer.

Example: Managing Tasks with useReducer

import React, { useReducer } from 'react';
function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'sub':
      return state - 1;
    default:
      return state;
  }
}
function CounterReducer() {
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={() => dispatch({ type: 'add' })}>+1</button>
      <button onClick={() => dispatch({ type: 'sub' })}>-1</button>
    </div>
  );
}

✅ useReducer helps you manage task state updates in a centralized and predictable way. Actions like adding or toggling tasks are dispatched to the reducer, which handles the logic for updating the state.



Using and Abstracting Fetch Requests in React

✅ 1. What is the Fetch API?

The Fetch API lets you make HTTP requests (like GET or POST) in the browser. It’s modern, promise-based, and works well with async/await.

Key points:

Returns a Promise.

Doesn’t send cookies by default.

Doesn’t throw errors for HTTP status codes (like 404).

You must manually parse the response using .json() or .text().

2. Basic Usage

GET Request

fetch('https://api.example.com/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Fetch failed:', err));

POST Request

fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Fetch failed:', err));

3. Headers and Body

fetch('https://api.example.com/submit', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'John', age: 30 }),
});



4. Handling Responses

Use .json(), .text(), etc., to parse the response. Always check response.ok to catch HTTP errors:

fetch('https://api.example.com/data')
  .then(res => {
    if (!res.ok) throw new Error('HTTP error');
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error('Fetch error:', err));

5. Error Handling

Fetch only rejects on network-level failures (e.g., no internet). HTTP errors like 404 or 500 won’t trigger .catch() unless you throw manually.

Best practices:

Always check response.ok.

Use .catch() to handle unexpected errors.

fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Response failed');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error during fetch operation:', error);
  });


6. Example: Using Fetch in a React Component

import React, { useEffect, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? '✅' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;


Abstracting Fetch Requests in Real-World React Projects

In real-world applications, it's common to make multiple HTTP requests throughout your app. To avoid repeating boilerplate code—like setting headers, handling errors, and parsing responses—you can encapsulate fetch logic into a reusable utility function.

✅ Basic Example: fetchWithToken

const fetchWithToken = async (url, options = {}) => {
  const token = localStorage.getItem('token'); // Assume token is stored in localStorage

  if (!token) {
    throw new Error('No token available.');
  }

  // Default headers
  const defaultHeaders = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // Merge custom headers
  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  // Build fetch options
  const fetchOptions = {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const response = await fetch(url, fetchOptions);

    // Handle HTTP errors
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or unauthorized
        throw new Error('Token expired. Please log in again.');
      }
      throw new Error(`Request failed with status: ${response.status}`);
    }

    // Parse response based on content type
    const contentType = response.headers.get('Content-Type');

    if (contentType?.includes('application/json')) {
      return await response.json();
    }

    if (contentType?.includes('application/octet-stream')) {
      return await response.blob();
    }

    return await response.text();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Re-throw for caller to handle
  }
};

📦 Usage Example

const fetchData = async () => {
  try {
    const data = await fetchWithToken('https://api.example.com/data', {
      method: 'GET',
      headers: {
        'Custom-Header': 'custom-value',
      },
    });

    console.log(data);
  } catch (error) {
    console.error('Request failed:', error);
  }
};

fetchData();


🧠 Summary

By abstracting fetch into a utility like fetchWithToken, you:

Centralize token handling and error logic

Avoid repeating headers and response parsing

Make your components cleaner and easier to maintain

✅ Final Thoughts

At this point, we've successfully built a complete Todo List application using:

Core React hooks like useState, useEffect, useReducer, and useRef

The native Fetch API for making HTTP requests

import React, { useEffect, useReducer, useRef, useState, useCallback } from 'react';
import { fetchData } from './utils/api';
import TodoItem from './components/TodoItem';

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task
      );
    default:
      return state;
  }
}

function TodoList() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetchData('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(data => dispatch({ type: 'SET_TASKS', payload: data }))
      .catch(err => console.error('Error fetching tasks:', err))
      .finally(() => setLoading(false));
  }, []);

  const addTask = () => {
    const title = inputRef.current?.value.trim();
    if (!title) return;

    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
    inputRef.current.value = '';
  };

  // 使用 useCallback 保证函数引用稳定
  const toggleTask = useCallback((task) => {
    dispatch({ type: 'TOGGLE_TASK', payload: task });
  }, []);

  return (
    <div style={{ padding: '1rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>Todo List</h2>
      <input ref={inputRef} type="text" placeholder="Enter new task" />
      <button onClick={addTask}>Add Task</button>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <TodoItem key={task.id} task={task} onToggle={toggleTask} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;


import React from 'react';

const TodoItem = React.memo(({ task, onToggle }) => {
  return (
    <li
      onClick={() => onToggle(task)}
      style={{
        cursor: 'pointer',
        textDecoration: task.completed ? 'line-through' : 'none',
        margin: '0.5rem 0',
      }}
    >
      {task.title}
    </li>
  );
});

export default TodoItem;

Here are some useful reference links for the React training course:

React Hooks Documentation:
https://react.dev/reference/react/hooks 

React Use (Collection of React Hooks):
https://github.com/streamich/react-use 

Fetch API (MDN Web Docs):
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API 
