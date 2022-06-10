/* 
1. Guardar al usuario en la DB
2. Buscar al usuario por email
3. Buscar al usuario por id
4. Editar la info de un usuario
5. Borrar un usuario de la DB */

const { text } = require('express');
const fs = require ('fs');

// Traemos el JSON de usuarios (fileName) y definimos métodos propios
const User = {
    fileName: './src/data/users.json',
    getData: function (){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
    },
    //trae todos los usuarios
    findAll: function (){
        return this.getData();
    },
    //buscamos un usuario por id
    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id)
        return userFound;
    },
    //buscamos por campo (email, fullName, id, etc.)
    findByField: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text)
        return userFound;
    },
    //agregamos un nuevo objeto al JSON, de acuerdo a lo que llega del form
    create: function (userData){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "));
        return newUser;
    },
    //generamos un id para el nuevo registro
    generateId: function (){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id + 1
        }
        return 1
    },
    //borramos un usuario de acuerdo al id
    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter( oneUser => oneUser.id !== id)
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, " "));
        return true;
    }
}


module.exports = User;