import { useCallback, useState } from 'react';

/**
 * 获取当前时间的 hooks
 */
export default function useTime(initialTime: Date = new Date()): [Date, () => void] {
  const [time, setDate] = useState(initialTime);
  const refresh = useCallback(() => {
    setDate(new Date());
  }, [setDate]);

  return [time, refresh];
}
