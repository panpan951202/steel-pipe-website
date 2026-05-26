import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-[url('/images/hero-banner.jpg')] bg-cover bg-center opacity-30" />
      <Container className="relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Premium Steel Pipe Solutions for Global Infrastructure
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed">
            SMLS, ERW, LSAW, SSAW, and HSAW steel pipes manufactured to international standards.
            Serving oil & gas, water, construction, and industrial sectors across 60+ countries.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/products" variant="secondary" size="lg">
              Explore Products
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              Get a Quote
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
