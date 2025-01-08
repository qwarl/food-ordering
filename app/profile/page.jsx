"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const { status } = session;
  console.log("log profile", session);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);

      fetch("/api/profile", {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("GET profile error");
          }
          return response.json();
        })
        .then((data) => {
          setPhone(data.phone)
          setCity(data.city)
          setCountry(data.country)
          setPostalCode(data.postalCode)
          setStreetAddress(data.streetAddress)
        })
        .catch((error) => {
          console.log("GET profile error", error);
        });
    }
  }, [status, session]);

  const handleProfileInfoUpdate = async (e) => {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          image,
          phone,
          streetAddress,
          postalCode,
          city,
          country,
        }),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile Saved",
      error: "Error",
    });
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      await toast.promise(
        fetch("/api/upload", {
          method: "POST",
          body: data,
        }).then(async (response) => {
          const link = await response.json();
          await new Promise((resolve) => setTimeout(resolve, 800)); // too quick, image is not ready yet, so wait a bit
          setImage(link);
        }),
        {
          loading: "Uploading...",
          success: "Upload complete!",
          error: "Upload error!",
        },
      );
    }
  };

  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto">
        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
              {image && (
                <Image
                  src={image}
                  className="rounded-lg w-full h-full mb-1 max-w-[120px]"
                  width={250}
                  height={250}
                  alt="avatar"
                  priority
                />
              )}
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="block border border-gray-300 rounded-lg p-2 text-center">
                  Edit
                </span>
              </label>
            </div>
          </div>
          <form onSubmit={handleProfileInfoUpdate} className="grow">
            <input
              type="text"
              placeholder="First name and last name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              disabled={true}
              value={session.data.user.email}
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Street address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
