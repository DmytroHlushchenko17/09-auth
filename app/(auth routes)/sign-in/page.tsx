"use client";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/clientApi";
import useAuthStore from "@/lib/store/authStore";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElem = e.target as HTMLFormElement;
    const formData = new FormData(formElem);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const data = { email, password };

    try {
      setError(null);
      const res = await login(data);
      setUser(res.user);
      router.push("/profile");
      formElem.reset();
    } catch {
      setError("Data entry error ! ! !");
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
