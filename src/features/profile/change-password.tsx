"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ChangePasswordProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  setProfileOpen: (value: boolean) => void;
};

const inputClass =
  "w-full rounded-lg border border-text/15 bg-text/5 px-3 py-3 text-sm text-text outline-none transition-colors placeholder:text-muted hover:border-muted focus:border-secondary focus:bg-background";

const schema = z
  .object({
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "تکرار رمز عبور مطابقت ندارد",
    path: ["repeatPassword"],
  });

type FormValues = z.infer<typeof schema>;

const ChangePassword = ({
  open,
  setOpen,
  setProfileOpen,
}: ChangePasswordProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormValues) => {
    console.log(data.password, data.repeatPassword);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setProfileOpen(true);
        reset();
      }}
      closeOnBackdrop
      className="w-75"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-medium text-text">
            رمز عبور
          </label>
          <input
            id="password"
            type="password"
            className={inputClass}
            {...register("password")}
          />
          {errors.password && (
            <span className="text-xs text-error">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="repeatPassword"
            className="text-xs font-medium text-text"
          >
            تکرار رمز عبور
          </label>
          <input
            id="repeatPassword"
            type="password"
            className={inputClass}
            {...register("repeatPassword")}
          />
          {errors.repeatPassword && (
            <span className="text-xs text-error">
              {errors.repeatPassword.message}
            </span>
          )}
        </div>

        <Button type="submit" size="lg" className="mt-2 w-full">
          ثبت
        </Button>
      </form>
    </Modal>
  );
};

export default ChangePassword;
