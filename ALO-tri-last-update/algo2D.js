// Base table
let tab2D = [[5,9,7],
    [ 6,2,4],
    [ 8,1,3]];

let totalSwap= 0;
let totalCompare = 0;
let xy = [];

//Swap 2D table with same possibilities as a ALGO-taquin-tri.
// function random() {
//     for (let a = 0; a < 40; a++) {
//         let x = (Math.floor(Math.random() * 3));   // table X index (0,1,2)
//         let y = (Math.floor(Math.random() * 3));   // table Y index (0,1,2)
//
//         let movement = findMovePossibilities(x,y);
//
//         let findMove = false;
//         while (!findMove){
//             let move2 = (Math.floor(Math.random() * 4)); // 0 = right / 1 = left  / 2 = up / 3 = down
//
//             if (movement[move2][1] !== 0){
//                 let newXY = movement[move2][1];
//
//                 if (movement[move2][0] === 'X' ){
//                     let save = tab2D[x][y];
//
//                     tab2D[x][y] = tab2D[(x + newXY)][y];
//                     tab2D[(x + newXY)][y] = save;
//                     break;
//                 }
//                 else{
//                     let save = tab2D[x][y];
//
//                     tab2D[x][y] = tab2D[x][(y + newXY)];
//                     tab2D[x][(y + newXY)] = save;
//                     break;
//                 }
//             }
//         }
//     }
//     display2D();
// }


// FIND WHITE CELL //
function findWhiteCell(value, tabb){
    let x = null;
    let y = null;
    for (let i = 0; i < tabb.length; i++){
        for (let j = 0; j <tabb.length; j++){
            if (tabb[i][j] === 9){
                x = i;
                y = j;
                document.getElementById(y+""+x).textContent = 'Ici..';
                return [x,y];
            }
        }
    }
}


// RANDOM EMPTY CELL !!!
function randomWhiteCell(value) {
let save;
let whiteCell = [];

    for (let a = 0; a < 40; a++) {
        whiteCell = findWhiteCell(value, tab2D);
        let x =  whiteCell[0];  // table X index (0,1,2)
        let y = whiteCell[1];   // table Y index (0,1,2)

        let movement = findMovePossibilities(x,y);

        let findMove = false;
        while (!findMove){
            let move2 = (Math.floor(Math.random() * 4)); // 0 = right / 1 = left  / 2 = up / 3 = down

            if (movement[move2][1] !== 0){
                findMove = true;
                let newXY = movement[move2][1];

                if (movement[move2][0] === 'X' ){
                    save = tab2D[x][y];

                    tab2D[x][y] = tab2D[(x + newXY)][y];
                    tab2D[(x + newXY)][y] = save;
                    break;
                }
                else{
                    save = tab2D[x][y];

                    tab2D[x][y] = tab2D[x][(y + newXY)];
                    tab2D[x][(y + newXY)] = save;
                    break;
                }
            }
        }
    }
    display2D(tab2D);
}


// Find cell movements possibilities. Take two arguments x and y position of the cell in 3x3 ALGO-taquin-tri.

function findMovePossibilities(x,y) {
    let movement = [['X', 1, 'Right'], ['X', -1, 'Left'], ['Y', -1, 'Up'], ['Y', 1, 'Down']];

    if (x === 0) {
        movement[1][1] = 0;
    }
    else if (x === 2) {
        movement[0][1] = 0;
    }

    if (y === 0) {
        movement[2][1] = 0;
    } else if (y === 2) {
        movement[3][1] = 0;
    }

    return movement;
}



// display data
function display2D(tabToDisplay) {
    let id = 0;
    for (let x = 0; x < tabToDisplay[0].length; x++) {
        for (let y = 0; y < tabToDisplay[0].length; y++) {
            id = y+""+x;
            let cell = document.getElementById(id.toString());

            if (tabToDisplay[x][y] === 9) {
                document.getElementById(id);
                cell.textContent = '';
            }else {
                cell = document.getElementById(id.toString());
                cell.textContent = tabToDisplay[x][y];
            }
        }
    }
    document.getElementById('possibleMoves').textContent = 'Possible movements on X and Y';
}


