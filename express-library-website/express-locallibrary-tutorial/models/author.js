var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema (
  {
    first_name: {type: String, required: true, max: 100},
    family_name : {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's first name
AuthorSchema
.virtual('name')
.get(function(){
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function (){
  return '/catalog/author/' + this._id;
});

// Virtual for date of birth formatted using moment
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function (){
  return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});

// Virtual for date of death formatted using moment
AuthorSchema
.virtual('date_of_death_formatted')
.get(function (){
  return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
});

// Virtual for lifespan
AuthorSchema
.virtual('lifespan')
.get(function (){
  var lifespanStr = '';

  if(this.date_of_birth){
    lifespanStr += moment(this.date_of_birth).format('MMMM Do, YYYY');
  }

  lifespanStr += ' - ';
  if(this.date_of_death){
    lifespanStr += moment(this.date_of_death).format('MMMM Do, YYYY');
  }

  return lifespanStr;
});

// Export model
module.exports = mongoose.model('Author', AuthorSchema);