import type { ColumnType } from 'kysely';

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Matches {
  created_at: Generated<Timestamp>;
  created_by: string;
  date: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  id: string;
  name: string;
  team_id: string;
  team2_id: string | null;
  updated_at: Generated<Timestamp>;
}

export interface MatchUsers {
  id: string;
  match_id: string | null;
  user_id: string;
}

export interface Teams {
  code: string;
  created_at: Generated<Timestamp>;
  created_by: string;
  deleted_at: Timestamp | null;
  id: string;
  name: string;
  updated_at: Generated<Timestamp>;
}

export interface Users {
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  display_name: string;
  email: string;
  external_id: string;
  id: string;
  team_id: string | null;
  updated_at: Generated<Timestamp>;
}

export interface Votes {
  id: string;
  user_id: string;
  vote_type: string;
  voting_session_id: string;
}

export interface VotingSessions {
  closing_at: Timestamp | null;
  created_at: Generated<Timestamp>;
  id: string;
  started_by: string;
  team_id: string;
  updated_at: Generated<Timestamp>;
}

export interface DB {
  match_users: MatchUsers;
  matches: Matches;
  teams: Teams;
  users: Users;
  votes: Votes;
  voting_sessions: VotingSessions;
}
