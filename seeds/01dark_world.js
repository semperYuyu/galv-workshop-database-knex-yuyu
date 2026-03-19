/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.schema.raw("TRUNCATE dark_world CASCADE;");
  await knex("dark_world").del();
  await knex("dark_world").insert([
    { id: 1, name: "Kris", colour: "Blue", weapon: "Sword" },
    { id: 2, name: "Susie", colour: "Ourple", weapon: "Axe" },
    { id: 3, name: "Ralsei", colour: "Green", weapon: "Scarf" },
  ]);
};
