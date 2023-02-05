const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();
const authController = require('./../controllers/authController');

// router.param('id', tourController.checkId);

router.route('/top-5-tours').get(tourController.aliasTours,tourController.getAllTours)

router
  .route('/')
  .get(authController.protect,tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(authController.protect, authController.restrictTo('admin','guide'), tourController.deleteTour);

module.exports = router;
