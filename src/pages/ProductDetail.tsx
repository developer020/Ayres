import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Shield, ExternalLink, Lock, Unlock, Film, Calendar, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

// Mock product data - in production this would come from backend
const productData: Record<string, any> = {
  "1": {
    id: "1",
    image: "/src/assets/product-handbag.jpg",
    name: "Birkin 30",
    brand: "Hermès",
    description: "Classic Togo leather Birkin bag in noir with palladium hardware",
    verified: true,
    serialNumber: "Z-01-4892",
    model: "Birkin 30",
    origin: "Paris, France",
    verificationDate: "March 15, 2024",
    blockchainLink: "https://etherscan.io/token/0x...",
    taps: 2847,
    permanentOriginStory: "Crafted in the Hermès atelier in Paris, Rue du Faubourg Saint-Honoré. This Birkin 30 was meticulously handmade over 18 hours by master artisan Marie Leclerc, who has been with Hermès for over 25 years. The Togo leather was sourced from a select French tannery, treated with traditional techniques passed down through generations.",
    temporaryStories: [
      {
        id: "s1",
        media: "/src/assets/product-handbag.jpg",
        type: "image",
        timestamp: "2 days ago",
        caption: "First outing in Milan Fashion Week",
        expiresIn: "28 days"
      },
      {
        id: "s2",
        media: "/src/assets/product-handbag.jpg",
        type: "video",
        timestamp: "1 week ago",
        caption: "A night at the opera",
        expiresIn: "23 days"
      }
    ]
  },
  "2": {
    id: "2",
    image: "/src/assets/product-watch.jpg",
    name: "Nautilus 5711",
    brand: "Patek Philippe",
    description: "Stainless steel automatic watch with blue dial",
    verified: true,
    serialNumber: "PP-6789012",
    model: "Nautilus 5711/1A-010",
    origin: "Geneva, Switzerland",
    verificationDate: "January 8, 2024",
    blockchainLink: "https://etherscan.io/token/0x...",
    taps: 5423,
    permanentOriginStory: "Manufactured in the Patek Philippe Manufacture in Plan-les-Ouates, Geneva. This iconic Nautilus represents over 300 hours of meticulous craftsmanship. The caliber 324 S C movement was assembled by hand, adjusted in five positions, and tested for accuracy over 30 days before being cased.",
    temporaryStories: [
      {
        id: "s3",
        media: "/src/assets/product-watch.jpg",
        type: "image",
        timestamp: "3 days ago",
        caption: "Board meeting essential",
        expiresIn: "27 days"
      }
    ]
  },
  "3": {
    id: "3",
    image: "/src/assets/product-sneakers.jpg",
    name: "Air Jordan 1 Retro",
    brand: "Nike",
    description: "Chicago colorway, original 1985 release",
    verified: true,
    serialNumber: "NJ-850422-CH",
    model: "Air Jordan 1 High OG",
    origin: "Portland, Oregon, USA",
    verificationDate: "February 20, 2024",
    blockchainLink: "https://etherscan.io/token/0x...",
    taps: 8932,
    permanentOriginStory: "Original 1985 release from Nike's Beaverton campus. These Air Jordan 1s were part of the revolutionary line that changed sneaker culture forever. Designed by Peter Moore, they broke NBA color rules and created a new category of athletic footwear as cultural icons.",
    temporaryStories: []
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  const product = productData[id || "1"];

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleNFTTap = () => {
    if (!isUnlocked) {
      // Simulate biometric/password verification
      setIsUnlocked(true);
      setTimeout(() => setIsFlipped(true), 300);
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/collection")}
          className="mb-8 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Collection
        </Button>

        {/* Digital Identity (NFT) Hero Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative perspective-1000">
            <div
              className={`relative w-full aspect-square cursor-pointer transition-transform duration-700 transform-style-3d ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              onClick={handleNFTTap}
            >
              {/* Front - NFT Display */}
              <div className="absolute inset-0 backface-hidden">
                <Card className="h-full glass-strong border-primary/30 overflow-hidden group hover:border-primary/50 transition-all duration-500">
                  <div className="relative h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    
                    {/* NFT Badge */}
                    <div className="absolute top-6 right-6 glass-strong px-4 py-2 rounded-full glow-strong">
                      <span className="text-xs font-bold tracking-widest uppercase text-primary">Digital Identity</span>
                    </div>

                    {/* Lock Indicator */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-strong p-4 rounded-full animate-glow-pulse">
                      {isUnlocked ? (
                        <Unlock className="h-6 w-6 text-primary" />
                      ) : (
                        <Lock className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>

                    {/* Hover Instruction */}
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs text-muted-foreground tracking-wider">
                        {isUnlocked ? "Tap to reveal certificate" : "Tap to authenticate"}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Back - Certificate of Authenticity */}
              <div className="absolute inset-0 backface-hidden rotate-y-180">
                <Card className="h-full glass-strong border-primary/50 p-8 overflow-auto">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="h-8 w-8 text-primary glow" />
                        <div>
                          <h3 className="text-xl font-bold tracking-wide">Certificate of Authenticity</h3>
                          <p className="text-sm text-muted-foreground">Verified & Blockchain-Secured</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-border/30">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">Brand</p>
                          <p className="font-semibold">{product.brand}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">Model</p>
                          <p className="font-semibold">{product.model}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">Serial Number</p>
                          <p className="font-mono text-sm">{product.serialNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">Origin</p>
                          <p className="font-semibold">{product.origin}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">Verification Date</p>
                          <p className="font-semibold">{product.verificationDate}</p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          variant="outline"
                          className="w-full gap-2 glass border-primary/30 hover:border-primary/50"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(product.blockchainLink, '_blank');
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                          View on Blockchain
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-4xl font-bold tracking-wide">{product.name}</h1>
            <p className="text-lg text-muted-foreground tracking-wider uppercase">{product.brand}</p>
            <p className="text-muted-foreground/80 tracking-wide max-w-xl mx-auto">
              {product.description}
            </p>
          </div>
        </div>

        {/* Permanent Origin Story */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="glass-strong border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden group cursor-pointer">
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full glass-strong">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold tracking-wide">Permanent Origin Story</h2>
              </div>
              
              <p className="text-muted-foreground/90 leading-relaxed tracking-wide">
                {product.permanentOriginStory}
              </p>

              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" className="gap-2">
                  <Eye className="h-4 w-4" />
                  View Full History
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Temporary Stories */}
        {product.temporaryStories.length > 0 && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Film className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-wide">Stories</h2>
              <span className="glass-strong px-3 py-1 rounded-full text-xs font-medium">
                {product.temporaryStories.length}
              </span>
            </div>

            <div className="space-y-4">
              {product.temporaryStories.map((story) => (
                <Card
                  key={story.id}
                  className="glass hover:glass-strong transition-all duration-500 overflow-hidden group cursor-pointer border-border/50 hover:border-primary/30"
                  onClick={() => setSelectedStory(story.id)}
                >
                  <div className="flex gap-4 p-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={story.media}
                        alt={story.caption}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {story.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/20">
                          <Film className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <p className="font-medium tracking-wide">{story.caption}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {story.timestamp}
                        </span>
                        <span className="glass-strong px-2 py-0.5 rounded-full">
                          Expires in {story.expiresIn}
                        </span>
                      </div>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductDetail;
