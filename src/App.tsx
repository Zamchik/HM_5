import { useState } from 'react'
import UseContextTheme from './tasks/1.1-ThemeContext/UseThemeContext'
import { ThemeProvider } from './tasks/1.1-ThemeContext/ThemeContext'
import UseCallbackCounter from './tasks/1.2-UseCallbackCounter/UseCallbackCounter'
import UseMemo from './tasks/1.3-UseMemo/UseMemo'

const TASKS = [
  { id: '1.1', label: '1.1 useContext', component: <ThemeProvider><UseContextTheme /></ThemeProvider> },
  { id: '1.2', label: '1.2 useCallback', component: <UseCallbackCounter /> },
  { id: '1.3', label: '1.3 useMemo',       component: <UseMemo /> },
  // { id: '1.4', label: '1.4 useRef',        component: <UseRefDemo /> },
  // { id: '1.5', label: '1.5 useReducer',    component: <UseReducerTodo /> },
  // { id: '1.6', label: '1.6 React.memo',    component: <ReactMemoDemo /> },
  // { id: '1.7', label: '1.7 Бонус',         component: <CombinedHooks /> },
  // { id: '2.1', label: '2.1 Bad Form',      component: <BadForm /> },
  // { id: '2.2', label: '2.2 RHF + Zod',     component: <GoodFormRHF /> },
  // { id: '2.3', label: '2.3 Formik + Yup',  component: <GoodFormFormik /> },
]

export default function App() {
  const [active, setActive] = useState('1.1')
  const task = TASKS.find(t => t.id === active)

  return (
    <div>
      <h1>ДЗ #3 — React Хуки + Формы</h1>
      <nav>
        {TASKS.map(t => (
          <button
            key={t.id}
            className={active === t.id ? 'active' : ''}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <div className="task-card">{task?.component}</div>
    </div>
  )
}