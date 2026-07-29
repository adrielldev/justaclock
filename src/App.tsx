import { useState } from 'react';
import { View } from './types';
import { useTheme } from './hooks/useTheme';
import Sidebar from './components/Sidebar';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';

function App() {
  const [currentView, setCurrentView] = useState<View>('stopwatch');
  const { theme, setTheme } = useTheme();

  return (
    <div className="app">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView}
        theme={theme}
        onChangeTheme={setTheme}
      />
      
      <main className="content">
        {currentView === 'stopwatch' ? <Stopwatch /> : <Timer />}
      </main>
    </div>
  );
}

export default App;