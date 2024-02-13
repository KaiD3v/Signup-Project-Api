import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function authUserHandler(app) {
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user) {
        return res.status(401).send({ message: "Credenciais Inválidas." });
      }

      // verificar hash da senha
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).send({ message: "Credenciais Inválidas." });
      }

      // gerar token
      const token = jwt.sign({ userId: user.id }, "SECRET KEY");

      return res.status(200).send({ token });
    } catch (err) {
      console.error("Erro ao autenticar usuário:", err);
      return res.code(500).send({ message: "Erro ao autenticar usuário" });
    }
  });
}
