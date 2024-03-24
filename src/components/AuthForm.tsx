"use client";

import React, { useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Image from "next/image";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export default function AuthForm({
  type,
  action,
}: {
  type: "login" | "signup";
  action: (
    prevState: any,
    formData: FormData
  ) => Promise<{
    error: {
      message: string;
    };
  }>;
}) {
  const [state, formAction] = useFormState(action, null);

  useEffect(() => {
    if (state && state.error) {
      toast.error(state.error.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <Card className="max-sm:border-none">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            {type === "login" ? "Login to your account" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {type === "login"
              ? "Enter your email and password below to login"
              : "Enter your email below to create your account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline" disabled>
              <GitHubLogoIcon className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" asChild>
              <Link href="/api/login/google">
                <Image
                  src="/icons/googleIcon.svg"
                  alt="google icon"
                  width={24}
                  height={24}
                  className="mr-2 h-4 w-4"
                />
                Google
              </Link>
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            {type === "signup" && (
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  required
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Example"
                />
              </div>
            )}
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              required
              name="password"
              placeholder="********"
              id="password"
              type="password"
            />
          </div>
          <p className="!m-0 !mt-4 text-sm text-muted-foreground">
            {type === "login" ? (
              <span>
                Don&apos;t have an account?{" "}
                <Link className="border-b border-primary" href="/signup">
                  Sign Up
                </Link>{" "}
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <Link className="border-b border-primary" href="/login">
                  Login
                </Link>
              </span>
            )}
          </p>
        </CardContent>

        <CardFooter>
          <SubmitButton text={type === "login" ? "Login" : "Sign Up"} />
        </CardFooter>
      </Card>
    </form>
  );
}
