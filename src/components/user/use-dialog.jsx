import React, { useEffect, useRef, useState } from "react";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Download, Eye, EyeClosed, Image, Images, Loader } from "lucide-react";
import useLogin from "../../hooks/login";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useUser from "../../hooks/use-user";
import InputError from "../InputErreur";

export default function UserDialog({ open, onSetOpen, getUsers, user }) {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [payload, setPayload] = useState({
    nom: "",
    email: "",
    password: "",
    role: "admin",
  });

  useEffect(() => {
    setPayload({
      nom: user ? user.nom : "",
      email: user ? user.email : "",
      password: user ? user.password : "",
      role: user ? user.role : "admin",
    });
    setPreviewImage(user ? user.avatar : null);
    setErrors({});
  }, [open]);

  const { showPassword, togglePasswordVisibility } = useLogin();
  const { handleSubmit, errors, setErrors, isLoading } = useUser();

  //Selection de l'image
  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      setPayload((prev) => ({ ...prev, avatar: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPayload((prev) => ({ ...prev, avatar: null }));
      setPreviewImage(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onSetOpen}>
      <form
        onSubmit={(e) => {
          handleSubmit(e, payload, setPayload, onSetOpen, getUsers, user?.id);
        }}
        id="submit_form_user"
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(event) => handleImageChange(event)}
          hidden
        />
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>
              {user ? "Modifier" : "Ajouter"} un utilisateur
            </DialogTitle>
            <DialogDescription>
              Les champs marqués par <span className="text-red-500">*</span>{" "}
              sont obligatoire
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex flex-col justify-center items-center">
              <div className="border-1 border-zinc-300 text-light rounded-full h-[120px] w-[120px] flex justify-center items-center overflow-hidden p-4">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-full w-fit object-cover"
                  />
                ) : (
                  <Image className="h-full w-fit text-zinc-400" />
                )}
              </div>
              <InputError message={errors.avatar} />
              <Button
                variant="secondary"
                size="sm"
                className="w-50 my-3"
                onClick={() => fileInputRef.current.click()}
              >
                <Download /> Télécharger une image
              </Button>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">
                Nom & prénom(s) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="nom"
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, nom: e.target.value }))
                }
                placeholder="Nom de l'utilisateur"
                defaultValue={payload.nom}
                required
              />
              <InputError message={errors.nom} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, email: e.target.value }))
                }
                type="email"
                defaultValue={payload.email}
                placeholder="Adresse email de l'utilisateur"
                required
              />
              <InputError message={errors.email} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">
                Mot de passe {!user && <span className="text-red-500">*</span>}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  onChange={(e) =>
                    setPayload((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  type={showPassword ? "text" : "password"}
                  placeholder="*****************"
                  {...(!user && { required: true })}
                />

                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeClosed className="h-5 w-5 cursor-pointer" />
                  ) : (
                    <Eye className="h-5 w-5 cursor-pointer" />
                  )}
                </div>
              </div>
              <InputError message={errors.password} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">
                Rôle <span className="text-red-500">*</span>
              </Label>
              <Select
                value={payload.role}
                onValueChange={(value) => {
                  setPayload((prev) => ({ ...prev, role: value }));
                  console.log(payload);
                }}
              >
                <SelectTrigger id="role" className="mb-0 w-full" required>
                  <SelectValue placeholder="Sélectionnez un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">Utilisateur</SelectItem>
                </SelectContent>
              </Select>
              <InputError message={errors.role} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button type="submit" form="submit_form_user" disabled={isLoading}>
              {isLoading ? <Loader /> : "Enregistrer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
