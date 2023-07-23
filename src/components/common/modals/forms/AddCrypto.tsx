import React, { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";

import { Input } from "../../Input/index";
import { Button } from "@/components/common/Button";
import Image from "next/image";

import { Cryptocoins } from "@/services/Cryptocoins";

import { roboto } from "@/pages/_app"; // Using directly because it is not applying normally
import { appendStyles } from "@/utils/styles";
import styles from "./styles.module.scss";

interface Props {
  assets: Cryptocoins[];
  onClose: (pickCrypt: Cryptocoins, amount: number) => void;
  cryptos: Cryptocoins[];
}

export function AddCrypto(props: Props) {
  const form = useForm();
  const [amount, setAmount] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const onSubmit = useCallback(() => {
    const pickCrypt = props.assets.find(
      (TopCrypto) => TopCrypto.name === selectValue
    );
    if (!pickCrypt) {
      return;
    }
    props.onClose(pickCrypt, parseFloat(amount));
  }, [amount, props.assets, selectValue]);

  const handleChange = (e: any) => {
    setAmount(e.target.value);
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={appendStyles([roboto.className, styles.form])}
    >
      <div className={styles.titleAddCrypto}>
        <h4 className={appendStyles([roboto.className, styles.titleAdd])}>
          <span>AddCrypto</span>
        </h4>
      </div>

      <div className={styles.select}>
        <select
          name="cryptoName"
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          <option value="">Choose</option>
          {props.assets
            .filter(
              (asset) =>
                !props.cryptos.find(
                  (crypto) => asset.asset_id === crypto.asset_id
                )
            )
            .map((cryptoName) => {
              return (
                <>
                  <option value={cryptoName.name} key={cryptoName.name}>
                    <Image
                      src={`https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_32/${cryptoName.id_icon}.png`}
                      width={32}
                      height={32}
                      alt={cryptoName.name}
                    />
                    <div>
                      <Image
                        src={`https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_32/${cryptoName.id_icon}.png`}
                        width={32}
                        height={32}
                        alt={cryptoName.name}
                      />
                      {cryptoName.name} {cryptoName.asset_id}
                    </div>
                  </option>
                </>
              );
            })}
        </select>
      </div>

      <div className={styles.password_group}>
        <Input
          design="ghost"
          type="number"
          placeholder="number"
          required
          value={amount}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" design="primary" className={styles.sign_custom_btn}>
        Add crypto
      </Button>
    </form>
  );
}
