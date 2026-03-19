/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("light_world", (table) => {
    table.increments();
    table.string("name", 250);
    table.string("colour", 250);
    table.string("weapon", 250);
    table.string("favourite_food", 250);
    table.integer("dark_world_id");
    table.foreign("dark_world_id").references("dark_world.id");
    table.integer("creature_type_id");
    table.foreign("creature_type_id").references("creature_type.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("light_world", (table) => {
      table.dropForeign("dark_world_id");
      table.dropForeign("creature_type_id");
    })
    .then(function () {
      return knex.schema.dropTableIfExists("light_world");
    });
};
