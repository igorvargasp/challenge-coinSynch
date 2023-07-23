import React, { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Cryptocoins } from "@/services/Cryptocoins";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

interface Props {
  data: Cryptocoins[];
}

function triggerTooltip(chart: ChartJS | null) {
  const tooltip = chart?.tooltip;

  if (!tooltip || tooltip.getActiveElements().length == 0) {
    return;
  }

  if (tooltip.getActiveElements().length > 0) {
    tooltip.setActiveElements([], { x: 0, y: 0 });
  } else {
    const { chartArea } = chart;

    tooltip.setActiveElements(
      [
        {
          datasetIndex: 0,
          index: 2,
        },
        {
          datasetIndex: 1,
          index: 2,
        },
      ],
      {
        x: (chartArea.left + chartArea.right) / 2,
        y: (chartArea.top + chartArea.bottom) / 2,
      }
    );
  }

  chart.update();
}
  export default function App(props: Props) {
    const chartRef = useRef<ChartJS>(null);

    useEffect(() => {
      const chart = chartRef.current;

      triggerTooltip(chart);
    }, []);


    const labels = props.data.map((cryptoObject) => cryptoObject.asset_id);
    

    const data = {
      labels,
      datasets: [
        {
          type: "bar" as const,
          label: "Holddings",
          backgroundColor: "rgb(224, 148, 34)",
          data: props.data.map((amountCrypto) => amountCrypto.amount),
        },
      ],
    };
//@ts-ignore
    return <Chart ref={chartRef} type="bar" data={data} />;
  }
