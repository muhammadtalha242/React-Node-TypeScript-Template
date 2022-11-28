import React from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import * as shape from 'd3-shape';

const TOOLTIP_HEIGHT = 32;
const TOOLTIP_WIDTH = 112;
const TOOLTIP_OFFSET_X = 44;

const ChartContainer = styled.div`
  svg {
    background: ${(props) => props.color}33;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    position: relative;
    bottom: 2px;
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

class StackedAreaChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.chartContainerRef = React.createRef();
  }
  componentDidMount() {
    const { dimensions, color, id, showTooltip, data: dataset } = this.props;
    // Set the dimensions of the chart
    let margin = { top: 20, right: 12, bottom: 25, left: 12 },
      width = (this.chartContainerRef.current.offsetWidth || 240) - margin.left - margin.right,
      height = ((dimensions && dimensions.height) || 110) - margin.top - margin.bottom;
    if (showTooltip) height -= TOOLTIP_HEIGHT;

    const min = d3.min(dataset, (d) => d.y) - 1;
    const max = d3.max(dataset, (d) => d.y);

    // Set the x and y scale ranges
    const xScale = d3
      .scaleLinear()
      .domain(
        d3.extent(dataset, function (d) {
          return d.x;
        })
      )
      .range([0, width]);

    const yScale = d3.scaleLinear().domain([min, max]).range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    // .ticks();
    const yAxis = d3.axisLeft(yScale).tickSizeInner(-width).ticks(2);

    // Initiate the area line function
    const areaFunction = d3
      .area()
      .curve(shape.curveCatmullRom.alpha(1))
      .x(function (d) {
        return xScale(d.x);
      })
      .y0(height)
      .y1(function (d) {
        return yScale(d.y || min);
      });

    // Add the svg canvas for the line chart
    const svg = d3
      .select(`#chart-${this.props.id}`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Define the gradient below the line chart
    const areaGradient = svg.append('defs').append('linearGradient').attr('id', `areaGradient-${this.props.id}`).attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '130%');

    // Append the first stop - the color at the top
    areaGradient.append('stop').attr('offset', '0%').attr('stop-color', color).attr('stop-opacity', 1);

    // Append the second stop - white transparant almost at the end
    areaGradient.append('stop').attr('offset', '100%').attr('stop-color', color).attr('stop-opacity', 0);

    // Add the X Axis
    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .call((g) => g.selectAll('.tick text').attr('x', 0).attr('dy', 5))
      .attr('font-weight', '500')
      .attr('font-size', '10px')
      .attr('color', '#172A3A');

    //Add the Y Axis
    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .style('stroke-dasharray', '5 5')
      .call((g) => g.selectAll('.tick text').attr('x', 16).attr('dy', -8))
      .attr('font-weight', '500')
      .attr('font-size', '8px')
      .attr('color', '#172A3A');

    // Draw the underlying area chart filled with the gradient
    svg.append('path').attr('class', 'area').style('fill', `url(#areaGradient-${id})`).attr('d', areaFunction(dataset));

    svg.append('line').classed('hoverLine', true);
    svg.append('circle').classed('hoverPoint', true);

    const mouseMove = (d) => {
      const { offsetX } = d;
      const xValue = xScale.invert(offsetX);

      svg.selectAll('.hoverLine').style('display', 'block');
      svg.selectAll('.hoverPoint').style('display', 'block');
      this.setState({ cursorOut: false });

      const closest = dataset.reduce((prev, curr) => {
        return Math.abs(curr.x - xValue) < Math.abs(prev.x - xValue) ? curr : prev;
      }, dataset[0]);

      this.setState({
        xOffset: xScale(closest.x),
        yOffset: yScale(closest.y),
        point: closest,
      });

      svg.selectAll('.hoverLine').attr('x1', xScale(closest.x)).attr('y1', yScale(closest.y)).attr('x2', xScale(closest.x)).attr('y2', height).attr('stroke', '#172A3A').attr('stroke-opacity', 0.25);

      svg.selectAll('.hoverPoint').attr('cx', xScale(closest.x)).attr('cy', yScale(closest.y)).attr('r', '8').attr('stroke', color).attr('stroke-width', 3).attr('fill', '#FFFFFF');
    };

    if (showTooltip) {
      svg.on('mousemove', mouseMove);
      svg.on('mouseout', () => {
        svg.selectAll('.hoverLine').style('display', 'none');
        svg.selectAll('.hoverPoint').style('display', 'none');
        this.setState({ cursorOut: true });
      });
    }
  }

  render() {
    const { xOffset, yOffset, point, cursorOut } = this.state;
    return (
      <ChartContainer ref={this.chartContainerRef} id={`chart-${this.props.id}`} color={this.props.color}>
        {this.props.showTooltip && (
          <div className="tooltip" style={{ top: yOffset, left: xOffset - TOOLTIP_OFFSET_X, visibility: !cursorOut && point ? 'visible' : 'hidden' }} id={`tooltip-${this.props.id}`}>
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
    );
  }
}

export default StackedAreaChart;
