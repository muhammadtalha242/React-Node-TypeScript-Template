export interface ISidebarLink {
  key: string;
  label: string;
  link: string;
  icon: string;
  children: ISidebarLink[];
  hasChildren?: boolean;
  disabled?: boolean;
}

const SidebarLinks: ISidebarLink[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    link: '/',
    icon: 'dashboard',
    children: [],
  },
  {
    key: 'growsheets',
    label: 'Growsheets',
    link: '/growsheets',
    icon: 'growsheets',
    children: [],
  },
  {
    key: 'chat',
    label: 'Chat',
    link: '/chat',
    icon: 'chat',
    children: [],
    disabled: true,
  },
  {
    key: 'reports',
    label: 'Reports',
    link: '/reports',
    icon: 'reports',
    children: [],
  },
  {
    key: 'todo',
    label: 'To-Do',
    link: '/todo',
    icon: 'todo',
    children: [],
    disabled: true,
  },
  {
    key: 'calendar',
    label: 'Calendar',
    link: '/calendar',
    icon: 'calendar',
    children: [],
    disabled: true,
  },
  {
    key: 'settings',
    label: 'Settings',
    link: '/settings',
    icon: 'settings',
    hasChildren: true,
    children: [
      {
        key: 'device-setup',
        label: 'Device Setup',
        link: '/settings/device-setup',
        icon: 'settings/device-setup',
        children: [],
      },
      {
        key: 'temperature-control',
        label: 'Temperature Control',
        link: '/settings/temperature-control',
        icon: 'settings/temperature',
        children: [],
      },
      {
        key: 'humidity-control',
        label: 'Humidity Control',
        link: '/settings/humidity-control',
        icon: 'settings/humidity',
        children: [],
      },
      {
        key: 'co2-control',
        label: 'CO₂ Control',
        link: '/settings/co2-control',
        icon: 'settings/co2',
        children: [],
      },
      {
        key: 'lighting-control',
        label: 'Lighting Control',
        link: '/settings/lighting-control',
        icon: 'settings/lighting',
        children: [],
      },
      {
        key: 'irrigation',
        label: 'Irrigation',
        link: '/settings/irrigation',
        icon: 'settings/irrigation',
        children: [],
      },
      {
        key: 'fertigation',
        label: 'Fertigation',
        link: '/settings/fertigation',
        icon: 'settings/fertigation',
        children: [],
      },
      {
        key: 'access-settings',
        label: 'Access Settings',
        link: '/settings/access-settings',
        icon: 'settings/access-settings',
        children: [],
      },
      {
        key: 'organization-settings',
        label: 'Organization Settings',
        link: '/settings/organization-settings',
        icon: 'settings/organization-settings',
        children: [],
      },
      {
        key: 'user-settings',
        label: 'User Settings',
        link: '/settings/user-settings',
        icon: 'settings/user-settings',
        children: [],
      },
      {
        key: 'notifications',
        label: 'Notifications',
        link: '/settings/notifications',
        icon: 'settings/notifications',
        children: [],
      },
    ],
  },
];

export default SidebarLinks;
