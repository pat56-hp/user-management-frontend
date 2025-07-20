import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "../components/ui/input";
import { ChevronLeft, ChevronRight, Loader, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../auth/AuthProvider";
import { toast } from "sonner";
import { getDataFromPageUrl } from "../api/usePaginateApi";

export default function DataTable({
  data,
  onSetData,
  columns,
  searchable = false,
  showPagination = true,
  loading = false,
  searchValue = null,
  onSetSearchValue = () => {},
}) {
  const { clearData } = useAuth();
  const [isLoading, setIsLoading] = useState(loading);
  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [searchTerm, setSearchTerm] = useState(searchValue || "");
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  useEffect(() => {
    const { data: userData, meta } = data;
    setDatas(userData || []);
    setSearchTerm(searchValue || "");
    setCurrentPage(meta?.current_page || 1);
    setFrom(meta?.from || 0);
    setTo(meta?.to || 0);
    setTotalItems(meta?.total || 0);
    setTotalPages(meta?.last_page || 0);
    setPrevPageUrl(meta?.prev_page_url || null);
    setNextPageUrl(meta?.next_page_url || null);
  }, [searchValue, data]);

  //Change la page
  const handlePageChange = (url) => {
    setIsLoading(true);
    getDataFromPageUrl(url)
      .then((resp) => {
        onSetData(resp);
      })
      .catch((err) => {
        const { status } = err;
        if (status === 401) {
          clearData();
        }
        toast.error("Une erreur est survenue lors du chargement des données");
      });

    setIsLoading(false);
  };

  //Filtre des données
  const handleFilter = (e) => {
    setSearchTerm(e.target.value);
    onSetSearchValue(e.target.value);
  };

  return (
    <>
      {searchable && (
        <div className="relative mb-6">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Filtrer"
            className="pl-8 !w-auto text-sm focus:border-transparent active:border-transparent"
            value={searchTerm}
            onChange={handleFilter}
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
            {isLoading ? (
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
      {showPagination && (
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-muted-foreground">
            Affichage {from} à {to} sur {totalItems}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(prevPageUrl)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {currentPage} à {totalPages || 1}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(nextPageUrl)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
