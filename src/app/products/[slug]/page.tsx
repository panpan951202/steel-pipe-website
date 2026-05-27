import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProductSpecTable from "@/components/products/ProductSpecTable";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ProductSchema from "@/components/seo/ProductSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import { getProductBySlug, getAllProductSlugs, getRelatedProducts } from "@/lib/products";
import { SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not Found" };

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: `/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product.slug);

  return (
    <>
      <ProductSchema product={product} />
      <BreadcrumbSchema
        items={[
          { label: "Products", href: "/products" },
          { label: product.shortName, href: `/products/${product.slug}` },
        ]}
      />
      {product.faq.length > 0 && <FAQSchema items={product.faq} />}

      <Container>
        <Breadcrumb
          items={[
            { label: "Products", href: "/products" },
            { label: product.shortName },
          ]}
        />
      </Container>

      {/* Product Header */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Product Image */}
          <div className="bg-gray-50 rounded-2xl flex items-center justify-center min-h-[400px] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={450}
              className="object-contain w-full h-full max-h-[500px]"
              priority
            />
          </div>

          {/* Right - Product info */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-xl text-gray-700 font-medium mb-2">{product.shortName}</p>
            <p className="text-gray-600 mb-6">{product.tagline}</p>

            <div className="flex flex-wrap gap-4 text-sm mb-8">
              <div className="bg-blue-50 rounded-lg px-4 py-2">
                <span className="font-semibold text-blue-900">OD:</span>{" "}
                <span className="text-gray-700">{product.sizeRange}</span>
              </div>
              <div className="bg-blue-50 rounded-lg px-4 py-2">
                <span className="font-semibold text-blue-900">WT:</span>{" "}
                <span className="text-gray-700">{product.wallThickness}</span>
              </div>
              <div className="bg-blue-50 rounded-lg px-4 py-2">
                <span className="font-semibold text-blue-900">Length:</span>{" "}
                <span className="text-gray-700">{product.length}</span>
              </div>
            </div>

            <Button href="/contact" variant="secondary">
              Request a Quote
            </Button>
          </div>
        </div>
      </Container>

      {/* Description */}
      <Container className="py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
        <div className="prose prose-gray max-w-none">
          {product.description.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>

      {/* Specifications */}
      <Container className="py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
        <ProductSpecTable specifications={product.specifications} />
      </Container>

      {/* Features & Applications */}
      <Container className="py-12 border-t border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
            <ul className="space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Applications</h2>
            <ul className="space-y-3">
              {product.applications.map((app) => (
                <li key={app} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Standards */}
      <Container className="py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Applicable Standards</h2>
        <div className="flex flex-wrap gap-3">
          {product.standards.map((standard) => (
            <Badge key={standard} className="text-sm">
              {standard}
            </Badge>
          ))}
        </div>
      </Container>

      {/* FAQ */}
      {product.faq.length > 0 && (
        <Container className="py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl">
            {product.faq.map((item) => (
              <details key={item.question} className="group border border-gray-200 rounded-xl">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 group-open:text-blue-900 list-none flex items-center justify-between">
                  {item.question}
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-gray-700">{item.answer}</div>
              </details>
            ))}
          </div>
        </Container>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Container className="py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/products/${rp.slug}`}
                className="group bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <span className="text-blue-900 font-bold text-xs">{rp.shortName}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{rp.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{rp.tagline}</p>
              </Link>
            ))}
          </div>
        </Container>
      )}

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need a Quote for {product.shortName} Pipes?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact our sales team with your specifications for a competitive quotation.
          </p>
          <Button href="/contact" variant="secondary">
            Get a Quote Now
          </Button>
        </Container>
      </section>
    </>
  );
}
