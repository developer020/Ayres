import { Link } from "react-router-dom";
import ayresLogo from "@/assets/ayres-logo.png";

const HomeHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/60 backdrop-blur-xl border-b border-border/30">
      <div className="container mx-auto px-6 py-4 flex items-center justify-center">
        <Link to="/" className="flex items-center">
          <img 
            src={ayresLogo} 
            alt="Ayres Originals" 
            className="h-10 w-10 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </Link>
      </div>
    </header>
  );
};

export default HomeHeader;
