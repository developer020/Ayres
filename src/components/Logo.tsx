import ayresLogo from "@/assets/ayres-logo.png";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={ayresLogo} 
        alt="Ayres Originals" 
        className="h-10 w-10 object-contain opacity-90 hover:opacity-100 transition-opacity"
      />
      <div className="h-8 w-px bg-border"></div>
      <span className="text-xs font-light tracking-[0.2em] uppercase text-muted-foreground">
        Ayres Originals
      </span>
    </div>
  );
};

export default Logo;
