"use client";
import css from "./SignUpPage.module.css";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/clientApi";
import useAuthStore from "@/lib/store/authStore";

export default function SignUpPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElem = e.target as HTMLFormElement;
    const formData = new FormData(formElem);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const data = { email, password };
    const res = await register(data);
    setUser(res.user);
    router.push("/profile");
    formElem.reset();
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
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
            Register
          </button>
        </div>

        {!setUser && <p className={css.error}>Error</p>}
      </form>
    </main>
  );
}
