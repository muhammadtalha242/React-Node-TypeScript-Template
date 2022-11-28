export interface IData {
  value: string;
  style: {
    [key: string]: string;
  };
}

export interface IDayNight {
  text: IData;
  icon: IData;
  key: string;
}

export interface IHeaderData {
  day: IDayNight;
  night: IDayNight;
}

export interface IRole {
  id: number;
  code: string;
  name: string;
}
