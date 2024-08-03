const express = require("express");
const bp = require("body-parser");
const mongo = require("mongoose");
const app = express();


app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(bp.urlencoded({extended: true}));

mongo.connect("mongodb://localhost:27017/todolist")
    .then( () => console.log("Mongo conectado"))
    .catch( (err) => console.log("Erro ao conectar",err));

const listSchema = new mongo.Schema({
    list: String
});

const List = mongo.model("List",listSchema);

// List.insertMany([item1,item2,item3])
//     .then(() => console.log("itens salvos com sucesso"))
//     .catch(() => console.log("Erro ao salvar itens"));
    
app.get("/", (req,res) => {
    let today = new Date();
    let options = {
        weekend: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("pt-BR",options)
    //data
    List.find()
    .then((e) => {
        res.render('index',{KindOfDay: day, ItemLista: e})
    }
    ).catch((err) => console.log("Erro: " , err));

})

//save items rote
app.post("/", (req,res) => {

    const novo = req.body.novo;
    const item = new List({
        list: novo
    });

    item.save()
    res.redirect("/")
})
//delete rotes
app.post("/delete", (req,res) => {
    const del =  req.body.checkbox;
    console.log("del: ",del)
    List.findByIdAndDelete(del).then(() => console.log("suceso")).catch(() => console.log("eror"));
    res.redirect("/");
    
})

app.listen(3000, () => {
    console.log("Rodando na porta 3000");
})
