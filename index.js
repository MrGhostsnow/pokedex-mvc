const { application } = require("express");
const express = require("express");
const res = require("express/lib/response");
const path = require("path");
const { fileURLToPath } = require("url");
const app = express();
let message = "";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const pokedex = [
    {
        id : 1,
        nome: "Bulbasaur",
        tipo: "Planta",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
        descricao: "Há uma semente de planta nas costas desde o dia em que este Pokémon nasce. A semente cresce lentamente.",
        altura: "0.7 m",
        peso: "6.9 kg",
        categoria: "Semente",
        habilidade: "Overgrow",
    },
    {
        id : 2,
        nome: "Squirtle",
        tipo: "Água",
        imagem:"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
        descricao: "Quando retrai seu longo pescoço em sua concha, esguicha água com força vigorosa.",
        altura: "0.5 m",
        peso: "9.0 kg",
        categoria: "Pequena Tartaruga",
        habilidade: "Torrent",
    },
    {
        id : 3,
        nome: "Charmander",
        tipo: "Fogo",
        imagem:"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
        descricao: "Tem preferência por coisas quentes. Quando chove, diz-se que o vapor jorra da ponta de sua cauda.",
        altura: "0.6 m",
        peso: "8.5 kg",
        categoria: "Lagarto",
        habilidade: "Blaze",
    },
    {
        id : 4,
        nome: "Pikachu",
        tipo: "Elétrico",
        imagem:"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png",
        descricao: "Pikachu que pode gerar eletricidade poderosa tem bolsas nas bochechas que são extra macias e super elásticas.",
        altura: "0.4 m",
        peso: "6.0 kg",
        categoria: "Rato",
        habilidade: "Static",
    },
]



app.get("/", (req, res) => {
  setTimeout(() => {
       message = "";     
  }, 1000);
  
    res.render("index.ejs" , {pokedex, message});
});

app.get("/index.ejs", (req, res)=>{
    res.render("index.ejs", {pokedex})
});

 app.get("/cadastro", (req,res) => {
    res.render("cadastro.ejs")
 });

 app.post("/create", (req, res)=>{
    const pokemon = req.body;
    pokemon.id = pokedex.length + 1;
    pokedex.push(pokemon);
    message = "Pokémon criado com sucesso";
    res.redirect("index.ejs")
 });
 
//  app.get("/detalhes/:id", (req, res) =>{
//       let pokemon = [] 
//        pokedex.filter((element) => {
//            if(element.id == req.params.id){
//                pokemon.push(element.id);
//            } 
//         console.log(pokemon)
//         })
//         res.render("detalhes.ejs" , {pokemon})
//     });

 app.get("/detalhes/:id", (req, res) => {
       const id = req.params.id;
      const pokemon = pokedex[id - 1];
       res.render("detalhes.ejs", {pokemon,
       });
 });

 app.get("/delete/:id", (req, res)=> {
    const id = +req.params.id - 1;
     delete pokedex[id];
     res.redirect("/#cards");
 })

app.listen(3000, ()=> console.log("Servidor rodando em http://localhost:3000"));
