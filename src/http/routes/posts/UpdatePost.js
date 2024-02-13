import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updatePostHandler(app) {
  app.put("/user/:id/post/:postId/update", async (req, res) => {
    try {
      const { id: userId, postId } = req.params; // Extrai o id do usuário e o id da postagem dos parâmetros da rota
      const { title, content } = req.body; // Extrai os dados da postagem do corpo da solicitação

      // Verifica se a postagem existe
      const existingPost = await prisma.post.findUnique({
        where: { id: postId },
        include: { author: true }, // Inclui o autor da postagem para verificação
      });
      if (!existingPost) {
        return res.status(404).send({ message: "Postagem não encontrada" });
      }

      // Verifica se o usuário é o autor original da postagem
      if (existingPost.authorId !== userId) {
        return res
          .status(403)
          .send({
            message: "Você não tem permissão para atualizar esta postagem",
          });
      }

      // Atualiza a postagem
      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          title: title || existingPost.title,
          content: content || existingPost.content,
        },
      });

      return res
        .status(200)
        .send({
          message: "Postagem atualizada com sucesso",
          post: updatedPost,
        });
    } catch (err) {
      console.error("Erro ao atualizar postagem:", err);
      return res.status(500).send({ message: "Erro ao atualizar postagem" });
    }
  });
}
