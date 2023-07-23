import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { Loading } from "@nextui-org/react";

import styles from "./styles.module.scss";

import { sendEmail } from "@/api/pickcrypt";

export function ContactForm() {
  const form = useForm();
  const [stateButton, setStateButton] = useState(false);

  const onSubmit = useCallback(async () => {
    setStateButton(true);
    const status = await sendEmail();
    setStateButton(false)
    if(!status){return ;}
    form.reset()
  }, []);

  return (
    <section className={styles.background}>
      <div className={styles.content}>
        <section>
          <h4>Lorem ipsum</h4>
          <h2>Lorem ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor
          </p>
        </section>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Input
            label="Email"
            placeholder="Email"
            design="filled"
            {...form.register("email")}
            disabled={stateButton}
          />

          <Button type="submit" disabled={stateButton} design="primary">
            {stateButton ? <Loading color="primary" type="default" /> : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
}
