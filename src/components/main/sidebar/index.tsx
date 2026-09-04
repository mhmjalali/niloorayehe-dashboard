"use client";

import { useSidebarStore } from "@/stores/useSidebarStore";
import { motion } from "motion/react";
import Footer from "./footer";
import Header from "./header";
import NavItems from "./nav-items";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const Sidebar = () => {
  const { collapsed, setCollapsed } = useSidebarStore();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  }, [setCollapsed, isMobile]);

  const width = collapsed && isMobile ? 0 : collapsed ? 64 : 280;

  return (
    <motion.aside
      initial={{ width: 0 }}
      animate={{ width }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="absolute z-80 flex h-screen shrink-0 flex-col overflow-hidden border-l border-text/10 bg-background md:relative"
    >
      <Header />
      <NavItems />
      <Footer />
    </motion.aside>
  );
};

export default Sidebar;
