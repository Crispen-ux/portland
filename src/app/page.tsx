import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import WelcomeSection from "@/components/WelcomeSection";
import EmotionalSection from "@/components/EmotionalSection";
import PromiseSection from "@/components/PromiseSection";
import Testimonials from "@/components/Testimonials";
import WhyPortlandSection from "@/components/WhyPortlandSection";
import SportsSection from "@/components/SportsSection";
import ValueSection from "@/components/ValueSection";
import FeesSection from "@/components/FeesSection";
import JourneySection from "@/components/JourneySection";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsCounter />
      <WelcomeSection />
      <EmotionalSection />
      <PromiseSection />
      <Testimonials />
      <WhyPortlandSection />
      <SportsSection />
      <ValueSection />
      <FeesSection />
      <JourneySection />
      <CTASection />
    </>
  );
}
