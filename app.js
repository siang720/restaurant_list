// include express from node_modules
const express = require("express");
const app = express();

// Define server related variables
const port = 3000;

// require handlebars here
const exphbs = require("express-handlebars");

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting static file
app.use(express.static("public"));

// require restaurant.json
const restaurantList = require("./restaurant.json");

// handle req and res
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  );
  res.render("show", { restaurant: restaurant });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase());
  });
  res.render("index", { restaurants: restaurants, keyword: keyword });
});

// start and listen
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
