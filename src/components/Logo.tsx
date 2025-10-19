const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className="text-3xl font-bold tracking-[0.3em] text-foreground">
          AO
        </div>
        <div className="absolute inset-0 text-3xl font-bold tracking-[0.3em] text-primary opacity-0 animate-glow-pulse glow">
          AO
        </div>
      </div>
      <div className="h-8 w-px bg-border"></div>
      <span className="text-xs font-light tracking-[0.2em] uppercase text-muted-foreground">
        Originals
      </span>
    </div>
  );
};

export default Logo;
