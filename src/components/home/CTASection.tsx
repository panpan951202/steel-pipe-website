import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <Container className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Discuss Your Steel Pipe Requirements?
        </h2>
        <p className="text-lg text-blue-200 max-w-2xl mx-auto mb-8">
          Our engineering team is ready to help you select the optimal pipe specifications
          for your project. Request a quote or technical consultation today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/contact" variant="secondary" size="lg">
            Request a Quote
          </Button>
          <Button
            href="tel:+86-22-8888-6666"
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-gray-900"
          >
            Call Us Now
          </Button>
        </div>
      </Container>
    </section>
  );
}
