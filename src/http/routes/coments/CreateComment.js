import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createCommentHandler(app) {
  app.post("/user/:id/post/:postId/:commenterId/comment", async (req, res) => {
    try {
      const userId = req.params.id;
      const postId = req.params.postId;
      const commenterId = req.params.commenterId;
      const { comment } = req.body;

      // Verificar se o post existe
      const post = await prisma.post.findUnique({ where: { id: postId } });
      if (!post) {
        return res.status(404).send({ message: "Post não encontrado!" });
      }

      // Verificar se o usuário que está fazendo o comentário existe
      const commenter = await prisma.user.findUnique({ where: { id: commenterId } });
      if (!commenter) {
        return res.status(404).send({ message: "Usuário que está fazendo o comentário não encontrado!" });
      }

      // Criar o comentário associado ao usuário e à postagem
      const newComment = await prisma.comment.create({
        data: {
          authorId: commenterId,
          authorName: commenter.name,
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