import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const Embers = ({ isAccelerating }: { isAccelerating: boolean }) => {
  const embers = Array.from({ length: 50 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {embers.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const baseDuration = 2 + Math.random() * 5;
        const duration = isAccelerating ? baseDuration * 0.3 : baseDuration;
        const size = 1 + Math.random() * 4;

        return (
          <motion.div
            key={i}
            className="absolute bottom-0 rounded-full bg-red-500"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              boxShadow: '0 0 10px 2px rgba(255, 0, 0, 0.8)',
            }}
            animate={{
              y: ['10vh', '-110vh'],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
              scale: isAccelerating ? [1, 2, 1] : 1,
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: isAccelerating ? 0 : delay,
              ease: 'linear',
            }}
          />
        );
      })}
    </div>
  );
};

export default function App() {
  const [progress, setProgress] = useState(0);
  const [activeLog, setActiveLog] = useState(0);
  const [isAccelerating, setIsAccelerating] = useState(false);

  // Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
    mouseX.set(x);
    mouseY.set(y);
  };

  // Parallax Transforms for different depth layers
  const bgX = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const bgY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);
  
  const dragonX = useTransform(smoothMouseX, [-1, 1], [-40, 40]);
  const dragonY = useTransform(smoothMouseY, [-1, 1], [-40, 40]);
  
  const textX = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const textY = useTransform(smoothMouseY, [-1, 1], [-20, 20]);
  
  const fgX = useTransform(smoothMouseX, [-1, 1], [-70, 70]);
  const fgY = useTransform(smoothMouseY, [-1, 1], [-70, 70]);

  const logs = [
    "SUMMONING ASSETS...",
    "LOADING MESH_DRAGON_V4.OBJ",
    "LOADING TEXTURE_ROOM_BLOOD_4K.PNG",
    "HIGH MEMORY USAGE DETECTED",
    "COMPILING SHADERS...",
    "VULKAN RENDERER INITIALIZED",
    "PARSING VOXEL DATA...",
    "STABILIZING MANA CORE...",
  ];

  useEffect(() => {
    const intervalTime = isAccelerating ? 30 : 100;
    const progressAmount = isAccelerating ? 1.5 : 0.5;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) return 99;
        return Math.min(99, prev + Math.random() * progressAmount);
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isAccelerating]);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setActiveLog((prev) => (prev + 1) % logs.length);
    }, isAccelerating ? 200 : 800);
    return () => clearInterval(logInterval);
  }, [logs.length, isAccelerating]);

  const displayProgress = Math.floor(progress);

  return (
    <div 
      className="relative w-full h-screen bg-[#050000] text-red-500 font-mono overflow-hidden flex flex-col items-center justify-center selection:bg-red-900 selection:text-white cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsAccelerating(true)}
      onMouseUp={() => setIsAccelerating(false)}
      onMouseLeave={() => setIsAccelerating(false)}
    >
      {/* Interactive Background ambient glow */}
      <motion.div 
        className="absolute inset-[-50px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-[#050000] to-[#050000] z-0"
        style={{ x: bgX, y: bgY }}
      />
      
      <Embers isAccelerating={isAccelerating} />

      {/* Top Right System Status */}
      <div className="absolute top-8 right-8 flex items-center gap-2 text-[10px] text-red-500/50 tracking-widest z-20 pointer-events-none">
        <div className="w-3 h-3 border border-red-500/50 flex items-center justify-center">
          <motion.div 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ duration: isAccelerating ? 0.5 : 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-red-500/80"
          />
        </div>
        {isAccelerating ? "OVERCLOCKING..." : "SYSTEM INITIALIZING"}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-8 h-full pointer-events-none">
        
        {/* Central Graphic Area */}
        <div className="relative flex flex-col items-center justify-center flex-1 w-full mt-12">
          
          {/* Animated & Interactive Dragon */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center opacity-80 mix-blend-screen"
            style={{ x: dragonX, y: dragonY }}
          >
            <motion.img 
              // Using Shenron from Dragon Ball Z and using CSS filters to turn him into a glowing red dragon!
              src="https://freepngimg.com/thumb/dragon_ball/23971-9-shenron-transparent-image.png" 
              alt="Shenron Red Dragon" 
              referrerPolicy="no-referrer"
              className="w-full max-w-[45rem] object-contain drop-shadow-[0_0_30px_rgba(255,0,0,0.8)]"
              style={{ 
                // Hue rotate 240deg turns the green dragon into a brilliant crimson red
                filter: 'hue-rotate(240deg) saturate(400%) brightness(80%) contrast(150%) drop-shadow(0 0 30px rgba(255,0,0,0.8))' 
              }}
              animate={{ 
                y: [-15, 15, -15],
                scale: isAccelerating ? [1.05, 1.08, 1.05] : [1, 1.02, 1],
                filter: isAccelerating 
                  ? [
                      'hue-rotate(240deg) saturate(600%) brightness(120%) contrast(150%) drop-shadow(0 0 60px rgba(255,0,0,1))',
                      'hue-rotate(240deg) saturate(800%) brightness(150%) contrast(150%) drop-shadow(0 0 80px rgba(255,50,50,1))',
                      'hue-rotate(240deg) saturate(600%) brightness(120%) contrast(150%) drop-shadow(0 0 60px rgba(255,0,0,1))'
                    ]
                  : [
                      'hue-rotate(240deg) saturate(400%) brightness(80%) contrast(150%) drop-shadow(0 0 30px rgba(255,0,0,0.8))',
                      'hue-rotate(240deg) saturate(500%) brightness(100%) contrast(150%) drop-shadow(0 0 50px rgba(255,0,0,1))',
                      'hue-rotate(240deg) saturate(400%) brightness(80%) contrast(150%) drop-shadow(0 0 30px rgba(255,0,0,0.8))'
                    ]
              }}
              transition={{ 
                duration: isAccelerating ? 1.5 : 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>

          {/* KAIZEN Text with Parallax */}
          <motion.div 
            className="relative z-10 flex items-center justify-center mt-32"
            style={{ x: textX, y: textY }}
          >
            <h1 className="text-7xl md:text-[11rem] font-display tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-red-200 via-red-600 to-red-950"
                style={{ 
                  WebkitTextStroke: '2px rgba(255,50,50,0.5)',
                  filter: isAccelerating ? 'drop-shadow(0 0 50px rgba(255,0,0,0.9))' : 'drop-shadow(0 0 30px rgba(255,0,0,0.6))',
                  transition: 'filter 0.3s ease'
                }}>
              KAIZEN
            </h1>
          </motion.div>
        </div>

        {/* Bottom Loading Section */}
        <div className="w-full pb-16 mt-auto z-20">
          
          {/* Text Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-[9px] md:text-[11px] tracking-[0.2em] text-red-500/60 uppercase">
            {/* Left Column */}
            <div className="flex flex-col gap-2">
              <div className={`flex items-center gap-2 transition-colors duration-300 ${activeLog === 0 ? 'text-red-400 drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]' : ''}`}>
                <motion.span animate={{ rotate: 360 }} transition={{ duration: isAccelerating ? 0.5 : 2, repeat: Infinity, ease: "linear" }}>⟳</motion.span>
                SUMMONING ASSETS...
              </div>
              <div className={`transition-colors duration-300 ${activeLog === 1 ? 'text-red-400 drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]' : ''}`}>LOADING MESH_DRAGON_V4.OBJ</div>
              <div className={`transition-colors duration-300 ${activeLog === 2 ? 'text-red-400 drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]' : ''}`}>LOADING TEXTURE_ROOM_BLOOD_4K.PNG</div>
            </div>

            {/* Middle Column */}
            <div className="flex flex-col gap-2 items-center text-center">
              <div className={`transition-colors duration-300 ${activeLog === 3 ? 'text-red-400 drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]' : ''}`}>HIGH MEMORY USAGE DETECTED</div>
              <div className={`transition-colors duration-300 ${activeLog === 4 ? 'text-red-400 drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]' : ''}`}>COMPILING SHADERS...</div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-2 items-end text-right">
              <div className={`transition-colors duration-300 ${activeLog === 5 ? 'text-red-400 drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]' : ''}`}>VULKAN RENDERER INITIALIZED</div>
              <div className={`transition-colors duration-300 ${activeLog === 6 ? 'text-red-400 drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]' : ''}`}>PARSING VOXEL DATA...</div>
              <div className={`transition-colors duration-300 ${activeLog === 7 ? 'text-red-400 drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]' : ''}`}>STABILIZING MANA CORE...</div>
            </div>
          </div>

          {/* Progress Bar & Percentage */}
          <div className="relative flex items-center gap-6">
            <div className="flex-1 relative h-[3px] bg-red-950/80 rounded-full overflow-visible border-y border-red-900/40">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-900 via-red-500 to-red-400 shadow-[0_0_15px_3px_rgba(255,0,0,0.6)]"
                style={{ width: `${progress}%` }}
                layout
              >
                {/* Glowing head of the progress bar */}
                <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-5 bg-white rounded-full transition-shadow duration-300 ${isAccelerating ? 'shadow-[0_0_15px_5px_rgba(255,255,255,0.9),0_0_30px_12px_rgba(255,0,0,1)]' : 'shadow-[0_0_10px_3px_rgba(255,255,255,0.8),0_0_20px_8px_rgba(255,0,0,0.9)]'}`}></div>
              </motion.div>
            </div>
            <div className="text-6xl md:text-7xl font-display tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,0,0,0.8)] w-28 text-right flex items-baseline justify-end">
              {displayProgress}<span className="text-3xl text-red-500 ml-1">%</span>
            </div>
          </div>

          {/* Bottom Magic Circle / Glow with Parallax */}
          <motion.div 
            className="relative w-full flex justify-center mt-12"
            style={{ x: fgX, y: fgY }}
          >
            <motion.div 
              style={{ rotateX: 75 }}
              animate={{ rotateZ: 360 }}
              transition={{ duration: isAccelerating ? 5 : 20, repeat: Infinity, ease: "linear" }}
              className="w-80 h-80 border-2 border-red-500/20 rounded-full absolute -top-40 flex items-center justify-center shadow-[inset_0_0_50px_rgba(255,0,0,0.2)]"
            >
              <div className="w-72 h-72 border border-red-500/30 rounded-full flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-red-500/50 rounded-full border-dashed shadow-[0_0_30px_rgba(255,0,0,0.4)]"></div>
              </div>
            </motion.div>
            
            {/* Floor Glow */}
            <div className={`absolute -top-40 w-96 h-32 rounded-[100%] blur-3xl pointer-events-none transition-all duration-300 ${isAccelerating ? 'bg-red-500/40 scale-110' : 'bg-red-600/20 scale-100'}`}></div>
            
            {/* Tiny footer text */}
            <div className="w-full flex justify-between text-[8px] text-red-500/30 tracking-widest mt-8 z-10">
              <span>U201 2040-K2N-X</span>
              <span className={isAccelerating ? "text-red-400" : ""}>
                {isAccelerating ? "OVERRIDE ACTIVE" : "V.2.4.0-RC"}
              </span>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Interactive Overlay Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-red-500/40 tracking-widest pointer-events-none animate-pulse">
        CLICK AND HOLD TO ACCELERATE
      </div>
    </div>
  );
}
