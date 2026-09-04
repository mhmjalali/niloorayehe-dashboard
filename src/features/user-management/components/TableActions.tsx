"use client";

import Button from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const TableActions = () => {
  const t = useTranslations("UserManagement");
  const [openCreate, setOpenCreate] = useState(false);

  console.log(openCreate);

  return (
    <div className="flex items-center gap-2">
      <Tooltip text={t("createUser")}>
        <Button size="sm" onClick={() => setOpenCreate((prev) => !prev)}>
          <Plus size={15} />
          <span className="hidden md:inline">{t("createUser")}</span>
        </Button>
      </Tooltip>
    </div>
  );
};

export default TableActions;
