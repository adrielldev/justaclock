import { useState, useCallback } from 'react';
import { useInterval } from '../hooks/useInterval';
import { Lap } from '../types';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [lastLapTime, setLastLapTime] = useState(0);

  useInterval(() => {
    setTime(t => t + 10);
  }, isRunning ? 10 : null);

  const toggle = () => setIsRunning(r => !r);
  
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    setLastLapTime(0);
  };

  const addLap = useCallback(() => {
    const lapTime = time - lastLapTime;
    setLaps(prev => [
      { id: prev.length + 1, time: time, split: lapTime },
      ...prev
    ]);
    setLastLapTime(time);
  }, [time, lastLapTime]);

  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
  };

  const formatSplit = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
  };

  return (
    <div className="stopwatch">
      <div className="time-display">{formatTime(time)}</div>
      
      <div className="controls">
        {!isRunning && time === 0 && (
          <button className="btn-primary" onClick={toggle}>▶</button>
        )}
        {isRunning && (
          <>
            <button className="btn-secondary" onClick={toggle}>⏸</button>
            <button className="btn-lap" onClick={addLap}>⏱</button>
          </>
        )}
        {!isRunning && time > 0 && (
          <>
            <button className="btn-primary" onClick={toggle}>▶</button>
            <button className="btn-reset" onClick={reset}>↺</button>
          </>
        )}
      </div>

      {laps.length > 0 && (
        <div className="laps">
          <div className="laps-header">
            <span>Lap</span>
            <span>Split</span>
            <span>Total</span>
          </div>
          {laps.map(lap => (
            <div key={lap.id} className="lap-row">
              <span>{lap.id}</span>
              <span>{formatSplit(lap.split)}</span>
              <span>{formatTime(lap.time)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}