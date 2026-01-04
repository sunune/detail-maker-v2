
import React, { useState } from 'react';
import { geminiService } from '../services/gemini';
import { AIProductInfo, ModuleData } from '../types';

interface AIModalProps {
  onClose: () => void;
  onApply: (modules: ModuleData[]) => void;
}

const AIModal: React.FC<AIModalProps> = ({ onClose, onApply }) => {
  const [info, setInfo] = useState<AIProductInfo>({
    name: '',
    target: '',
    keyFeatures: '',
    tone: '신뢰감 있는 전문적인 말투',
  });
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!info.name || !info.target) {
      alert("제품명과 타겟은 필수입니다.");
      return;
    }

    setLoading(true);
    try {
      const data = await geminiService.generateMarketingCopy(info);
      if (data) {
        const newModules: ModuleData[] = [];
        
        if (data.MAIN) {
          newModules.push({
            id: 'ai-main',
            type: 'MAIN',
            title: data.MAIN.title,
            subtitle: data.MAIN.subtitle,
            imageUrl: 'https://picsum.photos/1200/800',
            layout: 'center'
          });
        }

        if (data.OVERVIEW) {
          newModules.push({
            id: 'ai-overview',
            type: 'OVERVIEW',
            title: data.OVERVIEW.title,
            description: data.OVERVIEW.description,
            layout: 'center'
          });
        }

        if (Array.isArray(data.CONTENT)) {
          data.CONTENT.forEach((c: any, i: number) => {
            newModules.push({
              id: `ai-content-${i}`,
              type: 'CONTENT',
              title: c.title,
              description: c.description,
              imageUrl: `https://picsum.photos/800/600?random=${i}`,
              layout: i % 2 === 0 ? 'left' : 'right'
            });
          });
        }

        onApply(newModules);
        onClose();
      }
    } catch (e) {
      alert("AI 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900">AI 기획 비서 ✨</h2>
              <p className="text-gray-500 mt-1">Gemini 3.0 Pro가 당신의 상세페이지를 기획해드립니다.</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">제품명</label>
              <input
                type="text"
                placeholder="예: 디테일 메이커 무선 가습기"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">핵심 타겟</label>
              <input
                type="text"
                placeholder="예: 30대 자취하는 직장인 여성"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={info.target}
                onChange={(e) => setInfo({ ...info, target: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">핵심 특징 (쉼표 구분)</label>
              <textarea
                placeholder="예: 무소음 설계, 12시간 연속 분사, 무드등 기능"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[80px]"
                value={info.keyFeatures}
                onChange={(e) => setInfo({ ...info, keyFeatures: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">브랜드 톤앤매너</label>
              <select
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                value={info.tone}
                onChange={(e) => setInfo({ ...info, tone: e.target.value })}
              >
                <option>신뢰감 있는 전문적인 말투</option>
                <option>감성적이고 따뜻한 말투</option>
                <option>핵심만 간결하게 전달하는 말투</option>
                <option>친근하고 트렌디한 말투</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full mt-8 bg-blue-600 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                기획안 작성 중...
              </>
            ) : (
              '상세페이지 자동 생성하기'
            )}
          </button>
        </div>
        <div className="bg-gray-50 px-8 py-4 text-[10px] text-gray-400 text-center">
          Powered by Gemini 3.0 Pro. 생성된 문구는 직접 수정이 가능합니다.
        </div>
      </div>
    </div>
  );
};

export default AIModal;
