const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtlr = require('../controllers/sauce');
const isOwner = require("../middleware/isOwner");



//Création d'une sauce
router.post('/', auth, multer, sauceCtlr.createSauce);

//Récupération de toutes les sauces
router.get('/', auth, sauceCtlr.getAllSauces);

//Récupération d'une sauce spécifique
router.get('/:id', auth, sauceCtlr.getOneSauce);

//Modification d'une sauce
router.put('/:id', auth, isOwner, multer, sauceCtlr.modifySauce);

//Supression d'une sauce
router.delete('/:id', auth, isOwner, sauceCtlr.deleteSauce);

//L'utilisateur aime une sauce
router.post('/:id/like', auth, sauceCtlr.likeOneSauce);


module.exports = router;