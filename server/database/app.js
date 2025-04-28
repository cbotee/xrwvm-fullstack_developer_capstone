/*jshint esversion: 8 */
const express = require('express');
/*jshint esversion: 8 */
const mongoose = require('mongoose');
/*jshint esversion: 8 */
const fs = require('fs');

const  cors = require('cors')
const app = express()
const port = 3030;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));

/*jshint esversion: 8 */
const reviews_data = JSON.parse(fs.readFileSync("reviews.json", 'utf8'));

/*jshint esversion: 8 */
const dealerships_data = JSON.parse(fs.readFileSync("dealerships.json", 'utf8'));

mongoose.connect("mongodb://mongo_db:27017/",{'dbName':'dealershipsDB'});

/*jshint esversion: 8 */
const Reviews = require('./review');

/*jshint esversion: 8 */
const Dealerships = require('./dealership');

try {
  /*jshint esversion: 8 */
  Reviews.deleteMany({}).then(()=>{
    Reviews.insertMany(reviews_data.reviews);
  });
  /*jshint esversion: 8 */
  Dealerships.deleteMany({}).then(()=>{
    Dealerships.insertMany(dealerships_data.dealerships);
  });
  
} catch (error) {
  res.status(500).json({ error: 'Error fetching documents' });
}


// Express route to home
/*jshint esversion: 8 */
app.get('/', async (req, res) => {
    res.send("Welcome to the Mongoose API");
});

// Express route to fetch all reviews
/*jshint esversion: 8 */
app.get('/fetchReviews', async (req, res) => {
  try {
    /*jshint esversion: 8 */
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});


// Express route to fetch reviews by a particular dealer
/*jshint esversion: 8 */
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    /*jshint esversion: 8 */
    const documents = await Reviews.find({dealership: req.params.id});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch all dealerships
/*jshint esversion: 8 */
app.get('/fetchDealers', async (req, res) => {
  try {
    /*jshint esversion: 8 */
    const documents = await Dealerships.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch Dealers by a particular state
/*jshint esversion: 8 */
app.get('/fetchDealers/:state', async (req, res) => {
  try {
    /*jshint esversion: 8 */
    const documents = await Dealerships.find({state: req.params.state});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch dealer by a particular id
/*jshint esversion: 8 */
app.get('/fetchDealer/:id', async (req, res) => {
  try {
    /*jshint esversion: 8 */
    const documents = await Dealerships.find({id: req.params.id});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

//Express route to insert review
/*jshint esversion: 8 */
app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  data = JSON.parse(req.body);
  /*jshint esversion: 8 */
  const documents = await Reviews.find().sort( { id: -1 } );
  /*jshint esversion: 8 */
  let new_id = documents[0].id+1;

  /*jshint esversion: 8 */
  const review = new Reviews({
		"id": new_id,
		"name": data.name,
		"dealership": data.dealership,
		"review": data.review,
		"purchase": data.purchase,
		"purchase_date": data.purchase_date,
		"car_make": data.car_make,
		"car_model": data.car_model,
		"car_year": data.car_year,
	});

  try {
    /*jshint esversion: 8 */
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
		console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Start the Express server
/*jshint esversion: 8 */
app.listen(port, () => {
  /*jshint esversion: 8 */
  console.log(`Server is running on http://localhost:${port}`);
});