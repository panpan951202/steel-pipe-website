import { cn } from "@/lib/utils";

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

export default function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800",
        className
      )}
    >
      {children}
    </span>
  );
}
