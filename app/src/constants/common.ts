import { IHeaderData } from '../interfaces/common';
import { BLUE_SECONDARY } from '../styles/colors';

export const DAY_NIGHT_HEADER: IHeaderData = {
  day: {
    key: 'day',
    text: {
      value: 'Day mode',
      style: { color: BLUE_SECONDARY },
    },
    icon: {
      value: '/images/icons/sun-blue.svg',
      style: { fill: BLUE_SECONDARY },
    },
  },
  night: {
    key: 'night',
    text: {
      value: 'Night mode',
      style: { color: BLUE_SECONDARY },
    },
    icon: {
      value: '/images/icons/moon-blue.svg',
      style: { fill: BLUE_SECONDARY },
    },
  },
};

export const IRRIGATION_DAY_NIGHT_HEADER: IHeaderData = {
  day: {
    key: 'day',
    text: {
      value: 'Day Irrigation Mode',
      style: { color: BLUE_SECONDARY },
    },
    icon: {
      value: '/images/icons/sun-blue.svg',
      style: { fill: BLUE_SECONDARY },
    },
  },
  night: {
    key: 'night',
    text: {
      value: 'Night Irrigation Mode',
      style: { color: BLUE_SECONDARY },
    },
    icon: {
      value: '/images/icons/moon-blue.svg',
      style: { fill: BLUE_SECONDARY },
    },
  },
};

export const FERTIGATION_DAY_NIGHT_HEADER: IHeaderData = {
  day: {
    key: 'day',
    text: {
      value: 'Day Fertigation Mode',
      style: { color: BLUE_SECONDARY },
    },
    icon: {
      value: '/images/icons/sun-blue.svg',
      style: { fill: BLUE_SECONDARY },
    },
  },
  night: {
    key: 'night',
    text: {
      value: 'Night Fertigation Mode',
      style: { color: BLUE_SECONDARY },
    },
    icon: {
      value: '/images/icons/moon-blue.svg',
      style: { fill: BLUE_SECONDARY },
    },
  },
};
