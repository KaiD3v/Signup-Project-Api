import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPostHandler(app) {
  app.get("/user/:authorId/post/:postId", async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
          comments: true
        }
      });

      if (!post) {
        return res.status(404).send({ message: "Postagem não encontrada" });
      }

      return res.status(200).send({
        post: {
          title: post.title,
          content: post.content,
          comments: post.comments 
        },
      });
    } catch (err) {
      console.error("Erro ao buscar postagem:", err);
      return res.status(500).send({ message: "Erro ao buscar postagem" });
    }
  });
}