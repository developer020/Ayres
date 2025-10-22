import Navigation from "@/components/Navigation";
import ProfileHeader from "@/components/ProfileHeader";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import handbagImg from "@/assets/product-handbag.jpg";
import watchImg from "@/assets/product-watch.jpg";
import sneakersImg from "@/assets/product-sneakers.jpg";
import ayresLogo from "@/assets/ayres-logo.png";

const Collection = () => {
  const products = [
    {
      id: "1",
      image: handbagImg,
      name: "Kelly 28",
      brand: "Hermès",
      verified: true,
      serialNumber: "AO-HRM-2024-0891",
      taps: 542,
      storiesCount: 3,
      provenance: "Authenticated at Hermès Paris, Rue du Faubourg Saint-Honoré"
    },
    {
      id: "2",
      image: watchImg,
      name: "Nautilus 5711",
      brand: "Patek Philippe",
      verified: true,
      serialNumber: "AO-PPH-2024-0234",
      taps: 1289,
      storiesCount: 2,
      provenance: "Certified by Patek Philippe Geneva Salon, acquired 2023"
    },
    {
      id: "3",
      image: sneakersImg,
      name: "Air Jordan 1 High",
      brand: "Nike",
      verified: true,
      serialNumber: "AO-NKE-2024-1567",
      taps: 873,
      storiesCount: 5,
      provenance: "Original release authenticated via Nike SNKRS Archive"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Mobile Logo - Top Center */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-center pt-6 pb-4 bg-gradient-to-b from-background to-transparent">
        <img 
          src={ayresLogo} 
          alt="Ayres Originals" 
          className="h-12 w-12 object-contain opacity-90"
        />
      </div>
      
      <main className="pt-24 md:pt-24 pb-16 md:pb-16">
        <div className="container mx-auto px-6">
          {/* Profile Header */}
          <ProfileHeader />
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold tracking-wider uppercase">
                My Originals
              </h1>
              <p className="text-muted-foreground tracking-wide">
                Your authenticated luxury collection
              </p>
            </div>
            
            <Button
              size="lg"
              className="gap-2 glass-strong hover:glass text-foreground hover:text-primary border-primary/30 hover:border-primary transition-all duration-300 glow uppercase tracking-widest"
            >
              <Plus className="h-5 w-5" />
              Add Product
            </Button>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your collection..."
                className="pl-12 glass border-border/50 focus:border-primary/50 uppercase tracking-widest text-sm"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {products.map((product, index) => (
              <div
                key={index}
                style={{ animationDelay: `${index * 100}ms` }}
                className="animate-slide-up"
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {/* Empty State Helper */}
          {products.length === 0 && (
            <div className="text-center py-16 glass rounded-lg border border-border/30">
              <div className="glass-strong w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 tracking-wide">
                Start Your Collection
              </h3>
              <p className="text-muted-foreground mb-6 tracking-wide">
                Add your first authenticated product
              </p>
              <Button className="uppercase tracking-widest">
                Add Product
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Collection;
