import { View, Theme } from '../types';

interface SidebarProps {
  currentView: View;
  onChangeView: (view: View) => void;
  theme: Theme;
  onChangeTheme: (theme: Theme) => void;
}

export default function Sidebar({ currentView, onChangeView, theme, onChangeTheme }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="logo">⏱ Clock</div>
      
      <nav>
        <button
          className={currentView === 'stopwatch' ? 'active' : ''}
          onClick={() => onChangeView('stopwatch')}
        >
          <span className="icon">⏱</span>
          <span>Stopwatch</span>
        </button>
        
        <button
          className={currentView === 'timer' ? 'active' : ''}
          onClick={() => onChangeView('timer')}
        >
          <span className="icon">⏲</span>
          <span>Timers</span>
        </button>
      </nav>

      <div className="theme-section">
        <label>Theme</label>
        <div className="theme-options">
          <button 
            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => onChangeTheme('dark')}
          >
            <span className="theme-dot" style={{ background: '#4a9eff' }} />
            Dark
          </button>
          <button 
            className={`theme-btn ${theme === 'dracula' ? 'active' : ''}`}
            onClick={() => onChangeTheme('dracula')}
          >
            <span className="theme-dot" style={{ background: '#ff79c6' }} />
            Dracula
          </button>
          <button 
            className={`theme-btn ${theme === 'nord' ? 'active' : ''}`}
            onClick={() => onChangeTheme('nord')}
          >
            <span className="theme-dot" style={{ background: '#88c0d0' }} />
            Nord
          </button>
        </div>
      </div>
    </aside>
  );
}