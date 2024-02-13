import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPostHandler(app) {
  app.get("/user/:id/post/:postId", async (req, res) => {
    // const userId = req.params.id;
    const postId = req.params.postId;

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      res.status(404).send({ message: "Postagem não encontrada" });
    }

    return res.status(200).send({
      post: {
        title: post.title,
        content: post.content,
      },
    });
  });
}
