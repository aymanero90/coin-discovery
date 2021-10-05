
import { coinIsInFavorites, favAddRemove } from "./favorites.js";

export const  COINS = 'coins';
export const  FAV = 'favorites';
export const API_URL  = 'https://api.coinlore.net/api/tickers/';

const MARKETCAP_BASE_URL =  'https://coinmarketcap.com/currencies/';


export function createTableHeader (tableName)  {
    var headers = ["#", "Coin", "Price", "Market", "volume24", "Circulating Supply", "Total Supply", "Max Supply"];
    
    if(tableName === COINS)
     headers.push("Favorite");
    var thead = document.createElement("thead");
    thead.className = "table_header"
    var  tr = document.createElement("tr");
    console.log("header", headers);
    headers.forEach( (header) => {
        const th = document.createElement("th");
        th.textContent = header;
        tr.appendChild(th);
    });  
    console.log("header_row", tr.innerHTML); 
    thead.appendChild(tr);
    return thead;
}

export function createTableBody(data, tableName){
    var body = document.createElement("tbody");
    console.log('dataForBody', data);
    data.forEach( row => {           
        const tr = document.createElement("tr");
        const rowData = [row.rank, row.symbol, row.price_usd, row.market_cap_usd, row.volume24, row.csupply, row.tsupply, row.msupply ? row.msupply : "??"];
        console.log('ROW', row);
        rowData.forEach ( (elem, i) => {
            const td = document.createElement("td");
            console.log('inLoop ', i);
            if (i == 1){  // Coin-Name as a link
                const a = document.createElement("a");
                a.setAttribute("href", MARKETCAP_BASE_URL + row.nameid);
                a.setAttribute("target", "_blank");
                a.textContent = rowData[i];
                td.appendChild(a);
            }
            else{
                td.textContent = rowData[i];
            }
            tr.appendChild(td);
        });
                
        if (tableName === COINS){  // by Coins-Table we add favorite-colunmn
            const td_1 = document.createElement("td");
            td_1.id = "fav_td";
            console.log('inLoop ');
            console.log(row.symbol);
            const label = createCoinFavLable(row.symbol);                 
            td_1.appendChild(label);           
            tr.appendChild(td_1);            
        } 
               
        body.appendChild(tr);       
    });
    return body;
}

function createCoinFavLable(coinSymbol) {    
    console.log('createCoinFavLable_1');
    const label = document.createElement("label");
    label.className= "fav_star_label";
    // checkbox with add/remove logic
    const checkBox = document.createElement("input");
    checkBox.type="checkbox";
    checkBox.id = coinSymbol;
    checkBox.checked = coinIsInFavorites(coinSymbol);
    console.log('createCoinFavLable_1');
    checkBox.addEventListener('click', function() {
        this.checked = favAddRemove(this.id);        
    }) 
    const starEmpty = document.createElement("i");
    starEmpty.className = "glyphicon glyphicon-star-empty";
    const starFull =  document.createElement("i");
    starFull.className = "glyphicon glyphicon-star";
    label.appendChild(checkBox);
    label.appendChild(starEmpty);
    label.appendChild(starFull);
    
    console.log('createCoinFavLable_1');
    return label;
}