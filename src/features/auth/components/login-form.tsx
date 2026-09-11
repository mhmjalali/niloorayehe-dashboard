"use client";

import Button from "@/components/ui/Button";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-text/15 bg-text/5 px-3 py-3 text-sm text-text outline-none transition-colors placeholder:text-muted hover:border-muted focus:border-secondary focus:bg-background";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

const LoginForm = () => {
  const t = useTranslations("Auth.Login");
  const tBrand = useTranslations("Sidebar.Header");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col justify-center gap-7 p-8 md:flex-[0.6] md:p-12"
    >
      <motion.div variants={item} className="flex items-center gap-3">
        <Image
          src="/logo/niloorayehe.svg"
          alt={tBrand("title")}
          width={40}
          height={40}
        />
        <span className="text-base font-bold text-primary">
          {tBrand("title")}
        </span>
      </motion.div>

      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-text">{t("title")}</h1>
        <p className="mt-1.5 text-sm text-muted">{t("subtitle")}</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <motion.div variants={item} className="flex flex-col gap-1.5">
          <label htmlFor="username" className="text-xs font-medium text-text">
            {t("username")}
          </label>
          <div className="relative">
            <User
              size={18}
              className="pointer-events-none absolute inset-y-0 inset-s-3 my-auto text-muted"
            />
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder={t("usernamePlaceholder")}
              className={`${inputClass} ps-10`}
            />
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-medium text-text">
            {t("password")}
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="pointer-events-none absolute inset-y-0 inset-s-3 my-auto text-muted"
            />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder={t("passwordPlaceholder")}
              className={`${inputClass} ps-10 pe-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 inset-e-3 flex items-center text-muted transition-colors hover:text-text"
              aria-label={showPassword ? t("hidePassword") : t("showPassword")}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border accent-primary"
            />
            {t("rememberMe")}
          </label>
          <span className="cursor-pointer text-xs font-medium text-primary hover:underline">
            {t("forgotPassword")}
          </span>
        </motion.div>

        <Button type="submit" size="lg" variants={item} className="mt-2 w-full">
          {t("submit")}
        </Button>
      </form>
    </motion.div>
  );
};

export default LoginForm;
