import fs from 'fs';
import path from 'path';

import { Database } from '../interfaces/data';

export function saveDatabase(database: Database) {
  fs.writeFileSync(path.join(process.cwd(), 'data', 'transactions.json'), JSON.stringify(database, null, 2));
}
