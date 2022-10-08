import { Paper, Typography } from "@mui/material";
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d142690.51702815157!2d92.72565206519751!3d56.026650093239624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5cd7afc9a1ff37e3%3A0xd597e1468fd647ff!2z0JrRgNCw0YHQvdC-0Y_RgNGB0LosINCa0YDQsNGB0L3QvtGP0YDRgdC60LjQuSDQutGA0LDQuQ!5e0!3m2!1sru!2sru!4v1665210092959!5m2!1sru!2sru"
              width="600"
              height="450"
              style={{ border: 2 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className={styles.info}></div>
        </Paper>
      </div>
    </MainLayout>
  );
};

export default Contacts;
