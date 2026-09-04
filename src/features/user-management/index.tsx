"use client";

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
      />
    </div>
  );
};

export default UserManagement;
