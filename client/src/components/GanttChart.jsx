import React from "react";
import Chart from "react-google-charts";

const GanttChart = ({ data }) => {
	const chartData = [
		[
			{ type: "string", id: "ID" },
			{ type: "string", id: "Title" },
			{ type: "date", id: "Start" },
			{ type: "date", id: "End" },
		],
		...data.map((item, index) => [
			(index + 1).toString(),
			item.title,
			new Date(item.start),
			new Date(item.end),
		]),
	];

	const options = {
		colors: ['#FF4136', '#FF851B', '#FFDC00', '#2ECC40', '#0074D9', '#B10DC9'],
	};

	const numTasks = chartData.length - 1;
	console.log(numTasks);

		if (numTasks){
			return (
		<div style={{ height: `${numTasks * 70}px`}}>
			<Chart
				chartType="Timeline"
				width="100%"
				height="100%"
				data={chartData}
				options={options}
			/>
		</div>
			);
		} else return  (
			<p className="block mb-2 text-sm text-gray-900 dark:text-white">Задач не назначено</p>
		)
};

export default GanttChart;
