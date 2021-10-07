require('../css/style.css');
import { COINS ,API_URL, createTableHeader, createTableBody} from "./common.js";

document.getElementById('coins_button').addEventListener('click', () => {
    createCoinsTable();
});

function createCoinsTable(){ 
    const xhr = new XMLHttpRequest();
    xhr.open ('get', API_URL, true);
    xhr.onload = function (){
        if (this.status == 200){
            var coinsData = JSON.parse(this.responseText).data;
            var coinsTable = document.getElementById('coins_table_container');
            coinsTable.innerHTML='';            
            var table = document.createElement("table");
            table.className = "table table-striped table-bordered table-hover table-responsive";            
            var t_head = createTableHeader(COINS);
            var t_body = createTableBody(coinsData, COINS);
            table.appendChild(t_head);
            table.appendChild(t_body)
            coinsTable.appendChild(table);                  
        }
    }   
    xhr.send();         
}