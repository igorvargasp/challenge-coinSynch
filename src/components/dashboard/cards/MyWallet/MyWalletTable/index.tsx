import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { useState } from "react";

import { Cryptocoins } from "@/services/Cryptocoins";
import { formatDollar } from "@/utils/currency";

import { Button } from "@/components/common/Button";
import { CurrencyChange } from "@/components/common/CurrencyChange";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Tooltip, Grid } from "@nextui-org/react";

import styles from "./styles.module.scss";

interface Props {
  data: Cryptocoins[];
  openTransfer: (crypto: Cryptocoins) => void;
}

export function MyWalletTable(props: Props) {
  const [indexOpenRow, setIndexOpenRow] = useState<number | null>(null);
  const { width } = useWindowSize();
  const isMobile = (width || 0) <= 595;

  function openRowMenu(id: number) {
    setIndexOpenRow((prev) => {
      if (prev === id) return null;
      return id;
    });
  }

  const table = useReactTable({
    data: props.data,
    columns: [
      {
        header: "#",
        cell: (ctx) => <span>{ctx.row.index + 1}</span>,
      },
      {
        header: "Crypto",
        cell: (ctx) => {
          const row = ctx.row.original;
          return (
            <span className={styles.coin_name_symbol}>
              <Image
                src={`https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_32/${row.id_icon}.png`}
                width={32}
                height={32}
                alt={row.name}
              />
              <div>
                <span>{row.name}</span>
                <span>{row.asset_id}</span>
              </div>
            </span>
          );
        },
      },
      {
        header: "Holdings",
        cell: (txt) => {
          const row = txt.row.original;
          return (
            <div className={styles.holding}>
              <span>US$ {formatDollar(Number(row.price_usd))}</span>
              <h2>
                {row.amount} {row.asset_id}
              </h2>
            </div>
          );
        },
      },
      {
        header: "Change",
        cell: (ctx) => (
          <CurrencyChange
            value={Number(ctx.row.original.volume_1day_usd)}
            hasPercent
          />
        ),
      },
      {
        header: isMobile ? "Actions" : "Trade",
        cell: (ctx) => {
          if (isMobile) {
            return (
              <Button design="ghost">
                <Image
                  src="/svgs/chevron-up.svg"
                  width={16}
                  height={16}
                  alt="open or close row menu"
                  onClick={() => openRowMenu(ctx.row.index)}
                  className={styles.open_menu_img}
                  data-open={indexOpenRow == ctx.row.index}
                />
              </Button>
            );
          }
          return (
            <Grid.Container>
              <Grid>
                <Tooltip
                  content={"Trasfer Crypto"}
                  css={{
                    color: "#fff!important",
                    padding: 15,
                    borderRadius: 1,
                    fontFamily: "$font-roboto!important",
                  }}
                  color="warning"
                  hideArrow
                  placement="bottom"
                >
                  <Button
                    type="button"
                    design="ghost"
                    onClick={() => props.openTransfer(ctx.row.original)}
                  >
                    <Image
                      src="/svgs/transfercrypto.svg"
                      width={18}
                      height={18}
                      className={styles.btn_trade}
                      alt={""}
                    />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid.Container>
          );
        },
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  // Here to prevent hydration render issues
  if (width === undefined) {
    return <></>;
  }

  return (
    <table className={styles.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            <td>
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id} className={styles.row_content}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </td>
            <td
              data-visible={row.index == indexOpenRow}
              className={styles.minimenu}
            >
              {row
                .getVisibleCells()
                .filter((cell) => {
                  const header = cell.column.columnDef.header
                    ?.toString()
                    .toLowerCase();

                  return header === "price" || header === "change";
                })
                .map((cell) => (
                  <div className={styles.mini_item} key={cell.id + "_minimenu"}>
                    <span>{cell.column.id}</span>
                    <span>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                  </div>
                ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
