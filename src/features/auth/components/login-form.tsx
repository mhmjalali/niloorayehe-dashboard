"use client";

import Button from "@/components/ui/Button";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up real authentication
  }

  return (
    <div className="flex w-full flex-col justify-center gap-6 rounded-2xl border border-border bg-black/80 p-8 md:flex-[0.6]">
      <Image
        src="/logo/brand-id.svg"
        alt="نیلو رایحه"
        width={404}
        height={115}
        className="self-center"
      />

      <div>
        <h1 className="text-xl font-bold text-white">ورود به داشبورد</h1>
        <p className="mt-1 text-sm text-secondary">
          برای ادامه وارد حساب کاربری خود شوید
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="username" className="text-xs text-muted">
            نام کاربری
          </label>
          <input
            id="username"
            type="text"
            required
            autoComplete="off"
            data-1p-ignore
            data-lpignore="true"
            placeholder="نام کاربری خود را وارد کنید"
            className="w-full rounded-lg border border-muted/20 bg-black/40 px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-muted hover:border-muted"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs text-muted">
            رمز عبور
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="off"
              data-1p-ignore
              data-lpignore="true"
              placeholder="رمز عبور خود را وارد کنید"
              className="w-full rounded-lg border border-muted/20 bg-black/40 px-3 py-2 pe-10 text-sm text-text outline-none transition-colors placeholder:text-muted hover:border-muted"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 end-2 flex items-center text-muted transition-colors hover:text-text"
              aria-label={
                showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"
              }
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border accent-accent"
            />
            مرا به خاطر بسپار
          </label>

          <span className="cursor-pointer text-xs text-accent hover:underline">
            فراموشی رمز عبور؟
          </span>
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-2 w-full bg-accent text-primary hover:brightness-105"
        >
          ورود
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
