'use strict';

const { Router } = require('express');
const router = new Router();
const Place = require('./../models/place');

//PLACE-SHOW CREATE FORM 
router.get('/create', (req, res, next) => {
  res.render('place/create');
});

// PLACE-POST CREATE FORM
router.post('/create', (req, res, next) => {
  const name = req.body.name;

  const type = req.body.type;
  console.log(type);
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  Place.create({
    name,
    type,
    location: {coordinates: [latitude, longitude] }
  })
  .then(() => {
    res.redirect('/');
  })
  .catch(err => {
    next(err);
  });
});

//DISPLAY PLACE LIST
router.get('/list', (req, res, next) => {
  Place.find()
  .then(places => {
    res.render('place/list', {places});
  })
  .catch(err => {
    next(err);
  });
});

//PLACE-EDIT ROUTE
router.get('/single/:placeId', (req, res, next) => {
  const placeId = req.params.placeId;

  Place.findById({_id: placeId})
  .then(place => {
    res.render('place/single',{place});
  })
  .catch(err => {
    next(err);
  });
});

router.get('update/:placeId', (req, res, next) => {
  const placeId = req.params.id;
  Place.findById({_id: placeId})
  .then(place => {
    res.render('place/update', {place});
  })
  .catch(err => {
    next(err);
  });
});

router.post('update/:placeId',(req, res,next) => {
  const placeId = req.params.placeId;
  const name = req.body.name;
  const type = req.body.type;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  Place.findByIdAndUpdate(
    {_id: placeId},
    {
      name,
      type,
      location: {
        coordinates: [latitude, longitude]
      }
    }
  ).then(place => {
    res.render('place/update', {place});
  })
  .catch(err => {
    next(err);
  });
});

router.post('/:placeId/delete', (req, res, next) => {
  const placeId = req.params.placeId;


  Place.findOneAndDelete({ _id: placeId})
    .then(() => {
      res.redirect('/place/list');
    })
    .catch(error => {
      next(error);
    });
});



module.exports = router;