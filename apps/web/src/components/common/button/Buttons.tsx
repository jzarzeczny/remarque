import Link from "next/link";
import { FC } from "react";
import styles from "./Buttons.module.scss";
import clsx from "clsx";

interface ButtonPropsBase {
  type: "button" | "anchor";
  style: "primary" | "secondary";
  size: "large" | "small";
  text: string;
}

interface ButtonPropsButton extends ButtonPropsBase {
  type: "button";
  isForm: boolean;
  href?: false;
}

interface ButtonPropsAnchor extends ButtonPropsBase {
  type: "anchor";
  isForm?: false;
  href: string;
}

type ButtonProps = ButtonPropsButton | ButtonPropsAnchor;

export const Button = ({
  type,
  size,
  style,
  text,
  isForm,
  href,
}: ButtonProps) => {
  if (type === "anchor") {
    return (
      <Link className={clsx(styles[`${style}`], styles[`${size}`])} href={href}>
        {text}
      </Link>
    );
  }
  return (
    <button
      className={clsx(styles[`${style}`], styles[`${size}`])}
      type={isForm ? "submit" : "button"}
    >
      {text}
    </button>
  );
};
