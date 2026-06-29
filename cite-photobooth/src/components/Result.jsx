import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import './R.css';

const orangeFlower      = '/flowers/orange-flower.png';
const lavenderFlower   = '/flowers/lavender-flower.png';
const blueFlower     = '/flowers/blue-flower.png';
const singlePink = '/flowers/pink-flower.png';
const itscLogo       = '/logos/image 1.png';

const PETALS = [
  { left: '5%', color: '#E8649A', size: 18, duration: 7, delay: 0 },
  { left: '20%', color: '#3F7D3A', size: 14, duration: 9, delay: 1.2 },
  { left: '38%', color: '#F5C842', size: 16, duration: 6.5, delay: 2.4 },
  { left: '55%', color: '#ED93B1', size: 14, duration: 8, delay: 0.6 },
  { left: '70%', color: '#3F7D3A', size: 18, duration: 7.5, delay: 3 },
  { left: '85%', color: '#F5C842', size: 14, duration: 6, delay: 1.8 },
  { left: '94%', color: '#E8649A', size: 16, duration: 9, delay: 0.3 },
];

function Petal({ left, color, size, duration, delay }) {
  return (
    <svg
      className="result-petal"
      style={{ left, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
      width={size}
      height={size}
      viewBox="0 0 18 18"
      aria-hidden="true"
    >
      <ellipse cx="9" cy="9" rx="8" ry="5" fill={color} transform="rotate(30 9 9)" />
    </svg>
  );
}

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const imageUrl = state?.imageUrl;

  if (!imageUrl) {
    return <div>Error: No image URL provided.</div>;
  }

  return (
    <div className="result-container relative overflow-hidden">

      {/* Falling petals */}
      {PETALS.map((p, i) => (
        <Petal key={i} {...p} />
      ))}

      {/* Scattered flowers in the corners */}
      <img
        src={singlePink}
        alt=""
        className="absolute bottom-4 left-4 w-32 opacity-95 pointer-events-none result-flower"
      />
      <img
        src={lavenderFlower}
        alt=""
        className="absolute top-4 left-4 w-28 opacity-95 pointer-events-none result-flower"
      />
      <img
        src={orangeFlower}
        alt=""
        className="absolute right-4 top-4 w-32 opacity-95 pointer-events-none result-flower"
      />
      <img
        src={blueFlower}
        alt=""
        className="absolute right-4 bottom-4 w-28 opacity-95 pointer-events-none result-flower"
      />

      {/* Left panel: photostrip */}
      <div className="left-panel relative z-10">
        <img src={imageUrl} alt="Photostrip" className="photostrip-image" />
      </div>

      {/* Right panel: QR code in safe-zone card */}
      <div className="flex flex-col justify-center items-center relative z-10">
        <div className="result-card p-8 flex flex-col items-center">
          <span className="corner-dot corner-tl" />
          <span className="corner-dot corner-tr" />
          <span className="corner-dot corner-bl" />
          <span className="corner-dot corner-br" />

          <p className="eyebrow">2026 &middot; MAROON JAM</p>
          <h2 className="scan-text">Scan the QR Code to download</h2>
          <hr className="line" />
          <QRCode value={imageUrl} size={220} className="qr-frame" />

          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="brand-row">
              <p className="brand-text">Maroon Jam 2026</p>
              <img src={itscLogo} width={22} height={22} alt="ITSC" className="result-logo" />
            </div>
            <button className="home-btn" onClick={() => navigate('/')}>
              <span className="btn-content">
                <span className="material-symbols-rounded">home</span>
                <span>Back to Home</span>
              </span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Result;
