import ProductCard from "./ProductCard";
import productWatch from "@/assets/product-watch.jpg";
import productHandbag from "@/assets/product-handbag.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";
import productBirkin from "@/assets/product-birkin.jpg";
import productOffWhite from "@/assets/product-offwhite.jpg";
import productArt from "@/assets/product-art.jpg";
import productRolex from "@/assets/product-rolex.jpg";
import productSkateboard from "@/assets/product-skateboard.jpg";
import productCamera from "@/assets/product-camera.jpg";

const ProductsFeed = () => {
  const products = [
    {
      id: "1",
      image: productRolex,
      name: "Daytona Platinum",
      brand: "Rolex",
      verified: true,
      serialNumber: "RLX-116506-ICE",
      taps: 3421,
      storiesCount: 15,
      provenance: "Factory sealed from Rolex authorized dealer. Certified by Rolex with complete documentation, 2023.",
    },
    {
      id: "2",
      image: productBirkin,
      name: "Birkin 30 Cognac",
      brand: "Hermès",
      verified: true,
      serialNumber: "HM-BRK-30-COG",
      taps: 2847,
      storiesCount: 11,
      provenance: "Acquired directly from Hermès Paris flagship boutique. Full authentication by Hermès archives, 2022.",
    },
    {
      id: "3",
      image: productOffWhite,
      name: "Nike x Off-White",
      brand: "Nike × Virgil Abloh",
      verified: true,
      serialNumber: "NKE-OW-AIR-MAX",
      taps: 4156,
      storiesCount: 18,
      provenance: "Limited collaboration release. Authenticated by StockX with original packaging and zip tie, 2023.",
    },
    {
      id: "4",
      image: productArt,
      name: "Azure Cascade",
      brand: "Gigi Leina",
      verified: true,
      serialNumber: "ART-201201-GGL",
      taps: 1623,
      storiesCount: 7,
      provenance: "Original contemporary abstract piece. Certificate of authenticity from artist's gallery, 2023.",
    },
    {
      id: "5",
      image: productWatch,
      name: "Heritage Chronograph",
      brand: "Patek Philippe",
      verified: true,
      serialNumber: "PP-5270G-001",
      taps: 1247,
      storiesCount: 8,
      provenance: "Authenticated by Patek Philippe Geneva. First owner: Private collector, acquired 2019.",
    },
    {
      id: "6",
      image: productSkateboard,
      name: "Supreme Deck Limited",
      brand: "Supreme",
      verified: true,
      serialNumber: "SUP-DECK-LTD-23",
      taps: 987,
      storiesCount: 4,
      provenance: "Limited drop from Supreme NYC flagship. Verified authentic with original Supreme sticker, 2023.",
    },
    {
      id: "7",
      image: productHandbag,
      name: "Kelly Bag 32",
      brand: "Hermès",
      verified: true,
      serialNumber: "HM-KLY-32-BLK",
      taps: 892,
      storiesCount: 5,
      provenance: "Purchased at Hermès flagship Paris, 2021. Authentication verified by Hermès archives.",
    },
    {
      id: "8",
      image: productCamera,
      name: "Leica M6 Black Chrome",
      brand: "Leica",
      verified: true,
      serialNumber: "LCA-M6-BLK-VTG",
      taps: 1534,
      storiesCount: 9,
      provenance: "Vintage collectible camera from 1984. Serviced and authenticated by Leica Camera AG, fully functional.",
    },
    {
      id: "9",
      image: productSneakers,
      name: "Air Jordan 1 Retro High OG",
      brand: "Nike",
      verified: true,
      serialNumber: "NKE-AJ1-555088-001",
      taps: 2156,
      storiesCount: 12,
      provenance: "Limited edition release 2023. Verified authentic by Nike authentication service.",
    },
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
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
