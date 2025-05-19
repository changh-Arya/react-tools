React Hooks Deep Dive: Building a Todo List App
Introduction
Since modern React development primarily uses function components, it's important to understand how they differ from regular JavaScript functions.

Function Components vs. Regular Functions
Feature

Function Component

Regular JS Function

Return Value

Returns JSX (UI elements)

Returns primitive values or objects

Lifecycle

Can use lifecycle-like behavior via Hooks

No lifecycle awareness

State Management

Uses useState and other Hooks

No built-in state

Props & Context

Receives props and can access context

Only receives arguments

In short, function components are purpose-built for UI rendering in React and come with special capabilities via Hooks.

Why Hooks?
Hooks were introduced to bring powerful features to function components, enabling:

State management with useState

Side effects handling with useEffect

Context access with useContext

Logic reuse via custom Hooks

Hooks make function components more expressive, modular, and easier to test.

Course Goals
By the end of this course, you will:

Understand and apply essential React Hooks: useState, useEffect, useContext, useReducer, useRef, useMemo, useCallback, and memo

Learn how these Hooks interconnect through hands-on examples

Use the native fetch API to call backend services and render data

Build a fully functional Todo List application using Hooks

1. useState: Managing Local Component State
Overview
useState is the most fundamental Hook. It allows you to add state to function components.



const [state, setState] = useState(initialValue)
It returns a pair: the current state value and a function to update it.

Basic Example: Counter


import { useState } from 'react'
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
      <button onClick={handleClick}>
        You pressed me {count} times
      </button>
    </div>
  )
}
Managing Complex State: Todo List


import { useState } from 'react'
import type { IItem } from './type'
import Counter from './Counter'
import styles from './index.module.scss'
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
      <button onClick={() => addTask('New Task')}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? styles.completed : ''}>
            {task.id}: {task.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default TodoList
✅ useState is used here to manage an array of task objects. Clicking the button adds a new task to the list.

2. useEffect: Handling Side Effects
Overview
useEffect lets you perform side effects in function components — such as data fetching, subscriptions, or manually changing the DOM.



useEffect(() => {
  // side effect logic
  return () => {
    // cleanup logic (optional)
  }
}, [dependencies])


import { useEffect, useState } from 'react'
function TodoList() {
  const [tasks, setTasks] = useState<IItem[]>([])
  const addTask = (taskName: string) => {
    setTasks([
      ...tasks,
      { id: Math.floor(Math.random() * 100), title: taskName, completed: false }
    ])
  }
  useEffect(() => {
    // Simulate fetching data from a server
    const initialTasks: IItem[] = [
      { id: 1, title: 'task 1', completed: false },
      { id: 2, title: 'task 2', completed: true }
    ]
    setTasks(initialTasks)
    return () => {
      console.log('component unmounted')
    }
  }, []) // Runs only once on mount
  useEffect(() => {
    console.info(`Task count: ${tasks.length}`)
  }, [tasks.length]) // Runs when task count changes
  return (
    <div>
      <Counter />
      <h2>Todo List</h2>
      <button onClick={() => addTask('New Task')}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? styles.completed : ''}>
            {task.id}: {task.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default TodoList
Example: Load Initial Tasks
✅ useEffect is used to simulate fetching initial data and to log changes in task count.

 

3. useContext: Sharing Global State
Overview
useContext allows you to share state across components without having to pass props manually at every level. It works together with React.createContext() and a Context.Provider to create a global state that can be accessed by any component in the tree.

This is especially useful for managing themes, user authentication, or any other global settings.

Syntax


const MyContext = createContext(defaultValue);
function App() {
  return (
    <MyContext.Provider value={/* some value */}>
      <ChildComponent />
    </MyContext.Provider>
  );
}
function ChildComponent() {
  const contextValue = useContext(MyContext);
  return <div>{contextValue}</div>;
}
Example: Managing Theme in a Todo App


import React, { useState, createContext, useContext } from 'react';
const ThemeContext = createContext(); // Create a context
function Root() {
  const [theme, setTheme] = useState('light'); // Theme state
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeSwitcher />
      <TodoList />
    </ThemeContext.Provider>
  );
}
export default Root;
ThemeSwitcher Component


function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext); // Access context
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };
  return (
    <div>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  );
}
export default ThemeSwitcher;
TodoList Component


function TodoList() {
  const { theme } = useContext(ThemeContext); // Access current theme
  const listStyle =
    theme === 'light'
      ? { backgroundColor: '#fff', color: '#000' }
      : { backgroundColor: '#333', color: '#fff' };
  return (
    <div style={listStyle}>
      <h2>Todo List</h2>
      {/* Task list goes here */}
    </div>
  );
}
export default TodoList;
✅ Summary
useContext is used to access shared state without prop drilling.

It works with Context.Provider to make values available to all child components.

In this example, we used it to manage and toggle the theme of the Todo List UI.

4. useRef: Accessing DOM Elements or Persisting Values Without Re-rendering
Overview
useRef is a Hook that allows you to:

Access and interact with DOM elements directly.

Store mutable values that persist across renders without triggering a re-render.

This makes it ideal for tasks like focusing an input field, storing timers, or keeping track of previous values.

Syntax 


const refContainer = useRef(initialValue);
refContainer.current holds the mutable value or DOM reference.

Updating refContainer.current does not cause a re-render.

Example: Add Tasks with Input Ref


import React, { useState, useRef } from 'react';
function TodoList() {
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the input element
  const addTask = () => {
    if (!inputRef?.current?.value) return;
    setTasks([
      ...tasks,
      {
        id: Math.floor(Math.random() * 100),
        title: inputRef.current.value,
        completed: false,
      },
    ]);
    inputRef.current.value = ''; // Clear input after adding
  };
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
  );
}
export default TodoList;
✅ Summary
useRef is perfect for accessing DOM elements like input fields.

