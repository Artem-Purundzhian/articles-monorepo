"use client";
import { useCookies } from "react-cookie";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const [, , removeCookie] = useCookies(["access_token"]);
  const router = useRouter();

  function logout() {
    removeCookie("access_token");
    router.refresh();
  }

  return (
    <Button variant="secondary" size="sm" onClick={logout}>
      Log out
    </Button>
  );
}

export default LogoutButton;
