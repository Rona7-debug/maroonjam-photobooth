import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import PhotoStrip from './PhotoStrip';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './C.css';

const mandalaSingle   = '/flowers/single-flower.png';
const purpleSingle    = '/flowers/single-purple-flower.png';
const sunflower       = '/flowers/single-sunflower.png';
const daisyBouquets    = '/flowers/daisy-bouquet.png'; 
const plantedSunflower    = '/flowers/planted-sunflower.png';   
const lavenderFlower    = '/flowers/lavender-flower.png';   
const pinkFlower    = '/flowers/pink-flower.png';   
const plantedForsythia       = '/flowers/planted-forsythia.png';       
const orangeFlower    = '/flowers/orange-flower.png';
const blueFlower    = '/flowers/blue-flower.png';
const pinkishFlower    = '/flowers/pinkish-flower.png';
const itLogo    = '/logos/image 1.png';

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

const SCATTERED_FLOWERS = [
  { src: sunflower,    top: '10%', right: '4%',  width: 120,  rotation: 15 },
  { src: mandalaSingle, top: '30%', right: '20%', width: 90, rotation: -10 },
  { src: purpleSingle,    top: '55%', right: '3%',  width: 90,  rotation: -20 },
  { src: daisyBouquets, top: '70%', right: '15%',   width: 200,  rotation: -10 },
  { src: lavenderFlower, top: '80%', right: '3%',   width: 100,  rotation: -10 },
  { src: blueFlower, top: '50%', right: '15%',   width: 100,  rotation: -10 },
  { src: pinkishFlower, top: '5%', right: '23%',   width: 100,  rotation: -10 },
  { src: orangeFlower, top: '5%', left: '5%',   width: 100,  rotation: -10 },
  { src: sunflower, top: '30%', left: '3%',   width: 100,  rotation: 8 },
  { src: purpleSingle, top: '15%',  left: '18%',  width: 75,  rotation: -5 },
  { src: plantedSunflower, top: '70%', left: '15%',   width: 200,  rotation: -10 },
  { src: plantedForsythia, top: '70%', left: '2%',   width: 200,  rotation: -10 },
  { src: pinkFlower, top: '50%', left: '15%',   width: 100,  rotation: -10 },
];

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

function ScatteredFlower({ src, top, left, right, width, rotation }) {
  return (
    <img
      className="cam-scattered-flower"
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

function Camera() {
  const videoRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureDelay, setCaptureDelay] = useState(3);
  const [isUploading, setIsUploading] = useState(false);
  const [dotCount, setDotCount] = useState(0);

  const navigate = useNavigate();

  const canvasToBlob = (canvas, type = 'image/jpeg', quality = 0.95) =>
    new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create image blob'));
          return;
        }
        resolve(blob);
      }, type, quality);
    });

  const startVideoStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 } } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing camera: ', error);
      });
  };

  const handleCaptureClick = () => {
  if (isCapturing || photos.length >= 3) return;
  setIsCapturing(true);
  startCountdownForShot();
};

const startCountdownForShot = () => {
  if (captureDelay > 0) {
    let countdown = captureDelay - 1;
    setTimer(captureDelay);

    const countdownInterval = setInterval(() => {
      setTimer(countdown);
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        capturePhoto();
      }
      countdown--;
    }, 1000);
  } else {
    capturePhoto();
  }
};

