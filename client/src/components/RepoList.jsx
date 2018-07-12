import React from 'react';


const RepoList = ({repos, username}) => (
  <div>
    {console.log(repos)}
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    <h4> Username: {username}</h4>
    {
    	repos.map((repo, i) => {
    		return (
    			<div key={i}>
                    <ul>
                        <li>Repo Name: {repo.repo_name}</li>
                        <li>Repo Forks: {repo.repo_forks}</li>
                        <a href={repo.repo_url}>Description: {repo.repo_name}</a>
                    </ul>
    			</div>
    			)
    	})
    }
  </div>
)

export default RepoList;
