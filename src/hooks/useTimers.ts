import { useState, useEffect, useCallback } from 'react';
import { Store } from '@tauri-apps/plugin-store';
import { TimerPreset } from '../types';

const STORE_PATH = 'timers-store.json';
const TIMERS_KEY = 'activeTimers';
const FIRST_RUN_KEY = 'firstRun';

const DEFAULT_TIMERS: TimerPreset[] = [
  { id: 1, name: '1 min', hours: 0, minutes: 1, seconds: 0 },
  { id: 2, name: '3 min', hours: 0, minutes: 3, seconds: 0 },
  { id: 3, name: '5 min', hours: 0, minutes: 5, seconds: 0 },
  { id: 4, name: '10 min', hours: 0, minutes: 10, seconds: 0 },
  { id: 5, name: '15 min', hours: 0, minutes: 15, seconds: 0 },
  { id: 6, name: '25 min', hours: 0, minutes: 25, seconds: 0 },
  { id: 7, name: '30 min', hours: 0, minutes: 30, seconds: 0 },
  { id: 8, name: '1 hour', hours: 1, minutes: 0, seconds: 0 },
  { id: 9, name: '2 hours', hours: 2, minutes: 0, seconds: 0 },
];

let storeInstance: Store | null = null;

async function getStore(): Promise<Store> {
  if (!storeInstance) {
    storeInstance = await Store.load(STORE_PATH);
  }
  return storeInstance;
}

export function useTimers() {
  const [timers, setTimers] = useState<TimerPreset[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    
    async function load() {
      try {
        const store = await getStore();
        const saved = await store.get<TimerPreset[]>(TIMERS_KEY);
        const firstRun = await store.get<boolean>(FIRST_RUN_KEY);
        
        if (!cancelled) {
          if (saved) {
            // Já tem dados salvos, usa eles (mesmo que vazio)
            setTimers(saved);
          } else if (firstRun === undefined || firstRun === true) {
            // Primeira vez: cria defaults e marca como não-first-run
            setTimers(DEFAULT_TIMERS);
            await store.set(FIRST_RUN_KEY, false);
            await store.set(TIMERS_KEY, DEFAULT_TIMERS);
            await store.save();
          } else {
            // Não é primeira vez e não tem timers salvos = usuário apagou todos
            setTimers([]);
          }
          setLoaded(true);
        }
      } catch (e) {
        console.error('Failed to load timers:', e);
        if (!cancelled) {
          setTimers([]);
          setLoaded(true);
        }
      }
    }
    
    load();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    
    async function save() {
      try {
        const store = await getStore();
        await store.set(TIMERS_KEY, timers);
        await store.save();
      } catch (e) {
        console.error('Failed to save timers:', e);
      }
    }
    
    save();
  }, [timers, loaded]);

  const addTimer = useCallback((timer: Omit<TimerPreset, 'id'>) => {
    const newTimer: TimerPreset = {
      ...timer,
      id: Date.now(),
    };
    setTimers(prev => [...prev, newTimer]);
  }, []);

  const removeTimer = useCallback((id: number) => {
    setTimers(prev => prev.filter(t => t.id !== id));
  }, []);

  const resetToDefaults = useCallback(() => {
    setTimers(DEFAULT_TIMERS);
  }, []);

  return { timers, loaded, addTimer, removeTimer, resetToDefaults };
}