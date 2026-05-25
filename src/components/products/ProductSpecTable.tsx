import type { SpecItem } from "@/types/product";

interface ProductSpecTableProps {
  specifications: SpecItem[];
}

export default function ProductSpecTable({ specifications }: ProductSpecTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 w-1/3">
              Parameter
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
              Specification
            </th>
          </tr>
        </thead>
        <tbody>
          {specifications.map((spec, index) => (
            <tr
              key={spec.label}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900 border-t border-gray-200">
                {spec.label}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 border-t border-gray-200">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
