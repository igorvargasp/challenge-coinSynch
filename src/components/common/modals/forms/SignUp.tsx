import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { roboto } from "@/pages/_app"; // Using directly because it is not applying normally
import { Input } from "../../Input";
import { Button } from "../../Button";
import { signUpSchema } from "./validation";

import { appendStyles } from "@/utils/styles";
import styles from "./styles.module.scss";

interface Props {
  onAlreadyHaveAccount: () => void;
}

export function SignUpForm(props: Props) {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();

  function togglePassVisibility() {
    setIsPassVisible((prev) => !prev);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data, event) => {
    console.log("submit");
  };

  const onError: SubmitErrorHandler<FieldValues> = (errors, event) => {
    console.log("errors");
  };

  console.log(errors);

  return (
    <form
      className={appendStyles([roboto.className, styles.form])}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4 className={styles.title}>
        Sign up to{" "}
        <span>
          <span>Coin</span>Synch
        </span>
      </h4>
      <Input
        design="ghost"
        placeholder="Name"
        {...register("name")}
        validationsError={errors}
        iconLeft={
          <Image
            src="/svgs/user.svg"
            width={16}
            height={16}
            alt="email icon"
            loading="lazy"
          />
        }
      />
      <Input
        design="ghost"
        placeholder="Email"
        type="email"
        {...register("email")}
        validationsError={errors}
        iconLeft={
          <Image
            src="/svgs/mail.svg"
            width={16}
            height={16}
            alt="email icon"
            loading="lazy"
          />
        }
      />

      <Input
        design="ghost"
        placeholder="Password"
        type={!isPassVisible ? "password" : "text"}
        {...register("password")}
        validationsError={errors}
        iconLeft={
          <Image
            src="/svgs/lock.svg"
            width={16}
            height={16}
            alt="email icon"
            loading="lazy"
          />
        }
        iconRight={
          <Button design="ghost" onClick={togglePassVisibility}>
            <Image
              src={!isPassVisible ? "/svgs/eye.svg" : "/svgs/eye-not.svg"}
              width={16}
              height={16}
              alt="eye icon"
              loading="lazy"
            />
          </Button>
        }
      />

      <Input
        design="ghost"
        placeholder="Confirm password"
        type={!isPassVisible ? "password" : "text"}
        {...register("confirmPassword")}
        validationsError={errors}
        iconLeft={
          <Image
            src="/svgs/lock.svg"
            width={16}
            height={16}
            alt="email icon"
            loading="lazy"
          />
        }
        iconRight={
          <Button design="ghost" onClick={togglePassVisibility}>
            <Image
              src={!isPassVisible ? "/svgs/eye.svg" : "/svgs/eye-not.svg"}
              width={16}
              height={16}
              alt="eye icon"
              loading="lazy"
            />
          </Button>
        }
      />

      {/** TODO: Check btn */}

      <Button type="submit" design="primary" className={styles.sign_custom_btn}>
        Sign Up
      </Button>
      <Button
        design="ghost"
        className={styles.dont_have_an_account_btn}
        onClick={props.onAlreadyHaveAccount}
      >
        Already have and account?
        <span>
          Sign in to <span>Coin</span>
          <span>Synch</span>
        </span>
      </Button>
    </form>
  );
}
