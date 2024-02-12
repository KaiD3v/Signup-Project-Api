import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsersHandler(app) {
  app.get("/users", async (req, res) => {
    try {
      const users = await prisma.user.findMany();

      if (!users || users.length === 0) {
        return res.status(404).send({ message: "Nenhum usuário encontrado!" });
      }

      return res.status(200).send({ users });
    } catch (err) {
      console.error("Houve um erro ao buscar usuários:", err);
      return res.status(500).send({ message: "Erro ao buscar usuários" });
    }
  });
}
