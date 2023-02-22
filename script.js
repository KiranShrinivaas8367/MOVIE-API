const api_key = 'api_key=0bd3a18560f450a76a32f637f6354d01';
const base_url = 'https://api.themoviedb.org/3';
const trend_url = base_url + '/discover/movie?sort_by=popularity.desc&' + api_key;
const img_url = 'https://image.tmdb.org/t/p/w500'
// console.log(TREND_URL) debugging

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

