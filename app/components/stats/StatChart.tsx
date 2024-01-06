import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export function StatChart() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [66, 60.5, 72, 90.5, 71.5, 75],
          area: true,
        },
      ]}
      width={650}
      height={430}
    />
  );
}
