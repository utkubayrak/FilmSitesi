String.prototype.turkishToUpper = function () {
  var string = this;
  var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
  string = string.replace(/(([iışğüçö]))/g, function (letter) { return letters[letter]; });
  return string.toUpperCase();
}
let searchDOM = document.querySelector('.movies-grid')
window.addEventListener("load", () => {
  var urlParams = new URLSearchParams(window.location.search);
  var movie_search = urlParams.get('search');
  let arr = movie_search.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).turkishToUpper() + arr[i].slice(1);
  }
  let movie_search2 = arr.join(" ");
  getMovieSearch(movie_search2)
});
function getMovieSearch(movie_search2) {
  fetch('https://localhost:7262/api/Movies/search/' + movie_search2)
    .then((response) => response.json())
    .then((data) => {
      data.forEach(element => {
        searchDOM.innerHTML += `
                  <a href="/details.html?id=${element['id']}">
            <div class="movie-card" >
              <div class="card-head">
                <img src="${element['photo']}" alt="" class="card-img">
                  <div class="card-overlay">
                    <div class="bookmark">
                      <ion-icon name="add-outline"></ion-icon>
                      <span>${element['age']}</span>
                    </div>
                    <div class="rating">
                      <ion-icon name="star-outline"></ion-icon>
                      <span>${element['point']}</span>
                    </div>
                  </div>
              </div>
              <div class="card-body">
                <h3 class="card-title">${element['name']}</h3>
                <div class="card-info">
                  <span class="genre">${element['category']}</span>
                </div>
              </div>
            </div>
          </a>`
      });
    })
}
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
});