// https://blog.logrocket.com/extend-express-request-object-typescript?utm_source=pocket_shared
import { usersTable } from "@db/schema.js";

type usersTableType = typeof usersTable.$inferSelect;

declare global {
  namespace Express {
    interface Request {
      // newField: string;
    }
    interface User extends usersTableType {}
  }
}

export {};