// tri par selection du tableau
function sortTableMutli(table) {
    let x1 = 0;
    let y1 = 0;
    let x2 = x1+1;
    let y2 = 0;
    let swap = false;

    for (let i = 0; i < table.length; i++) {
        for (let ii = 0; ii < table[i].length; ii++ ) {
            x1 = i;
            y1 = ii;
            x2 = i;
            y2 = ii+1;
            totalCompare++;

            if(y2 === table.length){
                x2 = x2+1;
                y2 = 0;

            }
            if(x2 === table.length){
                continue
            }
            if(table[x1][y1] > table[x2][y2]){
                let temp = table[x1][y1];
                table[x1][y1] = table[x2][y2];
                table[x2][y2] = temp;
                swap = true;
                totalSwap++
            }
        }
    }
    if(swap === false){
        console.log('TotalSwap value = ' + totalSwap + ' / totalCompare = ' + totalCompare + ' => result : ' + table);
        return table;
    }
    return sortTableMutli(table);
}


//                                                                      le tri est bon mais pas la récupérations des déplacements.
function RealSort(tab) {
    let empty = findWhiteCell(9, tab); // empty = [x,y]
    let movements = [];
    let save;
    let newXouY;
    let findMove;
    let tabString = '';
    let X0Solution = [];
    let nbX0Solution = 0;
    let tempMove =[];

    display2D(tab);

    while ( nbX0Solution < 10 ) {
        empty = findWhiteCell(9, tab);
        console.log(empty);
        let x = empty[0];  // table X index (0,1,2)
        let y = empty[1];   // table Y index (0,1,2)
        let solution = [];
        let initialTab = tab;
        let allX0solutions= [];
        let finalX0solution = [];
        let shortestIndex = 0;


        movements = findMovePossibilities(empty[0], empty[1]);   //[['X', 1, 'Right'], ['X', -1, 'Left'], ['Y', -1, 'Up'], ['Y', 1, 'Down']];

        for (let i = 0; i < movements.length; i++) {
            for (let j = 0; j < movements[i].length; j++) {

                if (movements[j][1] !== 0) {
                    findMove = false;

                    while (findMove === false) {
                        let move = (Math.floor(Math.random() * 4)); // 0 = right / 1 = left  / 2 = up / 3 = down

                        if (movements[move][1] !== 0) {
                            findMove = true;
                            newXouY = movements[move][1];

                            if (movements[move][0] === 'X') {
                                save = tab[x][y];

                                tempMove.push(movements[j][2]);
                              //  solution.push(movements[j][2]);

                                tab[x][y] = tab[(x + newXouY)][y];
                                tab[(x + newXouY)][y] = save;
                                break;
                            }
                            else { // if 'Y'
                                save = tab[x][y];
                                //solution.push(movements[j][2]);
                                tempMove.push(movements[j][2]);

                                tab[x][y] = tab[x][(y + newXouY)];
                                tab[x][(y + newXouY)] = save;
                                break;
                            }
                        }
                    }
                }

                X0Solution.push(tempMove.toString());
                tempMove = [];
            }
        }

        if (tab[0][0] === 1 && tab[0][1] === 2 && tab[0][2] === 3) {
            //X0Solution = solution;
            allX0solutions.push(X0Solution);
            X0Solution = [];

            nbX0Solution++;
            alert('line X finded : ' + tab + '      ALL SOLUTIONS : ' + allX0solutions);

            if (nbX0Solution === 10){
                shortestIndex = 0;
                for( let i = 1; i< allX0solutions.length; i++){
                    if(allX0solutions[shortestIndex].length >= allX0solutions[i].length)
                        shortestIndex = i;
                    finalX0solution.push(allX0solutions[i]);
                }
                alert('BEST way to line X ' + finalX0solution );
                break;
            }
        }
    }

    sleep(0);
    tabString = tab.toString();

    if (tabString === '1,2,3,4,5,6,7,8,9') {
        display2D(tab);
        return alert('HOURA le hazarre a resolut le ALGO-taquin-tri !! ' + tab);
    }
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

// Run algo to sort table
function run(){

    console.log('end run');
    display2D( sortTableMutli(tab2D));
}
