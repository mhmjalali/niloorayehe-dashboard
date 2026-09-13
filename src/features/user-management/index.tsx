"use client";

import { localApi } from "@/lib/axios";
import DataTable from "@/utils/table";
import TableActions from "./components/TableActions";
import { getColumns, type RowData } from "./columns";
import PageTitle from "@/components/shared/PageTitle";

const UserManagement = () => {
  const handleDelete = (data: RowData) => {
    console.log(data);
  };

  const columns = getColumns({
    onDelete: handleDelete,
  });

  return (
    <div>
      <PageTitle title="مدیریت کاربران" />
      <DataTable<RowData>
        columns={columns}
        TableUrl={"/api/user"}
        TableKey={"users"}
        TableActions={<TableActions />}
        defaultSorting={[{ id: "updated_at", desc: true }]}
        // Dev-only fake data (src/app/api/user/route.ts) — swap back to the
        // default client once a real backend endpoint exists for this table.
        client={localApi}
      />
    </div>
  );
};

export default UserManagement;
