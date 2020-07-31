'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Bookstore / Coffeeshop Library' });
});



module.exports = router;
