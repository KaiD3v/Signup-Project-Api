import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateCommentHandler(app) {
  try {
    app.put(
      "/user/:id/post/:postId/:commenterId/comment/:commentId",
      async (req, res) => {
        try {
          const commenterId = req.params.commenterId;
          const commentId = req.params.commentId;

          // Verificar se o comentário existe
          const comment = await prisma.comment.findUnique({
            where: { id: commentId },
            select: { authorId: true },
          });

          if (!comment) {
            return res.status(404).send({ message: "Comentário não encontrado" });
          }

          // Verificar se o usuário é o autor original do comentário
          if (comment.authorId !== commenterId) {
            return res.status(403).send({
              message: "Você não tem permissão para atualizar este comentário",
            });
          }

          // Atualizar o conteúdo do comentário com os dados fornecidos na solicitação
          const updatedComment = await prisma.comment.update({
            where: { id: commentId },
            data: {
              content: req.body.content,
            },
          });

          return res.status(200).send({
            message: "Comentário atualizado com sucesso",
            comment: updatedComment,
          });
        } catch (err) {
          console.error("Erro ao atualizar comentário:", err);
          return res.status(500).send({ message: "Erro ao atualizar comentário" });
        }
      }
    );
  } catch (error) {
    console.error("Erro ao registrar o manipulador de atualização de comentários:", error);
    throw error;
  }
}
