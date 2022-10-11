import { Login } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Link from "next/link";

import styles from "./header.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import { AuthDialog } from "../AuthDialog";

const menu = [
  { text: "about", path: "/" },
  { text: "works", path: "/works" },
  { text: "blog", path: "/blog" },
  { text: "Contacts", path: "/contacts" },
];

export const Header: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
          <img src="img/logo.svg" alt="Logo" />
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
        <Login onClick={handleClickOpen} className={styles.login} />
        <AuthDialog onClose={handleClose} open={open} />
      </div>
    </div>
  );
};
