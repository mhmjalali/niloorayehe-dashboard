import Modal from "@/components/ui/Modal";

type editInfoProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  setProfileOpen: (value: boolean) => void;
};

const EditInfo = ({ open, setOpen, setProfileOpen }: editInfoProps) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setProfileOpen(true);
      }}
      closeOnBackdrop
      className="w-75"
    >
      hii again
    </Modal>
  );
};

export default EditInfo;
