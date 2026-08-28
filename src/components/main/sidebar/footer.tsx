"use client";

import Profile from "@/features/profile";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const { collapsed } = useSidebarStore();
  const [modalOpen, setModalOpen] = useState(false);
  const user = {
    id: 1,
    name: "محمد امین موسوی",
    username: "@mohammad_amin",
    email: "mohammad.amin@gmail.com",
    updated_at: "2023-03-01T12:00:00.000Z",
  };

  return (
    <div className="border-t border-black/8 px-2 py-2">
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="hover:bg-primary/10 group flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg px-2 py-1 transition-colors"
      >
        <div className="bg-primary/20 flex shrink-0 items-center justify-center rounded-full p-3">
          <span className="text-text-primary text-xs font-semibold">{user?.name?.slice(0, 2)}</span>
        </div>
        {!collapsed && (
          <>
            <div className="flex flex-1 flex-col overflow-hidden text-right whitespace-nowrap">
              <span className="text-text-primary text-sm leading-tight font-medium">{user?.name}</span>
              <span className="text-text-secondary mt-0.5 text-[11px] leading-tight">{user?.username}</span>
            </div>
            <EllipsisVertical size={15} className="text-text-primary transition-colors" />
          </>
        )}
      </button>
      <Profile modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default Footer;
