import { useState, useCallback, memo } from 'react';

const ChildWithoutMemo = ({ label, onClick }: { label: string; onClick: () => void }) => {
  console.log(`Рендер: ${label} без memo`);
  return <button onClick={onClick}>{label}</button>;
};

const ChildWithMemo = memo(({ label, onClick }: { label: string; onClick: () => void }) => {
  console.log(`Рендер: ${label} с memo`);
  return <button onClick={onClick}>{label}</button>;
});

export default function ReactMemoDemo() {
  const [count, setCount] = useState(0);
  const [unrelated, setUnrelated] = useState(0);

  const handleWithoutMemo = () => {
    console.log('Без useCallback');
  };

  const handleWithMemo = useCallback(() => {
    console.log('С useCallback');
  }, []);

  console.log('Рендер родителя');

  return (
    <div>
      <h2>1.6 - React.memo</h2>
      <p>Счётчик родителя (не влияет на дочерние): {count}</p>
      <button onClick={() => setCount(count1 => count1 + 1)}>Изменить счётчик родителя</button>
      <button onClick={() => setUnrelated(count2 => count2 + 1)}>Несвязанное состояние: {unrelated}</button>

      <hr />
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div>
          <h3>Без memo:</h3>
          <ChildWithoutMemo label="Кликни меня" onClick={handleWithoutMemo} />
        </div>
        <div>
          <h3>С memo + useCallback:</h3>
          <ChildWithMemo label="Кликни меня" onClick={handleWithMemo} />
        </div>
        <div>
          <h3>С memo + БЕЗ useCallback:</h3>
          <ChildWithMemo label="Кликни меня" onClick={handleWithoutMemo} />
        </div>
      </div>
    </div>
  );
}