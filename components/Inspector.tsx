
import React from 'react';
import { ModuleData } from '../types';
import { geminiService } from '../services/gemini';

interface InspectorProps {
  module: ModuleData | null;
  onUpdate: (id: string, updates: Partial<ModuleData>) => void;
  onDelete: (id: string) => void;
}

const Inspector: React.FC<InspectorProps> = ({ module, onUpdate, onDelete }) => {
  if (!module) {
    return (
      <aside className="w-80 bg-white border-l border-gray-200 p-6 flex items-center justify-center text-center">
        <div className="text-gray-400">
          <div className="text-4xl mb-4">🎨</div>
          <p className="text-sm">편집할 섹션을<br/>선택해주세요</p>
        </div>
      </aside>
    );
  }

  const handleImageStudio = async () => {
    if (!module.imageUrl) return;
    const prompt = window.prompt("AI 이미지 스튜디오: 어떤 배경으로 합성할까요? (예: 고급스러운 대리석 배경에 자연스러운 그림자 추가해줘)");
    if (!prompt) return;

    try {
      // For demo, we simulate the base64 conversion or just use a placeholder
      // In a real app, you'd fetch the image bytes first.
      alert("AI가 이미지를 합성 중입니다. 잠시만 기다려주세요...");
      const edited = await geminiService.editImage(module.imageUrl, prompt);
      if (edited) {
        onUpdate(module.id, { imageUrl: edited });
      }
    } catch (e) {
      alert("이미지 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <aside className="w-80 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h2 className="font-bold text-gray-700">섹션 편집 ({module.type})</h2>
        <button onClick={() => onDelete(module.id)} className="text-red-500 hover:bg-red-50 p-1 rounded">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">메인 타이틀</label>
          <textarea
            value={module.title}
            onChange={(e) => onUpdate(module.id, { title: e.target.value })}
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[80px]"
          />
        </div>

        {/* Subtitle / Description */}
        {(module.subtitle !== undefined || module.description !== undefined) && (
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              {module.subtitle !== undefined ? '서브 타이틀' : '상세 설명'}
            </label>
            <textarea
              value={module.subtitle !== undefined ? module.subtitle : module.description}
              onChange={(e) => onUpdate(module.id, module.subtitle !== undefined ? { subtitle: e.target.value } : { description: e.target.value })}
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[100px]"
            />
          </div>
        )}

        {/* Image Studio */}
        {module.imageUrl && (
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">이미지 스튜디오 (Nano Banana)</label>
            <div className="relative group">
              <img src={module.imageUrl} className="w-full rounded-lg border border-gray-200" alt="edit" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity rounded-lg">
                <button
                  onClick={handleImageStudio}
                  className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-blue-50 transition-colors"
                >
                  ✨ AI 배경 합성
                </button>
              </div>
            </div>
            <p className="mt-2 text-[10px] text-gray-400 text-center">제품을 강조하거나 배경을 자연스럽게 바꿔보세요.</p>
          </div>
        )}

        {/* Layout & Style */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">배경색</label>
            <input
              type="color"
              value={module.backgroundColor || '#ffffff'}
              onChange={(e) => onUpdate(module.id, { backgroundColor: e.target.value })}
              className="w-full h-10 p-1 rounded border border-gray-200 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">글자색</label>
            <input
              type="color"
              value={module.textColor || '#1f2937'}
              onChange={(e) => onUpdate(module.id, { textColor: e.target.value })}
              className="w-full h-10 p-1 rounded border border-gray-200 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">정렬 방식</label>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            {(['left', 'center', 'right'] as const).map((l) => (
              <button
                key={l}
                onClick={() => onUpdate(module.id, { layout: l })}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${module.layout === l ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Inspector;
