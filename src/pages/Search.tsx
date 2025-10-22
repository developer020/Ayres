import { useState } from "react";
import { Search as SearchIcon, Filter, Mic, Shield, ExternalLink, Film } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

// Mock data for demonstration
const mockProducts = [
  {
    id: "1",
    image: "/placeholder.svg",
    title: "Birkin 35 Togo",
    brand: "Hermès",
    status: "Verified Original",
    verified: true,
  },
  {
    id: "2",
    image: "/placeholder.svg",
    title: "Air Jordan 1 Retro High",
    brand: "Nike",
    status: "For Sale",
    verified: true,
  },
];

const mockProfiles = [
  {
    id: "1",
    avatar: "/placeholder.svg",
    name: "Alexandre Beaumont",
    tagline: "Collector of Heritage Timepieces",
    verified: true,
  },
  {
    id: "2",
    avatar: "/placeholder.svg",
    name: "Sofia Chen",
    tagline: "Luxury Fashion Curator",
    verified: true,
  },
];

const mockStories = [
  {
    id: "1",
    thumbnail: "/placeholder.svg",
    productName: "Birkin 35 Togo",
    type: "Origin",
    timestamp: "2 days ago",
  },
  {
    id: "2",
    thumbnail: "/placeholder.svg",
    productName: "Air Jordan 1 Retro High",
    type: "Temporary",
    timestamp: "5 hours ago",
  },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const hasResults = searchQuery.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-32 md:pb-12">
        {/* Search Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 tracking-wide">
            Discover Originals
          </h1>
          
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <SearchIcon className="h-5 w-5" />
            </div>
            <Input
              type="text"
              placeholder="Search Originals, Collectors, Stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-20 h-14 glass-strong border-primary/30 focus:border-primary/50 glow text-base"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 hover:bg-primary/10"
              >
                <Mic className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                className="h-10 w-10 hover:bg-primary/10"
              >
                <Filter className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-6 glass-strong rounded-lg border border-border/50 animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                    Brand
                  </label>
                  <select className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-sm">
                    <option>All Brands</option>
                    <option>Hermès</option>
                    <option>Nike</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                    Status
                  </label>
                  <select className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-sm">
                    <option>All Status</option>
                    <option>For Sale</option>
                    <option>Not For Sale</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                    Sort By
                  </label>
                  <select className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-sm">
                    <option>Newest</option>
                    <option>Most Popular</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {hasResults ? (
          <Tabs defaultValue="products" className="max-w-6xl mx-auto">
            <TabsList className="w-full justify-start glass-strong mb-8">
              <TabsTrigger value="products" className="flex-1 data-[state=active]:glow">
                Products
              </TabsTrigger>
              <TabsTrigger value="profiles" className="flex-1 data-[state=active]:glow">
                Profiles
              </TabsTrigger>
              <TabsTrigger value="stories" className="flex-1 data-[state=active]:glow">
                Stories
              </TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-4 animate-fade-in">
              {mockProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <Card className="glass hover:glass-strong transition-all duration-300 p-4 cursor-pointer group border-border/50 hover:border-primary/30">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.verified && (
                          <div className="absolute top-2 right-2 glass-strong rounded-full p-1">
                            <Shield className="h-3 w-3 text-primary" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                          {product.brand}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs glass-strong px-3 py-1 rounded-full">
                            {product.status}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity self-center" />
                    </div>
                  </Card>
                </Link>
              ))}
            </TabsContent>

            {/* Profiles Tab */}
            <TabsContent value="profiles" className="space-y-4 animate-fade-in">
              {mockProfiles.map((profile) => (
                <Card
                  key={profile.id}
                  className="glass hover:glass-strong transition-all duration-300 p-4 cursor-pointer group border-border/50 hover:border-primary/30"
                >
                  <div className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/30 glow">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                      {profile.verified && (
                        <div className="absolute bottom-0 right-0 glass-strong rounded-full p-1 border border-primary/50">
                          <Shield className="h-2.5 w-2.5 text-primary" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground">{profile.tagline}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Stories Tab */}
            <TabsContent value="stories" className="space-y-4 animate-fade-in">
              {mockStories.map((story) => (
                <Card
                  key={story.id}
                  className="glass hover:glass-strong transition-all duration-300 p-4 cursor-pointer group border-border/50 hover:border-primary/30"
                >
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={story.thumbnail}
                        alt={story.productName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Film className="h-8 w-8 text-primary glow" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs glass-strong px-3 py-1 rounded-full text-primary">
                          {story.type}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-1">{story.productName}</h3>
                      <p className="text-sm text-muted-foreground">{story.timestamp}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity self-center" />
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        ) : (
          // Empty State
          <div className="max-w-md mx-auto text-center py-20 animate-fade-in">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full glass-strong flex items-center justify-center glow animate-pulse">
                <SearchIcon className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-3">No Originals found</h2>
            <p className="text-muted-foreground text-sm tracking-wide">
              Authenticity begins with discovery
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
