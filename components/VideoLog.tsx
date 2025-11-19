"use client";
import { useArboretumStore } from '@/lib/store';
import { useRef } from 'react';

export function VideoLog() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { videos, addVideo } = useArboretumStore();

  function addFromUrl() {
    const url = prompt('Video URL');
    if (!url) return;
    const title = prompt('Title') || 'Video Log';
    addVideo({ title, url });
  }

  function addFromFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const objectUrl = URL.createObjectURL(f);
    addVideo({ title: f.name, url: objectUrl });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium">Video Logs</div>
        <div className="flex gap-3">
          <button className="btn-ghost" onClick={addFromUrl}>Add via URL</button>
          <button className="btn-primary" onClick={() => fileRef.current?.click()}>Upload File</button>
          <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={addFromFile} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {videos.map(v => (
          <div key={v.id} className="card-surface overflow-hidden">
            <video src={v.url} controls className="w-full aspect-video" />
            <div className="p-3">
              <div className="text-sm">{v.title}</div>
              <div className="text-xs text-slate-400">{new Date(v.date).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
