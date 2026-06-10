import { useState, useEffect, useRef } from 'react';

export function useCountUp(target: number, duration = 450): number {
  const [value, setValue] = useState(target);
  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    const from = valueRef.current;
    if (from === target) return;
    const start = performance.now();
    const id = setInterval(() => {
      const p = Math.min(1, (performance.now() - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      if (p >= 1) {
        setValue(target);
        clearInterval(id);
      } else {
        setValue(from + (target - from) * eased);
      }
    }, 16);
    return () => clearInterval(id);
  }, [target, duration]);

  return value;
}
