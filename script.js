const api_key = 'api_key=0bd3a18560f450a76a32f637f6354d01';
const base_url = 'https://api.themoviedb.org/3';
const img_url = 'https://image.tmdb.org/t/p/w500'

const trend_url = base_url + '/discover/movie?sort_by=popularity.desc&' + api_key;
const trending = document.getElementById('trending')

getTrending(trend_url)

function getTrending(url){
    
    fetch(url).then(res => res.json()).then(data => {
        // method:post,
        // headers:{
        //     'Content-Type':'application/json'
        // }
        body:JSON.stringify()
        console.log(data.results);
        // showImages(data)
        showTrending(data.results);
    })

}

function showTrending(datas){

    trending.innerHTML=''
    datas.forEach(movie =>{
        const {poster_path,title,vote_average,release_date,original_language    } = movie
        const tre_movie = document.createElement('div');
        tre_movie.classList.add("movies-card");
        // tre_movie.classList.add('movies-cont-wrap');

        tre_movie.innerHTML = `

        <img
                src="${img_url+poster_path}"
                alt="${title}"
                />

             <h3 class="movie-title">${title}</h3>

             <div class="hidden-movie-det">
                <div><span class='hl'>Movie Name:</span>${title}</div>
                <div><span class='hl'>Rating:</span> ${vote_average}</div>
                <div><span class="hl">Release Date:</span>${release_date}</div>
                <div><span class="hl">Languages:</span> ${original_language}</div>
                <button>See More</button>
             </div>   `

             trending.appendChild(tre_movie);
    })
}