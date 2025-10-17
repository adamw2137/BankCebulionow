import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Shield, LogOut, Save, X, Edit } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { User, UpdateUser } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<UpdateUser>({
    id: "",
    username: "",
    password: "",
    balance: "",
  });

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
  });

  const { data: isAdmin, isLoading: isCheckingAdmin } = useQuery<boolean>({
    queryKey: ["/api/auth/check-admin"],
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: UpdateUser) => {
      return await apiRequest("PUT", `/api/admin/users/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Zaktualizowano pomyślnie",
        description: "Dane użytkownika zostały zmienione",
      });
      setEditingId(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Błąd aktualizacji",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/auth/logout", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/check-admin"] });
      toast({
        title: "Wylogowano pomyślnie",
        description: "Do zobaczenia!",
      });
      setLocation("/");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const startEditing = (user: User) => {
    setEditingId(user.id);
    setEditForm({
      id: user.id,
      username: user.username,
      password: user.password,
      balance: user.balance,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveChanges = () => {
    updateUserMutation.mutate(editForm);
  };

  if (isLoading || isCheckingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-destructive/5 via-background to-chart-1/5">
        <div className="text-center space-y-4">
          <Shield className="h-12 w-12 text-destructive animate-pulse mx-auto" />
          <p className="text-muted-foreground">Ładowanie...</p>
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    setLocation("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-destructive/5 via-background to-chart-1/5">
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Shield className="h-6 w-6 text-destructive" />
            </div>
            <h1 className="text-xl font-bold">Panel Administratora</h1>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            data-testid="button-admin-logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Wyloguj się
          </Button>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Zarządzanie kontami</h2>
            <p className="text-muted-foreground">
              Edytuj dane użytkowników i ich salda
            </p>
          </div>

          <Card className="overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Login</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Hasło</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Saldo (PLN)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Akcje</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover-elevate"
                      data-testid={`row-user-${index}`}
                    >
                      {editingId === user.id ? (
                        <>
                          <td className="px-6 py-4">
                            <Input
                              value={editForm.username}
                              onChange={(e) =>
                                setEditForm({ ...editForm, username: e.target.value })
                              }
                              className="h-9"
                              data-testid={`input-edit-username-${index}`}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <Input
                              value={editForm.password}
                              onChange={(e) =>
                                setEditForm({ ...editForm, password: e.target.value })
                              }
                              className="h-9"
                              data-testid={`input-edit-password-${index}`}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <Input
                              type="number"
                              step="0.01"
                              value={editForm.balance}
                              onChange={(e) =>
                                setEditForm({ ...editForm, balance: e.target.value })
                              }
                              className="h-9"
                              data-testid={`input-edit-balance-${index}`}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={saveChanges}
                                disabled={updateUserMutation.isPending}
                                data-testid={`button-save-${index}`}
                              >
                                <Save className="h-4 w-4 mr-1" />
                                Zapisz
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={cancelEditing}
                                data-testid={`button-cancel-${index}`}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Anuluj
                              </Button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 font-medium" data-testid={`text-username-${index}`}>
                            {user.username}
                          </td>
                          <td className="px-6 py-4 font-mono text-sm" data-testid={`text-password-${index}`}>
                            {user.password}
                          </td>
                          <td className="px-6 py-4 font-semibold" data-testid={`text-balance-${index}`}>
                            {parseFloat(user.balance).toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEditing(user)}
                              data-testid={`button-edit-${index}`}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edytuj
                            </Button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                        Brak zarejestrowanych użytkowników
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
