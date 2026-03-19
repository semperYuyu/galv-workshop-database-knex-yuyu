/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw("TRUNCATE light_world CASCADE;");
  await knex('light_world').del()
  await knex('light_world').insert([
    {id: 1, name: 'Kris', colour:'Green', weapon:'Pencil', favourite_food:'Pie', dark_world_id: 1, creature_type_id: 1},
    {id: 2, name: 'Susie', colour:'Ourple', weapon:'Hairbrush', favourite_food:'Chalk', dark_world_id: 2, creature_type_id: 1},
    {id: 3, name: 'Ralsei', colour:'Green?', weapon: 'None', favourite_food:'None', dark_world_id: 3, creature_type_id: 2}
  ]);
};
