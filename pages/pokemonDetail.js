const pokedex = require('./pokedex');

module.exports = async function(req, res, next){
  try{
    console.log(req.body);
    const response = await pokedex.getPokemonByName(req.body.name);
    res.status(200).json(response);
  }catch(err){
    next(err);
  }
}