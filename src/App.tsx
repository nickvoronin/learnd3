import React, { Component } from 'react';
import * as d3 from 'd3';

const width = 650;
const height = 450;
const margin = { top: 20, right: 5 };

export interface IDataItem {
    date: number;
    temp: number;
}

export interface IChartData {
    data: IDataItem[];
}

export interface IBar {
    x: number;
    y: number;
    height: number;
}

export interface IChartState {
    bars: IBar[]
}


const data: IDataItem[] = Array.from(new Array(100)).map(() => ({
    date: 1000 * Math.random(),
    temp: 500 * Math.random(),
}));

class Chart extends Component<IChartData> {
    state: IChartState = {
        bars: [],
    };

    static getDerivedStateFromProps(nextProps: IChartData) {
        const { data } = nextProps;
        if (!data) return {};

        const minX: any = d3.min(data, d => d.date);
        const maxX: any = d3.max(data, d => d.date);
        const xScale = d3.scaleTime()
            .domain([minX, maxX])
            .range([0, width]);

        const minY: any = d3.min(data, d => d.temp);
        const maxY: any = d3.max(data, d => d.temp);
        const yScale = d3.scaleLinear()
            .domain([minY, maxY])
            .range([0, height]);
        const bars = data.map(d => ({
            x: xScale(d.date),
            y: yScale(d.temp),
            height: yScale(d.temp),
        }));
        return { bars }
    }

    render() {
        const { bars } = this.state;
        console.log(bars);
        return (
            <svg width={width} height={height}>
                {bars.map((b, index) => (
                    <rect
                        key={index}
                        x={width - b.x}
                        y={height - b.y}
                        height={b.height}
                        width="50"
                        fill="red"
                    />
                ))}
            </svg>
        );
    }
}

export const App = () => <Chart data={data} />

export default App;
