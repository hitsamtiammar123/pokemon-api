const pokedex = require('./pokedex');

module.exports = async function(req, res, next){
  try{
    console.log(req.body);
    const response = await pokedex.getPokemonsList({
      limit: req.body.limit || 10,
      offset: req.body.offset || 0
    });
    const list = [];
    for(let i = 0; i < response.results.length; i++){
      const pokemon = response.results[i];
      const pResponse = await pokedex.getPokemonByName(pokemon.name);
      const r = {};
      
      r.id = pResponse.id;
      r.name = pokemon.name;
      r.exp = pResponse.base_experience;
      r.height = pResponse.height;
      r.species = pResponse.species.name;
      r.weight = pResponse.weight;
      r.stats = pResponse.stats.reduce((p, c) => {
        return {
          ...p,
          [c.stat.name]: c.base_stat
        }
      },{});
      
      // pResponse.stats.forEach(stat => {
      //   r[stat.stat.name] = stat.base_stat;
      // });

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