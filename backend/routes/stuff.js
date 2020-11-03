const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const stuffCtlr = require('../controllers/stuff');
const isOwner = require("../middleware/isOwner");



//Création d'une sauce
router.post('/', auth, multer, stuffCtlr.createSauce);

//Récupération de toutes les sauces
router.get('/', auth, stuffCtlr.getAllSauces);

//Récupération d'une sauce spécifique
router.get('/:id', auth, stuffCtlr.getOneSauce);

//Modification d'une sauce
router.put('/:id', auth, isOwner, multer, stuffCtlr.modifySauce);

//Supression d'une sauce
router.delete('/:id', auth, isOwner, stuffCtlr.deleteSauce);

//L'utilisateur aime une sauce
router.post('/:id/like', auth, stuffCtlr.likeOneSauce);


module.exports = router;