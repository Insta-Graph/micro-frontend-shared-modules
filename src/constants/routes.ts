import type React from 'react';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

export interface NavigationItemChildren {
  id: string;
  title: string;
  type: string;
  url: string;
  target?: string;
  external?: boolean;
  disabled?: boolean;
  caption?: string;
  icon: React.VFC;
  breadcrumbs: boolean;
  chip?: {
    color:
      | 'default'
      | 'error'
      | 'primary'
      | 'secondary'
      | 'info'
      | 'success'
      | 'warning'
      | undefined;
    variant: 'filled' | 'outlined' | undefined;
    size: 'small' | 'medium' | undefined;
    label: string;
    avatar?: React.VFC;
  };
  children?: {
    id: string;
    title: string;
    type: string;
    url: string;
    icon: React.VFC;
    breadcrumbs: boolean;
  }[];
}

export interface NavigationItem {
  id: string;
  caption?: string;
  title: string;
  type: string;
  icon?: React.VFC;
  children?: NavigationItemChildren[];
}

const dashboard: NavigationItem = {
  id: 'dashboard',
  title: 'Settings',
  type: 'group',
  children: [
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/dashboard/profile',
      icon: PersonOutlineIcon,
      breadcrumbs: false,
    },
  ],
};

export interface NavigationItems {
  items: NavigationItem[];
}

const menuItems: NavigationItems = {
  items: [dashboard],
};

export default menuItems;
