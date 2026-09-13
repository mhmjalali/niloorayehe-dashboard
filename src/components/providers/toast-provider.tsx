"use client";

import { Toaster } from "sonner";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      style={{ fontFamily: "var(--font-sans)" }}
    />
  );
};

export default ToastProvider;
