// Base table
let tab2D = [[8,3,1],
             [ 7,9,4],
             [ 6,2,5]];
// let goal = '1,2,3,4,5,6,7,8,9';



function findWhiteCell(value, tabb){
    let whiteX = null;
    let whiteY = null;
    for (let i = 0; i < tabb.length; i++){
        for (let j = 0; j <tabb.length; j++){
            if (tabb[i][j] === 9){
                whiteX = i;
                whiteY = j;
               document.getElementById(whiteX+""+whiteY).textContent = 'Ici..';
                return [whiteX,whiteY];
            }
        }
    }
}

// Find cell movements possibilities. Take two arguments x and y position of the cell in 3x3 ALGO-taquin-tri.
function findMovePossibilities(x,y,lastMove = false) {
    let movement = [['X', 1, 'D'], ['X', -1, 'U'], ['Y', -1, 'L'], ['Y', 1, 'R']];
    // lastMove = lastMove || false;

    // stop reverse last move.
    if (lastMove !== false) {
        switch (lastMove) {
            case 0:
                movement[1][1] = 0;
                break;

            case 1:
                movement[0][1] = 0;
                break;
            case 2:
                movement[3][1] = 0;
                break;
            case 3:
                movement[2][1] = 0;
        }
    }


    // define movements possibilities.
    if (x === 0) {
        movement[1][1] = 0;
    }
    else if (x === 2) {
        movement[0][1] = 0;
    }

    if (y === 0) {
        movement[2][1] = 0;
    }
    else if (y === 2) {
        movement[3][1] = 0;
    }

    return movement;
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



// display data

function display2D(tabToDisplay) {
    let id = 0;
    for (let x = 0; x < tabToDisplay[0].length; x++) {
        for (let y = 0; y < tabToDisplay[0].length; y++) {
            id = x+""+y;
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


// DFS //
let pass = 0;
let movetab = [];

function DFS(maxDepth, tab, profondeur, lastMove, movetab) {

    let save;
    let newXouY=[];
    let empty = findWhiteCell(9, tab);
    let x = empty[0];  // table X index (0,1,2)
    let y = empty[1];   // table Y index (0,1,2)
    let tabPossibleMoves = 0;

    let movements = findMovePossibilities(empty[0], empty[1], lastMove);   //[['X', 1, 'D'], ['X', -1, 'U'], ['Y', -1, 'L'], ['Y', 1, 'R']];
    for (let t =0; t < movements.length; t++){
        if (movements[t][1] !== 0){
            tabPossibleMoves++
        }
    }

    if (profondeur > maxDepth) {
        pass++;
        tab = [[8,3,1],[ 7,9,4],[ 6,2,5]];
        movetab=[];

        return false;
    }
    if (tab.toString() === '1,2,3,4,5,6,7,8,9') {
        display2D(tab);
        console.log('Solution trouve :: ' + tab + ' profondeur : ' + profondeur + 'En ' + pass + ' passes.' + ' mouvement : ' + movetab);
        console.log('tab2D: '+ tab2D + ' tab final sroted ' +tab);
        return true;
    }

    for(let u = 0; u < tabPossibleMoves; u++) {
        for (let i = 0; i < movements.length; i++) {
            if (movements[i][1] !== 0) {

                newXouY = movements[i][1];

                if (movements[i][0] === 'X') {
                    save = tab[x][y];
                    tab[x][y] = tab[(x + newXouY)][y];
                    tab[(x + newXouY)][y] = save;
                        movetab.push(movements[i][2]);

                    display2D(tab);
                    lastMove = i;
                    if (DFS(maxDepth, tab, profondeur + 1, lastMove, movetab)) {
                        return true;
                    }
                }
                else { // if 'Y'
                    save = tab[x][y];
                    tab[x][y] = tab[x][(y + newXouY)];
                    tab[x][(y + newXouY)] = save;

                    movetab.push(movements[i][2]);

                    display2D(tab);

                    lastMove = i;
                    if (DFS(maxDepth, tab, profondeur + 1, lastMove, movetab)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}


//                                                                      le tri est bon mais pas la récupérations des déplacements.
// function RealSort(tab) {
//     let empty = findWhiteCell(9, tab); // empty = [x,y]
//     let initialTab = tab;
//     let movements = [];
//     let save;
//     let newXouY;
//     let findMove;
//     let tabString = '';
//     let XSolution = [];
//     let nbSolution = 0;
//     let tempMove = [];
//     let depth = 0;
//     let maxDepth = 81;
//
//     display2D(tab);
//
//     while (depth < maxDepth) {
//
//         let didMove;
//
//         empty = findWhiteCell(9, tab);
//         let x = empty[0];  // table X index (0,1,2)
//         let y = empty[1];   // table Y index (0,1,2)
//
//
//         movements = findMovePossibilities(empty[0], empty[1], lastMove);   //[['X', 1, 'R'], ['X', -1, 'L], ['Y', -1, 'U'], ['Y', 1, 'D']];
//
//         while (!didMove) {
//             for (let i = 0; i < movements.length; i++) {
//                 for (let j = 0; j < movements[i].length; j++) {
//
//                     if (movements[j][1] !== 0) {
//                         didMove=true;
//
//                         if (movements[i][1] !== 0) {
//                             findMove = true;
//                             newXouY = movements[i][1];
//
//                             if (movements[i][0] === 'X') {
//                                 save = tab[x][y];
//                                 tab[x][y] = tab[(x + newXouY)][y];
//                                 tab[(x + newXouY)][y] = save;
//
//                                 lastMove = movements[i];
//                                 break;
//                             }
//                             else { // if 'Y'
//                                 save = tab[x][y];
//                                 tab[x][y] = tab[x][(y + newXouY)];
//                                 tab[x][(y + newXouY)] = save;
//
//                                 lastMove = [movements[i], movements[j]];
//                                 break;
//                             }
//                         }
//                     }
//                 }
//             }
//             if (tab.toString() === goal) {
//                 display2D(tab);
//                 return alert('solution find !!');
//
//             }
//         }
//         depth++;
//     }
// }


        // if (nbSolution === 10){
        //     shortestIndex = 0;
        //     for( let i = 1; i< allsolutions.length; i++){
        //         if(allsolutions[shortestIndex].length >= allsolutions[i].length)
        //             shortestIndex = i;
        //         finalsolution.push(allsolutions[i]);
        //     }
        //     alert('BEST way to line X ' + finalsolution );
        //     break;
        // }






// wait time before continue
function sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

// // Run algo to sort table
// function run(){
//
//     console.log('end run');
//     display2D( sortTableMutli(tab2D));
// }
