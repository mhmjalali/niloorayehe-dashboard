"use client";

import Button from "@/components/ui/Button";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-border bg-text/5 px-3 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-muted hover:border-muted focus:border-secondary focus:bg-background";

const LoginForm = () => {
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
    <div className="flex w-full flex-col justify-center gap-7 p-8 md:flex-[0.6] md:p-12">
      <div className="flex items-center gap-2.5">
        <Image
          src="/logo/niloorayehe.svg"
          alt="نیلو رایحه"
          width={32}
          height={32}
        />
        <span className="text-sm font-bold text-primary">
          نیلو رایحه ایرانیان
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-text">ورود به داشبورد</h1>
        <p className="mt-1.5 text-sm text-muted">
          برای ادامه وارد حساب کاربری خود شوید
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="username" className="text-xs font-medium text-text">
            نام کاربری
          </label>
          <div className="relative">
            <User
              size={16}
              className="pointer-events-none absolute inset-y-0 inset-s-3 my-auto text-muted"
            />
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="نام کاربری خود را وارد کنید"
              className={`${inputClass} ps-9`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-medium text-text">
            رمز عبور
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="pointer-events-none absolute inset-y-0 inset-s-3 my-auto text-muted"
            />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="رمز عبور خود را وارد کنید"
              className={`${inputClass} ps-9 pe-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 inset-e-3 flex items-center text-muted transition-colors hover:text-text"
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
              className="h-4 w-4 rounded border-border accent-primary"
            />
            مرا به خاطر بسپار
          </label>
          <span className="cursor-pointer text-xs font-medium text-primary hover:underline">
            فراموشی رمز عبور؟
          </span>
        </div>

        <Button type="submit" size="lg" className="mt-2 w-full">
          ورود
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
