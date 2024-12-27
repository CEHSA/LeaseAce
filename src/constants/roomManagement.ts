export type PaymentInterval = 'monthly' | 'annual';
export type OccupancyType = 'single' | 'sharing';

export interface Room {
  id: string;
  type: OccupancyType;
  isAvailable: boolean;
  monthlyRate: number;
  annualRate: number;
}

export interface Property {
  address: string;
  rooms: Room[];
}

export const RATES = {
  single: {
    monthly: 4500,
    annual: 45000
  },
  sharing: {
    monthly: 4140,
    annual: 45000
  }
};

// Helper function to get available rooms by type
export const getAvailableRooms = (address: string, type: OccupancyType): Room[] => {
  const property = properties.find(p => p.address === address);
  if (!property) return [];
  return property.rooms.filter(room => room.type === type && room.isAvailable);
};

export const properties: Property[] = [
  {
    address: "Coetzee str 19",
    rooms: [
      { id: "AA1", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA2", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA3", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA4", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA5", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA6", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA7", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA8", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA9", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA10", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA11", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA12", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA13", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA14", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "B1", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "B2", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "B3", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "B4", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "B5", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "B6", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "B7", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "B8", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "B9", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "B10", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual }
    ]
  },
  {
    address: "Molen 107",
    rooms: [
      { id: "A1", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A2", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A3", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A4", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA5", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA6", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA7", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA8", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA9", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA10", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA11", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA12", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA13", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA14", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA15", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA16", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA17", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA18", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual }
    ]
  },
  {
    address: "Silver 36",
    rooms: [
      { id: "A1", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A2", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A3", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A4", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A5", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A6", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA7", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA8", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA9", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA10", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA11", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA12", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA13", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA14", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA15", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA16", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "A17", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "B1", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "B2", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "B3", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "C1", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "C2", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "C3", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "C4", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "C5", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "C6", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "C7", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "C8", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual }
    ]
  },
  {
    address: "Dwars 31",
    rooms: [
      { id: "A1", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A2", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A3", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA4", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA5", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA6", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "A7", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A8", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A9", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A10", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A11", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A12", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A13", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "AA14", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "AA15", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual }
    ]
  },
  {
    address: "reitz 93",
    rooms: [
      { id: "A1", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A2", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A3", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "A4", type: "single", isAvailable: true, monthlyRate: RATES.single.monthly, annualRate: RATES.single.annual },
      { id: "SS1", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "SS2", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "S3", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "S4", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "S5", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "S6", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "S7", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "S8", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "S9", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "S10", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual },
      { id: "S11", type: "sharing", isAvailable: true, monthlyRate: RATES.sharing.monthly, annualRate: RATES.sharing.annual }
    ]
  }
];

export const propertyAddresses = properties.map(p => p.address);