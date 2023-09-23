const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hotel_prueba"
});

db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
    } else {
        console.log("Conexión exitosa a la base de datos");
    }
});


//parte crud usuarios

app.post("/create", (req, res) => {
    const nro_doc = req.body.nro_doc;
    const nombre_usuario = req.body.nombre_usuario;
    const contrasena = req.body.contrasena;
    const id_rol = req.body.id_rol;

    db.query("INSERT INTO usuarios (nro_doc, nombre_usuario, contrasena, id_rol) VALUES (?, ?, ?, ?)", [nro_doc, nombre_usuario, contrasena, id_rol], (err, result) => {
        if (err) {
            console.error("Error al insertar en la base de datos:", err);
            res.status(500).send("Error interno en el servidor");
        } else {
            console.log("Registro exitoso");
            res.send("Registro exitoso :D");
        }
    });
});


app.get("/usuarios", (req, res) => {

    db.query("SELECT * FROM usuarios", (err, result) => {
       if(err){
        console.log(err);
       }else{
         res.send(result);
       }
    });
});


app.put("/update", (req, res) => {
    const nro_doc = req.body.nro_doc;
    const nombre_usuario = req.body.nombre_usuario;
    const contrasena = req.body.contrasena;
    const id_rol = req.body.id_rol;

    db.query("UPDATE usuarios SET nombre_usuario=?,contrasena=?,id_rol=? WHERE nro_doc=?", [nombre_usuario, contrasena, id_rol, nro_doc], (err, result) => {
        if (err) {
            console.error("Error al insertar en la base de datos:", err);
            res.status(500).send("Error interno en el servidor");
        } else {
            console.log("usuarioo actualizado exitoso");
            res.send("actualizado exitoso :D");
        }
    });
});



app.delete("/delete/:nro_doc", (req, res) => {
    const nro_doc = req.params.nro_doc;

    db.query("DELETE FROM  usuarios WHERE nro_doc=?", nro_doc, (err, result) => {
        if (err) {
            console.error("Error al insertar en la base de datos:", err);
            res.status(500).send("Error interno en el servidor");
        } else {
            console.log("usuarioo ELIMINADO exitoso");
            res.send("eliminado exitoso :D");
        }
    });
});



//parte login

// app.post("/login", (req, res) => {
//     const { username, password } = req.body;
  
//     // Buscar el usuario en la base de datos por nombre de usuario
//     db.query(
//       "SELECT * FROM usuarios WHERE nombre_usuario = ?",
//       [username],
//       (err, results) => {
//         if (err) {
//           console.error(err);
//           res.status(500).json({ message: "Error interno del servidor" });
//         } else if (results.length === 0) {
//           // El usuario no existe en la base de datos
//           res.status(401).json({ message: "Nombre de usuario incorrecto" });
//         } else {
//           const user = results[0];
  
//           // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
//           bcrypt.compare(password, user.contrasena, (err, isMatch) => {
//             if (err) {
//               console.error(err);
//               res.status(500).json({ message: "Error interno del servidor" });
//             } else if (isMatch) {
//               // Contraseña válida, generar un token JWT
//               const token = jwt.sign({ username: user.nombre_usuario }, 'secret_key');
  
//               // Responder con el token y un mensaje de éxito
//               res.json({ message: "Inicio de sesión exitoso", token });
//             } else {
//               // Contraseña incorrecta
//               res.status(401).json({ message: "Contraseña incorrecta" });
//             }
//           });
//         }
//       }
//     );
//   });
  

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});