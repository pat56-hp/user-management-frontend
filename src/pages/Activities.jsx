import React, { useEffect } from "react";
import AppLayout from "../layouts/AppLayout";
import useActivity from "../hooks/use-activity";
import DataTable from "../components/data-table";

export default function Activities() {
  const { columns, activities, setActivities, getActivities, loading } =
    useActivity();

  useEffect(() => {
    getActivities();
  }, []);
  return (
    <AppLayout title="Historique d'activité">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between gap-2 my-5">
          <h4>Liste des activités</h4>
        </div>

        <DataTable
          data={activities}
          onSetData={setActivities}
          columns={columns}
          searchable={false}
          showPagination={true}
          loading={loading}
        />
      </div>
    </AppLayout>
  );
}
