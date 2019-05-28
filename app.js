$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;

        // Make a request to Github
        $.ajax({
            url:'https://api.github.com/users/'+username,
            data: {
                client_id:'db7c01b4c6c5239d81b0',
                client_secret:'166c4c028ea67623c6bd9270b0334ad291faed79'
            }
        }).done(function(user){
            $.ajax({
              url:'https://api.github.com/users/'+username+'/repos',
              data:{
                client_id:'db7c01b4c6c5239d81b0',
                client_secret:'166c4c028ea67623c6bd9270b0334ad291faed79'
              }
            }).done(function(repos){
              $.each(repos, function(index, repo){
                $('#repos').append(`
                  <div class="card">
                    <div class="row align-items-center justify-content-center">
                      <div class="col-md-7">
                        <strong>${repo.name}</strong>: ${repo.description}
                      </div>
                      <div class="col-md-3 ">
                        <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                        <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                        <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                      </div>
                      <div class="col-md-2">
                        <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                      </div>
                    </div>
                  </div>
                `);
              });
            });
            $('#profile').html(`
              <div class="card">
                <div class="card-header"><h3>${user.name}</h3></div>
                <div class="card-body">
                  <div class="row justify-content-center align-items-center text-center">
                  <div class="col-md-6">
                    <img class="img- avatar" src="${user.avatar_url}"><br>
                    <a target="_blank" class="btn btn-primary btn-lg m-4" href="${user.html_url}">View Profile</a>
                  </div>
                  <div class="col-md-6">
                    <span class="badge-pill badge-dark p-2">Public Repos: ${user.public_repos}</span>
                    <span class="badge-pill badge-primary p-2">Public Gists: ${user.public_gists}</span>
                    <span class="badge-pill badge-success p-2">Followers: ${user.followers}</span>
                    <span class="badge-pill badge-info p-2">Following: ${user.following}</span>
                    <br><br>
                    <ul class="list-group">
                      <li class="list-group-item">Company: ${user.company}</li>
                      <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                      <li class="list-group-item">Location: ${user.location}</li>
                      <li class="list-group-item">Member Since: ${user.created_at}</li>
                    </ul>
                    </div>
                  </div>
                </div>
              </div>
              <h3 class="page-header mt-3 mb-3">Latest Repos</h3>
              <div id="repos"></div>
              `);
          });
        });
    });