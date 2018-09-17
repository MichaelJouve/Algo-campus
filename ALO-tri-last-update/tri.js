// VARIABLES GLOBAL

let GlobalTableau = [3,9,7,1,6,2,8,4,5];



// display data
function display(tabb) {

    for (let c = 0; c < tabb.length; c++) {
        let cell = document.getElementById(c.toString());
        cell.textContent = tabb[c];
    }
}

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
        let cell =  document.getElementById(c);
        cell.textContent = tab[c];
    }
    return GlobalTableau = tab;
}

// wait time before continue
function sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}


        //  TRI PAR INSERTION   //  résultat : 19 swap avec 20 comparaisons.
function sortInsertion() {
    let tab = [3, 9, 7, 1, 6, 2, 8, 4, 5];
    let save = 0;
    let compare = 0;
    let swap = 0;

    for (let i = 0; i < tab.length - 1; i++) {
        let cell = i;

        compare++;
        if (tab[i] > tab[i + 1]) {
            swap++;
            save = tab[i];
            tab[i] = tab[i + 1];
            tab[i + 1] = save;


            while ((tab[cell] < tab[cell - 1]) && cell > 0) {
                compare++;

                swap++;
                save = tab[cell];
                tab[cell] = tab[cell - 1];
                tab[cell - 1] = save;
                cell--;
            }
        }
    }
    display(tab);
    console.log('tri par insertion termine. Resultat : ' + tab + ' en ' + swap + ' swap et ' + compare + ' comparaisons.');
}



        //  TRI PAR SELECTION   //  résultat : 19 swap avec 40 comparaisons.
let compare=0;
let swap = 0;
function sortSelection(tab) {

    let save = 0;


    let pasSwap = 0;
    for (let i = 0; i < tab.length - 1; i++) {
        compare++;

        if (tab[i] > tab[i + 1]) {
            save = tab[i + 1];

            tab[i + 1] = tab[i];
            tab[i] = save;
            swap ++;
            pasSwap++;
        }
    }
    if (pasSwap !== 0) {
        return sortSelection(tab);
    }
    display(tab);
    console.log('tri par insertion termine. Resultat : ' + tab + ' en ' + swap + ' swap et ' + compare + ' comparaisons.');
}


        //  TRI A BULLE   //  résultat : 19 swap avec 35 comparaisons.

function sortBulle(tab) {
    let save = 0;
    let compare = 0;
    let placed = 1;
    let swap = 0;

    while (placed !== (tab.length -1)){
        for (let i = 0; i < tab.length - placed; i++) {
            compare++;

            if (tab[i] > tab[i + 1]) {
                swap++;
                save = tab[i];
                tab[i] = tab[i + 1];
                tab[i + 1] = save;
                display(tab);
            }
        }
        placed++
    }
    display(tab);
    console.log('tri par insertion termine. Resultat : ' + tab + ' en ' + swap + ' swap et ' + compare + ' comparaisons.');
}


        // TRI SHELL  //        résultat : 11 swap avec 34 comparaisons.
function sortShell(tab) {
    let save = [];
    let gap = Math.floor(tab.length/2);
    let compare = 0;
    let swap = 0;

    while (gap > 0) {
        for (let i = 0; i<= (tab.length - (gap+1)); i++) {
            compare++;
            if (tab[i] > tab[i + gap]) {
                swap++;
                save = tab[i];
                tab[i] = tab[i + gap];
                tab[i + gap] = save;

                let t = i;
                while (t - gap >= 0) {
                    compare++;
                    if (tab[t] < tab[t - gap]) {
                        swap++;
                        save = tab[t];
                        tab[t] = tab[t - gap];
                        tab[t - gap] = save;
                        t = t-gap;
                    }else {
                        break;
                    }
                }
            }
        }
        gap--;
    }
    display(tab);
    console.log('tri par insertion termine. Resultat : ' + tab + ' en ' + swap + ' swap et ' + compare + ' comparaisons.');
}


        //  Tri PAR FUSION //

// Split the array into halves and merge them recursively
function sortFusion (arr) {
    debugger;
    if (arr.length === 1) {
        // return once we hit an array with a single item
        return arr
    }

    const middle = Math.floor(arr.length / 2); // get the middle item of the array rounded down
    const left = arr.slice(0, middle); // items on the left side
    const right = arr.slice(middle); // items on the right side

    return merge(
        sortFusion(left),   // tant que sortFusion ne renvoi pas un return (condition du if == true) alors il va boucler sur sortFusion afin de finir avec des tableaux de 1.
        sortFusion(right)
    )
}

// compare the arrays item by item and return the concatenated result
function merge (left, right) {
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;

    while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft] < right[indexRight]) {
            result.push(left[indexLeft]);                               // après avoir swapé les deux tableaux individuelement il
            indexLeft++
        } else {
            result.push(right[indexRight]);
            indexRight++
        }
    }
    display(result.concat(left.slice(indexLeft)).concat(right.slice(indexRight)));              // concat left et right avec l'index (++) qui sera null dans l'un des deux tableau ou
                                                                                                // dans les deux en cas de tableau avec un length pair. (le concat est uniquement pour
   console.log( result.concat(left.slice(indexLeft)).concat(right.slice(indexRight)));          // la dernière valeur restante. (forcement la plus grande).
   return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))

}



        //  TRI RAPIDE  //
// let result = [];
// function sortRapide(tab) {
//     let save = [];
//     debugger;
//     if (tab.length === 1) {
//         // return once we hit an array with a single item
//         console.log(' FINI : tab = '+tab);
//
//         return tab
//     }
//
//     const pivot = Math.floor(tab.length / 2);
//     const valuePivot = tab[Math.floor(tab.length / 2) - 1];
//
//
//
//     let rt = tab.length - 1;
//     for (let i = 0; i < tab[pivot - 1]; i++) {
//
//         if (tab[i] > tab[pivot -1]) {
//             for (rt > pivot - 1; rt--;) {
//                 if (tab[i] > tab[rt]) {
//                     save = tab[rt];
//
//                     tab[rt] = tab[i];
//                     tab[i] = save;
//                     swap++;
//                     break;
//                 }
//             }
//         }
//     }
//     const left = tab.slice(0, pivot - 2); // Array left side (inferior to pivot)
//     const right = tab.slice(pivot); // array right side (superior to pivot)
//
//    return result.concat(sortRapide(left), valuePivot, sortRapide(right));
//
// }

function partition(table,index1,index2) {
    let pivot = index2;
    let pos = index1;
    while (pos < index2) {
        if (table[pos] > table[pivot]) {
            table = swapp(table,pivot,pos);
            console.log("tableau partition : ",table);
        }
        pos++;
    }
    return [pivot, table];
}
function quickSort(table,start,end) {
    if (start < end) {
        let pivots = partition(table, start, end);
        table = quickSort(pivots[1], start, pivots[0] - 1);
        table = quickSort(pivots[1], pivots[0] + 1, end);
        console.log("tableau : ",table);
        return table;
    }
    display(table);
    alert('FINI' + table);
    return table;
}

function swapp(tableau,indice0,indice1) {
    let value = tableau[indice1];
    tableau[indice1] = tableau[indice0];
    tableau[indice0] = value;
    return tableau;
}
