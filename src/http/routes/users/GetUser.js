import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserHandler(app) {
  app.get("/user/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          posts: {
            select: { id: true, title: true },
          },
        },
      });

      if (!user) {
        res.status(404).send({ message: "Usuário não encontrado!" });
      }

      return res.code(200).send({
        user: {
          name: user.name,
          email: user.email,
          posts: user.posts,
        },
      });
    } catch (err) {
      console.error("Houve um erro ao buscar usuário:", user);
      return res.code(500).send({ message: "Erro ao buscar usuário" });
    }
  });
}