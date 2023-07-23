import React from "react";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/common/Button";
import { Input } from "../../Input";

import { Cryptocoins } from "@/services/Cryptocoins";

import styles from "./styles.module.scss";
import { appendStyles } from "@/utils/styles";
import { roboto } from "@/pages/_app";

interface Props {
  assets: Cryptocoins[];
  onClose: (Cryptocoins: Cryptocoins) => void;
  cryptos: Cryptocoins[];
  crypto: Cryptocoins | void;
}

export function TransferInOut(props: Props) {
  const [amount, setAmount] = useState("");
  const [selectValue, setSelectValue] = useState("Transfer In");

  const handleChange = (e: any) => {
    setAmount(e.target.value);
  };

  const somarAmount = () => {
    if (!props.crypto?.amount) {
      return;
    }
    const newAmount = { ...props.crypto } as Cryptocoins;
    if (selectValue === "Transfer In") {
      const somarAmount = props.crypto?.amount + parseFloat(amount);
      newAmount.amount = somarAmount;
    } else {
      const subtrairAmount = props.crypto?.amount - parseFloat(amount);
      newAmount.amount = subtrairAmount;
    }
    props.onClose(newAmount);
  };

  return (
    <form
      className={appendStyles([roboto.className, styles.form])}
      id="formulario"
    >
      <div className={styles.titlemodal}>
        <span>Transfer Crypto</span>
      </div>
      <div className={styles.boxmodal}>
        <div className={styles.headerTransferInOut}>
          <h4 className={appendStyles([roboto.className, styles.titleAddOut])}>
            <span className={styles.youAreTransfering}>
              You are transfering:{" "}
            </span>
            <Image
              src={`https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_32/${props.crypto?.id_icon}.png`}
              alt={""}
              width={23}
              height={23}
            />

            <span>
              {props.crypto?.name}{" "}
              <span className={styles.nameCryptoTransfer}>
                {props.crypto?.asset_id}
              </span>{" "}
            </span>
          </h4>
        </div>
        <div className={styles.nametransfein}>
          <span className={styles.nameCryptoTransfer}>Transfer</span>
        </div>
        <div className={styles.select}>
          <select
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <optgroup>
              <option>Transfer In</option>
              <option>Transfer Out</option>
            </optgroup>
          </select>
        </div>
        <div className={styles.nametransfein}>
          <span className={styles.transferin}>Quantity</span>
        </div>
        <Input
          design="ghost"
          type="number"
          required
          value={amount}
          onChange={handleChange}
        />
      </div>
      <Button
        type="submit"
        design="primary"
        className={styles.sign_custom_btn}
        onClick={somarAmount}
      >
        Transfer coin
      </Button>
    </form>
  );
}
