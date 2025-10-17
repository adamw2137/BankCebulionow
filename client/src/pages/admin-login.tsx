import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginUser } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Shield, ArrowLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<LoginUser>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginUser) => {
      return await apiRequest("POST", "/api/auth/admin-login", data);
    },
    onSuccess: () => {
      toast({
        title: "Zalogowano jako administrator",
        description: "Witaj w panelu administracyjnym",
      });
      setLocation("/admin-dashboard");
    },
    onError: (error: Error) => {
      toast({
        title: "Błąd logowania",
        description: error.message || "Nieprawidłowe dane logowania",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginUser) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-destructive/5 via-background to-chart-1/5 p-4">
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4"
        onClick={() => setLocation("/")}
        data-testid="button-back"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Powrót
      </Button>

      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4 pb-8">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-xl bg-destructive/10">
              <Shield className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center">
            Panel Administratora
          </CardTitle>
          <CardDescription className="text-center text-base">
            Logowanie do panelu zarządzania
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Login</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Wprowadź login administratora"
                        className="h-12"
                        data-testid="input-admin-username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hasło</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Wprowadź hasło"
                        className="h-12"
                        data-testid="input-admin-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="destructive"
                className="w-full h-12 text-base font-semibold"
                disabled={loginMutation.isPending}
                data-testid="button-admin-login-submit"
              >
                {loginMutation.isPending ? "Logowanie..." : "Zaloguj"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
