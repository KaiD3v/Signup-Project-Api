import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPostsHandler(app){
    app.get('/posts', async(req, res) => {
        try {
            const posts = await prisma.post.findMany();
      
            if (!posts || posts.length === 0) {
              return res.status(404).send({ message: "Nenhuma postagem encontrada!" });
            }
      
            return res.status(200).send({ posts });
          } catch (err) {
            console.error("Houve um erro ao buscar as postagens:", err);
            return res.status(500).send({ message: "Erro ao buscar postagens" });
          }
    })
}