import { Link } from "react-router-dom";
import { Clock, Infinity } from "lucide-react";

const StoriesFeed = () => {
  const stories = [
    {
      id: "1",
      productId: "1",
      productName: "Daytona Platinum",
      thumbnail: "/images/product-rolex.jpg",
      title: "Ice Blue Legacy",
      type: "origin",
      duration: "permanent",
    },
    {
      id: "2",
      productId: "2",
      productName: "Birkin 30 Cognac",
      thumbnail: "/images/product-birkin.jpg",
      title: "From Paris With Love",
      type: "temporary",
      duration: "18h",
    },
    {
      id: "3",
      productId: "3",
      productName: "Nike x Off-White",
      thumbnail: "/images/product-offwhite.jpg",
      title: "Virgil's Vision",
      type: "origin",
      duration: "permanent",
    },
    {
      id: "4",
      productId: "4",
      productName: "Azure Cascade",
      thumbnail: "/images/product-art.jpg",
      title: "Abstract Masterpiece",
      type: "temporary",
      duration: "12h",
    },
    {
      id: "5",
      productId: "5",
      productName: "Heritage Chronograph",
      thumbnail: "/images/product-watch.jpg",
      title: "The Making of a Masterpiece",
      type: "origin",
      duration: "permanent",
    },
    {
      id: "6",
      productId: "6",
      productName: "Supreme Deck Limited",
      thumbnail: "/images/product-skateboard.jpg",
      title: "Skate Culture Icon",
      type: "temporary",
      duration: "6h",
    },
    {
      id: "7",
      productId: "7",
      productName: "Kelly Bag 32",
      thumbnail: "/images/product-handbag.jpg",
      title: "Parisian Craftsmanship",
      type: "origin",
      duration: "permanent",
    },
    {
      id: "8",
      productId: "8",
      productName: "Leica M6 Black Chrome",
      thumbnail: "/images/product-camera.jpg",
      title: "Vintage Photography Legend",
      type: "temporary",
      duration: "15h",
    },
    {
      id: "9",
      productId: "9",
      productName: "Air Jordan 1 Retro",
      thumbnail: "/images/product-sneakers.jpg",
      title: "Limited Edition Drop",
      type: "origin",
      duration: "permanent",
    },
  ];

  return (
    <div className="space-y-4 pb-24 md:pb-6">
      {stories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {stories.map((story, index) => (
            <Link
              key={story.id}
              to={`/product/${story.productId}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group relative aspect-[9/16] rounded-lg overflow-hidden glass hover:glass-strong transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={story.thumbnail}
                  alt={story.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              </div>

              {/* Product Link Overlay - Top Left */}
              <div className="absolute top-4 left-4 flex items-center gap-2 glass-strong px-3 py-2 rounded-lg">
                <div className="w-8 h-8 rounded-md overflow-hidden">
                  <img
                    src={story.thumbnail}
                    alt={story.productName}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-foreground tracking-wide font-medium">
                  {story.productName}
                </span>
              </div>

              {/* Duration Indicator - Top Right */}
              <div className="absolute top-4 right-4 glass-strong px-3 py-2 rounded-lg flex items-center gap-1.5">
                {story.type === "origin" ? (
                  <>
                    <Infinity className="h-3 w-3 text-primary" />
                    <span className="text-xs text-primary tracking-wide font-medium uppercase">Origin</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground tracking-wide">{story.duration}</span>
                  </>
                )}
              </div>

              {/* Story Title - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                <h3 className="text-xl font-semibold tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground tracking-wide">
                  Tap to view full story
                </p>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 border border-primary/30 rounded-lg glow" />
              </div>
            </Link>
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
            Every Original has a story. Start yours.
          </p>
        </div>
      )}
    </div>
  );
};

export default StoriesFeed;
