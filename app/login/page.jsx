"use client";

import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [dto, setDto] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState("");

  const handleFormLogin = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email: dto.email,
      password: dto.password,
      callbackUrl: "/",
    });
  };

  const checkValid = () => {
    const { email, password } = dto;
    let isValid = true;
    let alertMessage = "";

    if (email.length === 0 && password.length === 0) {
      isValid = false;
      alertMessage = "Do not leave email and password blank";
    } else if (email.length === 0) {
      isValid = false;
      alertMessage = "Do not leave email blank";
    } else if (password.length < 6) {
      isValid = false;
      alertMessage = "Password must have at least 6 characters";
    }

    if (!isValid) {
      setAlert(alertMessage);
    }

    return isValid;
  };

  return (
    <section className="mt-8">
      <div className="text-center text-primary text-4xl uppercase mb-4">
        Login
      </div>
      <form className="max-w-xs mx-auto gap-2" onSubmit={handleFormLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setDto({ ...dto, email: e?.target?.value ?? "" })}
          value={dto.email}
        />
        <span>{alert}</span>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setDto({ ...dto, password: e?.target?.value ?? "" })}
          value={dto.password}
        />
        <button type="submit" className="">
          Login
        </button>
        <div className="my-4 text-center text-gray-500">Or login with</div>
        <button
          className="flex-row flex justify-center"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image
            width="24"
            height="24"
            alt=""
            src="https://raw.githubusercontent.com/dejwid/food-ordering/master/public/google.png"
          />
          Login with Google
        </button>
      </form>
    </section>
  );
}


