import Image from "next/image";

import { Button } from "@/components/common/Button";

import styles from "./styles.module.scss";

export function News() {
  return (
    <article className={styles.container3}>
      <div className={styles.content}>
        <div>
          <div>NFT&rsquo;s news</div>
          <span>New ElephantX NFT to be lauched!</span>
        </div>
        <Button design="ghost" className={styles.custom_btn}>
          Read more +
        </Button>
      </div>
      <div>
        <Image
          src="/images/eduphant.png"
          alt="Eduphant illustration"
          width={140}
          height={112}
        />
      </div>
    </article>
  );
}
