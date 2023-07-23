import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { appendStyles } from "@/utils/styles";
import styles from "./styles.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  design: "filled" | "ghost";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  validationsError?: FieldErrors<FieldValues>;
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { label, design, iconLeft, iconRight, validationsError, ...props },
  ref
) => {
  const messageError = props.name && validationsError?.[props.name]?.message;
  return (
    <div className={appendStyles([styles.wrapper_base, styles[design]])}>
      {label && <label>{label}</label>}
      <div className={styles.input_wrapper}>
        {iconLeft}
        <input ref={ref} {...props} />
        {iconRight}
      </div>
      {messageError && (
        <span className={styles.error_message}>{messageError.toString()}</span>
      )}
    </div>
  );
};

export const Input = forwardRef(InputComponent);
