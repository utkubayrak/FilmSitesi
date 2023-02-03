function isAuthenticated() {
  if (localStorage.getItem('auth') != null) {
    return true;
  }
  return false;
}
if (isAuthenticated()) { 
  document.querySelector('.navbar-login span').innerHTML = 'Çıkış yap <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/><path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/></svg> ';
  document.querySelector('.navbar-login').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm("Çıkış yapmak istediğinize emin misiniz ?") == true) {
      localStorage.removeItem('auth');
      window.location.reload();
    }
  });
}


let api = 'https://localhost:7262/api/Movies/'
let cardDom = document.querySelector('.movies-grid');
let limitBtn = document.getElementById('limitBtn'); //Daha fazla yükle butonu
limitBtn.addEventListener('click',limitData);
let limit = 12;
function limitData() {
  limit = limit+12;
  getMovieShort(api)
}
//Film verilerinin alınıp html içerisine yazılması
function getMovieShort() {
  fetch(api + "all") //Kaynakların getirlimesi için arayüz Promise yapı kullanarak fonksiyon çalışıyor ve eğer belirtilen koşullara uygun olarak işlemler gerçekleşti ise then kısmına
    //Response, bir isteğe verilen yanıtı temsil eder. Her şey yolunda giderse gelen veri, then içerisinde bize response olarak gelir. Ve response’u parametre olarak alırız, json içeriğini elde etmek için .json() metodunu kullanırız.
    .then((response) => response.json())
    .then((data) => {
      data.slice(limit-12,limit).forEach(element => {
        cardDom.innerHTML += `
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
    });
}
getMovieShort(api);