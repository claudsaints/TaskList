const express = require("express");
const bp = require("body-parser");
const mongo = require("mongoose");
const app = express();


app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(bp.urlencoded({extended: true}));

mongo.connect("mongoose://localhost:27017/todolist")
    .then( () => console.log("Mongo conectado"))
    .catch( () => console.log("Erro ao conectar"));

const listSchema = new mongo.Schema({
    list: String
});

const List = mongo.model("List",listSchema);

const item1 = new List({
    list: "Tenho que estudar mais inglês"
});

const item2 = new List({
    list: "Tenho que estudar mais Russo"
});

const item3 = new List({
    list: "Tenho que estudar matemática"
});

List.insertMany([item1,item2,item3])
    .then(() => console.log("itens salvos com sucesso"))
    .catch(() => console.log("Erro ao salvar itens"));
    




let items = [];

app.get("/", (req,res) => {
    let today = new Date();
    let options = {
        weekend: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("pt-BR",options)
    res.render('index',{KindOfDay: day, ItemLista: items})
})

app.post("/", (req,res) => {
    const novo = req.body.novo;
    items.push(novo);
    res.redirect("/")
})

app.listen(3000, () => {
    console.log("Rodando na porta 3000");
})
