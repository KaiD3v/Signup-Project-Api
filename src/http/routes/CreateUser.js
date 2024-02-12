import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function registerHandler(app) {
  app.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Verificar se o usuário já existe com o mesmo email
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        await prisma.$disconnect();
        return res.code(409).send('Usuário já existente!');
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar novo usuário
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      await prisma.$disconnect();

      return res.code(201).send({ user: newUser });
    } catch (err) {
      console.error("Erro ao registrar usuário:", err);
      return res.code(500).send({ message: "Erro ao registrar usuário" });
    }
  });
}