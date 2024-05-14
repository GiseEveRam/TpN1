import express, { json } from "express";
import fs from "fs";
//MIDELWARE
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try{
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);

    } catch (error) {
        console.log(error);

    }
    

};

const writeData = (data) => {
    try{
        fs.writeFileSync("./db.json", JSON.stringify(data));

    } catch (error) {
        console.log(error);

    }

};

app.get("/", (req, res) => {
    res.send("Welcome to my Api!!!");

});

//ENDOPOINTS PARA LA DB
app.get("/peliculas", (req, res) => {
    const data = readData();
    res.json(data.peliculas);

});

app.get("/peliculas/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const pelicula = data.peliculas.find((pelicula) => pelicula.id === id);
    res.json(pelicula);

});

//OBTENER

app.post("/peliculas", (req, res) => {
    const data = readData();
    const body = req.body;
    const newPelicula = {
        id: data.peliculas.legth + 1,
        ...body,
    };

    data.peliculas.push(newPelicula);
    writeData(data);
    res.json(newPelicula);

});

app.put("/peliculas/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const peliculaIndex = data.peliculas.findIndex((pelicula) => pelicula.id === id);
    data.peliculas[peliculaIndex] = {
        ...data.peliculas[peliculaIndex],
        ...body,
    };
    writeData(data);
    res.json({ message : "Pelicula modificada"});
});
app.delete("/peliculas/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const peliculaIndex = data.peliculas.findIndex((pelicula) => pelicula.id === id);
    data.peliculas.splice(peliculaIndex, 1);
    writeData(data);
    res.json({ message: "peliculas eliminada!!"});
   
});

app.listen(3000, () =>{
    console.log('Servidor corriendo en puerto 3000');
});

