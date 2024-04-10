import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";

export default function Home() {
  return (
    <main className="relative flex flex-col w-full justify-center items-center px-4 sm:px-8 dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      <Hero />
      <Features />
      <Pricing />
      <Footer />
      <div className="absolute size-full pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)] z-10"></div>
    </main>
  );
}
