import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function deleteHandler(app) {
  app.delete("/user/delete/:id", async (req, res) => {
    try {
      const userId = req.params.id

      // Verificar se o usuário já existe com o mesmo email
      const existingUser = await prisma.user.findUnique({ where: { id: userId } });
      if (!existingUser) {
        return res.code(404).send('Usuário não encontrado!');
      }

      await prisma.user.delete({where: {id: userId}})

      return res.code(204).send({message: 'Usuário deletado com sucesso!'});
    } catch (err) {
      console.error("Erro ao registrar usuário:", err);
      return res.code(500).send({ message: "Erro ao excluir usuário" });
    }
  });
}