
const express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports= {

async registerUser (req, res) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = await prisma.user.create({
        data: { username, password: hashedPassword },
      });
      res.json({ message: "User registered successfully", user });
    } catch (err) {
      res.status(400).json({ error: "User already exists" });
    }
  },
  
  // Login de usuário
  async doLogin(req, res) {
    const { username, password } = req.body;
  
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
  
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ error: "Invalid credentials" });
  
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  
    res.json({ token });
  },
  
  // Middleware para autenticação
  
  
  // Rota protegida
  async welcomeFunction (req, res) {
    res.json({ message: `Bem-vindo ${req.user.username}` });
  }, 
  
  
  async listProducts (req, res) {
      try {
        const products = await prisma.product.findMany();
        res.json(products);
      } catch (err) {
        res.status(500).json({ error: "Error fetching products" });
      }
    }


};