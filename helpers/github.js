const request = require('request');
const config = require('../config.js');
const axios = require('axios')
const db = require('../database/index.js')

let getReposByUsername = (username) => {
  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  return axios.get(`https://api.github.com/users/${username}/repos`, options)
  .then(response => {
    let collection = [];
    response.data.forEach((singleRepo) => {
      let modelObjects = {}
      modelObjects.username = singleRepo.owner.login;
      modelObjects.repo_name = singleRepo.name;
      modelObjects.repo_id = singleRepo.id
      modelObjects.repo_url = singleRepo.html_url
      modelObjects.repo_forks = singleRepo.forks
      collection.push(modelObjects)
    })
    collection.sort((a, b) => {return b.repo_forks - a.repo_forks});
    let top25 = collection.slice(0, 25);
    console.log('HERE ARE TOP 25 REPOS', top25)
    return top25
  })
  .then((data) => {
    db.save(data)
    console.log('THIS IS THE SAVED DATA', data)
    return data
  })

}

module.exports.getReposByUsername = getReposByUsername;
