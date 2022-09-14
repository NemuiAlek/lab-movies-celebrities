const router = require("express").Router();
const Celebrity = require('../../models/Celebrity.model')

router.get("/", (req, res, next) => {

  Celebrity.find()
  .then((celebsFromDb) => {
    console.log({celebsFromDb});

    const data = {
      celebs: celebsFromDb
    }

    res.render("celebs", data);
  }).catch(err => {
    console.log({err});
  });
})

router.get("/create", (req, res, next) => {
  res.render("new-celebs")
})

router.post("/post", (req, res, next) => {
  console.log(req.body);

  const newCeleb = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  }

  Celebrity.create(newCeleb)
  .then(() =>{
    res.redirect("/celebs")
  }).catch(err => {
  console.log({err});
  })

})

module.exports = router;
