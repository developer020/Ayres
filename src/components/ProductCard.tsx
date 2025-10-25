import { Shield, ExternalLink, Eye, Share2, RefreshCw, Plus, Film } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  brand: string;
  verified: boolean;
  serialNumber: string;
  taps?: number;
  storiesCount?: number;
  provenance?: string;
}

const ProductCard = ({ 
  id,
  image, 
  name, 
  brand, 
  verified, 
  serialNumber, 
  taps = 0,
  storiesCount = 0,
  provenance = "Authenticated at Hermès Paris, Rue du Faubourg Saint-Honoré"
}: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
      <Card className="group glass hover:glass-strong transition-all duration-500 overflow-hidden border-border/50 hover:border-primary/30 cursor-pointer">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
        
        {/* Story Ring Indicator */}
        {storiesCount > 0 && (
          <div className="absolute top-4 left-4">
            <div className="relative w-12 h-12 rounded-full glass-strong border-2 border-primary animate-glow-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <Film className="h-5 w-5 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 glass-strong rounded-full w-5 h-5 flex items-center justify-center border border-primary/50 text-[10px] font-bold">
                {storiesCount}
              </div>
            </div>
          </div>
        )}
        
        {verified && (
          <div className="absolute top-4 right-4 flex items-center gap-2 glass-strong px-3 py-1.5 rounded-full glow">
            <Shield className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium tracking-wider uppercase">Verified</span>
          </div>
        )}

        {/* Taps Counter */}
        {taps > 0 && (
          <div className="absolute bottom-4 right-4 glass-strong px-3 py-1.5 rounded-full">
            <span className="text-xs font-medium tracking-wider">{taps.toLocaleString()} taps</span>
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold tracking-wide">{name}</h3>
            <p className="text-sm text-muted-foreground tracking-wider uppercase">{brand}</p>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        {/* Provenance Snippet */}
        <div className="text-xs text-muted-foreground/80 tracking-wide italic line-clamp-2">
          {provenance}
        </div>
        
        <div className="pt-3 border-t border-border/30 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground tracking-widest uppercase">Serial</p>
            <p className="text-sm font-mono text-foreground/80 mt-1">{serialNumber}</p>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="outline" className="gap-1.5 glass border-border/50 hover:border-primary/50 text-xs">
              <Eye className="h-3 w-3" />
              Provenance
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5 glass border-border/50 hover:border-primary/50 text-xs">
              <Share2 className="h-3 w-3" />
              Share
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5 glass border-border/50 hover:border-primary/50 text-xs">
              <RefreshCw className="h-3 w-3" />
              Transfer
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5 glass border-border/50 hover:border-primary/50 text-xs">
              <Plus className="h-3 w-3" />
              Story
            </Button>
          </div>
        </div>
      </div>
    </Card>
    </Link>
  );
};

export default ProductCard;
