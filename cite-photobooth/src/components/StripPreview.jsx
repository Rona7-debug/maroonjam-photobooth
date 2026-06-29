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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1a1a1a',
      padding: '40px',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <p style={{ color: '#aaa', fontFamily: 'Quicksand, sans-serif', fontSize: '13px', margin: 0 }}>
          📸 Strip Preview — go to <strong style={{ color: '#fff' }}>/strip-preview</strong> to see this
        </p>
        <PhotoStrip photos={DUMMY_PHOTOS} />
      </div>
    </div>
  );
}

export default StripPreview;
