"use client";

import Loader from "@/components/Loader/Loader";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

export default function Provider({ children }) {
  return (
    <SessionProvider>
      {/* this will create a spinner when the session is loading */}
      {/* <Loader> */}
        {children}
      {/* </Loader> */}

      {/* this will display logout buttons when the session is loading complete, now it not work anymore@@ */}
      {/* <Suspense fallback={<Loader/>}>{children}</Suspense> */}
    </SessionProvider>
  );
}
