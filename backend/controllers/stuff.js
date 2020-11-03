const Sauce = require('../models/sauce');
const fs = require('fs');



exports.createSauce = (req, res, next) => {

    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.updateOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Image remplacée !' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));

    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };


    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));



};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};


exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};


exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));

}



exports.likeOneSauce = (req, res, next) => {
    if (req.body.like == 1) {
        Sauce.updateOne({ _id: req.params.id }, {
            $push: {
                usersLiked: req.body.userId
            },
            $inc: {
                likes: 1
            }

        })
            .then(() => res.status(200).json({ message: 'Object liked' })
            )
            .catch(error => res.status(400).json({ error }));
    }




    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (req.body.like == 0) {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, {
                        $pull: {
                            usersLiked: req.body.userId
                        },
                        $inc: {
                            likes: -1
                        }
                    })
                        .then(() => res.status(200).json({ message: 'Liked retiré"' }))
                        .catch(error => res.status(400).json({ error }));


                }
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, {
                        $pull: {
                            usersDisliked: req.body.userId
                        },
                        $inc: {
                            dislikes: -1
                        }
                    })
                        .then(() => res.status(200).json({ message: 'Disliked retiré"' }))
                        .catch(error => res.status(400).json({ error }));
                }

            }
        })
        .catch(error => res.status(500).json({ error }));





    if (req.body.like == -1) {
        Sauce.updateOne({ _id: req.params.id }, {
            $push: {
                usersDisliked: req.body.userId
            },
            $inc: {
                dislikes: 1
            }

        })

            .then(() => res.status(200).json({ message: 'Object disliked' }))
            .catch(error => res.status(400).json({ error }));

    }
}




