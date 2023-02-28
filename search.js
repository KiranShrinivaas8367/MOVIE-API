// const api_key = '0bd3a18560f450a76a32f637f6354d01';
// const base_url = 'https://api.themoviedb.org/3';
// const img_url = 'https://image.tmdb.org/t/p/w500'

// const trend_url = base_url + '/discover/movie?sort_by=popularity.desc&api_key=' + api_key;
/*--search--*/

const form = document.getElementById('form')
const search_url= base_url + '/search/movie?' + api_key;
const search = document.getElementById('search')
const searching = document.querySelector('.searching')
const mov_card_title = document.querySelector('.fav h1')
// const arrow = document.querySelector('.movies-cont .arrow-btn')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchArea = search.value;
    console.log(searchArea)
    if(searchArea){
        getSearch(search_url+'&query='+searchArea)
        // console.log(search_url+'&query='+searchArea)
    }
    else{
        getTrending(trend_url);
    }
})

async function getSearch(url){
    const resp = await fetch(url)
    const responsed = await resp.json()
    showSearch(responsed.results);
}

async function showSearch(datas){

    mov_card_title.innerHTML = `Search Results..`

    searching.innerHTML = datas.map(e=>{
        return `
        <div class="movies-card">
        <img
        src="${img_url+e.poster_path}"
        alt="${e.title}"
        />

        <h3 class="movie-title">${e.title}</h3>
     <div><span class='${getcolor(e.vote_average)}'>Rating: ${e.vote_average}</span></div>
     
     <div class="hidden-movie-det">
        <div><span class='hl'>Movie Name:</span>${e.title}</div>
        <div><span class='hl'>Rating:</span> ${e.vote_average}</div>
        <div><span class="hl">Release Date:</span>${e.release_date}</div>
        <div><span class="hl">Languages:</span> ${e.original_language}</div>
        <button>See More</button>
     </div>
     </div>`
    }).join(' ')

    arrow.innerHTML=`<div class="arrow-btn">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
</div> `

}
