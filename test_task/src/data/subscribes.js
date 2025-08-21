const subscriptions = [
  {
    id: 1,
    name: "Basic",
    price: 0,
    features: [
      { name: "Access to tests", included: true },
      { name: "Progress statistics", included: true },
      { name: "Achievements", included: false },
      { name: "Personalized recommendations", included: false },
      { name: "24/7 Support", included: false },
    ],
  },
  {
    id: 2,
    name: "Premium",
    price: 99000,
    features: [
      { name: "Access to tests", included: true },
      { name: "Progress statistics", included: true },
      { name: "Achievements", included: true },
      { name: "Personalized recommendations", included: true },
      { name: "24/7 Support", included: false },
    ],
  },
  {
    id: 3,
    name: "Pro",
    price: 199000,
    features: [
      { name: "Access to tests", included: true },
      { name: "Progress statistics", included: true },
      { name: "Achievements", included: true },
      { name: "Personalized recommendations", included: true },
      { name: "24/7 Support", included: true },
    ],
  },
];


export default subscriptions