import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createCommentHandler(app) {
  app.post("/user/:id/post/:postId/comment", async (req, res) => {
    try {
      const userId = req.params.id;
      const postId = req.params.postId;
      const { comment } = req.body;

      // Verificar se o usuário existe
      const user = await prisma.user.findUnique({ 
        where: { id: userId },
        include: { posts: true }
      });
      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado!" });
      }

      // Encontrar o post específico
      const post = user.posts.find(post => post.id === postId);
      if (!post) {
        return res.status(404).send({ message: "Post não encontrado!" });
      }

      // Criar o comentário associado ao usuário e à postagem
      const newComment = await prisma.comment.create({
        data: {
          authorId: userId,
          authorName: user.name,
          content: comment,
          postId: postId,
        },
      });

      return res.status(201).send({
        message: "Comentário criado com sucesso",
        comment: newComment,
      });
    } catch (err) {
      console.error("Erro ao criar comentário:", err);
      return res.status(500).send({ message: "Erro ao criar comentário" });
    }
  });
}