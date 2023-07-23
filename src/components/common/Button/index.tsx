import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { appendStyles } from "@/utils/styles";

import styles from "./styles.module.scss";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  href?: string;
  design: "primary" | "ghost";
  children: ReactNode;
}

export function Button(props: Props) {
  if (props.href) {
    return (
      <Link
        {...props}
        href={props.href}
        className={appendStyles([styles.base, styles[props.design]])}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      {...props}
      type={props.type || "button"}
      className={appendStyles([
        styles.base,
        styles[props.design],
        props.className,
      ])}
    >
      {props.children}
    </button>
  );
}
