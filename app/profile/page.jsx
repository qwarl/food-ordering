"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [saved, setSaved] = useState(false);
  const [image, setImage] = useState("");
  const [isSaving, setIsSaving] = useState(null);
  const [file, setFile] = useState(null);

  const { status } = session;
  //   // console.log(session);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
    }
  }, [status, session]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await axios
      .put("/api/profile", { name: userName })
      .then(() => setIsSaving(false))
      .catch((error) => console.log("err", error))
      .finally(() => setSaved(true));
  };

  // const handleFileChange = async (e) => {
  //   const file = e.target.files;
  //   console.log("1", file);
  //   if (file?.length > 0) {
  //     const data = new FormData();
  //     data.set("file", file[0]);
  //     await axios.post("api/upload", data).then((res) => {
  //       // setImage(res.data),
  //       console.log("res", res);
  //     });
  //     // .catch((err) => console.log("err", err));
  //     console.log("ok");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const file = e.target.files;
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/upload",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      }
    );
    if (response.ok) {
      const { url, fields } = await response.json();

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);
      console.log("form", `${url}${fields.key}`);
      const link= url+fields.key
      setImage(link)
      console.log("link", link);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        alert("Upload successful!");
        console.log("up", uploadResponse);
      } else {
        console.error("S3 Upload Error:", uploadResponse);
        alert("Upload failed.");
      }
    } else {
      alert("Failed to get pre-signed URL.");
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
        {saved && (
          <h2 className="text-center mb-2 bg-green-100 p-4 rounded-lg border border-green-300">
            Profile updated
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center mb-2 bg-blue-100 p-4 rounded-lg border border-blue-300">
            Profile updating
          </h2>
        )}
        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg relative">
              <form onSubmit={handleSubmit}>
                {image && (
                  <Image
                    src={image}
                    // src={`http://localhost:3000/_next/image?url=https%3A%2F%2Ffood-ordering-111.s3.amazonaws.com%2F6y8ls1uplhf.jpg&w=640&q=75`}
                    // src={`${image}`}
                    className="rounded-lg w-full h-full mb-1"
                    width={250}
                    height={250}
                    alt=""
                  />
                )}
                <label>
                  <input
                    type="file"
                    // className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        setFile(files[0]);
                      }
                    }}
                    accept="image/png, image/jpeg, image/jpg"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer block border border-gray-300 rounded-lg p-2 text-center"
                  >
                    Edit
                  </button>
                </label>
              </form>
            </div>
          </div>
          <form onSubmit={handleProfileUpdate} className="grow">
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
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
