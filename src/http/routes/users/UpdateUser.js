import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateHandler(app) {
  app.put("/user/update/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, email } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!existingUser) {
        return res.status(404).send({ message: "Usuário não encontrado!" });
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name: name || existingUser.name,
          email: email || existingUser.email,
        },
      });

      console.log(`User: ${JSON.stringify(updatedUser)}`);

      return res
        .status(200)
        .send({ message: "Usuário atualizado com sucesso", user: updatedUser });
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      return res.status(500).send({ message: "Erro ao atualizar usuário" });
    }
  });
}
