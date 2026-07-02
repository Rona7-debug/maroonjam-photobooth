import React from 'react';
import './PS.css';

const itscLogo       = '/logos/image 1.png';
const swuLogo        = '/logos/swu-logo.png';

const BG_FLOWERS = [
  { src: '/flowers/lavender-flower.png', top: '3%',  left: '4%',   width: 58, rotation: -15, opacity: 0.40 },
  { src: '/flowers/orange-flower.png',   top: '5%',  right: '5%',  width: 52, rotation: 20,  opacity: 0.40 },
  { src: '/flowers/pink-flower.png',     top: '15%', right: '1%',  width: 48, rotation: 35,  opacity: 0.60 },
  { src: '/flowers/blue-flower.png',     top: '12%', left: '2%',   width: 44, rotation: 10,  opacity: 0.60 },
  { src: '/flowers/pinkish-flower.png',  top: '90%', left: '1%',   width: 50, rotation: 25,  opacity: 0.60 },
  { src: '/flowers/lavender-flower.png', top: '28%', right: '3%',  width: 46, rotation: -20, opacity: 0.60 },
  { src: '/flowers/orange-flower.png',   top: '32%', left: '3%',   width: 44, rotation: 12,  opacity: 0.60 },
  { src: '/flowers/pinkish-flower.png',  top: '44%', right: '2%',  width: 50, rotation: -30, opacity: 0.60 },
  { src: '/flowers/blue-flower.png',     top: '52%', left: '2%',   width: 48, rotation: 18,  opacity: 0.60 },
  { src: '/flowers/pink-flower.png',     top: '60%', right: '4%',  width: 52, rotation: -10, opacity: 0.60 },
  { src: '/flowers/lavender-flower.png', top: '68%', left: '3%',   width: 44, rotation: 22,  opacity: 0.60 },
  { src: '/flowers/orange-flower.png',   top: '75%', right: '5%',  width: 48, rotation: -5,  opacity: 0.60 },
  { src: '/flowers/pink-flower.png',  top: '83%', left: '5%',   width: 42, rotation: 30,  opacity: 0.60 },
  { src: '/flowers/blue-flower.png',     top: '88%', right: '3%',  width: 46, rotation: -18, opacity: 0.60 },
];

function PhotoStrip({ photos }) {
  return (
    <div className="frame-container">
      {BG_FLOWERS.map((f, i) => (
        <img
          key={i}
          src={f.src}
          alt=""
          aria-hidden="true"
          className="bg-flower"
          style={{
            top:       f.top,
            left:      f.left  ?? undefined,
            right:     f.right ?? undefined,
            width:     `${f.width}px`,
            opacity:   f.opacity,
            transform: `rotate(${f.rotation}deg)`,
          }}
        />
      ))}

      <div className="strip-content">
      <div className="strip-header">
        <div className="strip-date">Panagbenga Festival</div>
      </div>

      <div className="frame">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="photo-slot">
            {photos[index] ? (
              <img src={photos[index].src} alt={`Photo ${index + 1}`} />
            ) : (
              <div className="placeholder" />
            )}
          </div>
        ))}
      </div>

      <div className="strip-footer">
        <div className="strip-divider">
          <span className="strip-divider-line" />
          <span className="strip-divider-dot" />
          <span className="strip-divider-line" />
        </div>

        <div className="strip-text-group">
          <div className="strip-title-bottom">Maroon Jam 2026</div>
        </div>

        <div className="strip-logo-row">
          <img src={swuLogo}  width={28} height={28} alt="SWU"  className="strip-logo swu"  />
          <img src={itscLogo} width={28} height={28} alt="ITSC" className="strip-logo itsc" />
        </div>
      </div>
    </div>
    </div>
  );
}

export default PhotoStrip;