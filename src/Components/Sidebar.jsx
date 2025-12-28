import { Hotel, HeartPulse, Hospital, Martini } from "lucide-react";

const categories = [
  { id: "hotel", label: "Hotels", icon: Hotel },
  { id: "spa", label: "Spa", icon: HeartPulse },
  { id: "hospital", label: "Hospital", icon: Hospital },
  { id: "pub", label: "Pub", icon: Martini }
];

export default function Sidebar({ setCategory }) {
  return (
    <div className="w-64 bg-white shadow-xl p-4 space-y-4">
      <h1 className="text-2xl font-bold text-blue-600">Maldives Atoll</h1>

      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => setCategory(c.id)}
          className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-blue-50 transition"
        >
          <c.icon />
          {c.label}
        </button>
      ))}
    </div>
  );
}
