interface SidebarConstants {
  width: number;
  collapsed: {
    width: number;
  };
}

interface TopbarConstants {
  notificationsPopoverWidth: number;
}

interface IInputFieldContants {
  iconWidth: number;
  inputWidth: number;
  marginBottom: number;
}

interface IFormInputContanst {
  marginBottom: number;
  lastMarginBottom: number;
}

export const sidebar: SidebarConstants = {
  width: 248,
  collapsed: {
    width: 80,
  },
};

export const topbar: TopbarConstants = {
  notificationsPopoverWidth: 368,
};

export const input: IInputFieldContants = {
  iconWidth: 36,
  inputWidth: 144,
  marginBottom: 24,
};


interface IFormInputContanst {
  marginBottom: number;
  lastMarginBottom: number;
}
export const formInputs: IFormInputContanst = {
  marginBottom: 24,
  lastMarginBottom: 12,
};
