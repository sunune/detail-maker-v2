
export type SectionType = 'EVENT' | 'MAIN' | 'OVERVIEW' | 'CONTENT' | 'SPECS' | 'SELLER';

export interface ModuleData {
  id: string;
  type: SectionType;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  layout: 'center' | 'left' | 'right' | 'grid';
  specList?: { label: string; value: string }[];
}

export interface ProjectState {
  title: string;
  modules: ModuleData[];
  selectedModuleId: string | null;
}

export interface AIProductInfo {
  name: string;
  target: string;
  keyFeatures: string;
  tone: string;
}