Unlike useState, updating a ref does not trigger a re-render.

In this example, we used useRef to:

Read the input value without binding it to state.

Clear the input field after adding a task.

5. useMemo: Optimize Expensive Calculations
Goal
Use useMemo to optimize performance by memoizing expensive computations—like filtering a list—so they only re-run when necessary.

Overview
useMemo returns a memoized value. It recalculates the result only when one of its dependencies changes. This is useful when you want to avoid recalculating derived data on every render.



const memoizedValue = useMemo(() => computeSomething(data), [data])
Example: Memoizing Incomplete Todos


import React, { useState, useMemo } from 'react'
function TodoApp() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const incompleteTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed)
  }, [todos])
  const addTodo = () => {
    setTodos([...todos, { text: newTodo, completed: false }])
    setNewTodo('')
  }
  const toggleCompletion = (index) => {
    const updated = [...todos]
    updated[index].completed = !updated[index].completed
    setTodos(updated)
  }
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
✅ useMemo ensures the filtered list of incomplete todos is only recalculated when the todos array changes, improving performance in large lists.

6. useCallback: Memoize Functions to Prevent Re-Creation
Goal
Use useCallback to memoize functions so they aren’t recreated on every render—especially useful when passing callbacks to child components.

Overview
useCallback returns a memoized version of a callback function. It only changes if one of its dependencies changes.



const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
Example: Memoizing a Toggle Handler


const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
✅ useCallback ensures toggleCompletion is only recreated when todos changes, which can help avoid unnecessary re-renders in child components.

7. memo: Prevent Unnecessary Component Re-Renders
Goal
Use React.memo to optimize functional components by preventing re-renders when props haven’t changed.

Overview
memo is a higher-order component that wraps a function component and memoizes its output. It only re-renders the component if its props change.



const MemoizedComponent = React.memo(MyComponent)
Example: Memoizing a Task Item Component


import React, { memo } from 'react';
const TaskItem = memo(({ task }) => {
  console.log('Rendering TaskItem');
  return <li>{task}</li>;
});
function TodoList() {
  const [tasks, setTasks] = useState(['任务1', '任务2']);
  const [newTask, setNewTask] = useState('');
  const addTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask('');
  };
  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="输入新任务"
      />
      <button onClick={addTask}>添加任务</button>
      <ul>
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} />
        ))}
      </ul>
    </div>
  );
}
export default TodoList;
✅ React.memo prevents TaskItem from re-rendering unless its task prop changes, which is especially useful in lists or performance-sensitive UIs.

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

Example: Managing a Todo List with useReducer


import React, { useReducer, useRef } from 'react'
type IItem = {
  id: number
  title: string
  completed: boolean
}
type Action =
  | { type: 'ADD_TASK'; payload: IItem }
  | { type: 'COMPLETE_TASK'; payload: IItem }
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
    const inputValue = inputRef.current?.value
    if (!inputValue) return
    const newTask: IItem = {
      id: Math.floor(Math.random() * 100),
      title: inputValue,
      completed: false
    }
    dispatch({ type: 'ADD_TASK', payload: newTask })
    inputRef.current.value = ''
  }
  const toggleCompletion = (task: IItem) => {
    dispatch({ type: 'COMPLETE_TASK', payload: task })
  }
  return (
    <div>
      <h2>Todo List (Reducer)</h2>
      <input ref={inputRef} type="text" placeholder="Enter a new task" />
      <button type="button" onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            onClick={() => toggleCompletion(task)}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
          >
            {task.id}: {task.title}
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
The Fetch API is a modern browser interface for making HTTP requests. It returns a Promise, which makes it easy to work with using .then() or async/await.

Key characteristics:

Promise-based: Enables clean, chainable async code.

No cookies by default: You need to explicitly set credentials: 'include' if needed.

Doesn’t reject on HTTP errors: You must manually check response.ok.

Manual parsing: You need to call response.json() or similar to extract data.

2. Basic Usage
GET Request


fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Fetch failed:', error));
POST Request


fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ key: 'value' }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Fetch failed:', error));
3. Headers and Body
Setting Headers


fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json',
  },
});
Sending JSON in the Request Body


fetch('https://api.example.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'John', age: 30 }),
});
4. Handling Responses
Use .json(), .text(), etc., to parse the response body. Always check response.ok to catch HTTP errors.



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

Use .catch() to handle network or parsing errors.



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
      <input ref={inputRef} type="text" placeholder="Enter a new task" />
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
✅ Final Thoughts
At this point, we've successfully built a complete Todo List application using:
此时，我们已经使用以下方法成功构建了一个完整的 Todo List 应用程序：

Core React hooks like useState, useEffect, useReducer, and useRef 核心 React 钩子，如 useState、useEffect、useReducer 和 useRef

The native Fetch API for making HTTP requests
nativeFetch API，用于发出 HTTP 请求

A custom fetchWithToken utility to abstract and streamline API calls
一个 customfetchWithToken工具，用于抽象和简化 API 调用

This approach not only keeps your components clean and focused on UI logic, but also promotes code reuse, error consistency, and better separation of concerns.
这种方法不仅可以保持组件干净并专注于 UI 逻辑，还可以促进代码重用、错误一致性和更好的关注点分离。

By combining React's declarative UI model with a well-structured data-fetching strategy, you're now equipped to scale this pattern across larger applications.
通过将 React 的声明式 UI 模型与结构良好的数据获取策略相结合，您现在有能力在更大的应用程序中扩展此模式。
