// Base table
let table = [5,7,9,6,2,4,1,3,8];
let tableSwaped = [];
let tableSorted =[];
let totalSwap= 0;
let totalCompare = 0;

// Swap table with reall possibilies (next to it if not on border...)
function random(tab){
    for (let a = 0; a < 40; a++){
        let rand = (Math.floor(Math.random() *9));
        let move2 = (Math.floor(Math.random() *2));

           if (((rand -1) >= 0) && ((rand +1) <= 8) && move2 === 0) {
                let save = tab[rand];

                tab[rand] = tab[rand-1];
                tab[rand-1] = save;

            }else if (((rand -1) >= 0) && ((rand +1) <= 8) && move2 === 1) {
                let save2 = tab[rand];

                tab[rand] = tab[rand + 1];
                tab[rand + 1] = save2;

            }else if ((rand -1) >= 0){
                let save = tab[rand];

               tab[rand] = tab[rand-1];
                tab[rand-1] = save;

            }else if ((rand +1) <= 8){
                let save2 = tab[rand];

                tab[rand] = tab[rand + 1];
                tab[rand + 1] = save2;
        }
    }
 // display data
    for (let c = 0; c < tab.length; c++) {
        let cell =  document.getElementById(c+1);
        cell.textContent = tab[c];
    }
  return tableSwaped = tab;
}






// display data
// for (let c = 0; c < tab.length; c++) {
//       let cell =  document.getElementById(c+1);
//         cell.textContent = tab[c];
//     }

// tri par selection du tableau
function sort(tabl) {
    let pasSwap = 0;

    for (let i = 0; i < tabl.length - 1; i++) {
        totalCompare++;

        if (tabl[i] > tabl[i + 1]) {
            let save = tabl[i + 1];

            tabl[i + 1] = tabl[i];
            tabl[i] = save;
            totalSwap++;
            pasSwap++;
        }
    }
    if (pasSwap !== 0) {
        return sort(tabl);
    }
    console.log('TotalSwap value = ' + totalSwap + ' / totalCompare = ' + totalCompare + ' => result : ' + tabl);
    totalCompare = 0;
    totalSwap = 0;
    return tableSorted = tabl;
}





// display data on html table
function createTable(tableau) {
    for (let c =1; c <= tableau.length; c++) {
        document.getElementById(c.toString()).textContent= c.toString();
    }
    return tableau;
}

function run(){
    console.log(tableSwaped + ' :: ');

    sort([1,2,3,4,5,6,7,8,9]);
    createTable(tableSorted);
}


/ sort 1d Vincent J (php)

// function sortTable(array $tab): array
// {
//     $isMulti = false;
//     foreach ($tab as $key => $value) {
//     if(is_array($value)){
//         $isMulti = true;
//         break;
//     }
// }
//
//     if($isMulti === true){
//         return sortTableMutli($tab);
//     }
//
//     return trie1($tab);
// }