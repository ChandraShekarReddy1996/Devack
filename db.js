var mongoose = require('mongoose')

var state = {
  db : null,
}

exports.connect = (url,done){
  if(state.db == null) return done();
  mongoose.connect('mongodb://localhost:27017/Library',(er,db){
    if(err) return done(err)
    state.db = db
    done()
  })
}

exports.get = () => {
  return state.db
}

exports.close = (done) ={
  if(state.db){
    state.db.close((err,result) => {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}
