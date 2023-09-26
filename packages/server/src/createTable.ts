import { Database } from "bun:sqlite";

export function createTable(db: Database, tableName: string): void {
  const tableSQL = `CREATE TABLE IF NOT EXISTS ${tableName}(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT NOT NULL,
    desc TEXT,
    done INTEGER DEFAULT 0 NOT NULL
    )`;
  const query = db.query(tableSQL);
  query.run();
}
