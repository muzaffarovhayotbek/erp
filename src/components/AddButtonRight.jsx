import { Plus } from "lucide-react";

export default function AddButtonRight({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed right-6 top-1/2 -translate-y-1/2
        flex items-center gap-2
        px-4 py-3
        bg-green-600 text-white
        rounded-full shadow-lg
        hover:bg-green-700 active:scale-95
        transition
      "
    >
      <Plus size={18} />
      Qo‘shish
    </button>
  );
}