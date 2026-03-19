/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
    await knex.schema.raw("TRUNCATE creature_type CASCADE;");
  await knex('creature_type').del()
  await knex('creature_type').insert([
    {id: 1, type: 'lightner'},
    {id: 2, type: 'darkner'}
  ]);
};
