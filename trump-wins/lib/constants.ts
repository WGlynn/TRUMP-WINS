export const AREAS = [
  'Deportations',
  'Economy',
  'Military',
  'DEI',
  'Trade',
  'Crushing the Left',
  'Deep State',
  'Climate Hoax',
  'Protecting Our Guys',
  'Other',
] as const;

export const SIZES = ['Yuge', 'Bigly', 'Small'] as const;

export const PERSONS = [
  'Trump',
  'JD Vance',
  'Stephen Miller',
  'Elon Musk',
  'RFK Jr',
  'Vivek Ramaswamy',
  'Kristi Noem',
  'Marco Rubio',
  'Mike Waltz',
  'Tulsi Gabbard',
  'Lee Zeldin',
  'Pam Bondi',
  'Tom Homan',
  'Other',
] as const;

export type Area = (typeof AREAS)[number];
export type Size = (typeof SIZES)[number];
export type Person = (typeof PERSONS)[number];
