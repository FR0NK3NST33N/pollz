import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { NextPage } from "next";

const Login: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("session: ", session);
    console.log("status: ", status);
    if (session) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  return <Button onClick={() => signIn("github")}>{"GitHub"}</Button>;
};

export default Login;
