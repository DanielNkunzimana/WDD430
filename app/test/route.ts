import postgres from "postgres";

export async function GET() {
  try {
    const sql = postgres(process.env.POSTGRES_URL!, {
      ssl: { rejectUnauthorized: false },
    });

    const result = await sql`SELECT 1 AS ok`;

    return Response.json(result);
  } catch (error: any) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
