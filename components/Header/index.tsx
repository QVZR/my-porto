import { Login } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./header.module.scss";

export const Header: React.FC = () => {
  const [active, setActive] = useState(false);

  const onClickNav = () => {
    setActive(true);
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div onClick={onClickNav} className={`${styles.nav} ${active && styles.active}`}>
          <Link href="/">
            <a>
              <button>about</button>
            </a>
          </Link>
        </div>
        <div className={`${styles.nav}`}>
          <Link href="/works">
            <a>
              <button>works</button>
            </a>
          </Link>
        </div>
        <div className={`${styles.nav}`}>
          <button>blog</button>
        </div>
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
        <div className={`${styles.nav}`}>
          <Link href="/contacts">
            <a>
              <button>Contacts</button>
            </a>
          </Link>
        </div>
        <Login className={styles.login} />
      </div>
    </div>
  );
};
