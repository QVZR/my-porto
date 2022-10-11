import { TextField } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

import styles from "./AuthDialog/AuthDialog.module.scss";

interface FormFieldProps {
  name: string;
  holder: string;
}

export const FormField: React.FC<FormFieldProps> = ({ name, holder }) => {
  const { register, formState } = useFormContext();
  return (
    <TextField
      {...register(name)}
      fullWidth
      variant="standard"
      classes={{ root: styles.textarea }}
      placeholder={holder}
      type={name}
      name={name}
      InputProps={{ disableUnderline: true }}
      error={!!formState.errors[name]?.message}
      // helperText={formState.errors[name]?.message}
    />
  );
};
