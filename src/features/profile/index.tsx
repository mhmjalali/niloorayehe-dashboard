import Modal from "@/components/ui/Modal";
import { KeyRound, LogOut, UserPen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ChangePassword from "./change-password";
import EditInfo from "./edit-info";
import { useLogout } from "./hooks/useLogout";

const Profile = ({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}) => {
  const [editInfoOpen, setEditInfoOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeOnBackdrop
        className="w-75"
      >
        <div className="flex flex-col items-center gap-2 px-6 pt-6 pb-5 border-b border-text/10">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-primary">مح</span>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-text">محمد جلالی</p>
            <p className="text-xs text-text-muted mt-0.5">09036949387</p>
            <span className="text-[10px] bg-secondary/20 text-secondary py-1 px-2 rounded-full mt-2">
              آخرین بروزرسانی: 1405/05/28
            </span>
          </div>
        </div>
        <div className="flex flex-col p-2">
          <button
            type="button"
            onClick={() => {
              setModalOpen(false);
              setEditInfoOpen(true);
            }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-primary/10 text-text transition-colors text-right group cursor-pointer"
          >
            <UserPen
              size={17}
              className="text-muted group-hover:text-text transition-colors shrink-0"
            />
            <span className="text-sm font-medium">ویرایش پروفایل</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setModalOpen(false);
              setChangePasswordOpen(true);
            }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-primary/10 text-text transition-colors text-right group cursor-pointer"
          >
            <KeyRound
              size={17}
              className="text-muted group-hover:text-text transition-colors shrink-0"
            />
            <span className="text-sm font-medium flex-1">تغییر رمز عبور</span>
          </button>

          <div className="h-px bg-text/10 mx-2 my-1" />

          <button
            type="button"
            disabled={isLoggingOut}
            onClick={() =>
              toast("از حساب خود خارج می‌شوید؟", {
                id: "logout-confirm",
                duration: Infinity,
                action: {
                  label: "خروج",
                  onClick: (event) => {
                    event.preventDefault();
                    toast.promise(logout(), {
                      id: "logout-confirm",
                      loading: "درحال خروج از حساب...",
                      action: undefined,
                      cancel: undefined,
                      success: {
                        message: "با موفقیت خارج شدید",
                        duration: 4000,
                      },
                      error: { message: "خطا در خروج از حساب", duration: 4000 },
                    });
                  },
                },
                cancel: { label: "انصراف", onClick: () => {} },
                classNames: {
                  toast: "border-error/30 bg-error/5",
                  actionButton:
                    "!h-9 !px-4 !text-sm !bg-error !text-white hover:brightness-110",
                  cancelButton:
                    "!h-9 !px-4 !text-sm !bg-transparent !text-muted hover:!bg-muted/10",
                },
              })
            }
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-error/8 text-error transition-colors text-right group cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            <LogOut size={17} className="shrink-0" />
            <span className="text-sm font-medium flex-1">خروج از حساب</span>
          </button>
        </div>
      </Modal>
      <EditInfo
        open={editInfoOpen}
        setOpen={setEditInfoOpen}
        setProfileOpen={setModalOpen}
      />
      <ChangePassword
        open={changePasswordOpen}
        setOpen={setChangePasswordOpen}
        setProfileOpen={setModalOpen}
      />
    </>
  );
};

export default Profile;
