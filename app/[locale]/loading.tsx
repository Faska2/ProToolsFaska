import { Rocket } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8">
      <div className="relative w-24 h-24 mb-8">
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
        
        {/* Spinning Ring */}
        <div className="absolute inset-0 border-4 border-white/5 border-t-primary rounded-full animate-spin" />
        
        {/* Inner Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Rocket className="w-8 h-8 text-white animate-pulse" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <h3 className="text-xl font-black text-white tracking-widest uppercase">
          ProTools
        </h3>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  );
}
