import { Hono } from "jsr:@hono/hono@4.6.5";
import { getCookie, setCookie } from "jsr:@hono/hono@4.6.5/cookie";
import { cors } from "jsr:@hono/hono@4.6.5/cors";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";
import * as jwt from "jsr:@hono/hono@4.6.5/jwt";
import postgres from "postgres";

const COOKIE_KEY = "auth";
const JWT_SECRET = "secret";

const app = new Hono();
const sql = postgres();

app.use(
    "/*",
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

const clean = (data) => {
    data.username = data.username.trim().toLowerCase();
    data.password = data.password.trim();
};

app.post("/api/register", async (c) => {
    const data = await c.req.json();
    clean(data);

    const result = await sql`INSERT INTO users (username, password_hash)
    VALUES (${data.username},
    ${hash(data.password)}) RETURNING *`;

    return c.json({ "message": `Registered as user ${result[0].id}.` });
});

app.post("/api/login", async (c) => {
    const data = await c.req.json();
    clean(data);

    const result = await sql`SELECT * FROM users
        WHERE username = ${data.username}`;

    if (result.length === 0) {
        c.status(404);
        return c.json({
            "message": "Incorrect username or password.",
        });
    }

    const user = result[0];

    const passwordValid = verify(data.password, user.password_hash);
    if (passwordValid) {
        const payload = {
            id: user.id,
            username: user.username,
        };

        const token = await jwt.sign(payload, JWT_SECRET);

        setCookie(c, COOKIE_KEY, token, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            sameSite: "lax",
        });
        return c.json({
            "message": "Welcome!",
        });
    } else {
        c.status(404);
        return c.json({
            "message": "Incorrect username or password.",
        });
    }
});

app.use("/api/verify", jwt.jwt({ cookie: COOKIE_KEY, secret: JWT_SECRET}));

app.post("/api/verify", async (c) => {
    const cookieValue = getCookie(c, COOKIE_KEY);

    const { payload } = jwt.decode(cookieValue);
    setCookie(c, COOKIE_KEY, cookieValue, {
        path: "/",
        domain: "localhost",
        httpOnly: true,
        sameSite: "lax",
    });
    return c.json(payload);
});

// first, verify that the token is valid
app.use(
    "/api/notes/*",
    jwt.jwt({
        cookie: COOKIE_KEY,
        secret: JWT_SECRET,
    }),
);

// then, extract the user identifier from the token
const userMiddleware = async (c, next) => {
    console.log("Apply middleware");
    const token = getCookie(c, COOKIE_KEY);
    const { payload } = jwt.decode(token);
    c.user = payload;
    await next();
};
// app.use("/api/notes", userMiddleware);
app.use("/api/notes/*", userMiddleware);

app.get("/api/notes", async (c) => {
    console.log(c.user);
    const notes = await sql`SELECT * FROM notes WHERE user_id = ${c.user.id}`;
    return c.json(notes);
});
app.post("/api/notes", async (c) => {
    const { text } = await c.req.json();
    const result = await sql`INSERT INTO notes (user_id, text)
    VALUES (${c.user.id}, ${text}) RETURNING *`;
    return c.json(result[0]);
});

app.get("/api/notes/:id", async (c) => {
    const id = c.req.param("id");
    console.log(`Note id: ${id}`);
    const notes = await sql`SELECT * FROM notes
        WHERE id = ${id} AND user_id = ${c.user.id}`;
    if (notes.length <= 0) {
        c.status(404);
        return c.json({ error: "Note not found" });
    }
    return c.json(notes[0]);
});

export default app;