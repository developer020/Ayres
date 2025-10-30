import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Scan, Upload, CheckCircle2, AlertCircle, Camera, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface VerificationResult {
  confidence: number;
  authentic: boolean;
  analysis: string;
  details: string[];
}

interface DigitalTwin {
  nft_id: string;
  created_at: string;
  verification_timestamp: string;
  ai_confidence: number;
  blockchain_hash: string;
  metadata: any;
  attributes: Array<{ trait_type: string; value: any }>;
}

const Authenticate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"scan" | "processing" | "success" | "failed">("scan");
  const [serialNumber, setSerialNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [digitalTwin, setDigitalTwin] = useState<DigitalTwin | null>(null);
  const [blockchainHash, setBlockchainHash] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleVerify = async () => {
    if (!user) {
      toast.error("Please sign in to verify products");
      navigate("/auth");
      return;
    }

    if (!selectedFile || !serialNumber || !brand || !productName) {
      toast.error("Please provide all required information");
      return;
    }

    setStep("processing");

    try {
      // Upload image to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('product-verifications')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL for the image
      const { data: { publicUrl } } = supabase.storage
        .from('product-verifications')
        .getPublicUrl(fileName);

      // Call verification edge function
      const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-product', {
        body: {
          imageUrl: publicUrl,
          serialNumber,
          brand,
          name: productName
        }
      });

      if (verifyError) throw verifyError;

      if (verifyData.success) {
        setVerificationResult(verifyData.verification);
        setDigitalTwin(verifyData.digital_twin);
        setBlockchainHash(verifyData.blockchain_hash);

        // Save to products table
        const { error: insertError } = await supabase
          .from('products')
          .insert({
            user_id: user.id,
            name: productName,
            brand,
            serial_number: serialNumber,
            image_url: publicUrl,
            verification_status: verifyData.verification.authentic ? 'verified' : 'failed',
            digital_twin_data: verifyData.digital_twin,
            blockchain_hash: verifyData.blockchain_hash,
            provenance: verifyData.verification.analysis
          });

        if (insertError) throw insertError;

        setStep(verifyData.verification.authentic ? "success" : "failed");
        
        if (verifyData.verification.authentic) {
          toast.success("Product verified and added to your collection!");
        } else {
          toast.error("Product verification failed");
        }
      } else {
        throw new Error("Verification failed");
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      toast.error(error.message || "Verification failed");
      setStep("failed");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider uppercase">
              Authenticate
            </h1>
            <p className="text-muted-foreground tracking-wide">
              Verify your luxury product's authenticity
            </p>
          </div>

          <Card className="glass-strong border-border/50 p-8 md:p-12 animate-slide-up">
            {step === "scan" && (
              <div className="space-y-6">
                {/* Product Information */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                      Brand *
                    </label>
                    <Input
                      placeholder="e.g., Hermès, Rolex, Nike"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="glass border-border/50 focus:border-primary/50 mt-2"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                      Product Name *
                    </label>
                    <Input
                      placeholder="e.g., Birkin 25, Submariner Date"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="glass border-border/50 focus:border-primary/50 mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                      Serial Number *
                    </label>
                    <Input
                      placeholder="AO-XXX-YYYY-ZZZZ"
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value.toUpperCase())}
                      className="glass border-border/50 focus:border-primary/50 uppercase tracking-widest font-mono mt-2"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <label className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                    Product Image *
                  </label>
                  
                  {previewUrl ? (
                    <div className="relative rounded-lg overflow-hidden glass border border-primary/30">
                      <img 
                        src={previewUrl} 
                        alt="Product preview" 
                        className="w-full h-64 object-cover"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 glass-strong"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                        }}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        className="glass rounded-lg border border-dashed border-border/50 p-8 text-center hover:border-primary/30 transition-all cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground tracking-wide">
                          Upload Image
                        </p>
                      </div>
                      
                      <div 
                        className="glass rounded-lg border border-dashed border-border/50 p-8 text-center hover:border-primary/30 transition-all cursor-pointer"
                        onClick={() => cameraInputRef.current?.click()}
                      >
                        <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground tracking-wide">
                          Take Photo
                        </p>
                      </div>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                  />
                  
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                  />
                </div>

                <Button
                  size="lg"
                  className="w-full gap-2 uppercase tracking-widest"
                  onClick={handleVerify}
                  disabled={!selectedFile || !serialNumber || !brand || !productName}
                >
                  <Scan className="h-5 w-5" />
                  Verify with AI + Blockchain
                </Button>
              </div>
            )}

            {step === "processing" && (
              <div className="text-center space-y-6 py-12">
                <div className="glass-strong w-20 h-20 rounded-full flex items-center justify-center mx-auto glow-strong">
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                </div>
                <div className="space-y-3">
                  <p className="text-xl font-semibold tracking-wide">
                    AI Analysis in Progress
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="animate-pulse">🔍 Analyzing product authenticity...</p>
                    <p className="animate-pulse delay-100">🤖 AI verification processing...</p>
                    <p className="animate-pulse delay-200">⛓️ Generating blockchain record...</p>
                    <p className="animate-pulse delay-300">🎨 Creating digital twin NFT...</p>
                  </div>
                </div>
                <div className="w-full max-w-xs mx-auto glass h-2 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-primary/50 to-primary animate-pulse"></div>
                </div>
              </div>
            )}

            {step === "success" && verificationResult && digitalTwin && (
              <div className="space-y-6 py-6">
                <div className="text-center space-y-4">
                  <div className="glass-strong w-20 h-20 rounded-full flex items-center justify-center mx-auto glow-strong">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold tracking-wide text-primary mb-2">
                      ✓ Verified Authentic
                    </p>
                    <p className="text-muted-foreground text-sm">
                      AI Confidence: {verificationResult.confidence}%
                    </p>
                  </div>
                </div>

                {/* Digital Twin NFT Card */}
                <Card className="glass border-primary/30 p-6 space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-border/30">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold tracking-wide">Digital Twin NFT</h3>
                      <p className="text-xs text-muted-foreground font-mono">{digitalTwin.nft_id}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Blockchain Hash:</span>
                      <span className="font-mono text-xs">{blockchainHash?.slice(0, 16)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verification Date:</span>
                      <span>{new Date(digitalTwin.verification_timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">AI Confidence:</span>
                      <span className="text-primary font-semibold">{digitalTwin.ai_confidence}%</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/30">
                    <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">NFT Attributes</p>
                    <div className="grid grid-cols-2 gap-2">
                      {digitalTwin.attributes.map((attr, idx) => (
                        <div key={idx} className="glass p-2 rounded text-xs">
                          <p className="text-muted-foreground">{attr.trait_type}</p>
                          <p className="font-semibold">{attr.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* AI Analysis */}
                <Card className="glass border-border/30 p-4 space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-widest">AI Analysis</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {verificationResult.analysis}
                  </p>
                  {verificationResult.details.length > 0 && (
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {verificationResult.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1 uppercase tracking-widest"
                    onClick={() => navigate("/collection")}
                  >
                    View Collection
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 uppercase tracking-widest"
                    onClick={() => {
                      setStep("scan");
                      setSerialNumber("");
                      setBrand("");
                      setProductName("");
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      setVerificationResult(null);
                      setDigitalTwin(null);
                      setBlockchainHash(null);
                    }}
                  >
                    Verify Another
                  </Button>
                </div>
              </div>
            )}

            {step === "failed" && verificationResult && (
              <div className="space-y-6 py-6">
                <div className="text-center space-y-4">
                  <div className="glass-strong w-20 h-20 rounded-full flex items-center justify-center mx-auto border-2 border-destructive/30">
                    <AlertCircle className="h-10 w-10 text-destructive" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold tracking-wide text-destructive mb-2">
                      Verification Failed
                    </p>
                    <p className="text-muted-foreground text-sm">
                      AI Confidence: {verificationResult.confidence}%
                    </p>
                  </div>
                </div>

                <Card className="glass border-destructive/30 p-4 space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-widest text-destructive">
                    Authenticity Concerns
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {verificationResult.analysis}
                  </p>
                  {verificationResult.details.length > 0 && (
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {verificationResult.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-destructive">⚠</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>

                <div className="glass border-border/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Next Steps:</strong> We recommend contacting the brand directly 
                    or visiting an authorized dealer for professional authentication.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 uppercase tracking-widest"
                    onClick={() => {
                      setStep("scan");
                      setSerialNumber("");
                      setBrand("");
                      setProductName("");
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      setVerificationResult(null);
                      setDigitalTwin(null);
                      setBlockchainHash(null);
                    }}
                  >
                    Try Different Product
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 uppercase tracking-widest"
                    onClick={() => navigate("/collection")}
                  >
                    View Collection
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Authenticate;
