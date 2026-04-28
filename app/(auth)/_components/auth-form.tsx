"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters"),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Use your full name"),
});

type LoginValues = z.infer<typeof loginSchema>;
type SignupValues = z.infer<typeof signupSchema>;

type AuthMode = "login" | "signup";

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const defaultEmail = searchParams.get("email") || "";

  const isLogin = mode === "login";
  const [pendingMode, setPendingMode] = useState<AuthMode>(mode);
  const { login, signup } = useAuth();

  const form = useForm<LoginValues | SignupValues>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    defaultValues: isLogin
      ? {
          email: defaultEmail,
          password: "",
        }
      : {
          name: "",
          email: defaultEmail,
          password: "",
        },
  });

  const isPending = login.isPending || signup.isPending;

  const handleSubmit = async (values: LoginValues | SignupValues) => {
    setPendingMode(mode);

    if (isLogin) {
      await login.mutateAsync(values as LoginValues, {
        onSuccess: (response) => {
          if (redirect) router.push(redirect);
        },
      });
      return;
    }

    await signup.mutateAsync(values as SignupValues, {
      onSuccess: (response) => {
        if (redirect) router.push(redirect);
      },
    });
  };

  return (
    <Card className="w-full max-w-md border-border/70 bg-card/95 shadow-[0_32px_100px_rgba(23,28,28,0.12)] backdrop-blur">
      <CardHeader className="space-y-3">
        <div className="inline-flex w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-secondary-foreground">
          {isLogin ? "Welcome back" : "Create workspace access"}
        </div>
        <CardTitle className="text-3xl tracking-[-0.04em]">{isLogin ? "Sign in" : "Sign up"}</CardTitle>
        <CardDescription className="text-sm leading-6 text-muted-foreground">
          {isLogin
            ? "Enter your account details to continue into your Devora instance."
            : "Start with a scoped identity that will map into instances, workspaces, and projects."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
            {!isLogin ? (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Rhea S." autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="team@devora.app" autoComplete="email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="........" type="password" autoComplete={isLogin ? "current-password" : "new-password"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" size="lg" type="submit" disabled={isPending}>
              {isPending && pendingMode === mode ? <LoaderCircle className="mr-2 size-4 animate-spin" /> : null}
              {isLogin ? "Enter Devora" : "Create account"}
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-sm text-muted-foreground">
          {isLogin ? "Need an account?" : "Already have an account?"}{" "}
          <Link className="font-medium text-primary" href={isLogin ? "/signup" : "/login"}>
            {isLogin ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
