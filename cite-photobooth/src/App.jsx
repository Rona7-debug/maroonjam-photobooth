import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import Camera from './components/Camera';
import Result from './components/Result';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StripPreview from './components/StripPreview';
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
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
        <div className="app-content">
          <Routes>
            <Route path="/" element={<WelcomeScreen />} /> 
            <Route path="/camera" element={<Camera />} />
            <Route path="/result" element={<Result />} />
            <Route path="/strip-preview" element={<StripPreview />} />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </Router>
  );
}

export default App;
