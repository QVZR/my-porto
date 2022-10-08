import { Paper, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import styles from "./Contacts.module.scss";

const Contacts: NextPage = () => {
  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <Paper className={styles.contacts}>
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d180313.31512396614!2d92.70651700786206!3d56.02748487923338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5cd7afc9a1ff37e3%3A0xd597e1468fd647ff!2z0JrRgNCw0YHQvdC-0Y_RgNGB0LosINCa0YDQsNGB0L3QvtGP0YDRgdC60LjQuSDQutGA0LDQuQ!5e1!3m2!1sru!2sru!4v1665227669083!5m2!1sru!2sru"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className={styles.info}>
              <div className={styles.infoText}>
                <div className={styles.adress}>
                  <Typography variant="h5">Location:</Typography>
                  <p>Russian Federation, Krasnoyarsk Region, Krasnoyarsk</p>
                </div>
                <div className={styles.social}>
                  <Typography variant="h5">Social:</Typography>

                  <ul>
                    <li>
                      GitHub:{" "}
                      <a href="https://github.com/vithvo" target="_blank">
                        https://github.com/vithvo
                      </a>
                    </li>
                    <li>
                      Telegram:{" "}
                      <a href="https://t.me/vithvoleg" target="_blank">
                        https://t.me/vithvoleg
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={styles.infoMail}>
                <Typography variant="h5">Email me:</Typography>
                <form action="mailto:vithvowork@gmail.com" encType="text/plain">
                  <div className={styles.formItem}>
                    <div className={styles.formLeft}>
                      <TextField
                        placeholder="Your name"
                        className={styles.mail}
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        placeholder="Your email"
                        className={styles.mail}
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        placeholder="Your phone number"
                        className={styles.mail}
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                    <div className={styles.formRight}>
                      {" "}
                      <TextField
                        placeholder="Enter your text"
                        className={styles.mail}
                        id="outlined-basic"
                        variant="outlined"
                        rows={5}
                        multiline
                        fullWidth
                      />
                    </div>
                  </div>
                  <button>Send</button>
                </form>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </MainLayout>
  );
};

export default Contacts;
