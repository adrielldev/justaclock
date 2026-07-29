export interface Lap {
  id: number;
  time: number;
  split: number;
}

export interface TimerPreset {
  id: number;
  name: string;
  hours: number;
  minutes: number;
  seconds: number;
}

export type View = 'stopwatch' | 'timer';
export type Theme = 'dark' | 'dracula' | 'nord';