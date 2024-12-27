interface PropertyRooms {
  [key: string]: string[];
}

export const propertyRooms: PropertyRooms = {
  "Coetzee str 19": ["AA1", "AA2", "AA3", "AA4", "AA5", "AA6", "AA7", "AA8", "AA9", "AA10", "AA11", "AA12", "AA13", "AA14", "AA15", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
  "Molen 1:07": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
  "Silver 36": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
  "Dwars 31": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
  "Rietz 53": ["A1", "A2", "A3", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17", "B18", "B19", "B20", "B21", "B22"],
  "Steve Biko 1:29": ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17", "B18", "B19", "C1", "C2", "C3", "C4"],
  "Rissik 70": ["A1", "A2", "A3", "AA1", "AA2", "AA3", "AA4", "AA5", "AA6", "AA7"],
  "Wiligen 32": ["A1", "A2", "A3", "A4", "A5", "A6", "A7"],
  "Rissik 102": ["AA1", "AA2", "AA3", "AA4", "AA5", "AA6", "AA7", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
  "Rissik 108": ["AA1", "AA2", "AA3", "AA4", "AA5", "AA6", "AA7"],
  "Rissik 95": ["AA1", "AA2", "AA3", "AA4", "AA5", "AA6", "AA7", "AA8", "AA9", "AA10", "AA11", "AA12", "AA13", "AA14", "AA15", "AA16", "AA17", "AA18", "AA19", "XX18", "XX19", "XX20", "XX21", "XX22", "XX23", "XX24"],
  "Rissik 97": ["AA1", "AA2", "AA3", "AA4", "AA5", "AA6", "AA7", "AA8", "AA9", "AA10", "AA11", "AA12", "AA13", "AA14", "AA15", "AA16", "AA17", "AA18", "AA19", "XX18", "XX19", "XX20", "XX21", "XX22", "XX23", "XX24"]
}

export const propertyAddresses = Object.keys(propertyRooms);
