import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

interface Profile {
  id: string;
  username: string;
  bio: string | null;
  avatar_url: string | null;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  image_url: string;
  provenance: string | null;
  serial_number: string;
}

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, [id]);

  const fetchProfileData = async () => {
    if (!id) return;

    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch user's products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', id)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;
      setProducts(productsData || []);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching profile:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Profile not found</h2>
            <Button onClick={() => navigate("/")}>Return Home</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Profile Header */}
        <Card className="glass-strong border-border/50 p-8 mb-12 max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-32 w-32 border-4 border-primary/30">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback>
                <User className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold tracking-wide mb-2">{profile.username}</h1>
              {profile.bio && (
                <p className="text-muted-foreground tracking-wide max-w-md mx-auto">
                  {profile.bio}
                </p>
              )}
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{products.length}</p>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">Originals</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Collection */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold tracking-wide mb-8 uppercase">
            {profile.username}'s Collection
          </h2>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-fade-in"
                >
                  <ProductCard 
                    id={product.id}
                    image={product.image_url}
                    name={product.name}
                    brand={product.brand}
                    verified={true}
                    serialNumber={product.serial_number}
                    provenance={product.provenance || ""}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass rounded-lg border border-border/30">
              <p className="text-muted-foreground tracking-wide">
                No products in this collection yet
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
