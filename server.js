const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.get("/items", (req, res) => {
  db.all("SELECT * FROM items", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/items", (req, res) => {
  const { nombre, precio, descripcion, cantidad, url } = req.body;

  if (!nombre || !descripcion) {
    res
      .status(400)
      .json({ error: "El nombre y la descripción son obligatorios" });
    return;
  }

  db.run(
    "INSERT INTO items (nombre, precio, descripcion, cantidad, url) VALUES (?, ?, ?, ?, ?)",
    [nombre, precio, descripcion, cantidad, url],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Elemento creado exitosamente" });
    }
  );
});

app.put("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const { nombre, precio, descripcion, cantidad, url } = req.body;

  if (!nombre || !descripcion) {
    res
      .status(400)
      .json({ error: "El nombre y la descripción son obligatorios" });
    return;
  }

  db.run(
    "UPDATE items SET nombre = ?, precio = ?, descripcion = ?, cantidad = ?, url = ? WHERE id = ?",
    [itemId, nombre, precio, descripcion, cantidad, url],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Elemento actualizado exitosamente" });
    }
  );
});

app.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;

  db.run("DELETE FROM items WHERE id = ?", [itemId], (err) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json({ message: "Elemento eliminado exitosamente" });
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocurrio un error en el servidor" });
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
