import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield, Link2, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Settings = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const settingSections = [
    {
      title: "Account",
      icon: User,
      items: [
        { label: "Email Notifications", type: "toggle", value: true },
        { label: "Two-Factor Authentication", type: "toggle", value: false },
        { label: "Profile Visibility", type: "toggle", value: true },
      ],
    },
    {
      title: "Privacy",
      icon: Shield,
      items: [
        { label: "Share Collection Publicly", type: "toggle", value: false },
        { label: "Allow Brand Partners Access", type: "toggle", value: true },
        { label: "Data Analytics", type: "toggle", value: true },
      ],
    },
    {
      title: "Integrations",
      icon: Link2,
      items: [
        { label: "Connect to Hermès", type: "button" },
        { label: "Connect to Nike", type: "button" },
        { label: "Connect to Patek Philippe", type: "button" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12 space-y-2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider uppercase">
              Settings
            </h1>
            <p className="text-muted-foreground tracking-wide">
              Manage your account and preferences
            </p>
          </div>

          <div className="space-y-6">
            {settingSections.map((section, sectionIndex) => {
              const Icon = section.icon;
              return (
                <Card
                  key={sectionIndex}
                  className="glass-strong border-border/50 p-6 animate-slide-up"
                  style={{ animationDelay: `${sectionIndex * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="glass p-2 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold tracking-wide uppercase">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center justify-between py-3 border-b border-border/30 last:border-0"
                      >
                        <span className="text-sm tracking-wide">
                          {item.label}
                        </span>
                        {item.type === "toggle" && (
                          <Switch defaultChecked={item.value} />
                        )}
                        {item.type === "button" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass hover:glass-strong uppercase tracking-widest text-xs"
                          >
                            Connect
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}

            {/* Danger Zone */}
            <Card className="glass-strong border-destructive/30 p-6">
              <h2 className="text-xl font-semibold tracking-wide uppercase mb-4 text-destructive">
                Danger Zone
              </h2>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={signOut}
                  className="w-full justify-start gap-2 border-destructive/50 text-destructive hover:bg-destructive/10 uppercase tracking-widest"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
