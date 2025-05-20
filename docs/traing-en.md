Build a Todo List App using React's commonly used hooks and the Fetch API

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

export default function Counter() {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)

  function handleClick() {
    setCount(count + 1)
    setShow(!show)
  }

  console.info('render', count, show)

  return (
    <div>
      <button type="button" onClick={handleClick}>
        You pressed me {count} times
      </button>
    </div>
  )
}


Managing Complex State (e.g. Arrays)

function TodoList() {
  const [tasks, setTasks] = useState<IItem[]>([])

  const addTask = (taskName: string) => {
    setTasks([
      ...tasks,
      { id: Math.floor(Math.random() * 100), title: taskName, completed: false }
    ])
  }
  console.info(tasks)
  return (
    <div>
      <Counter />
      <h2>Todo List</h2>
      <button type="button" onClick={() => addTask('New Task')}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.id}: {task.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList

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

Example: 

Simulating Data Fetching

lifecycle

subscriptions

// Simulate fetching data from a server
const initialTasks: IItem[] = [
  { id: 1, title: 'task 1', completed: false },
  { id: 2, title: 'task 2', completed: true }
]

function TodoList() {
  const [tasks, setTasks] = useState<IItem[]>([])

  const addTask = (taskName: string) => {
    setTasks([
      ...tasks,
      { id: Math.floor(Math.random() * 100), title: taskName, completed: false }
    ])
  }

  useEffect(() => {
    setTasks(initialTasks)
    console.log('component mounted')
    return () => {
      console.log('component unmount')
    }
  }, []) // Run only once on mount

  useEffect(() => {
    console.info(tasks.length)
  }, [tasks.length]) // Run when task count changes

  return (
    <div>
      <h2>Todo List</h2>
      <button type="button" onClick={() => addTask('New Task')}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.id}: {task.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default TodoList

✅ useEffect is used here to simulate loading initial data when the component mounts, and to log the number of tasks whenever it changes.

3. useContext: Sharing Global State

Goal

Use useContext to manage global state—such as toggling the theme of the Todo List UI—without prop drilling.

Overview

useContext allows you to access context values directly in any component, avoiding the need to pass props through multiple layers.

To use it:

Create a context with createContext()

Wrap your component tree with a Context.Provider

Access the context value using useContext(SomeContext)

Example: Theme Switching with Context

import React, { useState, createContext, useContext } from 'react'

const ThemeContext = createContext()

function Root() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeSwitcher />
      <TodoList />
    </ThemeContext.Provider>
  )
}

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div>
      <button type="button" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  )
}

function TodoList() {
  const { theme } = useContext(ThemeContext)

  const listStyle =
    theme === 'light'
      ? { backgroundColor: '#fff', color: '#000' }
      : { backgroundColor: '#333', color: '#fff' }

  return (
    <div style={listStyle}>
      <h2>Todo List</h2>
    </div>
  )
}

export default Root

✅ useContext is used here to share and update the theme across components without prop drilling.

4. useRef: Accessing DOM Elements or Persistent Values

Goal

Use useRef to reference a DOM element (e.g., an input field) and persist values across renders without triggering re-renders.

Overview

useRef serves two main purposes:

Accessing DOM nodes (like document.querySelector)

Storing mutable values that persist across renders but don’t cause re-renders when updated

Unlike useState, updating a ref does not trigger a component re-render.

Example: Auto-Focus and Clear Input Field

import React, { useState, useRef } from 'react'

function TodoList() {
  const [tasks, setTasks] = useState([])
  const inputRef = useRef(null)

  const addTask = () => {
    const inputValue = inputRef.current?.value
    if (!inputValue) return
    setTasks([
      ...tasks,
      { id: Math.floor(Math.random() * 100), title: inputValue, completed: false }
    ])

    inputRef.current.value = ''
  }

  return (
    <div>
      <h2>Todo List</h2>
      <input ref={inputRef} type="text" placeholder="Enter a new task" />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList


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

5. useMemo: Optimize Expensive Calculations

Goal

Use useMemo to avoid unnecessary recalculations—especially when dealing with derived data like filtered lists.

Overview

useMemo lets you memoize the result of a computation. It only recalculates the value when one of its dependencies changes.

const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])


Example: Memoizing Incomplete Todos

import React, { useState, useMemo } from 'react'

function TodoApp() {
    
  const { theme } = useContext(ThemeContext) 
  const listStyle = theme === 'light' ? { backgroundColor: '#fff', color: '#000' } : { backgroundColor: '#333', color: '#fff' }
  
  const toggleCompletion = (index: number) => {
    const updatedTodos = [...tasks]
    updatedTodos[index].completed = !updatedTodos[index].completed
    setTasks(updatedTodos)
  }

  // change theme will re-calc
  const completedTasks =  tasks.filter(task => task.completed)
  const completedTasks = () => {
    console.info('re-calc')
    return tasks.filter(task => task.completed)
  }
  
  //Switching themes will not recalculate
  const completedTasks = useMemo(() => {
    console.info('re-calc')
    return tasks.filter(task => task.completed)
  }, [tasks])

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {incompleteTodos.map((todo, index) => (
          <li key={index} onClick={() => toggleCompletion(index)}>
            {todo.text} {todo.completed ? '✓' : ''}
          </li>
        ))}
      </ul>
      <p>
        已完成任务数量：
        {completedTasks.length}
        {completedTasks().length}
      </p>
    </div>
  )
}

export default TodoApp


✅ useMemo ensures the filtered list of incomplete todos is only recalculated when the todos array changes.

6. useCallback: Memoize Functions to Prevent Re-Creation

Goal

