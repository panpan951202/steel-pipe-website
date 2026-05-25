import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us - Get a Quote for Steel Pipes",
  description:
    "Contact SteelPipe Pro for steel pipe inquiries and quotations. Reach our sales team by phone, email, or our online contact form. Serving customers in 60+ countries worldwide.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ label: "Contact", href: "/contact" }]} />

      <Container>
        <Breadcrumb items={[{ label: "Contact" }]} />
      </Container>

      <section className="py-12">
        <Container>
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Have questions about our steel pipe products or need a quotation?
              Fill out the form below or reach us directly using the contact details provided.
              Our team typically responds within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
