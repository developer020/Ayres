import { Button } from "@/components/ui/button";
import { Shield, Scan, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Futuristic authentication interface"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(rgba(0,229,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center space-y-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
          <Sparkles className="h-4 w-4 text-primary animate-glow-pulse" />
          <span className="text-xs tracking-widest uppercase text-muted-foreground">
            Blockchain-Backed Authentication
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-wider uppercase leading-tight">
          Verify The{" "}
          <span className="text-primary text-glow">Extraordinary</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed tracking-wide">
          Your luxury products deserve more than receipts. Welcome to the future of
          authenticity—where every original is protected, proven, and perfectly yours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button
            size="lg"
            className="gap-2 glass-strong hover:glass text-foreground hover:text-primary border-primary/30 hover:border-primary transition-all duration-300 glow uppercase tracking-widest px-8"
          >
            <Scan className="h-5 w-5" />
            Authenticate Now
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="gap-2 glass hover:glass-strong border-border/50 hover:border-primary/30 transition-all duration-300 uppercase tracking-widest px-8"
          >
            <Shield className="h-5 w-5" />
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-16">
          {[
            { value: "50K+", label: "Products Verified" },
            { value: "200+", label: "Luxury Brands" },
            { value: "99.9%", label: "Authentication Success" },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass p-6 rounded-lg border border-border/30 hover:border-primary/30 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-xs tracking-widest uppercase text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
