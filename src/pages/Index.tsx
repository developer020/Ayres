import { useState } from "react";
import Navigation from "@/components/Navigation";
import HomeHeader from "@/components/HomeHeader";
import ProductsFeed from "@/components/ProductsFeed";
import StoriesFeed from "@/components/StoriesFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <HomeHeader />
      </div>
      
      {/* Mobile Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="pt-20 md:pt-24">
        <div className="container mx-auto px-6">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="sticky top-20 md:top-24 z-40 bg-background/80 backdrop-blur-xl pb-6 mb-8 border-b border-border/30">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 h-12 p-1">
                <TabsTrigger 
                  value="products"
                  className="text-xs md:text-sm tracking-widest uppercase data-[state=active]:glow transition-all duration-300"
                >
                  Products
                </TabsTrigger>
                <TabsTrigger 
                  value="stories"
                  className="text-xs md:text-sm tracking-widest uppercase data-[state=active]:glow transition-all duration-300"
                >
                  Stories
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="products" className="mt-0">
              <ProductsFeed />
            </TabsContent>

            <TabsContent value="stories" className="mt-0">
              <StoriesFeed />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
