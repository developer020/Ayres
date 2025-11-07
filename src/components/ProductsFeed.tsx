import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

interface Product {
  id: string;
  name: string;
  brand: string;
  image_url: string;
  provenance: string | null;
  serial_number: string;
}

const ProductsFeed = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        if (import.meta.env.DEV) {
          console.error('Error fetching products:', error);
        }
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {!user && (
        <div className="text-center py-8 glass rounded-lg border border-border/30 mb-8">
          <h3 className="text-lg font-semibold mb-2 tracking-wide">
            Join Ayres Originals
          </h3>
          <p className="text-muted-foreground mb-4 tracking-wide">
            Sign in to start authenticating and collecting luxury originals
          </p>
          <Link to="/auth">
            <Button className="uppercase tracking-widest">Sign In / Sign Up</Button>
          </Link>
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
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
        <div className="flex flex-col items-center justify-center py-24 space-y-6 animate-fade-in">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-transparent animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl text-primary glow-strong">AO</div>
            </div>
          </div>
          <p className="text-lg text-muted-foreground tracking-wide text-center max-w-md">
            No Originals yet — your journey starts with one.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductsFeed;
