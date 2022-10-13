import { Login } from "@mui/icons-material";
import { Avatar, TextField } from "@mui/material";
import Link from "next/link";

import styles from "./header.module.scss";
import { useRouter } from "next/router";
import { ChangeEventHandler, useEffect, useState } from "react";
import { AuthDialog } from "../AuthDialog";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import { Api } from "../../utils/api";
import { PostProps } from "../../utils/api/types";

const menu = [
  { text: "about", path: "/" },
  { text: "works", path: "/works" },
  { text: "blog", path: "/blog" },
  { text: "Contacts", path: "/contacts" },
];

export const Header: React.FC = () => {
  const userData = useAppSelector(selectUserData);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open && userData) {
      setOpen(false);
    }
  }, [open, userData]);

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setSearchValue(e.target.value);
    try {
      const { items } = await Api().post.search({ title: e.target.value });
      setPosts(items);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        {menu.slice(0, 3).map((obj, i) => (
          <div
            key={i}
            className={obj.path === router.asPath ? `${styles.active} ${styles.nav}` : styles.nav}
          >
            <Link href={obj.path}>
              <a>
                <button>{obj.text}</button>
              </a>
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.center}>
        <div className={styles.logo}>
          <img src="/img/logo.svg" alt="Logo" />
        </div>
      </div>
      <div className={styles.right}>
        <div className={`${styles.nav} ${styles.navSearch}`}>
          <TextField
            placeholder="Search..."
            className={styles.search}
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        {menu.slice(3, 4).map((obj, i) => (
          <div
            key={i}
            className={obj.path === router.asPath ? `${styles.active} ${styles.nav}` : styles.nav}
          >
            <Link href={obj.path}>
              <a>
                <button>{obj.text}</button>
              </a>
            </Link>
          </div>
        ))}
        {userData ? (
          <Avatar className={styles.headerAvatar} variant="rounded" alt="Avatar">
            {userData.fullName.slice(0, 1)}
          </Avatar>
        ) : (
          <Login onClick={handleClickOpen} className={styles.login} />
        )}
        <AuthDialog onClose={handleClose} open={open} />
      </div>
    </div>
  );
};
