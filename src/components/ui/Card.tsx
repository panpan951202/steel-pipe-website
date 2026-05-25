import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ className, children }: CardProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-md overflow-hidden border border-gray-100", className)}>
      {children}
    </div>
  );
}
