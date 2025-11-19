import { VideoLog } from '@/components/VideoLog';

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Video Logs</h1>
      <div className="card-surface p-4">
        <VideoLog />
      </div>
    </div>
  );
}
