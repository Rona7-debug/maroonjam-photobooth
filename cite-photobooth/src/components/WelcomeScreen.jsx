import { Link } from 'react-router-dom';
import './WS.css';

const daisyBouquet    = '/flowers/daisy-bouquet.png';           // hanging cluster
const colorfulFlowers = '/flowers/planted-colorful-flower.png'; // planted
const tulip           = '/flowers/planted-tulip.png';           // planted
const forsythia       = '/flowers/planted-forsythia.png';       // planted
const hangingFlowers  = '/flowers/hanging-flowers.png';         // planted
const mandalaSingle   = '/flowers/single-flower.png';           // scattered
const purpleSingle    = '/flowers/single-purple-flower.png';    // scattered
const sunflower       = '/flowers/single-sunflower.png';        // scattered

const danceGirl = '/flowers/dancing-girl.png'; 

const VINE_GOLD_X = [40, 180, 320, 460, 600, 740, 880, 1020, 1160, 1300];
const VINE_PINK_X = [110, 250, 390, 530, 670, 810, 950, 1090, 1230, 1360];

const PETALS = [
  { left: '5%', color: '#E8649A', size: 18, duration: 7, delay: 0 },
  { left: '15%', color: '#3F7D3A', size: 14, duration: 9, delay: 1.2 },
  { left: '27%', color: '#F5C842', size: 16, duration: 6.5, delay: 2.4 },
  { left: '38%', color: '#ED93B1', size: 14, duration: 8, delay: 0.6 },
  { left: '50%', color: '#3F7D3A', size: 18, duration: 7.5, delay: 3 },
  { left: '60%', color: '#F5C842', size: 14, duration: 6, delay: 1.8 },
  { left: '70%', color: '#E8649A', size: 16, duration: 9, delay: 0.3 },
  { left: '80%', color: '#3F7D3A', size: 14, duration: 7, delay: 2.1 },
  { left: '88%', color: '#ED93B1', size: 18, duration: 8.5, delay: 1 },
  { left: '94%', color: '#F5C842', size: 14, duration: 6.8, delay: 3.5 },
];

const PLANTED_FLOWERS = [
  { side: 'left',  offset: '2%',  width: 100,  img: colorfulFlowers },
  { side: 'left',  offset: '9%',  width: 80,  img: tulip },
  { side: 'left',  offset: '17%', width: 95,  img: forsythia },
  { side: 'left',  offset: '25%', width: 110,  img: daisyBouquet },
  { side: 'right', offset: '25%', width: 80,  img: tulip },
  { side: 'right', offset: '17%', width: 100,  img: colorfulFlowers },
  { side: 'right', offset: '9%',  width: 90,  img: forsythia },
  { side: 'right', offset: '2%',  width: 120,  img: daisyBouquet },
];

const SCATTERED_FLOWERS = [
  { src: sunflower,    top: '10%', right: '4%',  width: 130,  rotation: 15 }, 
  { src: mandalaSingle, top: '30%', right: '20%', width: 100, rotation: -10 },
  { src: sunflower, top: '30%', left: '3%',   width: 100,  rotation: 8 },
  { src: purpleSingle,    top: '55%', right: '3%',  width: 100,  rotation: -20 },
  { src: sunflower,    top: '55%', right: '25%',  width: 100,  rotation: -20 },
  { src: mandalaSingle, top: '50%', left: '15%',  width: 90,  rotation: 12 },
  { src: purpleSingle, top: '8%',  left: '18%',  width: 90,  rotation: -5 },
  { src: danceGirl, top: '67%', left: '45%', width: 220, rotation: 0 },
];

function VineArch() {
  return (
    <svg className="vine-arch" viewBox="0 0 1400 90" preserveAspectRatio="none" aria-hidden="true">
      <path d="M -20 20 Q 350 -25, 500 12 T 1420 20" stroke="#3F7D3A" strokeWidth="4" fill="none" />
      <g fill="#F5C842">
        {VINE_GOLD_X.map((x, i) => (
          <circle key={i} cx={x} cy={[14, -4, -14, -10, 2, 6, -2, -12, -6, 10][i]} r="6" />
        ))}
      </g>
      <g fill="#E8649A">
        {VINE_PINK_X.map((x, i) => (
          <circle key={i} cx={x} cy={[2, -20, -16, -6, 6, 0, -8, -14, -2, 14][i]} r="5" />
        ))}
      </g>
    </svg>
  );
}

function Petal({ left, color, size, duration, delay }) {
  return (
    <svg
      className="petal"
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

function PlantedFlower({ side, offset, width, img }) {
  return (
    <img
      className="planted-flower"
      src={img}
      alt=""
      aria-hidden="true"
      style={{
        [side]: offset,
        width: `${width}px`,
        height: 'auto',
      }}
    />
  );
}

function ScatteredFlower({ src, top, left, right, width, rotation }) {
  return (
    <img
      className="scattered-flower"
      src={src}
      alt=""
      aria-hidden="true"
      style={{
        top,
        left: left || undefined,
        right: right || undefined,
        width: `${width}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
}

function WelcomeScreen() {
  return (
    <div className="welcome-screen">
      <VineArch />

      {/* String connecting the vine to the hanging flower */}
      <div className="hanging-stem" />

      {/* Hanging cluster — flowers hanging from the vine arch */}
      <img
        className="hanging-cluster"
        src={hangingFlowers}
        alt=""
        aria-hidden="true"
        width={90}
      />

      {/* Scattered single flowers */}
      {SCATTERED_FLOWERS.map((f, i) => (
        <ScatteredFlower key={i} {...f} />
      ))}

      {PETALS.map((p, i) => (
        <Petal key={i} {...p} />
      ))}

      <div className="center-stage">
        <div className="title-card">
          <span className="corner-dot corner-tl" />
          <span className="corner-dot corner-tr" />
          <span className="corner-dot corner-bl" />
          <span className="corner-dot corner-br" />
          <p className="eyebrow">2026 &middot; MAROON JAM</p>
          <h1>Photobooth</h1>
        </div>

        <Link to="/camera">
          <button className="start-btn"><span>START &rarr;</span></button>
        </Link>
      </div>

      <svg className="grass-strip" viewBox="0 0 1400 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,35 Q350,15 700,32 T1400,28 V100 H0 Z" fill="#3F7D3A" />
        <path d="M0,35 Q350,15 700,32 T1400,28" fill="none" stroke="#2f5e2c" strokeWidth="3" />
      </svg>

      {PLANTED_FLOWERS.map((f, i) => (
        <PlantedFlower key={i} {...f} />
      ))}

      <div className="footer-credit">
        <span>Powered by Information Technology Student Council</span>
        <img src="/logos/image 1.png" alt="ITSC logo" className="footer-logo" />
      </div>
    </div>
  );
}

export default WelcomeScreen;