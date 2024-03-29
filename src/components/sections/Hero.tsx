import Reveal from "../animations/home/Reveal";
import RevealButton from "../animations/home/RevealButton";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center">
      <div className="text-center space-y-4 max-w-3xl">
        <Reveal>
          <h6 className="lead">Take control of your finances</h6>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="max-w-3xl mx-auto">
            Effortless expense tracking for a clear financial future with
            <br />
            <span className="text-4xl bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
              Clear Count
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="text-muted-foreground">
            Track your expenses effortlessly, create budgets, and reach your
            financial goals with ease.
          </p>
        </Reveal>
      </div>
      <RevealButton>
        <Button asChild className="w-full">
          <Link href="/dashboard">Get started</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/login">Login</Link>
        </Button>
      </RevealButton>
    </section>
  );
}
