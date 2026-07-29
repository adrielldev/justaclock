import { useState } from 'react';
import { useTimers } from '../hooks/useTimers';
import TimerItem from './TimerItem';

export default function Timer() {
  const { timers, loaded, addTimer, removeTimer } = useTimers();
  const [customName, setCustomName] = useState('');
  const [customHours, setCustomHours] = useState('');
  const [customMin, setCustomMin] = useState('');
  const [customSec, setCustomSec] = useState('');

  const addCustom = () => {
    const h = parseInt(customHours || '0', 10);
    const m = parseInt(customMin || '0', 10);
    const s = parseInt(customSec || '0', 10);
    
    if (h === 0 && m === 0 && s === 0) return;
    
    // Se não digitou nome, gera do tempo
    let name = customName.trim();
    if (!name) {
      name = [
        h > 0 ? `${h}h` : '',
        m > 0 ? `${m}m` : '',
        s > 0 ? `${s}s` : ''
      ].filter(Boolean).join(' ') || 'Custom';
    }
    
    addTimer({ name, hours: h, minutes: m, seconds: s });
    setCustomName('');
    setCustomHours('');
    setCustomMin('');
    setCustomSec('');
  };

  const totalSeconds = (t: { hours: number; minutes: number; seconds: number }) => 
    t.hours * 3600 + t.minutes * 60 + t.seconds;

  if (!loaded) {
    return <div className="timer-view"><h2>Timers</h2><p className="empty">Loading...</p></div>;
  }

  return (
    <div className="timer-view">
      <h2>Timers</h2>
      
      <div className="custom-timer">
        <div className="input-group name-group">
          <input
            type="text"
            placeholder="Timer name..."
            value={customName}
            onChange={e => setCustomName(e.target.value)}
            maxLength={30}
          />
          <label>Name</label>
        </div>
        
        <div className="input-group">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            placeholder="00"
            value={customHours}
            onChange={e => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 2);
              setCustomHours(val);
            }}
          />
          <label>h</label>
        </div>
        <span className="separator">:</span>
        <div className="input-group">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            placeholder="00"
            value={customMin}
            onChange={e => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 2);
              setCustomMin(val);
            }}
          />
          <label>m</label>
        </div>
        <span className="separator">:</span>
        <div className="input-group">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            placeholder="00"
            value={customSec}
            onChange={e => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 2);
              setCustomSec(val);
            }}
          />
          <label>s</label>
        </div>
        <div className="input-group btn-group">
          <button className="btn-add" onClick={addCustom}>+ Add</button>
        </div>
      </div>

      <div className="timer-grid">
        {timers.length === 0 && (
          <p className="empty">No active timers.</p>
        )}
        {timers.map(timer => (
          <TimerItem
            key={timer.id}
            name={timer.name}
            totalSeconds={totalSeconds(timer)}
            onDelete={() => removeTimer(timer.id)}
          />
        ))}
      </div>
    </div>
  );
}