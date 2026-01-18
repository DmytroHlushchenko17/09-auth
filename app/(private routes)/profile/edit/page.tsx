"use client";
import Link from "next/link";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

export default function EditProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    getMe().then((userData) => {
      setUser(userData);
      setUserName(userData.username ?? "");
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateMe({ username });
    router.push("/profile");
  };

  if (!user) {
    return <p>Loading</p>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={handleChange}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <Link href="/profile" className={css.cancelButton}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
