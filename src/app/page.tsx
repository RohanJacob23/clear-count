import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";

export default function Home() {
  return (
    <main className="flex flex-col w-full justify-center items-center px-4 sm:px-8">
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
