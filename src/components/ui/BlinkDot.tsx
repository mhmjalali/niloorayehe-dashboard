const BlinkDot = () => {
  return (
    <span className="absolute top-0.5 right-0.5 flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-error opacity-75" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-error" />
    </span>
  );
};

export default BlinkDot;
