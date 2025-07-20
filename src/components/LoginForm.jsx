import { Eye, EyeClosed, Loader } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import InputError from "./InputErreur";
import { toast } from "sonner";
import useLogin from "../hooks/login";

export function LoginForm({ className, ...props }) {
  const {
    errors,
    showPassword,
    isLoading,
    togglePasswordVisibility,
    handleSubmit,
  } = useLogin();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Connexion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <div>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="m@example.com"
                      required
                    />
                    <InputError message={errors.email} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">
                    Mot de passe
                    <span className="text-muted-foreground">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="*****************"
                      required
                    />
                    <InputError message={errors.password} />
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
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader /> : "Connexion"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By <a href="#">Pat56-hp</a>
      </div>
    </div>
  );
}
