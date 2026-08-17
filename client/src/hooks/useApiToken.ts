"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export function useApiToken() {
  const { status } = useSession();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") {
      setToken(null);
      return;
    }

     fetch("/api/token")
      .then((res) => { return  res.json() })
      .then((data) => {
        setToken(data.token)
        console.log(data.token);
      })
      .catch((err) => {
        console.log(err);
        setToken(null)
      });
  }, [status]);

  return token;
}