import { useState } from 'react';
import { useInterval } from '../hooks/useInterval';

interface TimerItemProps {
  name: string;
  totalSeconds: number;
  onDelete: () => void;
}

export default function TimerItem({ name, totalSeconds, onDelete }: TimerItemProps) {
  const [remaining, setRemaining] = useState(totalSeconds * 1000);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useInterval(() => {
    setRemaining(r => {
      if (r <= 10) {
        setIsRunning(false);
        setIsFinished(true);
        return 0;
      }
      return r - 10;
    });
  }, isRunning ? 10 : null);

  const toggle = () => {
    if (remaining === 0) {
      setRemaining(totalSeconds * 1000);
      setIsFinished(false);
    }
    setIsRunning(r => !r);
  };

  const reset = () => {
    setIsRunning(false);
    setRemaining(totalSeconds * 1000);
    setIsFinished(false);
  };

  const formatTime = (ms: number): string => {
    const totalSec = Math.ceil(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = totalSeconds > 0 
    ? ((totalSeconds * 1000 - remaining) / (totalSeconds * 1000)) * 100 
    : 0;

  return (
    <div className={`timer-item ${isFinished ? 'finished' : ''}`}>
      <div className="timer-info">
        <span className="timer-name">{name}</span>
        <span className="timer-remaining">{formatTime(remaining)}</span>
      </div>
      
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="timer-controls">
        <button onClick={toggle}>
          {isFinished ? '↺' : isRunning ? '⏸' : '▶'}
        </button>
        <button onClick={reset}>↺</button>
        <button onClick={onDelete}>✕</button>
      </div>
    </div>
  );
}