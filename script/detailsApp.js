let searchDOM = document.querySelector('.movies-grid')
window.addEventListener("load", () => {
  var urlParams = new URLSearchParams(window.location.search);
  var movie_search = urlParams.get('search');
  //getMovieSearch(movie_search)
  if (isAuthenticated()) {
    var sessionData = localStorage.getItem('auth');
    var sessionObject = JSON.parse(sessionData);
    document.querySelector('.navbar-login span').innerHTML = 'Çıkış yap <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/><path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/></svg>';
    document.querySelector('.navbar-login').addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm("Çıkış yapmak istediğinize emin misiniz ?") == true) {
        localStorage.removeItem('auth');
        window.location.reload();
      }
    });
  }
});
function isAuthenticated() {
  if (localStorage.getItem('auth') != null) {
    return true;
  }
  return false;
}
let detailDOM = document.querySelector('.banner')
window.addEventListener("load", () => {
  var urlParams = new URLSearchParams(window.location.search);
  var movie_detail = urlParams.get('id');
  console.log(movie_detail);
  getDetailCard(movie_detail)
});
function getDetailCard(movie_detail) {
  fetch('https://localhost:7262/api/Movies/all/' + movie_detail)
    .then((response) => response.json())
    .then((data) => {
      let filmName = data['name']
      detailDOM.innerHTML = `
      <div class="row">
        <div class="col-lg-12">
          <h2 class="card-title">${data['name']}</h2>
        </div>
        <div class="col-lg-12">
          <div class="card-info">
            <div class="genre">
              <ion-icon name="film"></ion-icon>
              <span>${data['category']}</span>
            </div>
            <div class="year">
              <ion-icon name="calendar"></ion-icon>
              <span>${data['year']}</span>
            </div>
            <div class="duration">
              <ion-icon name="time"></ion-icon>
              <span>${data['time']}</span>
            </div>
            <div class="rating">
              <ion-icon name="star-outline"></ion-icon>
              <span>${data['point']}</span>
            </div>
            <div>
              <ion-icon name="clipboard-outline"></ion-icon>
              <span>${data['director']}</span>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mt-3"> 
        <div class ="detail-image">
        <img src="${data['photo']}" alt="" class="card-img">
          
            </div>
        </div>
        <div class="col-lg-8 mt-3"> 
        <div class ="detail-image">
       
          <iframe src="${data['trailer']}" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
            </div>
        </div>
        <div class="col-lg-12">
          <div class="abstract">
            <p>${data['info']}
            </p>
            <div>
              <span>Oyuncular :${data['actors']} </span>
            </div>
            <div>
              <span>Senaristler : ${data['writers']}</span>
            </div>
          </div>
        </div>
      </div>
    </div> `
      getComment(filmName);
    })
}
let commentDOM = document.querySelector('.commentGet')
function getComment(filmName) {
  console.log(filmName);
 
  fetch('https://localhost:7262/api/Movies/getcomment?name=' + filmName)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach(element => {
        commentDOM.innerHTML += `<div class="comment">       
        <h4>${element['userName']}</h4>
        <br>
        <p>${element['comments']}</p>
    </div>`
      });
    })
}

let toast = document.querySelector(".toast-text");
let formDOM = document.getElementById('post')
formDOM.addEventListener('click', formHandler)
function formHandler(event) {
  event.preventDefault();
  let comment = document.getElementById("inputForm").value
  if (isAuthenticated()) {
    addComment(comment);
    
  window.location.reload();
  }else{
    toast.innerHTML = "Yorum yapabilmek için giriş yapmalısınız."
    $(".error").toast("show");
  }

}
function addComment(comment) {
  
  const token = JSON.parse(localStorage.getItem('auth')).token;
  const username = JSON.parse(localStorage.getItem('auth')).username;
  let filmName = document.querySelector(".card-title")
  let filmname = filmName.textContent
  console.log(comment);
  console.log(username);
  console.log(filmname);
  let data = {
    userName: username,
    movieName: filmname,
    comments: comment
  }
  fetch("https://localhost:7262/api/Movies/postcomment", {
    method: "POST",
    headers: {
      'Authorization': "bearer " + token,
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {

    })
}
