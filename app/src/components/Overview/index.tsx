import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import DashboardHeader from '../common/dashboard-header';
import { OverviewContainer, OverviewContentContainer, MetricContainer } from './container';
import Metric from './metric';
import DonutChart from '../common/graphs/donut';

import { GrowspaceContext, setGrowspaceOverview } from '../../context/growspace.context';
import growControllerService from '../../services/growController';
import DeviceCategory, { IDeviceCategory } from './device-category';
import { IMetric } from './metric';
import { FilledButton } from '../common/button';

import { ORANGE_PRIMARY, BLUE_SECONDARY, BLUE_TERTIARY, GREEN_SECONDARY, PINK_PRIMARY, GREEN_PRIMARY, WHITE } from '../../styles/colors';
import { getVapourPressure } from '../../utils/vpd';
import { IXYTuple, ISetGrowspaceOverviewParams } from '../../context/growspace.context';

interface Props extends RouteComponentProps<{ growspaceId: string }> {}

const initialMetricValues = {
  temperature: null,
  humidity: null,
  co2: null,
  vpd: null,
  lightning: null,
};

const Metrics: IMetric[] = [
  {
    label: 'Temperature',
    unit: '°C',
    id: 'temperature',
    color: ORANGE_PRIMARY,
  },
  {
    label: 'Humidity',
    unit: '%',
    id: 'humidity',
    color: BLUE_SECONDARY,
  },
  {
    label: 'CO2',
    unit: 'ppm',
    id: 'co2',
    color: GREEN_SECONDARY,
  },
  {
    label: 'Lightning',
    unit: 'candela',
    id: 'lightning',
    color: PINK_PRIMARY,
  },
  {
    label: 'VPD',
    unit: 'kPa',
    id: 'vpd',
    color: BLUE_TERTIARY,
  },
];

const deviceCategories: IDeviceCategory[] = [
  {
    categoryName: 'Sensors',
    online: 25,
    offline: 2,
  },
  {
    categoryName: 'Switches',
    online: 25,
    offline: 2,
  },
  {
    categoryName: 'Valves',
    online: 25,
    offline: 2,
  },
];

const Overview: React.FC<Props> = (props) => {
  const { dispatch: growspaceDispatch } = useContext(GrowspaceContext);
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const isExpanded = expandedIndex >= 0;

  const transform = (data: any): ISetGrowspaceOverviewParams => {
    const temperatureData: IXYTuple[] = [],
      humidityData: IXYTuple[] = [],
      co2Data: IXYTuple[] = [],
      vpdData: IXYTuple[] = [];
    for (let i = 0; i < data.climateData.length; i++) {
      const item = data.climateData[i];
      temperatureData.push({
        x: i,
        y: item.temperature,
      });
      humidityData.push({
        x: i,
        y: item.humidity,
      });
      co2Data.push({
        x: i,
        y: item.co2,
      });
      vpdData.push({
        x: i,
        y: getVapourPressure(item.temperature, item.humidity),
      });
    }
    const {
      temperature: temperatureLatest,
      humidity: humidityLatest,
      co2: co2Latest,
    }: {
      temperature: number;
      humidity: number;
      co2: number;
      vpd?: number;
    } = data.climateData.length > 0 ? data.climateData[data.climateData.length - 1] : initialMetricValues;
    const vpdLatest = getVapourPressure(temperatureLatest, humidityLatest);

    return {
      temperature: {
        chartData: temperatureData,
        latestReading: temperatureLatest ? parseInt(temperatureLatest.toFixed(2)) : null,
      },
      humidity: {
        chartData: humidityData,
        latestReading: humidityLatest ? parseInt(humidityLatest.toFixed(2)) : null,
      },
      co2: {
        chartData: co2Data,
        latestReading: co2Latest ? parseInt(co2Latest.toFixed(2)) : null,
      },
      vpd: {
        chartData: vpdData,
        latestReading: vpdLatest ? parseInt(vpdLatest.toFixed(2)) : null,
      },
    };
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await growControllerService.getGrowControllerClimate(props.match.params.growspaceId);
      setGrowspaceOverview(growspaceDispatch)(transform(data));
    };
    fetchData();
  }, [growspaceDispatch, props.match.params.growspaceId]);

  console.log('DATA');

  return (
    <OverviewContainer>
      <DashboardHeader title="Overview" />
      <OverviewContentContainer>
        {isExpanded && <Metric metric={Metrics[expandedIndex]} expanded showTooltip />}
        {!isExpanded && (
          <>
            {Metrics.map((metric, i) => (
              <Metric key={i} metric={metric} i={i} setExpandedIndex={setExpandedIndex} />
            ))}
            <MetricContainer>
              <div className="content">
                <div className="title">Irrigation Overview</div>
                <div className="value" style={{ color: GREEN_PRIMARY }}>
                  12<span className="unit"> feeds from 15</span>
                </div>
                <div>
                  Next feed at <b>14:35</b>
                </div>
                <div className="details">
                  <div className="name">Formula Name</div>
                  <div className="meta-name">Formula Field</div>
                  <div className="seedling">Seedling</div>
                </div>
              </div>
            </MetricContainer>
            <MetricContainer>
              <div className="content">
                <div className="title">Growsheet</div>
                <div className="meta-name">Growsheet Name</div>
                <div className="small-text">Seedling</div>
                <div className="details">
                  <div className="field">
                    <span className="col-1">Temperature</span>
                    <span className="col-2">27°C / 23°C</span>
                  </div>
                  <div className="field">
                    <span className="col-1">Humidity</span>
                    <span className="col-2">75% / 80%</span>
                  </div>
                  <div className="field">
                    <span className="col-1">CO2</span>
                    <span className="col-2">800ppm</span>
                  </div>
                  <div className="field">
                    <span className="col-1">Lightning</span>
                    <span className="col-2">18/6</span>
                  </div>
                </div>
              </div>
            </MetricContainer>
            <MetricContainer>
              <div className="content">
                <div className="title">Heat Map</div>
              </div>
            </MetricContainer>
          </>
        )}
        <MetricContainer width="49.333%">
          <div className="flex content">
            <div className="half">
              <div className="title">Growsheet</div>
              <div className="meta-name">Type of plant</div>
              <div className="small-text">Genealogy</div>
              <div className="details">
                <div className="field">
                  <span className="col-1">Stage</span>
                  <span className="col-2 red">Flowering</span>
                </div>
                <div className="field">
                  <span className="col-1">Planted</span>
                  <span className="col-2">01.03.2021</span>
                </div>
                <div className="field">
                  <span className="col-1">Estimated harvest time</span>
                  <span className="col-2">30.03.2021</span>
                </div>
                <div className="field">
                  <span className="col-1">Barcode</span>
                  <span className="col-2">123456778</span>
                </div>
              </div>
            </div>
            <div className="half" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <DonutChart />
            </div>
          </div>
        </MetricContainer>
        <MetricContainer width="49.333%">
          <div className="content">
            <div className="title">Device Overview</div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 216 }}>
              {deviceCategories.map((category, i) => (
                <DeviceCategory key={i} category={category} />
              ))}
              <FilledButton background={GREEN_PRIMARY} color={WHITE} width="100%">
                Add New Device
              </FilledButton>
            </div>
          </div>
        </MetricContainer>
      </OverviewContentContainer>
    </OverviewContainer>
  );
};

export default Overview;
