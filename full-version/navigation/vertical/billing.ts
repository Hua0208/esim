export default [
  { heading: 'Billing Business' },
  {
    title: 'Billing Operation',
    icon: { icon: 'tabler-cash' },
    children: [
      {
        title: 'Billing History',
        to: { name: 'billing-history' },
        icon: { icon: 'tabler-credit-card' },
      },
      {
        title: 'Topup account',
        to: { name: 'billing-topup' },
        icon: { icon: 'tabler-wallet' },
      },
    ],
  },
] 