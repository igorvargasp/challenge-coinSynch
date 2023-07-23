import Image from "next/image";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Cryptocoins } from "@/services/Cryptocoins";
import { formatDollar } from "@/utils/currency";
import { Button } from "../../../common/Button";
import { CurrencyChange } from "../../../common/CurrencyChange";
import { useWindowSize } from "@/hooks/useWindowSize";

import styles from "./styles.module.scss";

interface Props {
  topcoins: Cryptocoins[];
}

export function TopCryptoTable(props: Props) {
  const [indexOpenRow, setIndexOpenRow] = useState<number | null>(null);
  const { width } = useWindowSize();
  const isMobile = (width || 0) <= 650;

  function openRowMenu(id: number) {
    setIndexOpenRow((prev) => {
      if (prev === id) return null;
      return id;
    });
  }

  const table = useReactTable({
    data: props.topcoins,
    columns: [
      {
        header: "#",
        cell: (ctx) => <span>{ctx.row.index + 1}</span>,
      },
      {
        header: "Crypto",
        cell: (ctx) => {
          const row = ctx.row.original;
          const replaceHiffen = row && row.id_icon ? row.id_icon.toLowerCase().replace(/-/g, "") : '';
          return (
            <span className={styles.coin_name_symbol}>
              <Image
                src={`https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_32/${replaceHiffen}.png`}
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
        header: "Price",
        accessorFn: (row) => formatDollar(Number(row.price_usd), true),
      },
      {
        header: "Change",
        cell: (ctx) => (
          <CurrencyChange
            //  value={Number(((ctx.row.original.volume_1day_usd.toString).split('')).slice(4))}
            value={ctx.row.original.volume_1day_usd}
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
            <Button type="button" design="primary" className={styles.buy_btn}>
              Buy
            </Button>
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
