
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ModuleItem from './components/ModuleItem';
import Inspector from './components/Inspector';
import AIModal from './components/AIModal';
import { ModuleData, ProjectState } from './types';

const App: React.FC = () => {
  const [project, setProject] = useState<ProjectState>({
    title: '나의 상세페이지',
    modules: [],
    selectedModuleId: null,
  });
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const addModule = (module: ModuleData) => {
    setProject(prev => ({
      ...prev,
      modules: [...prev.modules, module],
      selectedModuleId: module.id
    }));
  };

  const updateModule = (id: string, updates: Partial<ModuleData>) => {
    setProject(prev => ({
      ...prev,
      modules: prev.modules.map(m => m.id === id ? { ...m, ...updates } : m)
    }));
  };

  const deleteModule = (id: string) => {
    setProject(prev => ({
      ...prev,
      modules: prev.modules.filter(m => m.id !== id),
      selectedModuleId: prev.selectedModuleId === id ? null : prev.selectedModuleId
    }));
  };

  const selectedModule = project.modules.find(m => m.id === project.selectedModuleId) || null;

  const handleApplyAI = (newModules: ModuleData[]) => {
    setProject(prev => ({
      ...prev,
      modules: [...prev.modules, ...newModules],
      selectedModuleId: newModules[0]?.id || null
    }));
  };

  const handleExport = () => {
    alert("현재 제작된 상세페이지를 이미지(PNG)로 저장합니다. (기능 준비 중)");
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden text-gray-900">
      <Sidebar onAddModule={addModule} />

      <main className="flex-1 flex flex-col h-full">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
              className="font-bold text-gray-700 bg-transparent border-none focus:ring-0 p-0 text-lg w-48"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAIModalOpen(true)}
              className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-100 transition-all flex items-center gap-2"
            >
              ✨ AI 기획 비서
            </button>
            <button
              onClick={handleExport}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
            >
              저장 및 내보내기
            </button>
          </div>
        </header>

        {/* Canvas Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 flex flex-col items-center canvas-container relative">
          <div className="w-full max-w-[800px] bg-white shadow-2xl min-h-[1200px] relative">
            {project.modules.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center text-gray-300">
                <div className="text-8xl mb-6">🏜️</div>
                <p className="text-xl font-bold mb-2">캔버스가 비어있습니다</p>
                <p className="text-sm">왼쪽 패널에서 모듈을 선택하거나<br/>상단 AI 버튼을 눌러보세요.</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {project.modules.map((m) => (
                  <ModuleItem
                    key={m.id}
                    data={m}
                    isSelected={project.selectedModuleId === m.id}
                    onClick={() => setProject({ ...project, selectedModuleId: m.id })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Inspector
        module={selectedModule}
        onUpdate={updateModule}
        onDelete={deleteModule}
      />

      {isAIModalOpen && (
        <AIModal
          onClose={() => setIsAIModalOpen(false)}
          onApply={handleApplyAI}
        />
      )}
    </div>
  );
};

export default App;
