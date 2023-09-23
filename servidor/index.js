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

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});