import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deletePostHandler(app) {
  app.delete("/user/:id/post/:postId/delete", async (req, res) => {
    try {
      const userId = req.params.id;
      const postId = req.params.postId;

      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: { authorId: true },
      });

      //verificar existência do post
      if (!post) {
        return res.status(404).send({ message: "Postagem não encontrada" });
      }

      // verificar autenticidade do autor
      if (post.authorId !== userId) {
        return res.status(403).send({
          message: "Você não tem permissão para excluir esta postagem",
        });
      }

      await prisma.post.delete({ where: { id: postId } });

      return res.status(200).send({ message: "Postagem excluída com sucesso" });
    } catch (err) {
      console.error("Erro ao excluir postagem:", err);
      return res.status(500).send({ message: "Erro ao excluir postagem" });
    }
  });
}