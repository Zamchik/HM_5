import { useState, useMemo, useCallback } from 'react'

const generateRandomArray = (count: number = 5): number[] => {
  console.log('Генерация нового массива (дорогая операция)');
  return Array.from(
    { length: count }, () => Math.floor(Math.random() * 100) + 1
  );
};

const computeSum = (arr: number[]): number => {
  console.log('Вычисление суммы (useMemo сработал)');
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};


export default function UseMemo() {
  const [numbers, setNumbers] = useState<number[]>(() => generateRandomArray());
  const [otherState, setOtherState] = useState(0);

  // useMemo — вычисляем сумму ТОЛЬКО если изменился массив numbers
  const total = useMemo(() => computeSum(numbers), [numbers]);

  // Генерация нового массива
  const regenerateArray = useCallback(() => {
    setNumbers(generateRandomArray());
  }, []);

  return (
    <div>
      <h2>1.3 — useMemo</h2>
      <p>
        <button onClick={regenerateArray}>Сгенерировать новый массив</button>
        <button onClick={() => setOtherState(s => s + 1)}>
          Несвязанное состояние: {otherState}
        </button>
      </p>

      <div style={{ background: '#f4f4f4', padding: '12px', borderRadius: '8px' }}>
        <strong>Массив чисел: [{numbers.join(', ')}]</strong> 
      </div>

      <div style={{ marginTop: '12px' }}>
        <strong>Сумма всех чисел: {total}</strong>
      </div>
      <hr />
    </div>
  );
}