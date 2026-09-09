const dots = [
  { top: 72, left: 120, duration: 3.2, delay: 0 },
  { top: 192, left: 312, duration: 4, delay: 0.6 },
  { top: 312, left: 192, duration: 3.6, delay: 1.2 },
  { top: 120, left: 456, duration: 4.4, delay: 0.3 },
  { top: 384, left: 72, duration: 3, delay: 1.8 },
  { top: 264, left: 504, duration: 3.8, delay: 0.9 },
  { top: 64, left: 640, duration: 3.4, delay: 1.5 },
  { top: 416, left: 288, duration: 4.2, delay: 0.2 },
  { top: 160, left: 96, duration: 3.7, delay: 2.1 },
  { top: 328, left: 608, duration: 3.1, delay: 0.7 },
  { top: 480, left: 416, duration: 4.6, delay: 1.1 },
  { top: 96, left: 352, duration: 3.9, delay: 1.9 },
];

const BackgroundDecor = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {dots.map((dot, i) => (
        <span
          key={i}
          className="absolute h-[2px] w-[2px] rounded-full bg-accent shadow-[0_0_8px_2px_rgba(217,196,165,0.6)]"
          style={{
            top: dot.top,
            left: dot.left,
            animation: `blink ${dot.duration}s ease-in-out infinite`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundDecor;
