import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-blue-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved.
          Please check the URL or navigate back to explore our products.
        </p>
        <div className="flex justify-center gap-4">
          <Button href="/">Go Home</Button>
          <Button href="/products" variant="outline">View Products</Button>
        </div>
      </div>
    </Container>
  );
}
