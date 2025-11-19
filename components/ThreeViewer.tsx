"use client";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useArboretumStore } from '@/lib/store';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function DefaultScene() {
  return (
    <>
      <mesh rotation={[0.4, 0.6, 0]}>
        <torusKnotGeometry args={[1.1, 0.32, 200, 32]} />
        <meshStandardMaterial color="#38d97f" metalness={0.15} roughness={0.35} />
      </mesh>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5,5,5]} intensity={2} />
      <Environment preset="forest" />
    </>
  );
}

export function ThreeViewer() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { models, addModel } = useArboretumStore();
  const [activeUrl, setActiveUrl] = useState<string | null>(null);

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    addModel({ title: f.name, url });
    setActiveUrl(url);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium">3D Studio</div>
        <div className="flex gap-3">
          <button className="btn-primary" onClick={() => fileRef.current?.click()}>Upload GLTF/OBJ</button>
          <input ref={fileRef} type="file" accept=".gltf,.glb,.obj,.fbx,model/*" className="hidden" onChange={onUpload} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <div className="card-surface p-2">
          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <Canvas camera={{ position: [3, 2, 3], fov: 45 }}>
              <color attach="background" args={[new THREE.Color(0x101418)] as any} />
              <OrbitControls />
              <DefaultScene />
            </Canvas>
          </div>
        </div>
        <div className="card-surface p-3 space-y-2 overflow-auto max-h-[60vh]">
          <div className="text-sm text-slate-300">Models</div>
          {models.length === 0 && <div className="text-sm text-slate-500">Upload a model to begin.</div>}
          {models.map(m => (
            <button key={m.id} onClick={() => setActiveUrl(m.url)} className="w-full text-left p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10">
              <div className="text-sm">{m.title}</div>
              <div className="text-xs text-slate-400">{new Date(m.date).toLocaleString()}</div>
            </button>
          ))}
          <div className="text-xs text-slate-500">Note: Uploaded files use in-browser URLs for privacy.</div>
        </div>
      </div>
    </div>
  );
}
