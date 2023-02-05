const fs = require('fs');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTours = (req,res,next)=>{
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,duration,ratingsAverage',
  next();
}

exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(),req.query).filter().sort().limitFields().paginate();
    
    const tours = await features.query;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err
    })
  };
}

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid data sent'
    })
  }
};

exports.getTourById = async (req, res) => {
  try{
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      results: 1,
      data: {
        tour,
      },
    });
  }catch(err){
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid data sent'
    })
  }
  
};

exports.updateTour = async (req, res) => {
  try{
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
      runValidators: true
    });
    res.status(201).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }catch(err){
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid data sent'
    })
  }
};

exports.deleteTour = async (req,res)=> {
  try{
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }catch(err){
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid data sent'
    })
  }
}



