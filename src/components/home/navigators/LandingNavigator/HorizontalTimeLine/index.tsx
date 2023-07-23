import { useState } from "react";
import { Cryptocoins } from "@/services/Cryptocoins";

import { formatDollar } from "@/utils/currency";
import { appendStyles } from "@/utils/styles";

import styles from "./styles.module.scss";

interface Props {
  chains: Cryptocoins[];
}

export function HorizontalTimeline(props: Props) {
  const [cryptos, setCryptos] = useState(props.chains);
  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.slider}>
          {cryptos?.map((crypto) => (
            <TimelineElement key={crypto.asset_id} data={crypto} />
          ))}
          {cryptos?.map((crypto) => (
            <TimelineElement key={crypto.asset_id + ":)"} data={crypto} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ElementProps {
  data: Cryptocoins;
}

function TimelineElement(props: ElementProps) {
  const formattedChange = formatDollar(Number(props.data.volume_1hrs_usd));
  const isPositive = Number(formattedChange) <= Number(0);

  return (
    <div key={props.data.asset_id} className={styles.element}>
      <span className={styles.symbol}>{props.data.asset_id}</span>

      <span className={styles.price}>
        R$ {formatDollar(props.data.price_usd)}
      </span>
      <span
        className={appendStyles([
          styles.change,
          isPositive ? styles.positive : styles.negative,
        ])}
      >
        {isPositive ? `+${formattedChange}` : formattedChange}
      </span>
    </div>
  );
}
