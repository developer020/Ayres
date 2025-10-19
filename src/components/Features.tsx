import { Shield, Fingerprint, Smartphone, Lock, Zap, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Verification",
      description: "Immutable proof of authenticity stored on secure blockchain networks",
    },
    {
      icon: Fingerprint,
      title: "Digital Identity",
      description: "Each product receives a unique, tamper-proof digital certificate",
    },
    {
      icon: Smartphone,
      title: "One-Tap Authentication",
      description: "Instant verification through our seamless mobile interface",
    },
    {
      icon: Lock,
      title: "Secure Storage",
      description: "Military-grade encryption protects your luxury collection data",
    },
    {
      icon: Zap,
      title: "Instant Transfer",
      description: "Transfer ownership rights securely when selling or gifting",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connected to 200+ luxury brands and authentication partners worldwide",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wider uppercase">
            Precision <span className="text-primary">Engineering</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto tracking-wide">
            Built with cutting-edge technology to ensure every detail of your luxury goods is protected
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass hover:glass-strong p-8 rounded-lg border border-border/30 hover:border-primary/30 transition-all duration-500 group"
              >
                <div className="flex items-start gap-4">
                  <div className="glass-strong p-3 rounded-lg group-hover:glow transition-all duration-300">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-semibold tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
