import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function CreatePostHandler(app) {
  app.post("/user/:id/post", async (req, res) => {
    try {
        const userId = req.params.id;
        const { title, content } = req.body;
  
        const existingUser = await prisma.user.findUnique({
          where: { id: userId },
        });
        if (!existingUser) {
          return res.status(404).send({ message: "Usuário não encontrado!" });
        }
  
        // Criar novo post associado ao usuário
        const newPost = await prisma.post.create({
          data: {
            title,
            content,
            author: { connect: { id: userId } },
          },
        });

      await prisma.$disconnect();
      return res.code(201).send({ post: newPost });
    } catch (err) {
      console.error("Erro ao realizar postagem:", err);
      return res.code(500).send({ message: "Erro ao realizar postagem" });
    }
  });
}