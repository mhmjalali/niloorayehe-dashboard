import Modal from "@/components/ui/Modal";
import { KeyRound, LogOut, UserPen } from "lucide-react";
import { useState } from "react";
import EditInfo from "./edit-info";

const Profile = ({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}) => {
  const [editInfoOpen, setEditInfoOpen] = useState(false);

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeOnBackdrop
        className="w-75"
      >
        <div className="flex flex-col items-center gap-2 px-6 pt-6 pb-5 border-b border-border">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-primary">مح</span>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-text-primary">محمد</p>
            <p className="text-xs text-text-secondary mt-0.5">
              mohammad.jalali@gmail.com
            </p>
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
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-primary/10 text-text-primary transition-colors text-right group cursor-pointer"
          >
            <UserPen
              size={17}
              className="text-text-secondary group-hover:text-text-primary transition-colors shrink-0"
            />
            <span className="text-sm font-medium">ویرایش پروفایل</span>
          </button>
          <button
            type="button"
            onClick={() => {
              console.log("change password");
              setModalOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-primary/10 text-text-primary transition-colors text-right group cursor-pointer"
          >
            <KeyRound
              size={17}
              className="text-text-secondary group-hover:text-text-primary transition-colors shrink-0"
            />
            <span className="text-sm font-medium flex-1">تغییر رمز عبور</span>
          </button>

          <div className="h-px bg-border mx-2 my-1" />

          <button
            type="button"
            onClick={() => {
              console.log("go for logout");
            }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-error/8 text-error transition-colors text-right group cursor-pointer"
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
    </>
  );
};

export default Profile;
