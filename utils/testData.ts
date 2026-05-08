import * as fs from 'fs';
import * as path from 'path';

const DATA_DIR = path.resolve(__dirname, '../test-data');

export function loadJSON<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export type SearchTerm = {
  term: string;
  tag: string;
  expectResultsUrl: string;
};

export type User = {
  role: string;
  email: string;
  password: string;
};

export const searchTerms = loadJSON<SearchTerm[]>('searchTerms.json');
export const users = loadJSON<User[]>('users.json');

export function getUserByRole(role: string): User {
  const user = users.find(u => u.role === role);
  if (!user) throw new Error(`No user found with role: ${role}`);
  return user;
}
