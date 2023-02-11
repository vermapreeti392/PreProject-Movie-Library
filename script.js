const movies = [
    { title: "The Shawshank Redemption", genre: "Drama" },
    { title: "The Godfather", genre: "Crime" },
    { title: "The Godfather: Part II", genre: "Crime" },
    { title: "The Dark Knight", genre: "Action" },
    { title: "12 Angry Men", genre: "Drama" },
    { title: "Schindler's List", genre: "Drama" },
    { title: "The Lord of the Rings: The Return of the King", genre: "Adventure" },
    { title: "Pulp Fiction", genre: "Crime" },
    { title: "The Good, the Bad and the Ugly", genre: "Western" },
    { title: "Fight Club", genre: "Drama" },
    { title: "Forrest Gump", genre: "Drama" },
    { title: "Inception", genre: "Action" },
    { title: "The Lord of the Rings: The Fellowship of the Ring", genre: "Adventure" },
    { title: "Star Wars: Episode V - The Empire Strikes Back", genre: "Action" },
    { title: "The Lord of the Rings: The Two Towers", genre: "Adventure" },
    { title: "The Matrix", genre: "Action" },
    { title: "Goodfellas", genre: "Crime" },
    { title: "One Flew Over the Cuckoo's Nest", genre: "Drama" },
    { title: "Seven Samurai", genre: "Adventure" },
    { title: "Se7en", genre: "Crime" },
    { title: "City of God", genre: "Crime" },
    { title: "The Silence of the Lambs", genre: "Thriller" },
    { title: "It's a Wonderful Life", genre: "Drama" },
    { title: "Life is Beautiful", genre: "Comedy" },
    { title: "The Usual Suspects", genre: "Crime" },
    { title: "Léon: The Professional", genre: "Action" },
    { title: "Spirited Away", genre: "Animation" },
    { title: "Saving Private Ryan", genre: "Drama" },
    { title: "Interstellar", genre: "Adventure" },
    { title: "The Green Mile", genre: "Drama" },
    { title: "The Prestige", genre: "Drama" },
    { title: "The Intouchables", genre: "Comedy" },
    { title: "The Lion King", genre: "Animation" },
    { title: "The Pianist", genre: "Drama" },
    { title: "The Departed", genre: "Crime" },
    { title: "Whiplash", genre: "Drama" },
    { title: "Gladiator", genre: "Action" }
]
var titleInp = document.getElementById('title');
var genreInp = document.getElementById('genre');
var serachBtn = document.getElementById('search');
let listItems = document.getElementById('results');
let titleSort = document.getElementById('sorting by title');
let genreSort = document.getElementById('sorting by genre');
let genreCount = document.getElementById('counts');


let serachedArr = [];

// event listener on button
serachBtn.addEventListener('click', (e) => {
    var dropList = document.getElementById('dropList').value;
    if (dropList == 'title' && titleInp.value != "") {
        serachedArr = searchByTitle(titleInp.value)

    }
    else if (dropList == 'genre' && genreInp.value != "") {
        serachedArr = searchByGenre(genreInp.value);

    }

    else if (dropList == 'both' && (genreInp.value && titleInp.value) != "") {
        let adArr = [];
        adArr = searchByTitle(titleInp.value);
        serachedArr = adArr.filter(results => results.genre.toLowerCase().includes(genreInp.value.toLowerCase()))

    }
    displayResults(serachedArr)
    //console.log(serachedArr); 
})

// function for title search 
function searchByTitle(title) {
    return movies.filter(data =>
        data.title.toLowerCase().includes((title.toLowerCase().trim())))
}

// function for genre search 
function searchByGenre(genre) {
    return movies.filter(data =>
        data.genre.toLowerCase().includes((genre.toLowerCase().trim())))
}

// display results
function displayResults(serachedArr) {
    listItems.innerHTML = "";
    serachedArr.map(results => {
        listItems.innerHTML += `<li>${results.title}(${results.genre})</li>`
        // console.log(listItems.innerHTML);
    })
    if(serachedArr.length===0){
        listItems.innerHTML = "no result found"
    }
    countByGenre(serachedArr);
}

// sortByTitle
titleSort.addEventListener('click', (e) => {
    sortByTitle(serachedArr);

})
function sortByTitle(serachedArr) {
    displayResults(serachedArr.sort((a, b) => a.title.localeCompare(b.title)));

}

// sortByGenre
genreSort.addEventListener('click', (e) => {
    sortByGenre(serachedArr)
})
function sortByGenre(serachedArr) {
    displayResults(serachedArr.sort((a, b) => a.title.localeCompare(b.title)))
}

// count the results
function countByGenre(serachedArr) {
    genreCount.innerHTML = "";
    let GenreCountObjects = new Map();
    serachedArr.map(results => {
        if (GenreCountObjects.has(results.genre)) {
            GenreCountObjects.set(results.genre, GenreCountObjects.get(results.genre) + 1)
        }
        else {
            GenreCountObjects.set(results.genre, 1)
        }
    })
    for (let [key, value] of GenreCountObjects) {
        //console.log(key, value);
        genreCount.innerHTML += `<li>${key} ${value}</li>`
    }
}


