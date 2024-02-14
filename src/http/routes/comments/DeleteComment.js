import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteCommentHandler(app) {
  app.delete(
    "/user/:userId/post/:postId/comment/:commentId/:commenterId/delete",
    async (req, res) => {
      try {
        const userId = req.params.userId;
        const commentId = req.params.commentId;
        const commenterId = req.params.commenterId;

        // Verificar se o comentário existe
        const comment = await prisma.comment.findUnique({
          where: { id: commentId },
          select: { authorId: true },
        });

        if (!comment) {
          return res.status(404).send({ message: "Comentário não encontrado!" });
        }

        // Verificar se o usuário é o autor do comentário
        if (commenterId !== comment.authorId) {
            return res.status(403).send({
              message: "Você não tem autorização para deletar este comentário!",
            });
          }

        // Verificar se o commenterId é o mesmo que authorId do comentário
        if (commenterId !== comment.authorId) {
          return res.status(403).send({
            message: "O commenterId não corresponde ao autor do comentário!",
          });
        }

        // Deletar o comentário
        await prisma.comment.delete({ where: { id: commentId } });

        return res.status(200).send({ message: "Comentário deletado com sucesso" });
      } catch (err) {
        console.error("Erro ao deletar comentário:", err);
        return res.status(500).send({ message: "Erro ao deletar comentário" });
      }
    }
  );
}
