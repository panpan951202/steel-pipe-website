import { cn } from "@/lib/utils";
import Container from "./Container";

interface SectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export default function Section({
  title,
  subtitle,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <Container className={containerClassName}>
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
