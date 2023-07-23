import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";

import { Input } from "../../Input/index";
import { Button } from "@/components/common/Button";
import { useWindowSize } from "@/hooks/useWindowSize";

import { appendStyles } from "@/utils/styles";
import { roboto } from "@/pages/_app"; // Is not applying normally
import styles from "./styles.module.scss";

interface Props {
  onNeedAccount: () => void;
}

export function SignInForm(props: Props) {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const form = useForm();
  const router = useRouter();
  const { width, height } = useWindowSize();
  const isMobile = (width || 0) <= 320;
  const dontHave = "Don’t have an account?";

  function togglePassVisibility() {
    setIsPassVisible((prev) => !prev);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data, event) => {
    router.push("/dashboard");
  };

  return (
    <form
      className={appendStyles([roboto.className, styles.form])}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <h4 className={styles.title}>
        Sign in to{" "}
        <span>
          <span>Coin</span>Synch
        </span>
      </h4>
      <Input
        design="ghost"
        placeholder="Email"
        type="email"
        required
        {...form.register("email")}
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
      <div className={styles.password_group}>
        <Input
          design="ghost"
          placeholder="Password"
          type={!isPassVisible ? "password" : "text"}
          required
          {...form.register("password")}
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
        <Button design="ghost" className={styles.forgot_pass_btn}>
          Forgot password?
        </Button>
      </div>
      <Button type="submit" design="primary" className={styles.sign_custom_btn}>
        Sign in
      </Button>
      <Button
        design="ghost"
        className={styles.dont_have_an_account_btn}
        onClick={props.onNeedAccount}
      >
        {!isMobile ? dontHave : undefined}
        <span>
          Sign up to <span>Coin</span>
          <span>Synch</span>
        </span>
      </Button>
    </form>
  );
}
