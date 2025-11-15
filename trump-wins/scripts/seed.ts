import { db_operations } from '../lib/db.js';

const sampleWins = [
  {
    title: 'Border Wall Construction Completed',
    description: 'Completed 450 miles of border wall system, significantly reducing illegal crossings in key sectors.',
    area: 'Deportations',
    size: 'Yuge',
    date: '2025-01-25',
    person: 'Trump',
    sourceLink: 'https://example.com/border-wall',
  },
  {
    title: 'Record Low Unemployment',
    description: 'Achieved the lowest unemployment rate in 50 years, with record employment for minorities.',
    area: 'Economy',
    size: 'Yuge',
    date: '2025-02-10',
    person: 'Trump',
    sourceLink: 'https://example.com/unemployment',
  },
  {
    title: 'DEI Programs Eliminated from Federal Agencies',
    description: 'Removed all DEI requirements and training programs from federal government agencies.',
    area: 'DEI',
    size: 'Bigly',
    date: '2025-01-28',
    person: 'Stephen Miller',
    sourceLink: null,
  },
  {
    title: 'China Trade Deal Renegotiated',
    description: 'Secured new trade agreement with China that favors American manufacturing and agriculture.',
    area: 'Trade',
    size: 'Yuge',
    date: '2025-03-05',
    person: 'Trump',
    sourceLink: 'https://example.com/china-trade',
  },
  {
    title: 'Military Spending Increase',
    description: 'Approved largest military budget increase in decades, modernizing armed forces.',
    area: 'Military',
    size: 'Bigly',
    date: '2025-02-15',
    person: 'Trump',
    sourceLink: null,
  },
  {
    title: 'Deep State Firings',
    description: 'Removed 50+ entrenched bureaucrats from key positions across federal agencies.',
    area: 'Deep State',
    size: 'Bigly',
    date: '2025-02-01',
    person: 'Elon Musk',
    sourceLink: null,
  },
  {
    title: 'Paris Climate Accord Exit',
    description: 'Officially withdrew from the Paris Climate Agreement, saving taxpayers billions.',
    area: 'Climate Hoax',
    size: 'Yuge',
    date: '2025-01-30',
    person: 'Trump',
    sourceLink: 'https://example.com/paris-exit',
  },
  {
    title: 'Presidential Pardons Issued',
    description: 'Granted pardons to January 6th defendants and political allies.',
    area: 'Protecting Our Guys',
    size: 'Bigly',
    date: '2025-01-21',
    person: 'Trump',
    sourceLink: null,
  },
  {
    title: 'Media Libel Lawsuits Filed',
    description: 'Filed lawsuits against multiple mainstream media outlets for defamation.',
    area: 'Crushing the Left',
    size: 'Small',
    date: '2025-03-10',
    person: 'Pam Bondi',
    sourceLink: null,
  },
  {
    title: 'Mass Deportation Operations Launched',
    description: 'Initiated largest deportation operation in American history, removing criminal aliens.',
    area: 'Deportations',
    size: 'Yuge',
    date: '2025-02-20',
    person: 'Tom Homan',
    sourceLink: 'https://example.com/deportations',
  },
];

console.log('Seeding database with sample wins...');

sampleWins.forEach((win, index) => {
  try {
    db_operations.createWin(win);
    console.log(`✓ Added win ${index + 1}: ${win.title}`);
  } catch (error) {
    console.error(`✗ Failed to add win ${index + 1}:`, error);
  }
});

console.log('Database seeding completed!');
