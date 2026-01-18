import Link from "next/link";
import css from "./AuthNavigation.module.css";
import useAuthStore from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

interface Props {
  user: User | null;
}

export default function AuthNavigation({ user }: Props) {
  const isAuth = useAuthStore((s) => s.isAuth);
  const clearUserInfo = useAuthStore((s) => s.clearUser);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearUserInfo();
    router.push("/sign-in");
  };
  return (
    <>
      {isAuth && (
        <li className={css.navigationItem}>
          <Link href="/profile" prefetch={false} className={css.navigationLink}>
            Profile
          </Link>
        </li>
      )}
      {isAuth && (
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{user?.email || user?.username}</p>
          <button className={css.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </li>
      )}
      {!isAuth && (
        <li className={css.navigationItem}>
          <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
            Login
          </Link>
        </li>
      )}
      {!isAuth && (
        <li className={css.navigationItem}>
          <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
            Sign up
          </Link>
        </li>
      )}
    </>
  );
}
