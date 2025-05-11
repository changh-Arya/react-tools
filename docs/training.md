React 全面 Hooks 课程：构建 Todo List 应用
前言
因为我们今天的hooks都是使用函数式组件，那么我们需要先了解函数式组件与普通js函数的区别
React 的函数式组件与普通 JavaScript 函数的主要区别在于：
1.返回值：函数式组件返回 JSX 元素，而普通函数返回常规数据（如数字或字符串）。
2.生命周期：函数式组件可通过 Hooks 使用生命周期功能，而普通函数没有生命周期。
3.状态管理：函数式组件使用 useState 等 Hooks 管理状态，普通函数则没有状态管理。
4.上下文和 Props：函数式组件接收 props 和 context，而普通函数只接收参数。
总结来说，React 的函数式组件专为 UI 渲染设计，具有 React 特有的功能，而普通 JavaScript 函数用于执行一般逻辑。
react Hooks 的核心目的
Hooks 主要是为了让开发者能够在函数式组件中：
- 管理组件状态（useState）。
- 处理副作用（useEffect）。
- 使用上下文（useContext）。
- 实现自定义逻辑复用（自定义 Hooks）。
通过 Hooks，React 函数式组件得以超越其之前的限制，变得更加灵活、简洁。

课程目标
- 逐步掌握 React 常用 hooks：useState, useEffect, useContext, useReducer, useRef, useMemo, useCallback, memo。
- 每个 hook 之间相互关联，通过实践来掌握它们的。
- 学习在react中使用js原生能力fetch方法call 后端api，拿到返回数据并且展示在界面上。
- 最终通过这些 hooks 完成一个 Todo List 应用。
--------------------------------------------------------------------------------
1. useState：管理组件的本地状态
讲解：
- useState 是 React 中最基本的 hook，用于在函数组件中声明状态。
- 返回一个数组，包含当前状态的值和更新该状态的函数。
示例：
基本用法

const [count, setCount] = useState(0);  // 创建一个名为 count 的状态变量

const handleIncrement = () => {
  setCount(count + 1);  // 更新状态
};

return <button onClick={handleIncrement}>Count: {count}</button>;
复杂类型状态管理

import React, { useState } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]); // 初始化任务列表

  const addTask = (task) => {
    setTasks([...tasks, task]); // 添加新任务
  };

  return (
    <div>
      <h2>Todo List</h2>
      <button onClick={() => addTask('新任务')}>添加任务</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

说明：使用 useState 来管理 tasks（任务列表）的状态，点击按钮时会向列表中添加一个新任务。
--------------------------------------------------------------------------------
2. useEffect：处理副作用（例如数据获取）
讲解：
- useEffect 用于处理副作用，模拟生命周期。
- 接收两个参数，第一个是副作用函数，第二个参数是依赖项。
示例：
jsCopy Code
import React, { useState } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]); // 初始化任务列表

  const addTask = (task) => {
    setTasks([...tasks, task]); // 添加新任务
  };
  
  useEffect(() => {
    // 模拟从服务器加载任务数据
    const initialTasks = ['任务1', '任务2', '任务3'];
    setTasks(initialTasks);
    return ()=>{
        console.log(component unmount)  // 可以用于清除定时器等  
    }
  }, []); // 空数组表示仅在组件挂载时执行一次
  
  useEffect(() => {
    console.info(task.length)
  }, [tasks.length]); 

  return (
    <div>
      <h2>Todo List</h2>
      <button onClick={() => addTask('新任务')}>添加任务</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
说明：useEffect 模拟从服务器加载数据，确保任务数据在组件首次渲染时加载。
--------------------------------------------------------------------------------
3. useContext：共享全局状态
目标：使用 useContext 管理任务的主题（例如，切换任务列表的显示样式）。
讲解：
- useContext 用于跨组件共享状态，避免一层层传递 props。
- useContext 和 Context.Provider 配合使用，可以创建全局共享状态。
示例：

import React, { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext(); // 创建一个上下文

function Root() {
  const [theme, setTheme] = useState('light'); // 任务列表的主题

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeSwitcher /> 
      <TodoList />
    </ThemeContext.Provider>
  );
}

export default Root;

import React, { useContext } from 'react';
import { ThemeContext } from './Root'; // 引入ThemeContext

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext); // 获取主题和设置主题的方法

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
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



