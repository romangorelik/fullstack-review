import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      username: ''
    }
    this.search = this.search.bind(this)
  }

  search (username) {
    axios.post(`/repos/${username}`)
      .then(response => this.setState({repos:response.data, username:username}))
      .catch(err => console.error(err))
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}
                username={this.state.username}/>
      <Search onSearch={this.search.bind(this)}
              username={this.state.username}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
