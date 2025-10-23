import ProductCard from "./ProductCard";
import productWatch from "@/assets/product-watch.jpg";
import productHandbag from "@/assets/product-handbag.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";

const ProductsFeed = () => {
  const products = [
    {
      id: "1",
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
      id: "2",
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
      id: "3",
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
