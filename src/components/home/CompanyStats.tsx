import Section from "@/components/ui/Section";
import { companyStats } from "@/data/stats";

export default function CompanyStats() {
  return (
    <Section className="bg-blue-900 text-white">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {companyStats.map((stat) => (
          <div key={stat.label}>
            <div className="text-4xl sm:text-5xl font-bold text-amber-400">
              {stat.value}
              <span className="text-2xl">{stat.suffix}</span>
            </div>
            <div className="mt-2 text-sm sm:text-base text-blue-200">{stat.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
