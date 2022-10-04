import { Login } from "@mui/icons-material";
import { TextField } from "@mui/material";
import styles from "./header.module.scss";

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={`${styles.nav} ${styles.navLeft} ${styles.delay3}`}>
          <button>about me</button>
        </div>
        <div className={`${styles.nav} ${styles.navLeft} ${styles.delay2}`}>
          <button>works</button>
        </div>
        <div className={`${styles.nav} ${styles.navLeft} ${styles.delay1}`}>
          <button>blog</button>
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.logo}>
          <img src="img/logo.svg" alt="Logo" />
        </div>
      </div>
      <div className={styles.right}>
        <div className={`${styles.nav} ${styles.delay1} ${styles.navSearch}`}>
          <TextField
            placeholder="Search..."
            className={styles.search}
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        <div className={`${styles.nav} ${styles.delay2}`}>
          <button>Contacts</button>
        </div>
        <Login className={styles.login} />
      </div>
    </div>
  );
};
