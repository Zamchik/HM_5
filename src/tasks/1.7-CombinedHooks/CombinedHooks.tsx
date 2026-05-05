import { useReducer, useMemo, useCallback, useContext, createContext, memo, useState } from 'react';

// Типы и состояния
type Item = {
  id: number;
  name: string;
  completed: boolean;
};

type State = {
  items: Item[];
};

type Action =
  | { type: 'ADD_ITEM'; payload: string }
  | { type: 'TOGGLE_ITEM'; payload: number }
  | { type: 'DELETE_ITEM'; payload: number };

// Редюсер для управления списком
const itemReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        items: [
          ...state.items,
          { id: Date.now(), name: action.payload, completed: false },
        ],
      };
    case 'TOGGLE_ITEM':
      return {
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, completed: !item.completed } : item
        ),
      };
    case 'DELETE_ITEM':
      return {
        items: state.items.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

// Контекст для фильтра и темы
type FilterContextType = {
  search: string;
  setSearch: (value: string) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Дочерние компоненты (мемоизированные)

// Форма добавления
const AddItemForm = memo(({ onAdd }: { onAdd: (name: string) => void }) => {
  const [input, setInput] = useState('');
  console.log('Рендер AddItemForm');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Новый элемент..."
      />
      <button type="submit">Добавить</button>
    </form>
  );
});

// Один элемент списка (тоже мемоизирован)
const TodoItem = memo(({ item, onToggle, onDelete }: { item: Item; onToggle: (id: number) => void; onDelete: (id: number) => void }) => {
  console.log(`Рендер TodoItem: ${item.name}`);
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
      <input type="checkbox" checked={item.completed} onChange={() => onToggle(item.id)} />
      <span style={{ flex: 1, textDecoration: item.completed ? 'line-through' : 'none' }}>
        {item.name}
      </span>
      <button onClick={() => onDelete(item.id)}>Удалить</button>
    </li>
  );
});

// Список элементов (мемоизирован, зависит от отфильтрованных данных и колбэков)
const ItemList = memo(({ items, onToggle, onDelete }: { items: Item[]; onToggle: (id: number) => void; onDelete: (id: number) => void }) => {
  console.log('Рендер ItemList');
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map(item => (
        <TodoItem key={item.id} item={item} onToggle={onToggle} onDelete={onDelete} />
      ))}
      {items.length === 0 && <p>Нет элементов</p>}
    </ul>
  );
});

// Компонент отображения темы и фильтра (использует контекст)
const Controls = memo(() => {
  const filterCtx = useContext(FilterContext);
  const themeCtx = useContext(ThemeContext);
  console.log('Рендер Controls');

  if (!filterCtx || !themeCtx) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <input
        type="text"
        placeholder="Поиск..."
        value={filterCtx.search}
        onChange={(e) => filterCtx.setSearch(e.target.value)}
        style={{ padding: '6px', width: '200px' }}
      />
      <button onClick={themeCtx.toggleTheme}>
        Тема: {themeCtx.theme === 'light' ? 'Светлая тема' : 'Темная тема'}
      </button>
    </div>
  );
});

// Основной компонент со всеми хуками
export default function BonusApp() {
  const [state, dispatch] = useReducer(itemReducer, { items: initialItems });
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // useCallback для действий (чтобы передавать в мемоизированные дочерние компоненты)
  const handleAdd = useCallback((name: string) => {
    dispatch({ type: 'ADD_ITEM', payload: name });
  }, []);

  const handleToggle = useCallback((id: number) => {
    dispatch({ type: 'TOGGLE_ITEM', payload: id });
  }, []);

  const handleDelete = useCallback((id: number) => {
    dispatch({ type: 'DELETE_ITEM', payload: id });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // useMemo – фильтрация списка по поисковому запросу (без лишних пересчётов)
  const filteredItems = useMemo(() => {
    console.log('Фильтрация списка...');
    if (!search.trim()) return state.items;
    return state.items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [state.items, search]);

  // Контекстные значения
  const filterValue = { search, setSearch };
  const themeValue = { theme, toggleTheme };

  // Стили в зависимости от темы
  const bgColor = theme === 'light' ? '#fff' : '#222';
  const textColor = theme === 'light' ? '#000' : '#fff';

  return (
    <ThemeContext.Provider value={themeValue}>
      <FilterContext.Provider value={filterValue}>
        <div style={{ padding: '16px', backgroundColor: bgColor, color: textColor, minHeight: '100vh' }}>
          <h2>1.7 - CombinedHooks</h2>
          <Controls />
          <AddItemForm onAdd={handleAdd} />
          <ItemList items={filteredItems} onToggle={handleToggle} onDelete={handleDelete} />
        </div>
      </FilterContext.Provider>
    </ThemeContext.Provider>
  );
}

// Начальные данные
const initialItems: Item[] = [
  { id: 1, name: 'Изучить useReducer', completed: true },
  { id: 2, name: 'Разобраться с useMemo', completed: false },
  { id: 3, name: 'Сделать бонусное задание', completed: false },
];