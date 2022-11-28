import React from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const total = 20;
const data = { a: 10, b: 5, c: 2 };
const colors = ['#98ABC5', '#833DF2', '#4AE0E6'];

const ChartContainer = styled.div``;

const INNER_RADIUS = 75;
const CORNER_RADIUS = 2;
const PAD_ANGLE = 0.02;

class DonutChart extends React.Component {
  state = { angles: null };

  resolveAngles = async () => {
    const keys = Object.keys(data);
    const angles = {};
    let startAngle = 0,
      endAngle = 0;
    keys.forEach((key, i) => {
      startAngle = i === 0 ? 0 : startAngle + (data[keys[i - 1]] / total) * 2 * Math.PI;
      endAngle = endAngle + (data[key] / total) * 2 * Math.PI;
      angles[key] = { startAngle, endAngle };
    });

    await this.setState({ angles });
  };

  async componentDidMount() {
    await this.resolveAngles();
    const { angles } = this.state;

    const width = 272,
      height = 272,
      margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3
      .select(`#chart-${this.props.id}`)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const color = d3.scaleOrdinal().domain(Object.keys(data)).range(colors);

    // Compute the position of each group on the pie:
    const pie = d3.pie().value(function (d) {
      return d.value;
    });
    const data_ready = pie(Object.keys(data).map((key) => ({ key, value: data[key] })));
    svg.append('text').text('75%').attr('text-anchor', 'middle').attr('style', 'font-size: 48px; font-weight: bold;').attr('dy', 10);

    svg.append('text').text('progress').attr('text-anchor', 'middle').style('font-size', 12).style('font-family', 'Poppins').style('color', '#728CA1').attr('dy', 30);

    svg
      .selectAll('chart')
      .data(data_ready)
      .enter()
      .append('path')
      .attr(
        'd',
        d3
          .arc()
          .innerRadius(INNER_RADIUS)
          .outerRadius(radius)
          .cornerRadius(CORNER_RADIUS)
          .startAngle(0)
          .endAngle(2 * Math.PI)
          .padAngle(PAD_ANGLE)
      )
      .attr('fill', '#F9F9F9');

    svg
      .selectAll('chart')
      .data(data_ready)
      .enter()
      .append('path')
      .attr(
        'd',
        d3
          .arc()
          .innerRadius(INNER_RADIUS)
          .outerRadius(radius)
          .cornerRadius(CORNER_RADIUS)
          .startAngle((d) => angles[d.data.key].startAngle)
          .endAngle((d) => angles[d.data.key].endAngle)
          .padAngle(PAD_ANGLE)
      )
      .attr('fill', function (d) {
        return color(d.data.key);
      });
  }
  render() {
    return <ChartContainer id={`chart-${this.props.id}`} />;
  }
}

export default DonutChart;
