import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";

export async function checkSessionIdExists(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return reply.status(401).send("Unauthorized");
  }

  const user = await knex("users").where({ session_id: sessionId }).first();

  if (!user) {
    return reply.status(401).send("Unauthorized");
  }

  req.user = user;
}
