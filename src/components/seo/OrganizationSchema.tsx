import { COMPANY_NAME, SITE_URL, CONTACT, SOCIAL } from "@/lib/constants";
import JsonLd from "./JsonLd";

export default function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phone,
      contactType: "sales",
      availableLanguage: ["English", "Chinese"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address,
      addressCountry: "CN",
    },
    sameAs: [SOCIAL.linkedin],
  };

  return <JsonLd data={data} />;
}
