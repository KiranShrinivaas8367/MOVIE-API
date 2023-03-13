
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
// console.log(id)
const mov_details={};

/*----URL----*/
const common_url= `https://api.themoviedb.org/3/movie/${id}?api_key=0bd3a18560f450a76a32f637f6354d01`
const img_url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=0bd3a18560f450a76a32f637f6354d01`
const casting_url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0bd3a18560f450a76a32f637f6354d01`
const recommend_url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=0bd3a18560f450a76a32f637f6354d01`

/*----query selector----*/
const nav_det = document.querySelector('.nav-header')
const mov_poster = document.querySelector('.pos_image img')
const cont_background = document.querySelector('.pos_container')
const cast_det = document.querySelector('.movie-cast')
const recommendation = document.querySelector('.rec-mov')



// function mov_link(link_redirect){
//     link_redirect.forEach(d=>{
//         d.addEventListener('click',(e)=>{
//             window.location=`./movie.html?id=${d.dataset.id}`;
        
            
//         })
//     })
// }

// async function calling(){
//     mov_link(document.querySelectorAll('.hidden-movie-det button'));
// }

// calling();