Use useCallback to memoize functions so they aren’t recreated on every render—especially useful when passing callbacks to child components.

Overview

useCallback returns a memoized version of a callback function. It only changes if one of its dependencies changes. This helps avoid unnecessary re-renders in child components that rely on reference equality.

const memoizedCallback = useCallback(() => {
  doSomething()
}, [dependency])

Example: Memoizing a Toggle Handler


import React, { useState, useMemo, useCallback } from 'react'

function TodoApp() {

  const toggleCompletion = useCallback((index) => {
    const updated = [...todos]
    updated[index].completed = !updated[index].completed
    setTodos(updated)
  }, [todos])

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {incompleteTodos.map((todo, index) => (
          <li key={index} onClick={() => toggleCompletion(index)}>
            {todo.text} {todo.completed ? '✓' : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoApp



✅ useCallback ensures toggleCompletion is only recreated when todos changes, improving performance when passed to memoized child components.

7. memo: Prevent Unnecessary Component Re-Renders

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

interface IProps {
  toggleCompletion: (task: IItem) => void
  task: IItem
}

// Memoized task item component
const TaskItem = memo((props: IProps) => {
  const { task, toggleCompletion } = props
  console.log('Rendering TaskItem')
  return (
    <li key={task.id} className={task.completed ? styles.completed : ''} onClick={() => toggleCompletion(task)}>
      {task.id}
      :
      {task.title}
    </li>
  )
})

export default TaskItem

function TodoList() {
  const [tasks, setTasks] = useState(['Task 1', 'Task 2'])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    setTasks([...tasks, newTask])
    setNewTask('')
  }
  
  const toggleCompletion = useCallback((task: IItem) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id ? { ...t, completed: !t.completed } : t,
      ),
    )
  }, [])

  return (
    <div>
      <h2>Todo List (reducer)</h2>
      <input ref={inputRef} type="text" placeholder="输入新任务" />
      <button type="button" onClick={() => addTask()}>添加任务</button>
      <ul>
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} toggleCompletion={toggleCompletion} />
        ))}
      </ul>
    </div>
  )
}
export default TodoList

✅ React.memo ensures that TaskItem only re-renders when its task prop changes. This can significantly improve performance in lists or UIs with many child components.

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

import React, { useState, useEffect, useReducer } from 'react';

type Action =
  | { type: 'ADD_TASK', payload: IItem }
  | { type: 'COMPLETE_TASK', payload: IItem }

// Reducer 函数
function taskReducer(state: IItem[], action: Action): IItem[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload]
    case 'COMPLETE_TASK':
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task
      )

    default:
      return state
  }
}

function TodoListReducer() {
  const [tasks, dispatch] = useReducer(taskReducer, [])

  const inputRef = useRef<HTMLInputElement>(null)

  const addTask = () => {
    if (!inputRef?.current?.value) {
      return
    }
    const newTask = { id: Math.floor(Math.random() * 100), title: inputRef?.current?.value, completed: false }
    dispatch({ type: 'ADD_TASK', payload: newTask })
    inputRef.current.value = ''
  }

  const toggleCompletion = (task: IItem) => {
    dispatch({ type: 'COMPLETE_TASK', payload: task })
  }

  return (
    <div>
      <h2>Todo List (reducer)</h2>
      <input ref={inputRef} type="text" placeholder="输入新任务" />
      <button type="button" onClick={() => addTask()}>添加任务</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? styles.completed : ''} onClick={() => toggleCompletion(task)}>
            {task.id}
            :
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoListReducer


✅ useReducer helps you manage task state updates in a centralized and predictable way. Actions like adding or toggling tasks are dispatched to the reducer, which handles the logic for updating the state.



Using and Abstracting Fetch Requests in React

1. What is the Fetch API?

The Fetch API is a modern browser interface for making HTTP requests. It returns a Promise, allowing you to handle asynchronous operations using .then() or async/await.

Key Characteristics:

Promise-based: Enables clean, chainable asynchronous code.

No cookies by default: You must explicitly set credentials: 'include' to send cookies.

No automatic rejection on HTTP errors: Fetch only rejects on network failures. You must manually check response.ok.

Manual parsing: You need to explicitly call response.json() or response.text() to parse the response body.

2. Basic Usage

GET Request

fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Fetch failed:', error))

POST Request

fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Fetch failed:', error))

3. Headers and Body

Setting Request Headers

fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json'
  }
})


Sending JSON Body

fetch('https://api.example.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'John', age: 30 }),
});


4. Handling Responses

Use .json(), .text(), etc., to parse the response. Always check response.ok to catch HTTP errors:

fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Fetch error:', error));

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

import React, { useState, useEffect, useReducer, useRef } from 'react';

function TodoListFetch() {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  // Fetch tasks on component mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'SET_TASKS', payload: data });
      })
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const addTask = () => {
    if (!inputRef?.current?.value) return;

    const newTask = {
      id: Math.floor(Math.random() * 100),
      title: inputRef.current.value,
      completed: false,
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
    inputRef.current.value = '';
  };

  const toggleCompletion = (task: IItem) => {
    dispatch({ type: 'COMPLETE_TASK', payload: task });
  };

  return (
    <div>
      <h2>Todo List (useReducer)</h2>
      <input ref={inputRef} type="text" placeholder="Enter new task" />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={task.completed ? styles.completed : ''}
            onClick={() => toggleCompletion(task)}
          >
            {task.id}: {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoListFetch;

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

Here are some useful reference links for the React training course:

React Hooks Documentation:
https://react.dev/reference/react/hooks 

React Use (Collection of React Hooks):
https://github.com/streamich/react-use 

Fetch API (MDN Web Docs):
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API 
