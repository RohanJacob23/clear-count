import { signUp } from "@/actions/authActions";
import AuthForm from "@/components/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Generated by create next app",
};

export default async function page() {
  return (
    <main className="flex items-center justify-center">
      <AuthForm type="signup" action={signUp} />
    </main>
  );
}
