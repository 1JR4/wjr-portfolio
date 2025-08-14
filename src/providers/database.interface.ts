/**
 * Simple database interface - start with basics, extend as needed
 * No over-engineering - just what we need now
 */

export interface DatabaseProvider {
  // Basic CRUD operations
  get<T>(collection: string, id: string): Promise<T | null>;
  list<T>(collection: string, limit?: number): Promise<T[]>;
  create<T>(collection: string, data: T): Promise<string>;
  update<T>(collection: string, id: string, data: Partial<T>): Promise<void>;
  delete(collection: string, id: string): Promise<void>;
  
  // Simple query - add complexity only when needed
  query<T>(collection: string, filters: Record<string, any>): Promise<T[]>;
}