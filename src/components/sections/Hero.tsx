import Reveal from "../animations/home/Reveal";
import RevealButton from "../animations/home/RevealButton";
import { TypewriterEffect } from "../animations/home/TypewriterEffect";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center">
      <div className="text-center space-y-4 max-w-3xl relative z-50">
        <Reveal>
          <h6 className="lead">Take control of your finances</h6>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="max-w-3xl mx-auto">
            Effortless expense tracking for a clear financial future with
          </h1>
          <TypewriterEffect
            className="text-3xl lg:text-5xl"
            cursorClassName="bg-primary h-6"
            delay={1}
            words={[{ text: "Clear" }, { text: "Count" }]}
          />
        </Reveal>

        <Reveal delay={0.4}>
          <p className="text-muted-foreground">
            Track your expenses effortlessly, create budgets, and reach your
            financial goals with ease.
          </p>
        </Reveal>
      </div>
      <div className="relative z-50">
        <RevealButton>
          <Button asChild className="w-full">
            <Link href="/dashboard">Get started</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/login">Login</Link>
          </Button>
        </RevealButton>
      </div>
    </section>
  );
}
