import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const MenuDropDown = () => {
  return (
    <div className={styles.logout}>
        <div>
      <Link href="/">
      <Image
                src="/svgs/dropdown.svg"
                alt="open profile options"
                width={20}
                height={20}
              /> 
             <p>Logout</p>
      </Link>

        </div>
    </div>
  );
};

export default MenuDropDown;
