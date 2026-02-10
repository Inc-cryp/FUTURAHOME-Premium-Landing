
export interface HotspotDetail {
  title: string;
  description: string;
  image: string;
  videoUrl?: string;
  panoramaUrl?: string;
  modelUrl?: string; // Added for 3D interactive model viewing
  specs: string[];
}

export interface HotspotProps {
  x: number;
  y: number;
  label: string;
  align?: 'left' | 'right' | 'top' | 'bottom';
  detail?: HotspotDetail;
}

export interface HouseItem {
  id: string;
  title: string;
  location: string;
  image: string;
}