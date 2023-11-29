const userContainer = document.getElementById('user-list');
const repoContainer = document.getElementById("repos-list");

function nameSearch(name) {
    fetch(`https://api.github.com/search/users?q=${name}`)
      .then(res => res.json())
      .then(jsonUsers => {
        userContainer.innerHTML = ""
        jsonUsers.items.forEach(user => {
        showUser(user)
      })
    })
    };

const searchForm = document.getElementById('github-form');

searchForm.addEventListener('submit', function (e){
    e.preventDefault();
    // console.log(searchForm.children[0].value)
    nameSearch(searchForm.children[0].value)
})

function showUser(user) {

    const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const a = document.createElement("a");
  h2.innerText = user.login
  img.className = "user-avatar"
  img.src = user.avatar_url
  a.innerText = user.url
  a.href = user.url
  userContainer.append(h2, img, a)

  h2.addEventListener("click", function (e){
    e.preventDefault();
    fetchRepo(user.login)
  })

  console.log(user)
}

function fetchRepo(name) {
    fetch(`https://api.github.com/users/${name}/repos`)
      .then(res => res.json())
      .then(jsonRepos => {
        repoContainer.innerHTML = ""
        jsonRepos.forEach(repo => {
            showRepo(repo)
        })
        console.log(jsonRepos)
      })
    };

    function showRepo(repo) {
      const li = document.createElement("li");
      li.innerText = repo.description
      repoContainer.append(li)
    }