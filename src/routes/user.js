const express = require("express"); //Se llama al modulo express
const userSchema = require("../models/user");
const router = express.Router(); // Es un constructor que sirve para crear un enrutador.

//Se define la ruta para crear un usuario - create user. 

router.post('/users', (req, res) => {

   const user = userSchema(req.body) //Va a retornar el usuario que se creo.
   user
   .save()
   .then((data) => res.json(data))
   .catch((error) => res.json({ message: error })); 
});

//Se define la ruta para obtener un usuario - get all users
router.get("/users", (req, res) => {
    userSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

//Se define la ruta para obtener un usuario especifico - get a user
router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

  //Se define la ruta para actualizar un usuario - update a user

  router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { usuario, email, contraseña } = req.body;
    userSchema
      .updateOne({ _id: id }, { $set: { usuario, email, contraseña } })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

    //Se define la ruta para eliminar un usuario - delete a user

    router.delete("/users/:id", (req, res) => {
        const { id } = req.params;
        userSchema
          .deleteOne({ _id: id })
          .then((data) => res.json(data))
          .catch((error) => res.json({ message: error }));
      });
  

module.exports = router; //Se exporta el router. 