import { Login } from "@mui/icons-material";
import { Avatar, Button, List, ListItem, ListItemButton, Paper, TextField } from "@mui/material";
import Link from "next/link";

import styles from "./header.module.scss";
import { useRouter } from "next/router";
import { ChangeEventHandler, useEffect, useState } from "react";
import { AuthDialog } from "../AuthDialog";
import { useAppSelector } from "../../redux/hooks";
import { logout, selectUserData } from "../../redux/slices/user";
import { Api } from "../../utils/api";
import { PostProps } from "../../utils/api/types";
import { useDispatch } from "react-redux";

const menu = [
  { text: "about", path: "/" },
  { text: "works", path: "/works" },
  { text: "blog", path: "/blog" },
  { text: "Contacts", path: "/contacts" },
];

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useAppSelector(selectUserData);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [exit, setExit] = useState(false);
  const [openBurger, setOpenBurger] = useState(true);

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

  const onClickLogout = () => {
    if (window.confirm("Do you really want to leave?")) {
      const CookiesDelete = () => {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
          document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }
      };
      CookiesDelete();
      setExit(false);
      router.push("/");
      dispatch(logout());
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => setOpenBurger(window.innerHeight < 740));
    return window.removeEventListener("resize", () => {});
  }, []);

  return (
    <div className={openBurger ? styles.header : `${styles.header} ${styles.headerVh}`}>
      <button
        onClick={() => {
          setOpenBurger(!openBurger);
        }}
        className={openBurger ? styles.burger : `${styles.burger} ${styles.activeBurger}`}
      >
        <span></span>
      </button>
      <div
        className={
          openBurger ? styles.headerInner : `${styles.headerInner} ${styles.headerInnerOpen}`
        }
      >
        <div className={styles.left}>
          {menu.slice(0, 3).map((obj, i) => (
            <div
              key={i}
              className={obj.path === router.asPath ? `${styles.active} ${styles.nav}` : styles.nav}
            >
              <Link href={obj.path}>
                <a>
                  <button
                    onClick={() => {
                      setOpenBurger(!openBurger);
                    }}
                  >
                    {obj.text}
                  </button>
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
          {(router.asPath === "/blog" || router.asPath.includes("post")) && (
            <div className={`${styles.nav} ${styles.navSearch}`}>
              <TextField
                className={styles.search}
                placeholder="Search..."
                id="outlined-basic"
                variant="outlined"
                onChange={handleChangeInput}
                value={searchValue}
                type="text"
              />

              {posts.length > 0 && searchValue && (
                <Paper className={styles.searchPopup}>
                  {posts.map((obj) => (
                    <Link key={obj.id} href={`/posts/${obj.id}`}>
                      <a>
                        <List>
                          <ListItem>
                            <ListItemButton
                              onClick={() => {
                                setSearchValue("");
                                setPosts([]);
                              }}
                              className={styles.searchPopupbutton}
                            >
                              {obj.title}
                            </ListItemButton>
                          </ListItem>
                        </List>
                      </a>
                    </Link>
                  ))}
                </Paper>
              )}
            </div>
          )}
          {menu.slice(3, 4).map((obj, i) => (
            <div
              key={i}
              className={obj.path === router.asPath ? `${styles.active} ${styles.nav}` : styles.nav}
            >
              <Link href={obj.path}>
                <a>
                  <button
                    onClick={() => {
                      setOpenBurger(!openBurger);
                    }}
                  >
                    {obj.text}
                  </button>
                </a>
              </Link>
            </div>
          ))}
          {userData ? (
            <>
              <Avatar
                onClick={() => setExit(!exit)}
                className={styles.headerAvatar}
                variant="rounded"
                alt="Avatar"
              >
                {userData?.fullName.slice(0, 1).toUpperCase()}
              </Avatar>
              {exit && (
                <Button
                  onClick={() => {
                    onClickLogout();
                  }}
                  className={styles.exitButton}
                  variant="contained"
                >
                  logout
                </Button>
              )}
            </>
          ) : (
            <Login onClick={handleClickOpen} className={styles.login} />
          )}
        </div>
      </div>
      <>
        <AuthDialog onClose={handleClose} open={open} />
      </>
      <>
        {openBurger &&
          menu
            .filter((obj) => obj.path === router.asPath)
            .map((obj, i) => (
              <div key={i} className={`${styles.nav} ${styles.navMobile}`}>
                <Link href={obj.path}>
                  <a>
                    <button
                      onClick={() => {
                        setOpenBurger(!openBurger);
                      }}
                    >
                      {obj.text}
                    </button>
                  </a>
                </Link>
              </div>
            ))}
        {openBurger && (router.asPath === "/blog" || router.asPath.includes("post")) && (
          <div className={`${styles.nav} ${styles.navSearch} ${styles.navSearchMobile}`}>
            <TextField
              className={styles.search}
              placeholder="Search..."
              id="outlined-basic"
              variant="outlined"
              onChange={handleChangeInput}
              value={searchValue}
              type="text"
            />

            {posts.length > 0 && searchValue && (
              <Paper className={styles.searchPopup}>
                {posts.map((obj) => (
                  <Link key={obj.id} href={`/posts/${obj.id}`}>
                    <a>
                      <List>
                        <ListItem>
                          <ListItemButton
                            onClick={() => {
                              setSearchValue("");
                              setPosts([]);
                            }}
                            className={styles.searchPopupbutton}
                          >
                            {obj.title}
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </a>
                  </Link>
                ))}
              </Paper>
            )}
          </div>
        )}
      </>
    </div>
  );
};
