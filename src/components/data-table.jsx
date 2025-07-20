import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "../components/ui/input";
import { Loader, Search } from "lucide-react";

export default function DataTable({
  data,
  columns,
  searchable = false,
  showPagination = true,
  loading = false,
  searchValue = null,
  onSearchChange = null,
}) {
  const { data: datas, meta } = data;

  return (
    <>
      {searchable && (
        <div className="relative mb-6">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Filtrer"
            className="pl-8 !w-auto text-sm focus:border-transparent active:border-transparent"
          />
        </div>
      )}
      <div className="relative w-full overflow-x-auto overflow-hidden rounded-lg border">
        <Table className="w-full caption-bottom text-sm">
          <TableHeader className="[&_tr]:border-b bg-muted sticky top-0 z-10">
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24">
                  <div className="flex justify-center">
                    <Loader />
                  </div>
                </TableCell>
              </TableRow>
            ) : datas?.length > 0 ? (
              datas.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((col) => (
                    <TableCell key={col.key} className="truncate">
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun resultat trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
