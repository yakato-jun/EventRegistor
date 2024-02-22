import { RowDataPacket } from 'mysql2';
import pool from './connection_pool';
import { AppUser, AddUserResult } from 'app-types';


const fetchUsers = async (): Promise<AppUser[]> => {
  return pool.execute(
    `SELECT
      *
    FROM USER`
  )
  .then(([rows, fields]) => {
    return rows as AppUser[];
  })
  .catch((err) => {
    console.error("[fetchUsers] error: " + err);
    throw err;
  });
};

const findUserById = async (id: string): Promise<AppUser> => {
  console.log("findUserById: " + id);
  return pool.execute<RowDataPacket[]>(
    `SELECT
      *
    FROM USER
    WHERE
      user_id = ?`,
    [id]
  )
  .then(([rows]) => {
    if (rows.length !== 1) {
      throw new Error("User search failed. fetch rows: " + rows.length);
    }
    return rows[0] as AppUser;
  })
  .catch((err) => {
    console.error("[findUserById] error: " + err);
    throw err;
  });
}

const addUser = async (userid: string, name: string, email: string, password: string): Promise<AddUserResult> => {
  return pool.execute<RowDataPacket[]>(
    `INSERT INTO USER (
      user_id,
      name,
      email,
      password
    ) VALUES (
      ?, ?, ?, ?
    )`,
    [userid, name, email, password]
  )
  .then(() => {
    return { success: true } as AddUserResult;
  })
  .catch((err) => {
    console.error("[addUser] error: " + err);
    throw err;
  });
}

export default {
  fetchUsers,
  findUserById,
  addUser
};