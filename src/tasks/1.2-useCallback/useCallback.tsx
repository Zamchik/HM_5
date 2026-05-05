import React, { useState, useCallback } from 'react';

const ActionButton = React.memo(({ onClick, label }: { onClick: () => void; label: string }) => {
    console.log(`Рендер кнопки "${label}"`);
    return <button onClick={onClick}>{label}</button>;
});

export default function UseCallbackCounter() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [otherState, setOtherState] = useState(false);

    // useCallback — функция будет той же самой между рендерами (пока нет зависимостей)
    const incrementMemoized = useCallback(() => {
        setCount1(c => c + 1);
    }, []); // зависимостей нет — функция никогда не меняется

    // Без useCallback — каждый рендер компонента создаёт новую функцию
    const incrementNotMemoized = () => {
        setCount2(c => c + 1);
    };

    return (
        <div>
            <h2>1.2 - useCallback</h2>
            <h2>Счётчик 1: мемоизированный колбэк {count1}</h2>
            <h2>Счётчик 2: немемоизированный колбэк {count2}</h2>
            <p>Другое состояние (для провокации рендера): {otherState ? 'true' : 'false'}</p>
            <button onClick={() => setOtherState(prev => !prev)}>
                Переключить другое состояние
            </button>
            <hr />
            <h3>Кнопки изменения счётчиков:</h3>
            {/* не перерисовывается при изменении otherState */}
            <ActionButton onClick={incrementMemoized} label="useCallback (мемоизирован)" />
            {/*перерисовывается при каждом рендере родителя */}
            <ActionButton onClick={incrementNotMemoized} label="Без useCallback (новый колбэк)" />
            <hr />
        </div>
    );
};