function TodoList(
) {
  const { theme } = useContext(ThemeContext); // 获取当前的主题

  // 根据主题设置样式
  const listStyle = theme === 'light' ? { backgroundColor: '#fff', color: '#000' } : { backgroundColor: '#333', color: '#fff' };

  return (
    <div style={listStyle}>
      <h2>Todo List</h2>
    </div>v>
  );
}

export default TodoList;

说明：使用 useContext 来共享和管理主题状态，可以在其他组件中访问和修改主题。
--------------------------------------------------------------------------------
4. useRef：访问 DOM 或保存不引起重新渲染的值
目标：使用 useRef 来引用 DOM 元素，例如自动聚焦输入框。
讲解：
- useRef 用于访问 DOM 元素，或者在组件渲染之间持久化数据。
- 与 useState 不同，useRef 的更新不会导致组件重新渲染。
示例：
jsCopy Code
import React, { useState, useRef, useEffect } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(); // 用于获取输入框的引用

  const addTask = () => {
    setTasks([...tasks, inputRef.current.value]);
    inputRef.current.value = ''; // 清空输入框
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input ref={inputRef} type="text" placeholder="输入新任务" />
      <button onClick={addTask}>添加任务</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

说明：使用 useRef 引用输入框，实现自动清空输入框内容。
--------------------------------------------------------------------------------
5. useMemo：性能优化，避免重复计算
目标：使用 useMemo 优化性能，避免不必要的任务列表重新计算。
讲解：
- useMemo 用于缓存计算结果，只有依赖项变化时才重新计算。
示例：
import React, { useState, useMemo } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // 使用 useMemo 缓存未完成的 Todo
  const incompleteTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const addTodo = () => {
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const toggleCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

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
  );
}

export default TodoApp;

说明：使用 useMemo 来缓存任务数量的计算结果，只有任务列表发生变化时才重新计算。
--------------------------------------------------------------------------------
6. useCallback：避免不必要的函数重创建
目标：使用 useCallback 避免不必要的函数重创建，优化性能。
讲解：
- useCallback 用于 memoize 回调函数，避免每次渲染时都创建新的函数实例。
示例：
import React, { useState, useMemo, useCallback } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo('');
  };

  // 使用 useMemo 缓存未完成的 Todo
  const incompleteTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  // 使用 useCallback 缓存 toggleCompletion 函数
  const toggleCompletion = useCallback((index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  }, [todos]);

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
  );
}

export default TodoApp;

说明：useCallback 确保只有当 newTask 变化时，addTask 函数才会重新创建，避免不必要的性能损耗。
--------------------------------------------------------------------------------
7. memo：优化函数组件的渲染
目标：使用 memo 来优化组件的渲染，避免不必要的更新。
讲解：
- memo 是一个高阶组件，用来优化函数组件，只在组件的 props 变化时重新渲染。
示例：
jsCopy Code
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

8. useReducer：管理复杂状态
目标：使用 useReducer 来处理任务列表中的复杂状态变更，例如删除任务或标记任务完成。
讲解：
- useReducer 比 useState 更适合处理复杂的状态逻辑。
- 它接收一个 reducer 函数和初始状态，用于更新状态。
示例：
import React, { useState, useEffect, useReducer } from 'react';

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'REMOVE_TASK':
      return state.filter((task) => task !== action.payload);
    default:
      return state;
  }
};

