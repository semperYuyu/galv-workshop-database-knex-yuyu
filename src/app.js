const express = require("express");
const app = express();
const port = 42069;
const knex = require("knex")(require("../knexfile.js")["development"]);

app.use(express.json());

app.get("/favicon.ico", (req, res) => {
  // a query SELECT * FROM favicon.ico was breaking app, so is gone now
  res.status(204).end();
});

app.get("/:tableName", (request, response) => {
  let { tableName } = request.params;
  console.log("omg someone's here");
  // knex returns a promise; must use .then() if want stuff out of it
  knex(tableName)
    .select("*")
    .then((data) => response.status(200).send(data));
});

app.get("/:tableName/:id", (request, response) => {
  let { tableName, id } = request.params;
  console.log("omg there they are");

  knex(tableName)
    .select("*")
    .where("id", id)
    .then((data) => response.status(200).send(data));
});

app.post("/:tableName", async (request, response) => {
  let {
    id,
    name,
    colour,
    weapon,
    favourite_food,
    dark_world_id,
    creature_type_id,
    type,
  } = request.body;
  let { tableName } = request.params;
  console.log("what the i dont want that D:");

  if (tableName == "dark_world") {
    await knex.insert({ id, name, colour, weapon }).into(tableName);
  } else if (tableName == "light_world") {
    await knex
      .insert({
        id,
        name,
        colour,
        weapon,
        favourite_food,
        dark_world_id,
        creature_type_id,
      })
      .into(tableName);
  } else if (tableName == "creature_type") {
    await knex.insert({ type }).into(tableName);
  }

  knex(tableName)
    .select("*")
    .then((data) => {
      response.status(200).send(data);
    });
});

app.patch("/:tableName/:id", async (request, response) => {
  let {
    newId,
    name,
    colour,
    weapon,
    favourite_food,
    dark_world_id,
    creature_type_id,
    type,
  } = request.body;

  let { tableName, id } = request.params;

  console.log("omg thx youuu");

  if (tableName == "dark_world") {
    await knex(tableName).where({ id: id }).update({
      name: name,
      colour: colour,
      weapon: weapon,
    });
  } else if (tableName == "light_world") {
    await knex(tableName).where({ id: id }).update({
      id: newId,
      name: name,
      colour: colour,
      weapon: weapon,
      favourite_food: favourite_food,
      dark_world_id: dark_world_id,
      creature_type_id: creature_type_id,
    });
  } else if (tableName == "creature_type") {
    await knex(tableName).where({ id: id }).update({
      type: type,
    });
  }

  knex(tableName)
    .select("*")
    .then((data) => response.status(200).send(data));
});

app.delete("/:tableName/:id", async (request, response) => {
  let { tableName, id } = request.params;

  await knex(tableName).where({ id: id }).del();

  knex(tableName)
    .select("*")
    .then((data) => response.status(200).send(data));
});

app.listen(port, () => {
  console.log(`app is listen at http://localhost:${port}`);
});
