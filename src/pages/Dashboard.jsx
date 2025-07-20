import React, { useEffect, useState } from "react";
import { SectionCards } from "../components/section-cards";
import AppLayout from "../layouts/AppLayout";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import DataTable from "../components/data-table";
import useUser from "../hooks/use-user";
import UserDialog from "../components/user/use-dialog";
import UserDeleteDialog from "../components/user/user-delete";
import UserStatusDialog from "../components/user/user-status";
import { useAuth } from "../auth/AuthProvider";

export default function Dashboard() {
  const {
    data,
    setData,
    isLoading,
    getUsers,
    userId,
    openDialog,
    user,
    statistics,
    setUser,
    setOpenDialog,
    openDeleteDialog,
    setOpenDeleteDialog,
    openStatusDialog,
    setOpenStatusDialog,
    columns,
  } = useUser();

  const { user: useAuthData } = useAuth();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getUsers(searchValue);
    console.log("searchValue:", searchValue);
  }, [searchValue]);

  return (
    <AppLayout title="Tableau de bord">
      <SectionCards statistics={statistics} />
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between gap-2 my-5">
          <h4>Liste des utilisateurs</h4>
          {useAuthData?.role === "admin" && (
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setUser(null);
                setOpenDialog(true);
              }}
            >
              <Plus /> Ajouter un utilisateur
            </Button>
          )}
        </div>

        <DataTable
          data={data}
          onSetData={setData}
          searchValue={searchValue}
          onSetSearchValue={setSearchValue}
          columns={columns}
          searchable={true}
          showPagination={true}
          loading={isLoading}
        />
      </div>
      <UserDialog
        open={openDialog}
        onSetOpen={setOpenDialog}
        getUsers={getUsers}
        user={user}
      />
      <UserStatusDialog
        userId={userId}
        open={openStatusDialog}
        onSetOpen={setOpenStatusDialog}
        getUsers={getUsers}
      />
      <UserDeleteDialog
        userId={userId}
        open={openDeleteDialog}
        onSetOpen={setOpenDeleteDialog}
        getUsers={getUsers}
      />
    </AppLayout>
  );
}
