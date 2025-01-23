import { useMemo } from 'react';
import { ICONS } from '@/components/icons';
import { routes } from '@/routes';

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'overview',
        items: [
          {
            title: 'overview',
            path: routes.dashboard.overview.index,
            icon: ICONS.dashboard,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: 'management',
        items: [
          {
            title: 'categories',
            path: routes.dashboard.categories.index,
            icon: ICONS.menuItem,
          },
          {
            title: 'brands',
            path: routes.dashboard.brands.index,
            icon: ICONS.label,
          },
          {
            title: 'products',
            path: routes.dashboard.products.index,
            icon: ICONS.product,
          },
          {
            title: 'orders',
            path: routes.dashboard.orders.index,
            icon: ICONS.order,
          },
          {
            title: 'customers',
            path: routes.dashboard.customers.index,
            icon: ICONS.user,
          },
        ],
      },
      {
        subheader: 'settings',
        items: [
          // USER
          {
            title: 'settings',
            path: routes.dashboard.settings.index,
            icon: ICONS.settings,
            children: [
              {
                title: 'accounts',
                path: routes.dashboard.settings.users.index,
                children: [
                  {
                    title: 'create',
                    path: routes.dashboard.settings.users.create,
                    hidden: true,
                  },
                  {
                    title: 'edit',
                    path: routes.dashboard.settings.users.edit,
                    hidden: true,
                  },
                ],
              },
              {
                title: 'roles',
                path: routes.dashboard.settings.roles.index,
                children: [
                  {
                    title: 'create',
                    path: routes.dashboard.settings.roles.create,
                    hidden: true,
                  },
                  {
                    title: 'edit',
                    path: routes.dashboard.settings.roles.edit,
                    hidden: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    [t],
  );

  return data;
}
