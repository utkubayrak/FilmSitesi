window.addEventListener("load", () => {
    var urlParams = new URLSearchParams(window.location.search);
    var filmid = urlParams.get('idfilm'); 
    
    deleteFilm(filmid)
  });
function deleteFilm(filmid) {
    const token = JSON.parse(localStorage.getItem('auth')).token;
    fetch("https://localhost:7262/api/Movies/delete/" + filmid, {
        method: "DELETE",
        headers: {
            'Authorization' : "bearer " +token,
            'content-type': 'application/json'
        }
    })
        .then(response => console.log(response))
        .then(data => {
        })
}
let CategoryArray = [];
let WritersArray = [];
let ActorsArray = [];
let formDOM = document.getElementById('admin-form-add')
formDOM.addEventListener('submit',formHandler)
function formHandler(event) {
    let filmName = document.getElementById('filmName').value
    let filmInfo = document.getElementById('filmInfo').value
    let filmPhoto = document.getElementById('filmPhoto').value
    let filmTrailer = document.getElementById('filmTrailer').value
    let filmCategory = document.getElementById('filmCategory').value
    if(filmCategory.split(",").length > 1) {
        CategoryArray = filmCategory.split(",")
    }else{
        CategoryArray[0] = filmCategory;
    }
    let filmDirectors = document.getElementById('filmDirectors').value
    let filmWriters = document.getElementById('filmWriters').value
    if(filmWriters.split(",").length > 1) {
        WritersArray = filmWriters.split(",")
    }else{
        WritersArray[0] = filmWriters;
    }
    let filmActors = document.getElementById('filmActors').value
    if(filmActors.split(",").length > 1) {
        ActorsArray = filmActors.split(",")
    }else{
        ActorsArray[0] = filmActors;
    }
    let filmYear = document.getElementById('filmYear').value
    let filmTime = document.getElementById('filmTime').value
    let filmAge = document.getElementById('filmAge').value
    let filmRating = document.getElementById('filmRating').value
    addFilm(filmName, filmInfo, filmPhoto, filmTrailer, CategoryArray, filmDirectors, WritersArray, ActorsArray, filmYear, filmTime, filmAge, filmRating)
}
function addFilm(filmName, filmInfo, filmPhoto, filmTrailer, CategoryArray, filmDirectors, WritersArray, ActorsArray, filmYear, filmTime, filmAge, filmRating) {
    const token = JSON.parse(localStorage.getItem('auth')).token;
    console.log(token);
    let datac = {
    name: filmName,
  info: filmInfo,
  photo: filmPhoto,
  trailer:filmTrailer,
  category:CategoryArray,
  director:filmDirectors,
  writers:WritersArray,
  actors:ActorsArray,
  year:filmYear,
  time:filmTime,
  age:filmAge,
  point:filmRating
    }
    fetch("https://localhost:7262/api/Movies/add", {
        method: "POST",
        headers: {
            'Authorization' : "bearer " +token,
            'content-type': 'application/json'
        },
        body: JSON.stringify(datac)
    })
        .then(response => response.json())
        .then(data = {
          
        })
}
