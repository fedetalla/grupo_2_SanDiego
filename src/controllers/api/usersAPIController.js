const db = require('../../database/models');

const usersAPIController = {
    'list': (req, res) => {
        db.User.findAll()
        .then(users => {

            let usuarios = []
            users.forEach(user => {
                let finalUser = {
                    id: user.id,
                    name: user.fullName,
                    email: user.email,
                    detail: 'http://localhost:3080/api/users/' + user.id
                }
                usuarios.push(finalUser)
            })
            let respuesta = {
                count: users.length,
                // meta: {
                //     status : 200,
                //     url: 'api/products'
                // },
                users: usuarios
            }
                res.json(respuesta);
            })
    },
    'detail': (req, res) => {
        db.User.findByPk(req.params.id)
            .then(user => {
                let respuesta = {
                    user:{
                        id: user.id,
                        name: user.fullName,
                        email: user.email,
                        image: user.image,
                    },
                    imageURL: '/public/img/users/' + user.image
                }
                res.json(respuesta);
            });
    }
}

module.exports = usersAPIController;