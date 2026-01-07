const mongoose = require(`mongoose`)

const matchSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  localTeam: {
    type: String,
    required: true,
    minlength: 3
  },
  localGoals: {
    type: Number,
    required: true,
    min: 0
  },
  visitTeam: {
    type: String,
    required: true,
    minlength: 3
  },
  visitGoals: {
    type: Number,
    required: true,
    min: 0
  },
  competition: {
    type: String,
    required: true,
    minlength: 3
  },
  timeView: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true
  },
  comment: String
})

// Delete default id an _v
matchSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model(`Match`, matchSchema)