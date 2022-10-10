import { Paper, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import styles from "./Contacts.module.scss";
import { IMaskInput } from "react-imask";
import React, { forwardRef, useState } from "react";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

interface State {
  textmask: string;
}

const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(props, ref) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");

  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="# (000) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      // inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});
const Contacts: NextPage = () => {
  const [values, setValues] = React.useState<State>({
    textmask: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  // ===========================================================================
  // const onSubmit = (e: any) => {
  //   e.preventDefault();
  //   let formData = new FormData();

  //   formData.append("name", name);
  //   formData.append("email", email);
  //   formData.append("email", phone);
  //   formData.append("text", text);
  //   fetch("send.php", {
  //     method: "POST",
  //     body: formData,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   }).then((response) => {
  //     response.json().then((data) => {
  //       console.log("Successful" + data);
  //     });
  //   });
  // };

  // ==========================================================================

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
                <form encType="multipart/form-data" method="post" id="form">
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
                        type="email"
                        className={styles.mail}
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        placeholder="Your phone number"
                        className={styles.mail}
                        type="tel"
                        value={values.textmask}
                        onChange={handleChange}
                        name="textmask"
                        id="formatted-text-mask-input"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          inputComponent: TextMaskCustom as any,
                        }}
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
