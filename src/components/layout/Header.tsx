import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Navigation from "./Navigation";
import MobileNav from "./MobileNav";
import { COMPANY_SHORT } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image src="/images/logo-header.png" alt={COMPANY_SHORT} width={160} height={40} className="h-10 w-auto" priority unoptimized />
          </Link>

          <Navigation />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
