import Link from "next/link";
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
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SP</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              {COMPANY_SHORT}
            </span>
          </Link>

          <Navigation />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
