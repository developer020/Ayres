import { Shield, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProductCardProps {
  image: string;
  name: string;
  brand: string;
  verified: boolean;
  serialNumber: string;
}

const ProductCard = ({ image, name, brand, verified, serialNumber }: ProductCardProps) => {
  return (
    <Card className="group glass hover:glass-strong transition-all duration-500 overflow-hidden border-border/50 hover:border-primary/30 cursor-pointer">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
        
        {verified && (
          <div className="absolute top-4 right-4 flex items-center gap-2 glass-strong px-3 py-1.5 rounded-full glow">
            <Shield className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium tracking-wider uppercase">Verified</span>
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold tracking-wide">{name}</h3>
            <p className="text-sm text-muted-foreground tracking-wider uppercase">{brand}</p>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="pt-3 border-t border-border/30">
          <p className="text-xs text-muted-foreground tracking-widest uppercase">Serial</p>
          <p className="text-sm font-mono text-foreground/80 mt-1">{serialNumber}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
