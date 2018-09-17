// Base table
let tab2D = [[3,5,9],
            [ 2,8,4],
            [ 1,7,6]];

// let goal = '1,2,3,4,5,6,7,8,9';



function findWhiteCell(value, tabb){
    let whiteX = 0;
    let whiteY = 0;
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
function findMovePossibilities(x,y) {
    let movement = [['X', 1, 'D'], ['X', -1, 'U'], ['Y', -1, 'L'], ['Y', 1, 'R']];
    let possibleMoves = [];

    /*  lastMove = lastMove || false;

     //make impossible to reverse a movement (like D U D U ...)
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
 */

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

    for (let i =0; i < movement.length; i++){
        if (movement[i][1] !== 0){
            possibleMoves.push(movement[i][2]);
        }
    }

    return possibleMoves;
}


// RANDOM WITH EMPTY CELL !!!
function randomWhiteCell(value, random) {
    let save;
    let whiteCell = [];

    for (let a = 0; a < random; a++) {
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


// SWAP //
function swap(tab, x, y, moveToDo){ // moveToDo =  'U' 'D' 'L' 'R'
    let save;

        switch (moveToDo) {

            case 'D':
                save = tab[x][y];
                tab[x][y] = tab[x + 1][y];
                tab[x + 1][y] = save;
                break;

            case 'U':
                save = tab[x][y];
                tab[x][y] = tab[x - 1][y];
                tab[x - 1][y] = save;
                break;
            case 'L':
                save = tab[x][y];
                tab[x][y] = tab[x][y - 1];
                tab[x][y - 1] = save;
                break;

            case 'R':
                save = tab[x][y];
                tab[x][y] = tab[x][y + 1];
                tab[x][y + 1] = save;
                break;
        }
        return tab;
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


/**
 * Merge a Dimensional Array to return a Linear Array
 * @param array2d
 * @returns {Array}
 */
function mergeArray(array2d) {
    let mergedArray = [];
    array2d.forEach((value, key) => {
        mergedArray = mergedArray.concat(array2d[key]);
    });
    return mergedArray;
}


/**
 * Explode a Linear Array to a Dimensional Array
 * Take 3 first value, put into an array, then 3 next, then 3 next
 * @param array
 * @returns array [ [], [], [] ]
 */
function explodeArray(array) {
    return [
        array.slice(0, 3),
        array.slice(3, 6),
        array.slice(6, 9),
    ]
}


// BFS SORT // not working
function BFS(value, tab) {
    let originTab;
    let chemins = [];
    let counter = 0;
    let temp = [];
    let resolved = false;
    display2D(tab);

    originTab = explodeArray(mergeArray(tab));

    let empty = findWhiteCell(value, tab);
    let x = empty[0];
    let y = empty[1];

    // first boucle
    let possiblesMoves = findMovePossibilities(x, y);
    for (let i = 0; i < possiblesMoves.length; i++) {
        chemins.push([possiblesMoves[i]]);
    }

    // all other boucles
    while(!resolved) {
// Move and update chemins
        // does all the chemins possible and check after each one if taquin is resolved.
        tab = explodeArray(mergeArray(originTab));
        empty = findWhiteCell(value, tab);
        x = empty[0];
        y = empty[1];

        for (let j = 0; j < chemins[0].length; j++) {
            swap(tab, x, y, chemins[0][j]);
            empty = findWhiteCell(value, tab);
            x = empty[0];
            y = empty[1];
        }
        counter++;
        if (tab.toString() === '1,2,3,4,5,6,7,8,9') {
            display2D(tab);
            resolved = true;
            return console.log('RESOLU : ' + originTab + ' => ' + tab + ' mouvements necessaire : ' + chemins[0] + ' en ' +counter + ' essais');
        }
        else {
            empty = findWhiteCell(value, tab);
            x = empty[0];
            y = empty[1];

            possiblesMoves = findMovePossibilities(x, y);
            // delete copy last chemin et add les moves possibles puis delete le old chemin.
            // push the old chemin and add new move possibilities.
            temp = Object.assign([], chemins[0]);
            for (let t = 0; t < possiblesMoves.length; t++) {
                switch (possiblesMoves[t]) {
                    case 'D':
                        if (temp[temp.length - 1] !== 'U') {
                            temp.push(possiblesMoves[t]);
                            chemins.push(temp);
                            chemins.shift();              // delete the chemin just done.
                            break;
                        }
                    case 'U':
                        if (temp[temp.length - 1] !== 'D') {
                            temp.push(possiblesMoves[t]);
                            chemins.push(temp);
                            chemins.shift(); 
                            break;
                        }
                    case 'R':
                        if (temp[temp.length - 1] !== 'L') {
                            temp.push(possiblesMoves[t]);
                            chemins.push(temp);
                            chemins.shift(); 
                            break;
                        }
                    case 'L':
                        if (temp[temp.length - 1] !== 'R') {
                            temp.push(possiblesMoves[t]);
                            chemins.push(temp);
                            chemins.shift(); 
                            break;
                        }
                }
            }
        }
        console.log('boucle');
    }
}
