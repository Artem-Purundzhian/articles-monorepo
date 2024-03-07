import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

export async function checkToken(token: string | undefined) {
  noStore();

  if (token) {
    try {
      const response = await fetch("http://localhost:3333/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await response.json();

      if (response.ok) {
        if (!res.email) {
          redirect("/sign-in");
        }
      } else {
        console.log(res);
        redirect("/sign-in");
      }
    } catch (err) {
      console.log(err);
      redirect("/sign-in");
    }
  } else {
    redirect("/sign-in");
  }
}
