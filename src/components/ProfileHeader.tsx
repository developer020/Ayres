import { Shield, Lock, Edit2, UserPlus, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProfileHeader = () => {
  return (
    <div className="glass-strong border border-border/50 rounded-lg p-8 mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full glass border-2 border-primary/30 flex items-center justify-center text-3xl font-bold tracking-wider glow">
            AO
          </div>
          <div className="absolute -bottom-1 -right-1 glass-strong rounded-full p-1.5 border border-primary/50">
            <Shield className="h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-wider mb-1">Collector Name</h2>
              <p className="text-sm text-muted-foreground tracking-wide italic">
                "Curator of timeless craftsmanship"
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-2 glass border-border/50 hover:border-primary/50">
                <Edit2 className="h-3 w-3" />
                <span className="hidden sm:inline">Edit Profile</span>
              </Button>
              <Button size="sm" variant="outline" className="gap-2 glass border-border/50 hover:border-primary/50">
                <UserPlus className="h-3 w-3" />
                <span className="hidden sm:inline">Invite Access</span>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline" className="glass border-primary/30 text-primary glow uppercase tracking-wider">
              <Shield className="h-3 w-3 mr-1" />
              Verified Collector
            </Badge>
            <span className="text-xs text-muted-foreground tracking-wider">
              Joined March 2024
            </span>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/30">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Visits</p>
              <p className="text-2xl font-bold tracking-wider">248</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Taps</p>
              <p className="text-2xl font-bold tracking-wider">1,432</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Authenticated</p>
              <p className="text-2xl font-bold tracking-wider">12</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 mb-1">
                <Lock className="h-3 w-3 text-primary" />
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Digital Heritage</p>
              </div>
              <p className="text-2xl font-bold tracking-wider text-primary glow">$124K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Access Status */}
      <div className="mt-6 pt-6 border-t border-border/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground tracking-wider uppercase">
            Collection Status: <span className="text-foreground font-semibold">Private</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
