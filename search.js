const api_key = 'api_key=0bd3a18560f450a76a32f637f6354d01';
const base_url = 'https://api.themoviedb.org/3';
const img_url = 'https://image.tmdb.org/t/p/w500'

const trend_url = base_url + '/discover/movie?sort_by=popularity.desc&' + api_key;
/*--search--*/
const form = document.querySelector('.search-wrap')
// const form = document.getElementById('form')
const search = document.getElementById('search')
const search_url= base_url + '/search/movie?' + api_key;

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchArea = search.value;
    console.log(searchArea)
    if(searchArea){
        getSearch(search_url+'&query='+searchArea)
        console.log(search_url+'&query='+searchArea)
    }
    else{
        getTrending(trend_url);
    }
})

getSearch(search_url)
function getSearch(url){
    fetch(url).then(res=>res.json()).then(data=>{
        console.log(data.results);
        showSearch(data.results);
    })

}

function showSearch(datas){

    searching.innerHTML = ''
    datas.forEach(data=>{
        const {poster_path,title,vote_average,release_date,original_language} = data
        const search_movie = document.createElement('div')
        search_movie.classList.add("movies-card");

        search_movie.innerHTML = `
        
                    <img
                    src="${img_url+poster_path}"
                    alt="${title}"
                    />
                 <h3 class="movie-title">${title}</h3>
                 <div><span class='${getcolor(vote_average)}'>Rating: ${vote_average}</span></div>
                 
                 <div class="hidden-movie-det">
                    <div><span class='hl'>Movie Name:</span>${title}</div>
                    <div><span class='hl'>Rating:</span> ${vote_average}</div>
                    <div><span class="hl">Release Date:</span>${release_date}</div>
                    <div><span class="hl">Languages:</span> ${original_language}</div>
                    <button>See More</button>
                 </div>
                `

                searching.appendChild(search_movie)
    })
}