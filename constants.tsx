
import React from 'react';
import { HotspotProps } from './types';

export const HOTSPOTS: HotspotProps[] = [
  { 
    x: 18, y: 55, label: 'Oak tree walls', align: 'left',
    detail: {
      title: 'Oak Narrative',
      description: 'A slow-motion glide through our signature organic hallway. Witness how the reclaimed oak panels capture the morning light, creating a rhythmic dance of shadows and warmth.',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-wooden-details-41007-large.mp4',
      panoramaUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=2400&q=80',
      modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
      specs: ['Reclaimed Oak', 'Shadow Ratios: 1:1.6', 'Organic Air Filtration']
    }
  },
  { 
    x: 42, y: 65, label: 'Livingroom', align: 'right',
    detail: {
      title: 'Panorama Living',
      description: 'Experience a 360-degree drone flight through the heart of the home. Boundaries dissolve as the floor-to-ceiling glass reveals the shifting landscape outside.',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-interior-of-a-living-room-41004-large.mp4',
      panoramaUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=80',
      modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
      specs: ['Adaptive Glass', 'Sunken Social Hub', 'Smart-Tint Tech']
    }
  },
  { 
    x: 72, y: 58, label: 'Large Bedroom', align: 'right',
    detail: {
      title: 'Sky Sanctuary',
      description: 'A serene orbit around the master suite. Watch as the retractable ceiling opens to the cosmos, turning the bedroom into a private observatory.',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-bedroom-41003-large.mp4',
      panoramaUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=80',
      modelUrl: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
      specs: ['Retractable Glass', 'Active Silence Zone', 'Biometric Bedding']
    }
  },
  { 
    x: 68, y: 82, label: 'Pond Terrace', align: 'right',
    detail: {
      title: 'Water Pavilion',
      description: 'A cinematic sweep across the cantilevered terrace. The camera dives low over the natural spring pond, showcasing the gravity-defying architecture of the deck.',
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-deck-of-a-modern-house-with-a-pool-41006-large.mp4',
      panoramaUrl: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=2400&q=80',
      modelUrl: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
      specs: ['Cantilevered Steel', 'Crystal Balustrades', 'Spring-fed Cooling']
    }
  },
];

export const LogoMark = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H12V12H4V4Z" fill="currentColor" />
    <path d="M14 14H20V20H14V14Z" fill="currentColor" fillOpacity="0.5" />
    <path d="M14 4H18V8H14V4Z" fill="currentColor" />
  </svg>
);

export const ArrowDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
  </svg>
);

export const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
