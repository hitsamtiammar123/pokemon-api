const pokedex = require('./pokedex');

module.exports = async function(req, res, next){
  try{
    const response = await pokedex.getPokemonsList({
      limit: Number(req.query.limit) || 10,
      offset: Number(req.query.offset) || 0
    });
    const list = [];
    for(let i = 0; i < response.results.length; i++){
      const pokemon = response.results[i];
      const pResponse = await pokedex.getPokemonByName(pokemon.name);
      const r = {};
      
      r.id = pResponse.id;
      r.name = pokemon.name;
      r.base_experience = pResponse.base_experience;
      r.height = pResponse.height;
      r.species = pResponse.species.name;
      r.weight = pResponse.weight;
      r.types = pResponse.types.map(type => type.type.name);

      r.img = pResponse.sprites.other['official-artwork'].front_default;
      list.push(r);
    }

    res.status(200).json({
      status: 200,
      message: 'Data fetch successfully',
      data: {
        list
      },
    });
  }catch(err){
    next(err);
  }
}