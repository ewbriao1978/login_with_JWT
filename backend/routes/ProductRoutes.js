
const express = require('express')
const productsController = require('../controllers/ProductsController')
const authenticate = require('../middlewares/auth');

const router = express.Router()

router.post("/register",productsController.registerUser)
router.post("/login", productsController.doLogin)
// rotas protegidas
router.get("/welcome",authenticate, productsController.welcomeFunction)
router.get('/products', authenticate, productsController.listProducts)    

module.exports = router