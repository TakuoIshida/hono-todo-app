/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface GooseDbVersion {
  id: Generated<number>;
  is_applied: number;
  tstamp: Generated<Date | null>;
  version_id: number;
}

export interface Todos {
  content: string;
  id: string;
  title: string;
  user_id: string;
}

export interface Users {
  email: string;
  id: string;
  name: string;
}

export interface DB {
  goose_db_version: GooseDbVersion;
  todos: Todos;
  users: Users;
}
