
import React from 'react';
import { SectionType, ModuleData } from './types';

export const SECTION_CATEGORIES: { type: SectionType; label: string; icon: string }[] = [
  { type: 'EVENT', label: '이벤트', icon: '🎁' },
  { type: 'MAIN', label: '메인', icon: '✨' },
  { type: 'OVERVIEW', label: '개요', icon: '📝' },
  { type: 'CONTENT', label: '내용', icon: '🖼️' },
  { type: 'SPECS', label: '상세스펙', icon: '📊' },
  { type: 'SELLER', label: '판매자 정보', icon: '👤' },
];

export const MODULE_TEMPLATES: Record<SectionType, Partial<ModuleData>[]> = {
  EVENT: [
    { type: 'EVENT', title: '기간 한정 특가!', subtitle: '지금 바로 만나보세요', backgroundColor: '#fee2e2', textColor: '#b91c1c', layout: 'center' },
  ],
  MAIN: [
    { type: 'MAIN', title: '혁신적인 당신의 파트너', subtitle: 'Product Name', imageUrl: 'https://picsum.photos/1200/800', layout: 'center' },
    { type: 'MAIN', title: '심플함의 미학', subtitle: 'Detail Maker', imageUrl: 'https://picsum.photos/1200/800', layout: 'left' },
  ],
  OVERVIEW: [
    { type: 'OVERVIEW', title: '왜 이 제품인가요?', description: '우리는 당신의 일상을 더 편리하게 만들기 위해 고민했습니다.', layout: 'center' },
  ],
  CONTENT: [
    { type: 'CONTENT', title: '압도적인 성능', description: '기존 대비 200% 향상된 성능을 경험하세요.', imageUrl: 'https://picsum.photos/800/600', layout: 'right' },
    { type: 'CONTENT', title: '세련된 디자인', description: '어떤 공간에도 잘 어우러지는 미니멀한 실루엣.', imageUrl: 'https://picsum.photos/800/600', layout: 'left' },
  ],
  SPECS: [
    { type: 'SPECS', title: '상세 사양', specList: [{ label: '무게', value: '1.2kg' }, { label: '소재', value: '알루미늄' }, { label: '크기', value: '200x300mm' }], layout: 'grid' },
  ],
  SELLER: [
    { type: 'SELLER', title: 'Detail Maker Studio', description: '우리는 가치를 전달합니다. 고객센터: 1588-0000', layout: 'center', backgroundColor: '#f1f5f9' },
  ],
};
