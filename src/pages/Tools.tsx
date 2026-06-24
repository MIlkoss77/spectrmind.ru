import { useState } from 'react';
import ScriptGenerator from '../components/ScriptGenerator';
import PostGenerator from '../components/PostGenerator';

type Tool = 'scripts' | 'posts';

export default function Tools() {
  const [activeTool, setActiveTool] = useState<Tool>('scripts');

  return (
    <div className="min-h-screen bg-deep-space">
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-6">
          <span className="font-mono text-xs text-txt-muted">TOOLS</span>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTool('scripts')}
              className={`px-4 py-2 text-sm font-mono rounded transition-all ${
                activeTool === 'scripts'
                  ? 'bg-spectr-cyan text-black'
                  : 'text-txt-secondary hover:text-txt-primary'
              }`}
              style={{ borderRadius: '4px' }}
            >
              Скрипты
            </button>
            <button
              onClick={() => setActiveTool('posts')}
              className={`px-4 py-2 text-sm font-mono rounded transition-all ${
                activeTool === 'posts'
                  ? 'bg-spectr-cyan text-black'
                  : 'text-txt-secondary hover:text-txt-primary'
              }`}
              style={{ borderRadius: '4px' }}
            >
              Посты
            </button>
          </div>
        </div>
      </nav>

      {activeTool === 'scripts' ? <ScriptGenerator /> : <PostGenerator />}
    </div>
  );
}
