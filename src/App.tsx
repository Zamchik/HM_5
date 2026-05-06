import { useState } from 'react'
import UseContextTheme from './tasks/1.1-useContext/useThemeContext'
import { ThemeProvider } from './tasks/1.1-useContext/themeContext'
import UseCallbackCounter from './tasks/1.2-useCallback/useCallback'
import UseMemo from './tasks/1.3-useMemo/useMemo'
import UseRefFocus from './tasks/1.4-useRef/useRef'
import UseReducerTodo from './tasks/1.5-useReduce/useReduce'
import ReactMemoDemo from './tasks/1.6-ReactMemo/ReactMemo'
import CombinedHooks from './tasks/1.7-CombinedHooks/CombinedHooks'
import BadForm from './tasks/2.1-BadForm/2.1-BadForm'
import GoodFormRHF from './tasks/2.2-GoodFormRHF/GoodFormRHF'

const TASKS = [
  { id: '1.1', label: '1.1 useContext', component: <ThemeProvider><UseContextTheme /></ThemeProvider> },
  { id: '1.2', label: '1.2 useCallback', component: <UseCallbackCounter /> },
  { id: '1.3', label: '1.3 useMemo', component: <UseMemo /> },
  { id: '1.4', label: '1.4 useRef', component: <UseRefFocus /> },
  { id: '1.5', label: '1.5 useReducer', component: <UseReducerTodo /> },
  { id: '1.6', label: '1.6 React.memo', component: <ReactMemoDemo /> },
  { id: '1.7', label: '1.7 CombinedHooks', component: <CombinedHooks /> },
  { id: '2.1', label: '2.1 Bad Form',      component: <BadForm /> },
  { id: '2.2', label: '2.2 RHF + Zod',     component: <GoodFormRHF /> },
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