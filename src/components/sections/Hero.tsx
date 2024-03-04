import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center">
      <div className="text-center space-y-4 max-w-3xl">
        <h6 className="lead">Take control of your finances</h6>
        <h1 className="max-w-3xl mx-auto">
          Effortless expense tracking for a clear financial future with
          <br />
          <span className="text-4xl underline underline-offset-4">
            Clear Count
          </span>
        </h1>
        <p className="text-muted-foreground">
          Track your expenses effortlessly, create budgets, and reach your
          financial goals with ease.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-8 md:mt-12 self-stretch md:self-auto">
        <Button asChild className="w-full">
          <Link href="/dashboard">Get started</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </section>
  );
}
