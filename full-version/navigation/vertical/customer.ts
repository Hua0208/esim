export default [
    { heading: 'Customer System' },
    {
      title: 'Customer Operation',
      icon: { icon: 'tabler-users' },
      children: [
        {
            title: 'Customer',
            to: { name: 'customer-user' },
            icon: { icon: 'tabler-user' },
          },
        {
          title: 'Customer Group',
          to: { name: 'customer-group' },
          icon: { icon: 'tabler-users-group' },
        },
      ],
    },
  ] 