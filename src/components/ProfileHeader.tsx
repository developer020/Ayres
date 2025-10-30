import { Shield, Lock, Edit2, UserPlus, MapPin, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  username: string;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
}

const ProfileHeader = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      const { count } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      setProductsCount(count || 0);
    };

    fetchProfile();
  }, [user]);

  if (!profile) return null;

  const initials = profile.username.substring(0, 2).toUpperCase();
  const joinedDate = new Date(profile.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
  return (
    <div className="bg-card border border-border/50 rounded-lg p-8 mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Profile Photo - NFT Style Avatar */}
        <div className="relative group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-primary/20 to-transparent blur-xl group-hover:blur-2xl transition-all duration-500 glow-strong" />
          <Avatar className="relative w-24 h-24 ring-2 ring-primary/30 ring-offset-4 ring-offset-background shadow-[0_0_30px_rgba(0,209,255,0.3)] group-hover:shadow-[0_0_50px_rgba(0,209,255,0.5)] transition-all duration-500">
            <AvatarImage src={profile.avatar_url || ""} alt={profile.username} className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-card via-card to-primary/10 text-3xl font-bold tracking-wider border-2 border-primary/20">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 glass-strong rounded-full p-1.5 border border-primary/50 shadow-lg backdrop-blur-xl">
            <Shield className="h-4 w-4 text-primary drop-shadow-[0_0_8px_rgba(0,209,255,0.8)]" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-wider mb-1">{profile.username}</h2>
              <p className="text-sm text-muted-foreground tracking-wide italic">
                {profile.bio || "Curator of timeless craftsmanship"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-2 bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all">
                <Edit2 className="h-3 w-3" />
                <span className="hidden sm:inline">Edit Profile</span>
              </Button>
              <Button size="sm" variant="outline" className="gap-2 bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all">
                <UserPlus className="h-3 w-3" />
                <span className="hidden sm:inline">Invite Access</span>
              </Button>
              <Link to="/settings">
                <Button size="sm" variant="outline" className="gap-2 bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline" className="bg-card/50 border-primary/30 text-primary shadow-[0_0_15px_rgba(0,209,255,0.2)] uppercase tracking-wider">
              <Shield className="h-3 w-3 mr-1" />
              Verified Collector
            </Badge>
            <span className="text-xs text-muted-foreground tracking-wider">
              Joined {joinedDate}
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
              <p className="text-2xl font-bold tracking-wider">{productsCount}</p>
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
