import React, { useContext } from 'react';
import classNames from 'classnames';

import { GrowspaceContext } from '../../context/growspace.context';
import { MetricContainer } from './container';
import AreaChart from '../common/graphs/area-chart';

interface Props {
  metric: IMetric;
  expanded?: boolean;
  setExpandedIndex?: Function;
  i?: number;
  showTooltip?: boolean;
}

interface TimeSpan {
  label: string;
  value: string;
  isActive?: boolean;
}

export interface IMetric {
  label: string;
  unit: string;
  id: string;
  color: string;
}

interface IContainerProps {
  height?: string | number;
  width?: string | number;
  onClick?: () => Function;
}

const timeSpans: TimeSpan[] = [
  {
    label: '24h',
    value: '24h',
    isActive: true,
  },
  {
    label: 'Week',
    value: '7d',
  },
  {
    label: 'Month',
    value: '1m',
  },
];

const Metric: React.FC<Props> = ({ metric, expanded, setExpandedIndex, i, showTooltip }) => {
  const { state } = useContext(GrowspaceContext);
  const containerProps: IContainerProps = expanded ? { width: '100%', height: '560px' } : {};
  if (expanded && setExpandedIndex) {
    containerProps.onClick = setExpandedIndex(i);
  }
  let chartDimensions;
  if (expanded) chartDimensions = { height: 400 };
  const metricData = state.growspace[metric.id] || state.growspace.mockData;
  return (
    <MetricContainer onClick={setExpandedIndex ? () => setExpandedIndex(i) : undefined} {...containerProps} id={`metric-${metric.id}`}>
      <div className="content">
        <div className="title">{metric.label}</div>
        <div className="value" style={{ color: metric.color }}>
          {metricData.latestReading}
          <span className="unit">{metric.unit}</span>
        </div>
        <div className="links">
          {timeSpans.map((span, i) => (
            <div key={i} className={classNames({ link: true, active: span.isActive })}>
              {span.label}
            </div>
          ))}
        </div>
      </div>
      {metricData.chartData.length > 0 && <AreaChart data={metricData.chartData} showTooltip={showTooltip} dimensions={chartDimensions} color={metric.color} id={metric.id} />}
    </MetricContainer>
  );
};

export default Metric;
