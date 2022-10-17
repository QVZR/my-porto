import { Paper, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import styles from "./Contacts.module.scss";
import { IMaskInput } from "react-imask";
import React, { forwardRef, useState, useRef, MutableRefObject } from "react";
import Swal from "sweetalert2";

import emailjs from "emailjs-com";

const SERVICE_ID = "service_cif9ujv";
const TEMPLATE_ID = "template_1vu3d4l";
const USER_ID = "VOupS7cPYKCyAbMyK";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

interface State {
  textmask: string;
}

const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(props, ref) {
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [phone, setPhone] = useState<State>({
    textmask: "",
  });
  const [loading, setLoading] = useState(false);

  const form: MutableRefObject<HTMLFormElement | string> = useRef("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone({
      ...phone,
      [event.target.name]: event.target.value,
    });
  };

  // ===========================================================================
  const submitForm = (e: any) => {
    e.preventDefault();
    setLoading(true);
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, USER_ID).then(
      (result) => {
        console.log(result.text);
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully",
        });
        setLoading(false);
      },
      (error) => {
        console.log(error.text);
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        });
        setLoading(false);
      }
    );
    e.target.reset();
    setName("");
    setText("");
    setPhone({
      textmask: "",
    });
    setEmail("");
  };

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
                      <a href="https://github.com/vithvo" target="_blank" rel="noopener noreferrer">
                        https://github.com/vithvo
                      </a>
                    </li>
                    <li>
                      Telegram:{" "}
                      <a href="https://t.me/vithvoleg" target="_blank" rel="noopener noreferrer">
                        https://t.me/vithvoleg
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={styles.infoMail}>
                <Typography variant="h5">Email me:</Typography>
                <form
                  ref={form as MutableRefObject<HTMLFormElement>}
                  method="post"
                  id="form"
                  onSubmit={submitForm}
                >
                  <div className={styles.formItem}>
                    <div className={styles.formLeft}>
                      <TextField
                        placeholder="Your name"
                        className={styles.mail}
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        name="user_name"
                      />
                      <TextField
                        placeholder="Your email"
                        type="email"
                        className={styles.mail}
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name="user_email"
                      />
                      <TextField
                        placeholder="Your phone number"
                        className={styles.mail}
                        type="tel"
                        value={phone.textmask}
                        onChange={handleChange}
                        id="formatted-text-mask-input"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          inputComponent: TextMaskCustom as any,
                        }}
                        name="textmask"
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
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        name="message"
                      />
                    </div>
                  </div>
                  <button disabled={loading} type="submit">
                    Send
                  </button>
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
