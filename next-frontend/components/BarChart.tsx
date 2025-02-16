"use client";
import React from "react";
import { AxisOptions, Chart } from "react-charts";
import useDemoConfig from "./UseDemoConfig";
import ResizableBox from "./ResizableBox";

export default function BarStacked({ data }: { data: any }) {
  const transformedData = data.map((d: any) => ({
    hour: d.hour,
    screenTime: d.time_spent,
    productiveTime: d.time_spent - parseInt(d.unproductive_time),
    unproductiveTime: parseInt(d.unproductive_time),
  }));

  const chartData = [
    {
      label: "Productive Time",
      data: transformedData.map((d: any) => ({
        primary: d.hour,
        secondary: d.productiveTime,
      })),
    },
    {
      label: "Unproductive Time",
      data: transformedData.map((d: any) => ({
        primary: d.hour,
        secondary: d.unproductiveTime,
      })),
    },
  ];

  const { randomizeData } = useDemoConfig({
    series: chartData.length,
    dataType: "time",
    data: chartData,
    elementType: "bar", // Ensure the chart type is set to "bar"
  });

  const primaryAxis = React.useMemo<
    AxisOptions<(typeof chartData)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary,
      label: "Hour", // Set the label for the primary axis
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof chartData)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
        stacked: true,
        label: "Screen Time", // Set the label for the secondary axis
      },
    ],
    []
  );

  return (
    <>
      <ResizableBox width={"-webkit-fill-available"} height={400}>
        <Chart
          options={{
            data: chartData,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </>
  );
}
