import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  //table USERS
  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', (col) => col.primaryKey().notNull())
    .addColumn('display_name', 'varchar(255)', (col) => col.notNull())
    .addColumn('email', 'varchar(255)', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('deleted_at', 'timestamp')
    .addColumn('external_id', 'varchar(255)', (col) => col.notNull())
    .execute();

  //Table TEAMS
  await db.schema
    .createTable('teams')
    .addColumn('id', 'uuid', (col) => col.primaryKey().notNull())
    .addColumn('created_by', 'uuid', (col) => col.notNull())
    .addForeignKeyConstraint(
      'fk_teams_created_by_users',
      ['created_by'],
      'users',
      ['id'],
    )
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('code', 'varchar(255)', (col) => col.notNull().unique())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('deleted_at', 'timestamp')
    .execute();

  await db.schema
    .alterTable('users')
    .addColumn('team_id', 'uuid', (col) => col)
    .execute();

  // Add la FK pour la table users
  await db.schema
    .alterTable('users')
    .addForeignKeyConstraint('fk_users_team_id_teams', ['team_id'], 'teams', [
      'id',
    ])
    .execute();

  //Table MATCHES
  await db.schema
    .createTable('matches')
    .addColumn('id', 'uuid', (col) => col.primaryKey().notNull())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('date', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('deleted_at', 'timestamp')
    .addColumn('created_by', 'uuid', (col) => col.notNull())
    .addForeignKeyConstraint(
      'fk_matches_created_by_users',
      ['created_by'],
      'users',
      ['id'],
    )
    .addColumn('team_id', 'uuid', (col) => col.notNull())
    .addForeignKeyConstraint('fk_matches_team_id_teams', ['team_id'], 'teams', [
      'id',
    ])
    .addColumn('team2_id', 'uuid', (col) => col)
    .addForeignKeyConstraint(
      'fk_matches_team2_id_teams',
      ['team2_id'],
      'teams',
      ['id'],
    )
    .execute();

  //Table MATCH_PLAYERS
  await db.schema
    .createTable('match_users')
    .addColumn('id', 'uuid', (col) => col.primaryKey().notNull())
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addForeignKeyConstraint(
      'fk_match_users_user_id_users',
      ['user_id'],
      'users',
      ['id'],
    )
    .addColumn('match_id', 'uuid', (col) => col)
    .addForeignKeyConstraint(
      'fk_match_users_match_id_matches',
      ['match_id'],
      'matches',
      ['id'],
    )
    .execute();

  //TABLE VOTING_SESSIONS
  await db.schema
    .createTable('voting_sessions')
    .addColumn('id', 'uuid', (col) => col.primaryKey().notNull())
    .addColumn('closing_at', 'timestamp')
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('started_by', 'uuid', (col) => col.notNull())
    .addForeignKeyConstraint(
      'fk_voting_sessions_started_by_users',
      ['started_by'],
      'users',
      ['id'],
    )
    .addColumn('team_id', 'uuid', (col) => col.notNull())
    .addForeignKeyConstraint(
      'fk_voting_sessions_team_id_teams',
      ['team_id'],
      'teams',
      ['id'],
    )
    .execute();

  //TABLE VOTES
  await db.schema
    .createTable('votes')
    .addColumn('id', 'uuid', (col) => col.primaryKey().notNull())
    .addColumn('voting_session_id', 'uuid', (col) => col.notNull())
    .addForeignKeyConstraint(
      'fk_votes_voting_session_id_voting_sessions',
      ['voting_session_id'],
      'voting_sessions',
      ['id'],
    )
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addForeignKeyConstraint('fk_votes_user_id_users', ['user_id'], 'users', [
      'id',
    ])
    .addColumn('vote_type', 'varchar(4)', (col) => col.notNull())
    .addCheckConstraint('vote_type_check', sql`vote_type IN ('TOP', 'FLOP')`)
    .execute();
}
export async function down(db: Kysely<any>): Promise<void> {
  // First drop the foreign key constraints before dropping tables
  try {
    // Drop constraints from votes table
    await db.schema
      .alterTable('votes')
      .dropConstraint('fk_votes_voting_session_id_voting_sessions')
      .execute();

    await db.schema
      .alterTable('votes')
      .dropConstraint('fk_votes_user_id_users')
      .execute();

    // Drop constraints from voting_sessions table
    await db.schema
      .alterTable('voting_sessions')
      .dropConstraint('fk_voting_sessions_started_by_users')
      .execute();

    await db.schema
      .alterTable('voting_sessions')
      .dropConstraint('fk_voting_sessions_team_id_teams')
      .execute();

    // Drop constraints from match_users table
    await db.schema
      .alterTable('match_users')
      .dropConstraint('fk_match_users_user_id_users')
      .execute();

    await db.schema
      .alterTable('match_users')
      .dropConstraint('fk_match_users_match_id_matches')
      .execute();

    // Drop constraints from matches table
    await db.schema
      .alterTable('matches')
      .dropConstraint('fk_matches_created_by_users')
      .execute();

    await db.schema
      .alterTable('matches')
      .dropConstraint('fk_matches_team_id_teams')
      .execute();

    await db.schema
      .alterTable('matches')
      .dropConstraint('fk_matches_team2_id_teams')
      .execute();

    // Drop constraint from users table
    await db.schema
      .alterTable('users')
      .dropConstraint('fk_users_team_id_teams')
      .execute();

    // Drop constraint from teams table
    await db.schema
      .alterTable('teams')
      .dropConstraint('fk_teams_created_by_users')
      .execute();

    // Now drop tables in the correct order
    await db.schema.dropTable('votes').execute();
    await db.schema.dropTable('voting_sessions').execute();
    await db.schema.dropTable('match_users').execute();
    await db.schema.dropTable('matches').execute();
    await db.schema.dropTable('users').execute();
    await db.schema.dropTable('teams').execute();
  } catch (error) {
    console.error('Error in migration down:', error);
    throw error;
  }
}
