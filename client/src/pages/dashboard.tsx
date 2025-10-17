import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Coins, LogOut } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { User } from "@shared/schema";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["/api/auth/me"],
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/auth/logout", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({
        title: "Wylogowano pomyślnie",
        description: "Do zobaczenia wkrótce!",
      });
      setLocation("/");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="text-center space-y-4">
          <Coins className="h-12 w-12 text-primary animate-pulse mx-auto" />
          <p className="text-muted-foreground">Ładowanie...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    setLocation("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Coins className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold">Bank Cebulionów</h1>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Wyloguj się
          </Button>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2" data-testid="text-welcome">
              Witaj, {user.username}
            </h2>
            <p className="text-muted-foreground">
              Miło Cię widzieć w swoim panelu bankowym
            </p>
          </div>

          <Card className="overflow-hidden shadow-lg">
            <div className="bg-gradient-to-br from-primary to-chart-2 p-8 text-white">
              <p className="text-sm font-medium mb-2 opacity-90">
                Twój aktualny stan konta
              </p>
              <p className="text-5xl font-bold tracking-tight" data-testid="text-balance">
                {parseFloat(user.balance).toFixed(2)} PLN
              </p>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Numer konta</p>
                  <p className="font-mono text-sm font-medium">
                    {user.id.substring(0, 8).toUpperCase()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Typ konta</p>
                  <p className="text-sm font-medium">Standardowe</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-sm font-medium text-chart-3">Aktywne</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
