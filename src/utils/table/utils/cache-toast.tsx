import { toast } from "sonner";
import Button from "@/components/ui/Button";
import { CloudBackup, Save } from "lucide-react";

interface PromptCacheSaveOptions {
  onConfirm: () => void;
}

export const CACHE_TOAST_ID = "cache-save-toast";

function CacheToast({
  toastId,
  onConfirm,
}: {
  toastId: string | number;
  onConfirm: () => void;
}) {
  return (
    <div className="bg-background rounded-lg shadow-xl font-(family-name:--font-morabba)">
      <div className="flex flex-col gap-3 bg-secondary/20 p-4 rounded-lg">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-sm font-semibold text-secondary">
              ذخیره سازی تغییرات
            </p>
            <CloudBackup className="h-5 w-5 text-secondary" />
          </div>
          <p className="text-xs text-text-mutedmuted pe-4 mb-1">
            آیا مایل به ذخیره تغییرات اعمال شده برای دفعات بعد هستید؟
          </p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            size="sm"
            color="error"
            variant="outlined"
            onClick={() => toast.dismiss(toastId)}
          >
            رد کردن
          </Button>
          <Button
            type="button"
            size="sm"
            color="secondary"
            onClick={() => {
              onConfirm();
              toast.dismiss(toastId);
            }}
          >
            <Save className="h-5 w-5" />
            ذخیره تغییرات
          </Button>
        </div>
      </div>
    </div>
  );
}

export function promptCacheSave({ onConfirm }: PromptCacheSaveOptions) {
  toast.custom((id) => <CacheToast toastId={id} onConfirm={onConfirm} />, {
    id: CACHE_TOAST_ID,
    position: "bottom-left",
    duration: 6000,
  });
}

export function dismissCacheToast() {
  toast.dismiss(CACHE_TOAST_ID);
}
