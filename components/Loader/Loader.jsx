import { useSession, signOut } from "next-auth/react";

export default function Loader({ children }) {
  const sesstion = useSession();
  return (
    <>
      {sesstion.status === "loading" ? (
        <div className="m-auto">
          <div className="loader"></div>;
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
