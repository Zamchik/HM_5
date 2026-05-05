import { useReducer, useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number };

const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

export default function UseReducerTodo() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input.trim() });
      setInput('');
    }
  };

  const handleToggle = (id: number) => dispatch({ type: 'TOGGLE_TODO', payload: id });
  const handleDelete = (id: number) => dispatch({ type: 'DELETE_TODO', payload: id });

  return (
    <div>
      <h2>1.5 - useReducer</h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Новая задача..."
          style={{ flex: 1, padding: '8px' }}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button onClick={handleAdd}>Добавить</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 0',
              borderBottom: '1px solid #eee',
            }}
          >
            <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo.id)} />
            <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)}>Удалить</button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p style={{ color: '#888' }}>Нет задач. Добавьте первую</p>}
    </div>
  );
}