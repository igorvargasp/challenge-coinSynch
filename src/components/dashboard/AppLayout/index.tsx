"use client";
import { ReactNode, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Tooltip, Button, Grid, Link } from "@nextui-org/react";
import MenuDropDown from "./Logout";
import { Roboto } from "next/font/google";
import { appendStyles } from "@/utils/styles";
import { roboto } from "@/pages/_app";

interface Props {
  children: ReactNode;
}

export function AppLayout(props: Props) {
  const [dropIsOpen, setDropIsDown] = useState(false);

  function Dropdown() {
    setDropIsDown(!dropIsOpen);
  }

  return (
    <div className={styles.page_bg}>
      <div className={styles.nav_bg}>
        <nav className={styles.wrapper}>
          <div className={styles.left_wrapper}>
            <Image
              src="/images/logo.png"
              alt="CoinSynch logo"
              width={124}
              height={21}
            />
          </div>

          <div className={styles.right_wrapper}>
            <Image
              src="https://api.lorem.space/image/face?w=32&h=32"
              alt="Your image"
              width={32}
              height={32}
              className={styles.user_img}
            />
            <div>
              <span>Aulus</span>

              <Image
                src="/svgs/chevron.svg"
                alt="open profile options"
                width={13}
                height={13}
                onClick={Dropdown}
                className={styles.clickImage}
              />
              {!dropIsOpen ? null : <MenuDropDown />}
            </div>
          </div>
        </nav>
      </div>

      <div className={styles.main_row}>
        <div className={styles.left_column}>
          <Grid.Container gap={2}>
            <Grid >
              <Tooltip
                content="Lorem ipsum"
                 css={{color:"#fff!important", padding:15,borderRadius:1,fontFamily:"$font-roboto!important"}}
                color="warning"
                placement="right"
              >
                <Link >
                  <Image
                    src="/svgs/wallet.svg"
                    width={32}
                    height={32}
                    alt="Wallet icon"
                  />
                </Link>
              </Tooltip>
            </Grid>
            <Grid>
              <Tooltip
                content="Lorem ipsum"
                contentColor="invert"
                css={{color:"#fff!important", padding:15,borderRadius:1,fontFamily:"Roboto!important"}}
                color="warning"
                placement="right"
              >
                <Link>
                  <Image
                    src="/svgs/bitcoin.svg"
                    width={32}
                    height={32}
                    alt="Bitcoin icon"
                  />
                </Link>
              </Tooltip>
            </Grid>
            <Grid>
              <Tooltip
                content="Lorem ipsum"
                contentColor="invert"
                css={{color:"#fff!important", padding:15,borderRadius:1,fontFamily:"Roboto!important"}}
                color="warning"
                placement="right"
              >
                <Link>
                  <Image
                    src="/svgs/ether.svg"
                    width={32}
                    height={32}
                    alt="Ether icon"
                  />
                </Link>
              </Tooltip>
            </Grid>
            <Grid>
              <Tooltip
                content="Lorem ipsum"
                contentColor="invert"
                css={{color:"#fff!important", padding:15,borderRadius:1,fontFamily:"Roboto!important"}}
                color="warning"
                placement="right"
              >
                <Link>
                  <Image
                    src="/svgs/chart.svg"
                    width={32}
                    height={32}
                    alt="Chart icon"
                  />
                </Link>
              </Tooltip>
            </Grid>
          </Grid.Container>
        </div>

        <div className={styles.main_wrapper}>{props.children}</div>
      </div>

      <footer className={styles.footer}>
        <p>Copyright © 2022 - All rights reserved</p>
      </footer>
    </div>
  );
}
