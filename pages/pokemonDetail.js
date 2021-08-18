const pokedex = require('./pokedex');

module.exports = async function(req, res, next){
  try{
    const response = await pokedex.getPokemonByName(req.body.name);
    const result = {};

    result.id = response.id;
    result.name = response.name;
    result.species = response.species.name;
    result.abilities = response.abilities.map(a => a.ability.name);
    result.base_experience = response.base_experience;
    result.versions = response.game_indices.map(index => index.version.name);
    result.height = response.height;
    result.moves = response.moves.map(move => move.move.name);
    result.img = response.sprites.other['official-artwork'].front_default;
    result.types = response.types.map(type => type.type.name);
    result.stats = response.stats.reduce((p, c) => {
      return {
        ...p,
        [c.stat.name]: c.base_stat
      }
    },{});

    res.status(200).json({
      status: 200,
      message: 'Success',
      data: {
        result
      }
    });
  }catch(err){
    next(err);
  }
}