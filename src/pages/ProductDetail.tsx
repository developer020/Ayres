import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Shield, ExternalLink, Lock, Unlock, Film, Calendar, Eye, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Product {
  id: string;
  name: string;
  brand: string;
  image_url: string;
  serial_number: string;
  provenance: string | null;
  verified_at: string | null;
  blockchain_hash: string | null;
  digital_twin_data: any;
  user_id: string;
}

interface Profile {
  id: string;
  username: string;
  bio: string | null;
  avatar_url: string | null;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [owner, setOwner] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const isOwner = user && product && user.id === product.user_id;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductData();
  }, [id]);

  const fetchProductData = async () => {
    if (!id) return;

    try {
      // Fetch product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (productError) throw productError;

      setProduct(productData);

      // Fetch owner profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', productData.user_id)
        .single();

      if (profileError) throw profileError;

      setOwner(profileData);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <Button onClick={() => navigate("/")}>Return Home</Button>
          </div>
        </main>
      </div>
    );
  }

  const handleNFTTap = () => {
    // Only allow flipping if user is the owner
    if (!isOwner) return;

    if (!isUnlocked) {
      setIsUnlocked(true);
      setTimeout(() => setIsFlipped(true), 300);
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  const verificationDate = product.verified_at 
    ? new Date(product.verified_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'Not verified';

  const digitalTwinData = product.digital_twin_data || {};

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(isOwner ? "/collection" : "/")}
          className="mb-8 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {isOwner ? "Back to Collection" : "Back to Feed"}
        </Button>

        {/* Owner Info */}
        {owner && (
          <div className="max-w-2xl mx-auto mb-8">
            <Link to={`/profile/${owner.id}`}>
              <Card className="glass hover:glass-strong transition-all duration-300 p-6 border-border/50 hover:border-primary/30 cursor-pointer">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary/30">
                    <AvatarImage src={owner.avatar_url || undefined} />
                    <AvatarFallback>
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">
                      {isOwner ? "You own this" : "Owned by"}
                    </p>
                    <h3 className="text-lg font-semibold tracking-wide">{owner.username}</h3>
                    {owner.bio && (
                      <p className="text-sm text-muted-foreground/80 mt-1">{owner.bio}</p>
                    )}
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              </Card>
            </Link>
          </div>
        )}

        {/* Digital Identity (NFT) Hero Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative perspective-1000">
            <div
              className={`relative w-full aspect-square transition-transform duration-700 transform-style-3d ${
                isFlipped ? "rotate-y-180" : ""
              } ${isOwner ? "cursor-pointer" : ""}`}
              onClick={isOwner ? handleNFTTap : undefined}
            >
              {/* Front - NFT Display */}
              <div className="absolute inset-0 backface-hidden">
                <Card className="h-full glass-strong border-primary/30 overflow-hidden group hover:border-primary/50 transition-all duration-500">
                  <div className="relative h-full">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    
                    {/* NFT Badge */}
                    <div className="absolute top-6 right-6 glass-strong px-4 py-2 rounded-full glow-strong">
                      <span className="text-xs font-bold tracking-widest uppercase text-primary">Digital Identity</span>
                    </div>

                    {/* Lock Indicator - Only show for owners */}
                    {isOwner && (
                      <>
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
                      </>
                    )}
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
                          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">Name</p>
                          <p className="font-semibold">{product.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">Serial Number</p>
                          <p className="font-mono text-sm">{product.serial_number}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">Authenticity Score</p>
                          <p className="font-semibold">{digitalTwinData.confidence_score || "Verified"}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">Verification Date</p>
                          <p className="font-semibold">{verificationDate}</p>
                        </div>
                      </div>

                      {product.blockchain_hash && (
                        <div className="pt-4">
                          <Button
                            variant="outline"
                            className="w-full gap-2 glass border-primary/30 hover:border-primary/50"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`https://etherscan.io/tx/${product.blockchain_hash}`, '_blank');
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                            View on Blockchain
                          </Button>
                        </div>
                      )}
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
              <h2 className="text-xl font-semibold tracking-wide">Product Details</h2>
              </div>
              
              {product.provenance ? (
                <p className="text-muted-foreground/90 leading-relaxed tracking-wide">
                  {product.provenance}
                </p>
              ) : (
                <p className="text-muted-foreground/70 leading-relaxed tracking-wide italic">
                  No provenance information available yet.
                </p>
              )}

              {digitalTwinData.analysis && (
                <div className="mt-6 pt-6 border-t border-border/30">
                  <h3 className="text-sm font-semibold tracking-wider uppercase text-primary mb-3">AI Analysis</h3>
                  <p className="text-muted-foreground/90 leading-relaxed text-sm">
                    {digitalTwinData.analysis}
                  </p>
                </div>
              )}

              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" className="gap-2">
                  <Eye className="h-4 w-4" />
                  View Full History
                </Button>
              </div>
            </div>
          </Card>
        </div>

      </main>
    </div>
  );
};

export default ProductDetail;
