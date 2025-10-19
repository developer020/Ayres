import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Scan, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

const Authenticate = () => {
  const [step, setStep] = useState<"scan" | "processing" | "success" | "failed">("scan");

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
              <div className="space-y-8">
                {/* Scan Area */}
                <div className="aspect-square rounded-lg glass border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-6 hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                  <div className="glass-strong p-6 rounded-full group-hover:glow transition-all duration-300">
                    <Scan className="h-12 w-12 text-primary animate-glow-pulse" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-lg font-semibold tracking-wide">
                      Scan Product Code
                    </p>
                    <p className="text-sm text-muted-foreground tracking-wide">
                      Position the QR code or NFC tag within frame
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/30"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="glass px-4 py-1 text-muted-foreground tracking-widest">
                      Or
                    </span>
                  </div>
                </div>

                {/* Manual Entry */}
                <div className="space-y-4">
                  <label className="text-sm font-medium tracking-widest uppercase">
                    Enter Serial Number
                  </label>
                  <Input
                    placeholder="AO-XXX-YYYY-ZZZZ"
                    className="glass border-border/50 focus:border-primary/50 uppercase tracking-widest font-mono"
                  />
                </div>

                {/* Upload */}
                <div className="space-y-4">
                  <label className="text-sm font-medium tracking-widest uppercase">
                    Upload Product Images
                  </label>
                  <div className="glass rounded-lg border border-dashed border-border/50 p-8 text-center hover:border-primary/30 transition-all cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground tracking-wide">
                      Drop images here or click to upload
                    </p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full gap-2 glass-strong hover:glass text-foreground hover:text-primary border-primary/30 hover:border-primary transition-all duration-300 glow uppercase tracking-widest"
                  onClick={() => setStep("processing")}
                >
                  <CheckCircle2 className="h-5 w-5" />
                  Verify Product
                </Button>
              </div>
            )}

            {step === "processing" && (
              <div className="text-center space-y-6 py-12">
                <div className="glass-strong w-20 h-20 rounded-full flex items-center justify-center mx-auto glow-strong">
                  <Scan className="h-10 w-10 text-primary animate-glow-pulse" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold tracking-wide">
                    Analyzing Product
                  </p>
                  <p className="text-muted-foreground tracking-wide">
                    Verifying authenticity on blockchain...
                  </p>
                </div>
                <div className="w-full max-w-xs mx-auto glass h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-primary/50 animate-pulse"></div>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="text-center space-y-6 py-12">
                <div className="glass-strong w-20 h-20 rounded-full flex items-center justify-center mx-auto glow-strong">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold tracking-wide text-primary">
                    Verified Authentic
                  </p>
                  <p className="text-muted-foreground tracking-wide">
                    This product has been successfully authenticated
                  </p>
                </div>
                <Button
                  size="lg"
                  className="uppercase tracking-widest"
                  onClick={() => setStep("scan")}
                >
                  Add Another
                </Button>
              </div>
            )}

            {step === "failed" && (
              <div className="text-center space-y-6 py-12">
                <div className="glass-strong w-20 h-20 rounded-full flex items-center justify-center mx-auto border-2 border-destructive/30">
                  <AlertCircle className="h-10 w-10 text-destructive" />
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold tracking-wide text-destructive">
                    Verification Failed
                  </p>
                  <p className="text-muted-foreground tracking-wide">
                    We couldn't verify this product's authenticity
                  </p>
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  className="uppercase tracking-widest"
                  onClick={() => setStep("scan")}
                >
                  Try Again
                </Button>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Authenticate;
