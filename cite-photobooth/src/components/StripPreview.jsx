import React from 'react';
import PhotoStrip from './PhotoStrip';

function makeDummyPhoto(color, label) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 640, 360);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Quicksand, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 320, 180);

  return { id: label, src: canvas.toDataURL('image/png') };
}

const DUMMY_PHOTOS = [
  makeDummyPhoto('#E8649A', 'Photo 1'),
  makeDummyPhoto('#8a2233', 'Photo 2'),
  makeDummyPhoto('#003A5D', 'Photo 3'),
];

function StripPreview() {
  return (
    <div className="App" style={{ width: '100vw', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Reconstructed Application Cloud Background */}
      <div className="app-cloud-layer" aria-hidden="true">
        <img src="/awscc/cloud.png" alt="" className="cloud cloud-1" />
        <img src="/awscc/cloud.png" alt="" className="cloud cloud-2" />
        <img src="/awscc/cloud.png" alt="" className="cloud cloud-3" />
        <img src="/awscc/cloud.png" alt="" className="cloud cloud-4" />
        <img src="/awscc/cloud.png" alt="" className="cloud cloud-5" />
        <img src="/awscc/cloud.png" alt="" className="cloud cloud-6" />
        <img src="/awscc/cloud.png" alt="" className="cloud cloud-7" />
        <img src="/awscc/cloud.png" alt="" className="cloud cloud-8" />
      </div>

      <div style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        boxSizing: 'border-box',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <p style={{ 
            color: '#6B0F1A', 
            fontFamily: 'Quicksand, sans-serif', 
            fontSize: '14px', 
            fontWeight: '600',
            margin: 0,
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '6px 14px',
            borderRadius: '20px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
          }}>
            📸 Strip Preview Workspace
          </p>
          <PhotoStrip photos={DUMMY_PHOTOS} />
        </div>
      </div>
    </div>
  );
}

export default StripPreview;