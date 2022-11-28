import React from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const TOOLTIP_HEIGHT = 32;
const TOOLTIP_WIDTH = 112;
const TOOLTIP_OFFSET_X = 44;

const ChartContainer = styled.div`
  width: 100%;
  svg {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    position: relative;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #c4c4c4;
    shape-rendering: crispEdges;
  }

  .line {
    stroke: #21825c;
    stroke-width: 1.5px;
    fill: none;
  }

  .lineDots {
    fill: #21825c;
  }

  .hoverTooltip {
    height: 20px;
    width: 20px;
    background: #ffffff;
  }

  .y.axis {
    path.domain {
      display: none;
    }

    .tick:first-of-type {
      line {
        display: none;
      }
    }
  }

  .x.axis {
    path.domain {
      display: none;
    }

    .tick {
      line {
        display: none;
      }
    }
  }

  .tooltip {
    padding: 4px 8px;
    background: #ffffff;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    position: relative;
    height: ${TOOLTIP_HEIGHT}px;
    width: ${TOOLTIP_WIDTH}px;
    display: flex;
    align-items: center;
    justify-content: center;

    .col-left {
      color: #172a3a;
      margin-right: 8px;
    }

    .col-right {
      color: ${(props) => props.color};
      margin-left: 8px;
    }

    .divider {
      color: #c4c4c4;
    }
  }
`;

const Chart = styled.div`
  width: 100%;
`;

const ChartTitle = styled.div`
  padding: 16px;
  font-weight: 600;
  font-size: 18px;
  text-transform: capitalize;
`;

const ChartFooter = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 18px;
`;
class CandleStickChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.chartContainerRef = React.createRef();
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.renderChart();
    }
  }
  renderChart() {
    const { dimensions, data, colors, title, showTooltip, yLabels } = this.props;

    let margin = { top: 20, right: 20, bottom: 10, left: 30 },
      width = (this.chartContainerRef.current.offsetWidth || 1200) - margin.left - margin.right,
      height = ((dimensions && dimensions.height) || 400) - margin.top - margin.bottom;
    if (showTooltip) height -= TOOLTIP_HEIGHT;
    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d.date))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.low), d3.max(data, (d) => d.high)])
      .rangeRound([height - margin.bottom, margin.top]);

    function formatTickYAxis(d) {
      const x = yLabels.find((s) => s.sensor === title);
      return `${d} ${x.label}`;
    }

    function formatTickXAxis(d, index) {
      const formatMinute = d3.timeFormat('%_H:%M'),
        formatHour = d3.timeFormat('%_H'),
        formatDay = d3.timeFormat('%a %_d'),
        formatMonth = d3.timeFormat('%B'),
        formatYear = d3.timeFormat('%Y');

      function multiFormat(date) {
        return (d3.timeHour(date) < date ? formatMinute : d3.timeDay(date) < date ? formatHour : d3.timeMonth(date) < date ? formatDay : d3.timeYear(date) < date ? formatMonth : formatYear)(date);
      }
      return multiFormat(d);
    }
    const xAxis = (g) =>
      g
        .attr('transform', `translate(${margin.left},${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(xScale)
            .tickValues(data.map((d) => d.date))
            .tickFormat((d, i) => formatTickXAxis(d, i))
        )
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('line').attr('stroke-opacity', 1).attr('width', 4).attr('height', 4));

    const yAxis = (svg) =>
      svg
        .attr('transform', `translate(0,0)`)
        .call(
          d3
            .axisRight(yScale)
            .tickSize(width + margin.left + margin.right)
            .tickFormat(formatTickYAxis)
        )
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('line').attr('stroke-opacity', 0.5).attr('stroke-dasharray', '3,5'))
        .call((g) => g.selectAll('.tick text').attr('x', 8).attr('dy', -8));

    //Remove if existing svg
    d3.select(`#chart-${this.props.id}`).select('svg').remove();

    //Create new svg
    const svg = d3
      .select(`#chart-${this.props.id}`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('width', width)
      .attr('transform', `translate(0,${margin.top})`);

    svg.append('g').call(xAxis);

    svg.append('g').call(yAxis);

    const g = svg
      .append('g')
      .attr('stroke-linecap', 'round')
      .attr('stroke', 'black')
      .attr('transform', `translate(${margin.left},0)`)
      .selectAll('g')
      .data(data)
      .join('g')
      .attr('transform', (d) => `translate(${xScale(d.date)},0)`);

    g.append('line')
      .attr('y1', (d) => yScale(d.open))
      .attr('y2', (d) => yScale(d.close))
      .attr('stroke-width', 8) //xScale bandWidth can be used
      .attr('stroke', (d) => (d.open > d.close ? colors.positive : d.close > d.open ? colors.negative : colors.undefined));

    const mouseMove = (d) => {
      const { high } = d;
      const xValue = xScale(high);

      svg.selectAll('.hoverLine').style('display', 'block');
      svg.selectAll('.hoverPoint').style('display', 'block');
      this.setState({ cursorOut: false });

      const closest = data.reduce((prev, curr) => {
        return Math.abs(curr.high - xValue) < Math.abs(prev.high - xValue) ? curr : prev;
      }, data[0]);

      this.setState({
        xOffset: 0,
        yOffset: 0,
        point: closest,
      });

      svg
        .selectAll('.hoverLine')
        .attr('x1', xScale(closest.high))
        .attr('y1', yScale(closest.low))
        .attr('x2', xScale(closest.high))
        .attr('y2', height)
        .attr('stroke', '#172A3A')
        .attr('stroke-opacity', 0.25);

      svg.selectAll('.hoverPoint').attr('cx', xScale(closest.high)).attr('cy', yScale(closest.low)).attr('r', '8').attr('stroke', colors.negative).attr('stroke-width', 3).attr('fill', '#FFFFFF');
    };
    if (showTooltip) {
      svg.on('mousemove', mouseMove);
      svg.on('mouseout', () => {
        svg.selectAll('.hoverLine').style('display', 'none');
        svg.selectAll('.hoverPoint').style('display', 'none');
        this.setState({ cursorOut: true });
      });
    }
    svg.node();
  }

  render() {
    const startDate = this.props.data[0].date.getDate() + ' ' + this.props.data[0].date.toLocaleString('default', { month: 'long' });
    const endDate = this.props.data[this.props.data.length - 1].date.getDate() + ' ' + this.props.data[this.props.data.length - 1].date.toLocaleString('default', { month: 'long' });
    const { xOffset, yOffset, point, cursorOut } = this.state;

    return (
      <Chart>
        <ChartTitle>{this.props.title}</ChartTitle>
        <ChartContainer
          ref={this.chartContainerRef}
          id={`chart-${this.props.id}`}
          colors={this.props.colors}
          title={this.props.title}
          showTooltip={this.props.showTooltip}
          yLabels={this.props.yLabels}
        >
          {this.props.showTooltip && (
            <div className="tooltip" style={{ top: yOffset, left: xOffset - TOOLTIP_OFFSET_X, visibility: !cursorOut && point ? 'visible' : 'visible' }} id={`tooltip-${this.props.id}`}>
              {point && point.x && point.y && (
                <>
                  <span className="col-left">{point.x.toFixed(2)}</span>
                  <span className="divider">|</span>
                  <span className="col-right">{point.y.toFixed(2)}</span>
                </>
              )}
            </div>
          )}
        </ChartContainer>
        <ChartFooter>
          <div>{startDate}</div>
          <div>{endDate}</div>
        </ChartFooter>
      </Chart>
    );
  }
}

export default CandleStickChart;
