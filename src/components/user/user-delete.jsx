import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Loader } from "lucide-react";
import useUser from "../../hooks/use-user";

export default function UserDeleteDialog({
  userId,
  open,
  onSetOpen,
  getUsers,
}) {
  const { deleteUser, isLoading } = useUser();

  return (
    <Dialog open={open} onOpenChange={onSetOpen}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Supprimer un utilisateur</DialogTitle>
          <DialogDescription>
            Êtes-vous sûre de vouloir continuer ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            disabled={isLoading}
            onClick={() => deleteUser(userId, onSetOpen, getUsers)}
          >
            {isLoading ? <Loader /> : "Oui"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Non</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