function TodoList() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    dispatch({ type: 'ADD_TASK', payload: newTask });
    setNewTask('');
  };

  const removeTask = (task) => {
    dispatch({ type: 'REMOVE_TASK', payload: task });
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
          <li key={index}>
            {task} <button onClick={() => removeTask(task)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

说明：使用 useReducer 来处理任务的添加和删除操作，通过 dispatch 触发 action。

React 中 Fetch 请求的使用与封装
1. 什么是 Fetch API
fetch 是一种现代化的浏览器 API，用于执行 HTTP 请求。它返回一个 Promise 对象，因此可以使用 then 或 async/await 语法进行处理。
特点是：
- Promise-based：链式调用处理异步操作
- 默认不带cookie，需要显式设置credentials：'include'
- http错误不触发reject，需要手动添加reponse.ok
- 返回数据需要手动response.json()
2. 基本用法
GET 请求：

fetch('https://api.example.com/data')
  .then(response => response.json())  // 解析 JSON 响应
  .then(data => console.log(data))    // 处理数据
  .catch(error => console.error('请求失败', error)); // 错误处理

POST 请求：

fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })  // 请求体数据
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('请求失败', error));
请求头与请求体
- 如何设置请求头（Headers）：
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json'
  }
});
请求体（Body）：发送 JSON 数据、表单数据等。据等。
fetch('https://api.example.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'John', age: 30 })
});

处理响应
- 处理响应数据：如何使用 response.json()、response.text() 等方法解析响应数据。
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('There was a problem with your fetch operation:', error));
处理错误
fetch API 的一个特性是，它只会在网络请求失败时（例如无法连接服务器）触发 reject，而 HTTP 错误状态码（例如 404 或 500）不会自动导致 fetch 请求被拒绝。需要手动检查 response.ok 属性来判断请求是否成功。
- 错误处理的最佳实践：使用catch 处理 Promise 错误。
- 常见错误场景：网络错误、响应状态码错误等。
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
     // 如果响应的状态码不是 2xx，会抛出一个错误
      throw new Error('Response failed');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error during fetch operation:', error);
  })

fetch应用项目中的例子
import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // 获取任务列表
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')  // 假设这是你的 API 地址
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);  // 依赖数组为空，意味着组件首次渲染时获取数据

  // 添加任务
  const addTodo = () => {
    if (newTodo.trim() === "") return;

    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTodo,
        completed: false
      }),
    })
      .then(response => response.json())
      .then(data => {
        setTodos([...todos, data]);
        setNewTodo("");  // 清空输入框
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  // 删除任务
  const deleteTodo = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="New task"
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

当然，在真正的项目中，为了避免重复代码，我们可以将 fetch封装成一个工具函数，统一处理请求头、错误和响应。
基本示例：

const fetchWithToken = async (url, options = {}) => {
    const token = localStorage.getItem('token'); // 假设 Token 存储在 localStorage 中
    if (!token) {
        throw new Error('No token available.');
    }

    // 默认请求头
    const defaultHeaders = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    };

    // 合并传入的特殊请求头
    const headers = {
        ...defaultHeaders,
        ...options.headers  // 可以传入额外的请求头
    };

    // 处理请求选项
    const fetchOptions = {
        method: options.method || 'GET',  // 默认 GET 请求
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined  // POST 请求时的请求体
    };

    try {
        const response = await fetch(url, fetchOptions);

        // 如果响应状态码不是200，抛出错误
        if (!response.ok) {
            // 处理 Token 过期的情况（假设返回401时 Token 过期）
            if (response.status === 401) {
                // 在这里处理 Token 过期的情况，比如重定向到登录页面或刷新 Token
                throw new Error('Token expired. Please log in again.');
            }
            throw new Error(`Request failed with status: ${response.status}`);
        }

        // 处理不同类型的响应数据
        const contentType = response.headers.get('Content-Type');

        // 如果返回的是 JSON
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }

        // 如果返回的是 Blob 类型（如图片、文件等）
        if (contentType && contentType.includes('application/octet-stream')) {
            return await response.blob();
        }

        // 默认返回文本
        return await response.text();
    } catch (error) {
        console.error('请求失败:', error);
        throw error;  // 将错误抛出，方便调用者处理
    }
};

// 使用示例：
const fetchData = async () => {
    try {
        const data = await fetchWithToken('https://api.example.com/data', {
            method: 'GET',  // 可以根据需要修改请求方法
            headers: {
                'Custom-Header': 'custom-value'  // 可以传入特殊的请求头
            }
        });
        console.log(data);
    } catch (error) {
        console.error('请求出错:', error);
    }
};

fetchData();
总结：
通过这堂课，最终我们已经使用 React 的多个 hooks 和fetch逐步完成了一个完整的 Todo List 应用
