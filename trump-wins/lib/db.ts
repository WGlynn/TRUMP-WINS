import Database from 'better-sqlite3';
import path from 'path';

export interface Win {
  id: number;
  title: string;
  description: string;
  area: string;
  size: string;
  date: string;
  person: string;
  sourceLink?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type WinInput = Omit<Win, 'id' | 'createdAt' | 'updatedAt'>;
export type WinUpdate = Partial<WinInput>;

// Initialize database
const dbPath = path.join(process.cwd(), 'wins.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS wins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    area TEXT NOT NULL,
    size TEXT NOT NULL,
    date TEXT NOT NULL,
    person TEXT NOT NULL,
    sourceLink TEXT,
    createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

// Prepared statements
const getAllStmt = db.prepare('SELECT * FROM wins ORDER BY date DESC');
const getByIdStmt = db.prepare('SELECT * FROM wins WHERE id = ?');
const insertStmt = db.prepare(`
  INSERT INTO wins (title, description, area, size, date, person, sourceLink, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
`);
const updateStmt = db.prepare(`
  UPDATE wins
  SET title = ?, description = ?, area = ?, size = ?, date = ?, person = ?, sourceLink = ?, updatedAt = datetime('now')
  WHERE id = ?
`);
const deleteStmt = db.prepare('DELETE FROM wins WHERE id = ?');

// Search with filters
const searchWins = (
  searchTerm?: string,
  areas?: string[],
  sizes?: string[],
  persons?: string[]
): Win[] => {
  let query = 'SELECT * FROM wins WHERE 1=1';
  const params: any[] = [];

  if (searchTerm && searchTerm.trim()) {
    query += ' AND (title LIKE ? OR description LIKE ?)';
    const term = `%${searchTerm}%`;
    params.push(term, term);
  }

  if (areas && areas.length > 0) {
    query += ` AND area IN (${areas.map(() => '?').join(',')})`;
    params.push(...areas);
  }

  if (sizes && sizes.length > 0) {
    query += ` AND size IN (${sizes.map(() => '?').join(',')})`;
    params.push(...sizes);
  }

  if (persons && persons.length > 0) {
    query += ` AND person IN (${persons.map(() => '?').join(',')})`;
    params.push(...persons);
  }

  query += ' ORDER BY date DESC';

  const stmt = db.prepare(query);
  return stmt.all(...params) as Win[];
};

// Export database operations
export const db_operations = {
  getAllWins: (): Win[] => {
    return getAllStmt.all() as Win[];
  },

  getWinById: (id: number): Win | undefined => {
    return getByIdStmt.get(id) as Win | undefined;
  },

  createWin: (win: WinInput): Win => {
    const result = insertStmt.run(
      win.title,
      win.description,
      win.area,
      win.size,
      win.date,
      win.person,
      win.sourceLink || null
    );
    return getByIdStmt.get(result.lastInsertRowid) as Win;
  },

  updateWin: (id: number, win: WinUpdate): Win | null => {
    const existing = getByIdStmt.get(id) as Win | undefined;
    if (!existing) return null;

    const updated = { ...existing, ...win };
    updateStmt.run(
      updated.title,
      updated.description,
      updated.area,
      updated.size,
      updated.date,
      updated.person,
      updated.sourceLink || null,
      id
    );
    return getByIdStmt.get(id) as Win;
  },

  deleteWin: (id: number): boolean => {
    const result = deleteStmt.run(id);
    return result.changes > 0;
  },

  searchWins,
};

export default db;
