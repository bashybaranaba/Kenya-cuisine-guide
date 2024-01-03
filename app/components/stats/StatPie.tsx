import { PieChart } from "@mui/x-charts/PieChart";

export function StatPie() {
  return (
    <PieChart
      data={[
        { x: "Blood glucose", y: 12 },
        { x: "Current weight", y: 34 },
        { x: "Blood pressure", y: 56 },
      ]}
      width={600}
      height={400}
      series={[]}
    />
  );
}
