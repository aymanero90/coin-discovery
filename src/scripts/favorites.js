import {FAV, API_URL,  createTableHeader, createTableBody} from "./common.js";

const FAV_STORAGE = 'fav_strg';

document.getElementById('fav_button').addEventListener('click', () => {    
    createFavsTable();
});


function createFavsTable(){
    var coinsTable = document.getElementById('coins_table_container');
    var favorites = localStorage.getItem(FAV_STORAGE);
    if (favorites)
      favorites = JSON.parse(favorites);
    coinsTable.innerHTML='';
    if(favorites && favorites.length > 0){
        const xhr = new XMLHttpRequest();
        xhr.open ('get', API_URL, true);
        xhr.onload = function (){
            if (this.status == 200){
                var coinsData = JSON.parse(this.responseText).data;                
                var filteredCoins = coinsData.filter(item => favorites.find(symbol => item.symbol === symbol));   
                var table = document.createElement("table");
                table.className = "table table-striped table-bordered table-hover table-responsive";
                var t_head = createTableHeader(FAV);
                var t_body = createTableBody(filteredCoins, FAV);
                table.appendChild(t_head);
                table.appendChild(t_body)
                coinsTable.appendChild(table);                  
            }
        }   
        xhr.send();  

    } else {
        var p = document.createElement('p');
        p.id= "fav_empty";
        p.textContent= "Ooops.. It seems you don't have any fav-coins yet ;)";
        coinsTable.appendChild(p);
    }
}



export function coinIsInFavorites(coin){    
    var fav = localStorage.getItem(FAV_STORAGE);     
    if (fav){
        fav = JSON.parse(fav);
        if (fav.find(item => item === coin))
          return true;    
} 
    return false;
}

export function favAddRemove(coin){
    if (coinIsInFavorites(coin)){
      removeFromFav(coin);
       return false;
    } else {
        addToFav(coin);
        return true;
    }

}

function addToFav(coin){
    var favorites = localStorage.getItem(FAV_STORAGE);    
    if (!favorites){
        var coins = [];
        localStorage.setItem(FAV_STORAGE, JSON.stringify(coins));        
        favorites = JSON.parse(localStorage.getItem(FAV_STORAGE));
    }
    else {
        favorites = JSON.parse(favorites);
    }
    
    if (!favorites.find(item => item === coin))
       favorites.push(coin);
    localStorage.setItem(FAV_STORAGE, JSON.stringify(favorites));
}

function removeFromFav(coin){ 
    var fav = JSON.parse(localStorage.getItem(FAV_STORAGE));    
    var filtered = fav.filter(item => item !== coin);
    localStorage.setItem(FAV_STORAGE, JSON.stringify(filtered));
}