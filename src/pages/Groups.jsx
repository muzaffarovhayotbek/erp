import { useState } from "react";
import CreateGroupModal from "./CreateGroupModal";

export default function Groups() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-5">
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        + Guruh yaratish
      </button>

      <CreateGroupModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}