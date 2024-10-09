import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import  Model from './Scene.jsx';
import { useNavigate } from 'react-router-dom';

import './Css/view3d.css'



export default function View3d() {
  const navigate = useNavigate();
  return (
    <div className='main3d'>
      {/* <h1><a href="/Iphone13pro-detail"> X </a></h1> */}
      <i className='bi bi-x ' onClick={() => navigate('/Iphone13pro-detail')}></i>
      <div className='canvas-container'>
        <Canvas>
          <ambientLight intensity={3} />
          <directionalLight position={[0, 10, 0]} intensity={5} />
          <directionalLight position={[10, 0, 10]} intensity={1} />
          <directionalLight position={[40, -40, -40]} intensity={21} />
          <OrbitControls />
          <Suspense fallback={null}>
      
            <Model position={[0, 0, 0]} scale={[3, 3, 3]} />
          </Suspense>
         
        </Canvas>
      </div>
    </div>
  );
}
