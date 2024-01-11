"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [dto, setDto] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState("");

  const handleFormRegister = async (e) => {
    e.preventDefault();
    if (checkValid())
      await axios
        .post("/api/register", { email: dto.email, password: dto.password })

        .then((res) => {
          console.log("res", res);
          const code = res.data.code;
          const mes = res.data.message;
          if (code === 10) {
            setAlert(mes);
          }
        })
        .catch((err) => console.log("reason", err));
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
        Register
      </div>

      <form className="max-w-xs mx-auto gap-2" onSubmit={handleFormRegister}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setDto({ ...dto, email: e?.target?.value ?? "" })}
          value={dto.email}
        />
        <span className="text-red-500 text-xs">{alert}</span>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setDto({ ...dto, password: e?.target?.value ?? "" })}
          value={dto.password}
        />
        <button type="submit" className="">
          Register
        </button>
        <div className="my-4 text-center text-gray-500">Or login with</div>
        <button className="flex-row flex justify-center">
          <Image
            width="24"
            height="24"
            alt=""
            src="https://raw.githubusercontent.com/dejwid/food-ordering/master/public/google.png"
          />
          Login with Google
        </button>
        <div className="text-gray-500 text-center mt-4 py-4 border-t">
          Existing account?{" "}
          <a className="underline" href="/login">
            Login here
          </a>
        </div>
      </form>
    </section>
  );
}
