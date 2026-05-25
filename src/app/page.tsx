import HeroSection from "@/components/home/HeroSection";
import ProductOverview from "@/components/home/ProductOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CompanyStats from "@/components/home/CompanyStats";
import LatestNews from "@/components/home/LatestNews";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductOverview />
      <WhyChooseUs />
      <CompanyStats />
      <LatestNews />
      <CTASection />
    </>
  );
}
