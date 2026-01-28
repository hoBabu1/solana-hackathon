import { Hero } from "@/components/landing/Hero";
import { StatsTicker } from "@/components/landing/StatsTicker";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsTicker />
      <FeatureCards />
      <Footer />
    </>
  );
}
