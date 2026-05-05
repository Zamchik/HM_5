import { useRef, useState, useEffect } from 'react';

export default function UseRefFocus() {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const prevTextRef = useRef<string>("")


    useEffect(() => {
        prevTextRef.current = value
    }, [value]);

    const handleFocusClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div>
            <h2>1.4 - useRef (фокус и предыдущее значение)</h2>
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Введите что-нибудб"
                style={{ padding: '8px', width: '250px' }}
            />
            <button onClick={handleFocusClick} style={{ marginLeft: '8px', padding: '8px 16px' }}>
                Установить фокус
            </button>
            <div style={{ marginTop: '16px' }}>
                <p><strong>Текущее значение:</strong> {value || '(пусто)'}</p>
                <p><strong>Предыдущее значение:</strong> {prevTextRef.current || '(нет предыдущего)'}</p>
            </div>
        </div>
    );
}