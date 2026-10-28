import React from 'react';

export interface LanyardProps {
  frontImage?: string | HTMLImageElement | HTMLCanvasElement;
  backImage?: string | HTMLImageElement | HTMLCanvasElement;
  imageFit?: 'cover' | 'contain' | string;
  cardColor?: string;
  orientation?: 'portrait' | 'landscape';
  finish?: 'glossy' | 'matte' | 'holographic' | 'metallic';
  cornerRadius?: number;
  size?: number;
  anchor?: 'left' | 'center' | 'right' | string;
  strapLength?: number;
  strapImage?: string | HTMLImageElement | HTMLCanvasElement;
  strapColor?: string;
  strapWidth?: number;
  metal?: 'silver' | 'gold' | 'black' | 'bronze' | string;
  gravity?: number;
  damping?: number;
  elasticity?: number;
  breeze?: number;
  interactive?: boolean;
  intro?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare const Lanyard: React.FC<LanyardProps>;
export default Lanyard;
