
import React from 'react';
import { ModuleData } from '../types';

interface ModuleItemProps {
  data: ModuleData;
  isSelected: boolean;
  onClick: () => void;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ data, isSelected, onClick }) => {
  const containerStyles = {
    backgroundColor: data.backgroundColor || '#ffffff',
    color: data.textColor || '#1f2937',
  };

  const renderContent = () => {
    switch (data.type) {
      case 'EVENT':
        return (
          <div className="py-4 px-6 text-center">
            <h2 className="text-2xl font-black">{data.title}</h2>
            <p className="mt-1 text-sm font-medium">{data.subtitle}</p>
          </div>
        );

      case 'MAIN':
        return (
          <div className={`flex flex-col ${data.layout === 'center' ? 'items-center text-center' : data.layout === 'left' ? 'items-start text-left' : 'items-end text-right'} py-20 px-10 relative overflow-hidden min-h-[400px]`}>
            {data.imageUrl && (
              <div className="absolute inset-0 z-0">
                <img src={data.imageUrl} className="w-full h-full object-cover opacity-80" alt="main" />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            )}
            <div className="relative z-10 w-full max-w-2xl">
              <p className="text-lg font-bold tracking-widest uppercase mb-2">{data.subtitle}</p>
              <h1 className="text-5xl font-black leading-tight break-keep">{data.title}</h1>
            </div>
          </div>
        );

      case 'OVERVIEW':
        return (
          <div className="py-16 px-10 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{data.title}</h2>
            <p className="text-lg leading-relaxed text-gray-600 break-keep">{data.description}</p>
          </div>
        );

      case 'CONTENT':
        return (
          <div className={`flex flex-col md:flex-row items-center gap-10 py-16 px-10 ${data.layout === 'right' ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-4">{data.title}</h3>
              <p className="text-lg text-gray-600 leading-relaxed">{data.description}</p>
            </div>
            <div className="flex-1 w-full">
              <img src={data.imageUrl} className="w-full rounded-2xl shadow-xl aspect-video object-cover" alt="content" />
            </div>
          </div>
        );

      case 'SPECS':
        return (
          <div className="py-16 px-10 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">{data.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
                {data.specList?.map((spec, i) => (
                  <div key={i} className="flex bg-white">
                    <div className="w-32 bg-gray-100 p-4 font-bold text-sm text-gray-500">{spec.label}</div>
                    <div className="flex-1 p-4 text-sm">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'SELLER':
        return (
          <div className="py-12 px-10 border-t border-gray-100 text-center">
            <h4 className="text-lg font-bold mb-2">{data.title}</h4>
            <p className="text-sm text-gray-500">{data.description}</p>
          </div>
        );

      default:
        return <div>Unknown Module</div>;
    }
  };

  return (
    <div
      onClick={onClick}
      style={containerStyles}
      className={`relative group cursor-pointer transition-all ${isSelected ? 'ring-4 ring-blue-500 ring-inset' : 'hover:ring-2 hover:ring-gray-200'}`}
    >
      {renderContent()}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-gray-400 border border-gray-200">
          {data.type}
        </div>
      </div>
    </div>
  );
};

export default ModuleItem;
