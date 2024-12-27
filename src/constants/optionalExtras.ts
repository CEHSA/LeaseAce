export interface Extra {
  id: string;
  name: string;
  price: number;
  isMonthly: boolean;
  description?: string;
}

export const optionalExtras: Extra[] = [
  {
    id: 'smart-tv',
    name: '32" Smart TV',
    price: 400,
    isMonthly: true,
    description: 'HD Smart TV with Netflix and YouTube support'
  },
  {
    id: 'filtered-water',
    name: 'Filtered Water Access',
    price: 100,
    isMonthly: true,
    description: 'Access to filtered drinking water'
  },
  {
    id: 'desk-set',
    name: 'Extra Chair & Desk Set',
    price: 100,
    isMonthly: true,
    description: 'Additional study desk and chair'
  },
  {
    id: 'wardrobe',
    name: 'Additional Wardrobe',
    price: 200,
    isMonthly: false,
    description: 'Extra wardrobe for storage'
  },
  {
    id: 'fridge',
    name: 'In-room Bar Fridge',
    price: 400,
    isMonthly: true,
    description: 'Personal bar fridge'
  },
  {
    id: 'cellphone',
    name: '4G Cellphone Package',
    price: 150,
    isMonthly: true,
    description: '4G data package'
  },
  {
    id: 'laundry-monthly',
    name: 'Monthly Laundry Service',
    price: 100,
    isMonthly: true,
    description: 'Once per month laundry service'
  },
  {
    id: 'laundry-weekly',
    name: 'Weekly Laundry Service',
    price: 300,
    isMonthly: true,
    description: 'Weekly laundry service'
  },
  {
    id: 'microwave',
    name: 'In-room Microwave',
    price: 200,
    isMonthly: true,
    description: 'Personal microwave'
  },
  {
    id: 'cleaning-monthly',
    name: 'Monthly Room Cleaning',
    price: 200,
    isMonthly: true,
    description: 'Once per month room cleaning'
  },
  {
    id: 'cleaning-weekly',
    name: 'Weekly Room Cleaning',
    price: 400,
    isMonthly: true,
    description: 'Weekly room cleaning'
  }
];