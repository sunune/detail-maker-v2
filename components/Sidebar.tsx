
import React from 'react';
import { SECTION_CATEGORIES, MODULE_TEMPLATES } from '../constants';
import { SectionType, ModuleData } from '../types';

interface SidebarProps {
  onAddModule: (module: ModuleData) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onAddModule }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-blue-600">Detail Maker</h1>
        <p className="text-xs text-gray-500">AI 모듈형 상세페이지 빌더</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        {SECTION_CATEGORIES.map((cat) => (
          <div key={cat.type}>
            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
              <span>{cat.icon}</span>
              {cat.label}
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {MODULE_TEMPLATES[cat.type].map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => onAddModule({
                    ...template,
                    id: Math.random().toString(36).substr(2, 9),
                  } as ModuleData)}
                  className="group relative h-20 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center p-2"
                >
                  <div className="text-[10px] text-gray-500 group-hover:text-blue-600 font-medium line-clamp-1">
                    {template.title || '기본 템플릿'}
                  </div>
                  <div className="mt-1 w-full h-8 bg-white border border-gray-200 rounded flex items-center justify-center text-[8px] text-gray-300">
                    PREVIEW
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
