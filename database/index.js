const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repo_owner: String,
  repo_name: String,
  repo_url: String,
  repo_forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (array) => {
  return Repo.collection.insert(array, (err, docs) => {
    if (err) console.err(err)
    else return docs
  })
}

let retrieve = () => {
	return Repo.find({})
}

let retrieveByUserName = (username) => {
  return Repo.find({username: username})
}

module.exports = {save, retrieve, retrieveByUserName};
