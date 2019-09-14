const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var express = require('express');
var router = express.Router();

router.get('/t1',function(req,res,next){
const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
  author: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);



const author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
});
author.save(function(err,result){
const story1 = new Story({
    title: 'Casino Royale',
    author: author._id    // assign the _id from the person
  });
  console.log(result);

  story1.save(function (err) {
    if (err) return handleError(err);
    // thats it!
  });
});


Story.
  find({ title: 'Casino Royale' }).exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The aut %s', story);
    // prints "The author is Ian Fleming"
  });
Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story);
    // prints "The author is Ian Fleming"
  });
});
module.exports = router;