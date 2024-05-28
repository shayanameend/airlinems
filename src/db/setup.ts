import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { dbAuthToken, dbUrl } from "~/lib/env";

const turso = createClient({
	url: dbUrl,
	authToken: dbAuthToken,
});

export const db = drizzle(turso);
