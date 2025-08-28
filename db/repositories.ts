import { eq, like } from "drizzle-orm";
import { dbClient } from "@db/client.js";
import { usersTable, sessionsTable } from "@db/schema.js";
import bcrypt from "bcrypt";

export async function getAllUserSessions(userId: string) {
  if (!userId) return null;
  const likeString = `%${userId}%`;
  const results = await dbClient
    .select()
    .from(sessionsTable)
    .where(like(sessionsTable.sid, likeString));
  return results;
}

export async function deleteSession(sid: string) {
  return await dbClient
    .delete(sessionsTable)
    .where(eq(sessionsTable.sid, sid))
    .returning();
}

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  const saltRounds = 10;
  let hashedPassword = "";
  hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
  await dbClient
    .insert(usersTable)
    .values({
      name,
      email,
      isAdmin: false,
      password: hashedPassword,
      avatarURL: "logos/robot.png",
    })
    .returning({ id: usersTable.id });
}
