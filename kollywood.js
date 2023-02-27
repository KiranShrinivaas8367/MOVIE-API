/*---tamil movies---*/
const tamil_url = 'https://api.themoviedb.org/3/discover/movie?api_key=0bd3a18560f450a76a32f637f6354d01&with_original_language=ta'
const tamil = document.getElementById('tamil')

getTamil(tamil_url)
async function getTamil(url){
    const resp = await fetch(url)
    const responsed = await resp.json()
    showTamil(responsed.results)
}

async function showTamil(datas){

    tamil.innerHTML=datas.map(e=>{
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
}
