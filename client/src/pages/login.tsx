import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginUser } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Coins } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Login() {
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
      return await apiRequest("POST", "/api/auth/login", data);
    },
    onSuccess: (data: any) => {
      toast({
        title: "Zalogowano pomyślnie",
        description: `Witaj, ${data.username}!`,
      });
      setLocation("/dashboard");
    },
    onError: (error: Error) => {
      toast({
        title: "Błąd logowania",
        description: error.message || "Nieprawidłowy login lub hasło",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginUser) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 right-4"
        onClick={() => setLocation("/admin-login")}
        data-testid="button-admin-login"
      >
        Logowanie admin
      </Button>

      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4 pb-8">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Coins className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center">
            Witaj w banku cebulionów
          </CardTitle>
          <CardDescription className="text-center text-base">
            Zaloguj się do swojego konta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
                        placeholder="Wprowadź login"
                        className="h-12"
                        data-testid="input-username"
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
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                disabled={loginMutation.isPending}
                data-testid="button-login"
              >
                {loginMutation.isPending ? "Logowanie..." : "Zaloguj"}
              </Button>
            </form>
          </Form>

          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Nie masz konta? Zarejestruj się
            </p>
            <Button
              variant="outline"
              className="w-full h-12"
              onClick={() => setLocation("/register")}
              data-testid="button-register-navigate"
            >
              Zarejestruj się
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