const capturePhoto = () => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const video = videoRef.current;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.save();
  context.translate(canvas.width, 0);
  context.scale(-1, 1);
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  context.restore();

  const dataURL = canvas.toDataURL('image/png');

  setPhotos((prevPhotos) => [
    ...prevPhotos,
    { id: Date.now(), src: dataURL },
  ]);
};

  const handleRetake = async () => {
    const result = await Swal.fire({
      title: 'Retake all photos?',
      text: "This will delete all captured photos.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6B0F1A',
      cancelButtonColor: '#C6C6C6',
      confirmButtonText: 'Yes, retake all',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      setPhotos([]);
      Swal.fire({
        title: 'Photos cleared!',
        text: 'You can now retake photos.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      });
    }
  };

  const handleDone = async () => {
    setIsUploading(true);

    try {
      const container = document.getElementById('hidden-photo-frame');

      if (!container) {
        throw new Error('Photo frame container not found');
      }

      const canvas = await html2canvas(container, {
        useCORS: true,
        backgroundColor: null,
        scale: 3,
        logging: false,
        allowTaint: true,
      });

      const imageBlob = await canvasToBlob(canvas, 'image/jpeg', 0.95);

      const formData = new FormData();
      formData.append('file', imageBlob, 'photostrip.jpg');
      formData.append('upload_preset', 'photobooth');

      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dqgazjbhj/image/upload',
        formData
      );

      const imageUrl = res.data.secure_url.replace(
        '/upload/',
        '/upload/q_auto,f_auto/fl_attachment:photostrip/'
      );
      navigate('/result', { state: { imageUrl } });
    } catch (err) {
      console.error('Cloudinary Upload Failed', err.response?.data || err.message);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    startVideoStream();
  }, []);

  useEffect(() => {
    if (isUploading) {
      const interval = setInterval(() => {
        setDotCount(prev => (prev + 1) % 4);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setDotCount(0);
    }
  }, [isUploading]);

  useEffect(() => {
  if (!isCapturing) return;

  if (photos.length === 0) return; 

  if (photos.length < 3) {
    const pause = setTimeout(() => {
      startCountdownForShot();
    }, 1200);
    return () => clearTimeout(pause);
  } else {
    setIsCapturing(false);
    setTimer(0);
  }
}, [photos]);

  return (
    <div className="camera-screen">
      {isUploading && (
        <div className="loader-overlay">
          <div className="loader-content">
            <img src={itLogo} alt="Loading..." className="floating-logo" />
            <h5 className="loading-text">Loading{'.'.repeat(dotCount)}</h5>
          </div>
        </div>
      )}

      {/* Scattered flowers */}
      {SCATTERED_FLOWERS.map((f, i) => (
        <ScatteredFlower key={i} {...f} />
      ))}

      {/* Falling petals */}
      {PETALS.map((p, i) => (
        <Petal key={i} {...p} />
      ))}

      <div className="camera-content">
        <div className="title-card camera-title-card">
          <span className="corner-dot corner-tl" />
          <span className="corner-dot corner-tr" />
          <span className="corner-dot corner-bl" />
          <span className="corner-dot corner-br" />
          <p className="eyebrow">2026 &middot; MAROON JAM</p>
          <h1>Photobooth</h1>
          <p className="edition-tag">&#10047; Panagbenga festival edition &#10047;</p>
        </div>

        <div className="preview-section">
          <div className="countdown">
            <video className="cam-preview" ref={videoRef} autoPlay playsInline></video>
            {isCapturing && timer > 0 && (
              <div className="countdown-overlay">
                <span key={timer} className="countdown-number">{timer}</span>
              </div>
            )}
          </div>
          <div className="preview-content">
            <div id="photos" className="photos">
              {photos.map((photo) => (
                <div key={photo.id} className="photo mb-1">
                  <img src={photo.src} alt={`captured-${photo.id}`} />
                </div>
              ))}
            </div>

            {/* Hidden PhotoStrip — explicit size so html2canvas renders it correctly */}
            <div id="hidden-photo-frame" style={{ width: '300px' }}>
              <PhotoStrip photos={photos} />
            </div>
          </div>
        </div>

        <div className="controls-row">
          <section className="capture-count-row">
            <h4>{photos.length}/3</h4>
            <select
              value={captureDelay}
              onChange={(e) => setCaptureDelay(parseInt(e.target.value))}
              disabled={isCapturing || photos.length >= 3}
              className="delay-select"
            >
              <option value={1}>1 second</option>
              <option value={3}>3 seconds</option>
              <option value={5}>5 seconds</option>
              <option value={10}>10 seconds</option>
            </select>
          </section>

          {photos.length < 3 && (
            <button
              className="capture-btn"
              onClick={handleCaptureClick}
              disabled={isCapturing}
            >
              <span className="btn-content">
                <span className="material-symbols-rounded">photo_camera</span>
                Capture
              </span>
            </button>
          )}

          {photos.length === 3 && (
            <div className="done-retake-group">
              <button className="retake-btn" onClick={handleRetake}>
                Retake
              </button>
              <button className="done-btn" onClick={handleDone}>
                <span>Done &rarr;</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="footer-credit">
        <span>Powered by Information Technology Student Council</span>
        <img src="/logos/image 1.png" alt="ITSC logo" className="footer-logo" />
      </div>
    </div>
  );
}

export default Camera;
