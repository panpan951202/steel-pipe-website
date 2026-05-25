import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/layout/Breadcrumb";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { companyInfo } from "@/data/company";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us - Leading Steel Pipe Manufacturer",
  description:
    "SteelPipe Pro Industries - 20 years of expertise in manufacturing SMLS, ERW, LSAW, SSAW, and HSAW steel pipes. ISO 9001, API 5L certified. Annual capacity of 300,000 tons, exporting to 60+ countries.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ label: "About Us", href: "/about" }]} />

      <Container>
        <Breadcrumb items={[{ label: "About Us" }]} />
      </Container>

      {/* Hero */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About SteelPipe Pro</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {companyInfo.description.split('\n\n')[0]}
          </p>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">{companyInfo.mission}</p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">{companyInfo.vision}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-gray-900 text-white">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-400">2005</div>
              <div className="mt-2 text-sm text-gray-400">Founded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400">500+</div>
              <div className="mt-2 text-sm text-gray-400">Employees</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400">300k</div>
              <div className="mt-2 text-sm text-gray-400">Annual Tons</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400">60+</div>
              <div className="mt-2 text-sm text-gray-400">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400">200k</div>
              <div className="mt-2 text-sm text-gray-400">Factory m²</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Certifications & Approvals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyInfo.certifications.map((cert) => (
              <div
                key={cert.name}
                className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-blue-50 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Global Markets */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Global Market Presence
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {companyInfo.markets.map((market) => (
              <span
                key={market}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm"
              >
                {market}
              </span>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
