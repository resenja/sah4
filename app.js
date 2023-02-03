function createBoard(){
    for(let i=0;i<14;i++){
        for(let j = 0;j<14;j++){
            let element = document.createElement('div');
            element.classList.add("square");
            element.classList.add("noselect");
            if((i <3 || i>10) && (j <3 || j > 10))element.classList.add("blank");
            else{
                if((i+j)%2 === 0)element.classList.add("white");
                else element.classList.add("black");
            }
            element.setAttribute("id",String.fromCharCode(97 + i) + (14 - j));
            element.setAttribute("onclick","dragEnd(event)");
            if(i===0){
                switch(j){
                    case 3:element.append(createPiece("r", "blue"));break;
                    case 4:element.append(createPiece("n", "blue"));break;
                    case 5:element.append(createPiece("b", "blue"));break;
                    case 6:element.append(createPiece("q", "blue"));break;
                    case 7:element.append(createPiece("k", "blue"));break;
                    case 8:element.append(createPiece("b", "blue"));break;
                    case 9:element.append(createPiece("n", "blue"));break;
                    case 10:element.append(createPiece("r", "blue"));break;
                }
            }
            else if(i===1 && j > 2 && j < 11)element.append(createPiece("p", "blue"));
            else if(i===13){
                switch(j){
                    case 3:element.append(createPiece("r", "green"));break;
                    case 4:element.append(createPiece("n", "green"));break;
                    case 5:element.append(createPiece("b", "green"));break;
                    case 7:element.append(createPiece("q", "green"));break;
                    case 6:element.append(createPiece("k", "green"));break;
                    case 8:element.append(createPiece("b", "green"));break;
                    case 9:element.append(createPiece("n", "green"));break;
                    case 10:element.append(createPiece("r", "green"));break;
                }
            }
            else if(i===12 && j > 2 && j < 11)element.append(createPiece("p", "green"));
            else if(j===0){
                switch(i){
                    case 3:element.append(createPiece("r", "yellow"));break;
                    case 4:element.append(createPiece("n", "yellow"));break;
                    case 5:element.append(createPiece("b", "yellow"));break;
                    case 7:element.append(createPiece("q", "yellow"));break;
                    case 6:element.append(createPiece("k", "yellow"));break;
                    case 8:element.append(createPiece("b", "yellow"));break;
                    case 9:element.append(createPiece("n", "yellow"));break;
                    case 10:element.append(createPiece("r", "yellow"));break;
                }
            }
            else if(j===1 && i > 2 && i < 11)element.append(createPiece("p", "yellow"));
            else if(j===13){
                switch(i){
                    case 3:element.append(createPiece("r", "red"));break;
                    case 4:element.append(createPiece("n", "red"));break;
                    case 5:element.append(createPiece("b", "red"));break;
                    case 6:element.append(createPiece("q", "red"));break;
                    case 7:element.append(createPiece("k", "red"));break;
                    case 8:element.append(createPiece("b", "red"));break;
                    case 9:element.append(createPiece("n", "red"));break;
                    case 10:element.append(createPiece("r", "red"));break;
                }
            }
            else if(j===12 && i > 2 && i < 11)element.append(createPiece("p", "red"));


            document.querySelector("#rank" + (i+1)).append(element);
        }
    }
}
function createPiece(pieceType, pieceColor){
    let piece = document.createElement('img');
    piece.setAttribute("src",`img/chesspieces/${pieceColor}/${pieceType}.svg`);
    piece.classList.add(pieceType);
    piece.classList.add(pieceColor);
    piece.classList.add("piece");
    piece.setAttribute("ondragstart","return false;");
    piece.setAttribute("onmousedown","drag(this,event)");
    piece.setAttribute("onmouseup","dragEnd(event)");
    piece.setAttribute("draggable","false");
    return piece;
}
function opponentColors(personalColor){
    let opponents = [];
    if(personalColor === "red")opponents = ["blue" , "yellow" , "green"];
    else if(personalColor === "blue")opponents = ["red" , "yellow" , "green"];
    else if(personalColor === "yellow")opponents = ["red" , "blue" , "green"];
    else if(personalColor === "green")opponents = ["red" , "blue" , "yellow"];
    return opponents;
}
function pawnMoves(square, pieceColor){
    let moves = [];
    if(pieceColor === "red"){
        let newSquare = document.querySelector("#" + square.id[0] + (parseInt(square.id.slice(1)) + 1));
        if(!newSquare.firstChild){
            moves.push(newSquare);
            if(square.id.slice(1) === "2"){
                doubleMove = document.querySelector("#" + square.id[0] + (parseInt(square.id.slice(1))  + 2));
                if(!doubleMove.firstChild) moves.push(doubleMove);
            }
        }
        newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) - 1) + (parseInt(square.id.slice(1)) + 1));
        if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
        newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + 1) + (parseInt(square.id.slice(1)) + 1));
        if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
    }
    else if(pieceColor === "blue"){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + 1) + square.id.slice(1));
        if(!newSquare.firstChild){
            moves.push(newSquare);
            if(square.id[0] === "b"){
                doubleMove = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + 2) + square.id.slice(1));
                if(!doubleMove.firstChild) moves.push(doubleMove);
            }
        }
        newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + 1) + (parseInt(square.id.slice(1)) - 1));
        if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
        newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + 1) + (parseInt(square.id.slice(1)) + 1));
        if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
    }
    else if(pieceColor === "yellow"){
        let newSquare = document.querySelector("#" + square.id[0] + (parseInt(square.id.slice(1)) - 1));
        if(!newSquare.firstChild){
            moves.push(newSquare);
            if(square.id.slice(1) === "13"){
                doubleMove = document.querySelector("#" + square.id[0] + (parseInt(square.id.slice(1)) - 2));
                if(!doubleMove.firstChild) moves.push(doubleMove);
            }
        }
        newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) - 1) + (parseInt(square.id.slice(1)) - 1));
        if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
        newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + 1) + (parseInt(square.id.slice(1)) - 1));
        if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
    }
    else if(pieceColor === "green"){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) - 1) + square.id.slice(1));
        if(!newSquare.firstChild){
            moves.push(newSquare);
            if(square.id[0] === "m"){
                doubleMove = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) - 2) + square.id.slice(1));
                if(!doubleMove.firstChild) moves.push(doubleMove);
            }
        }
        newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) - 1) + (parseInt(square.id.slice(1)) - 1));
        if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
        newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) - 1) + (parseInt(square.id.slice(1)) + 1));
        if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
    }
    return moves;
}
function knightMoves(square, pieceColor){
    let moves = [];
    if(square.id[0].charCodeAt(0) - 1 > 96 && parseInt(square.id.slice(1)) + 2 < 15){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) - 1) + (parseInt(square.id.slice(1)) + 2));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }
    if(square.id[0].charCodeAt(0) + 1 < 111 && parseInt(square.id.slice(1)) + 2 < 15){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + 1) + (parseInt(square.id.slice(1)) + 2));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }
    if(square.id[0].charCodeAt(0) - 1 > 96 && parseInt(square.id.slice(1)) - 2 > 0){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) - 1) + (parseInt(square.id.slice(1)) - 2));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }
    if(square.id[0].charCodeAt(0) + 1 < 111 && parseInt(square.id.slice(1)) - 2 > 0){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + 1) + (parseInt(square.id.slice(1)) - 2));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }


    if(square.id[0].charCodeAt(0) - 2 > 96 && parseInt(square.id.slice(1)) - 1 > 0){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) - 2) + (parseInt(square.id.slice(1)) - 1));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }
    if(square.id[0].charCodeAt(0) - 2 > 96 && parseInt(square.id.slice(1)) + 1 < 15){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) - 2) + (parseInt(square.id.slice(1)) + 1));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }
    if(square.id[0].charCodeAt(0) + 2 < 111 && parseInt(square.id.slice(1)) - 1 > 0){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + 2) + (parseInt(square.id.slice(1)) - 1));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }
    if(square.id[0].charCodeAt(0) + 2 < 111 && parseInt(square.id.slice(1)) + 1 < 15){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + 2) + (parseInt(square.id.slice(1)) + 1));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }
    return moves;
}
function bishopMoves(square, pieceColor){
    let moves = [];
    let i = 0;
    let j = 0;
    while(true){
        i--;
        j--;
        if(square.id[0].charCodeAt(0) + i < 97 || parseInt(square.id.slice(1)) + j < 1)break;
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + i) + (parseInt(square.id.slice(1)) + j));
        if(newSquare != null && !newSquare.classList.contains("blank") && !newSquare.classList.contains(pieceColor)){
            if(!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
            else break;
            if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))
                break;
            }
        else break;
    }

    i = 0;
    j = 0;
    while(true){
        i--;
        j++;
        if(square.id[0].charCodeAt(0) + i < 97 || parseInt(square.id.slice(1)) + j > 14)break;
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + i) + (parseInt(square.id.slice(1)) + j));
        if(newSquare != null && !newSquare.classList.contains("blank")){
            if(!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
            else break;
            if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))
                break;
            }
        else break;
    }

    i = 0;
    j = 0;
    while(true){
        i++;
        j--;
        if(square.id[0].charCodeAt(0) + i > 110 || parseInt(square.id.slice(1)) + j < 1)break;
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + i) + (parseInt(square.id.slice(1)) + j));
        if(newSquare != null && !newSquare.classList.contains("blank")){
            if(!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
            else break;
            if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))
                break;
            }
        else break;
    }

    i = 0;
    j = 0;
    while(true){
        i++;
        j++;
        if(square.id[0].charCodeAt(0) + i > 110 || parseInt(square.id.slice(1)) + j > 14)break;
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + i) + (parseInt(square.id.slice(1)) + j));
        if(newSquare != null && !newSquare.classList.contains("blank")){

            if(!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
            else break;
            if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))
                break;
            }
        else break;
    }

    return moves;
    
}
function rookMoves(square, pieceColor){
    let moves = [];
    let i = 0;
    while(true){
        i--;
        if(square.id[0].charCodeAt(0) + i < 97)break;
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + i) + square.id.slice(1));
        if(newSquare != null && !newSquare.classList.contains("blank")){
            if(!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
            else break;
            if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))
                break;
            }
        else break;
    }

    i = 0;
    while(true){
        i++;
        if(square.id[0].charCodeAt(0) + i > 110)break;
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + i) + square.id.slice(1));
        if(newSquare != null && !newSquare.classList.contains("blank")){
            if(!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
            else break;
            if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))
                break;
            }
        else break;
    }
    i = 0;
    while(true){
        i--;
        if(parseInt(square.id.slice(1)) + i < 1)break;
        let newSquare = document.querySelector("#" + square.id[0] + (parseInt(square.id.slice(1)) + i));
        if(newSquare != null && !newSquare.classList.contains("blank")){
            if(!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
            else break;
            if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))
                break;
            }
        else break;
    }

    i = 0;
    while(true){
        i++;
        if(parseInt(square.id.slice(1)) + i > 14)break;
        let newSquare = document.querySelector("#" + square.id[0] + (parseInt(square.id.slice(1)) + i));
        if(newSquare != null && !newSquare.classList.contains("blank")){
            if(!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor))moves.push(newSquare);
            else break;
            if(newSquare.firstChild && !newSquare.firstChild.classList.contains(pieceColor))
                break;
            }
        else break;
    }

    return moves;
}
function queenMoves(square, pieceColor){
    let moves = [];
    moves.push.apply(moves, bishopMoves(square,pieceColor));
    moves.push.apply(moves, rookMoves(square,pieceColor));

    return moves;
}
function kingMoves(square, pieceColor){
    let moves = [];
    if(square.id[0].charCodeAt(0) - 1 > 96 && parseInt(square.id.slice(1)) - 1 > 0){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) - 1) + (parseInt(square.id.slice(1))  - 1));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }
    if(square.id[0].charCodeAt(0) - 1 > 96 && parseInt(square.id.slice(1)) + 1 < 15){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) - 1) + (parseInt(square.id.slice(1)) + 1));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }
    if(square.id[0].charCodeAt(0) + 1 < 111 && parseInt(square.id.slice(1)) - 1 > 0){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + 1) + (parseInt(square.id.slice(1)) - 1));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }
    if(square.id[0].charCodeAt(0) + 1 < 111 && parseInt(square.id.slice(1)) + 1 < 15){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + 1) + (parseInt(square.id.slice(1)) + 1));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }


    if(square.id[0].charCodeAt(0) - 1 > 96){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) - 1) + (parseInt(square.id.slice(1))));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }
    if(square.id[0].charCodeAt(0) + 1 < 111){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0) + 1) + (parseInt(square.id.slice(1))));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }
    if(parseInt(square.id.slice(1)) - 1 > 0){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0)) + (parseInt(square.id.slice(1)) - 1));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }
    if(parseInt(square.id.slice(1)) + 1 > 0){
        let newSquare = document.querySelector("#" + String.fromCharCode(square.id[0].charCodeAt(0)) + (parseInt(square.id.slice(1)) + 1));
        if(newSquare != null && !newSquare.classList.contains("blank") && (!newSquare.firstChild || !newSquare.firstChild.classList.contains(pieceColor)))
            moves.push(newSquare);
    }
    return moves;
}
function allColorMoves(moves, squares, pieceColor){
    for(let i=0;i<squares.length;i++){
        if(squares[i].classList.contains("p"))moves.push.apply(moves, pawnMoves(squares[i].parentElement, pieceColor));
        else if(squares[i].classList.contains("n"))moves.push.apply(moves, knightMoves(squares[i].parentElement, pieceColor));
        else if(squares[i].classList.contains("b"))moves.push.apply(moves, bishopMoves(squares[i].parentElement, pieceColor));
        else if(squares[i].classList.contains("r"))moves.push.apply(moves, rookMoves(squares[i].parentElement, pieceColor));
        else if(squares[i].classList.contains("q") || squares[i].classList.contains("d"))moves.push.apply(moves, queenMoves(squares[i].parentElement, pieceColor));
        else if(squares[i].classList.contains("k"))moves.push.apply(moves, kingMoves(squares[i].parentElement, pieceColor));
    }
}
function findMoves(pieceColor){
    let moves = [];
    let opponentColor = opponentColors(pieceColor);
    let opponent1 = document.querySelectorAll("." + opponentColor[0] + ":first-child:not(.gray)");
    let opponent2 = document.querySelectorAll("." + opponentColor[1] + ":first-child:not(.gray)");
    let opponent3 = document.querySelectorAll("." + opponentColor[2] + ":first-child:not(.gray)");
    allColorMoves(moves,opponent1,opponentColor[0]);
    allColorMoves(moves,opponent2,opponentColor[1]);
    allColorMoves(moves,opponent3,opponentColor[2]);
    return moves;
}
function moveIsLegal(pieceColor){
    let king;
    let moves = [];
    king = document.querySelector(".k." + pieceColor);
    moves = findMoves(pieceColor);

    return !moves.includes(king.parentElement);
}

function movePiece(){
    let moves = [];
    let pieceColor;
    if(piece.classList.contains("red"))pieceColor = "red";
    else if(piece.classList.contains("blue"))pieceColor = "blue";
    else if(piece.classList.contains("yellow"))pieceColor = "yellow";
    else if(piece.classList.contains("green"))pieceColor = "green";
    if(piece.classList.contains("p")) moves.push.apply(moves, pawnMoves(piece.parentElement,pieceColor));
    else if(piece.classList.contains("n")) moves.push.apply(moves, knightMoves(piece.parentElement,pieceColor));
    else if(piece.classList.contains("b")) moves.push.apply(moves, bishopMoves(piece.parentElement,pieceColor));
    else if(piece.classList.contains("r")) moves.push.apply(moves, rookMoves(piece.parentElement,pieceColor));
    else if(piece.classList.contains("q") || piece.classList.contains("d")) moves.push.apply(moves, queenMoves(piece.parentElement,pieceColor));
    else if(piece.classList.contains("k")) moves.push.apply(moves, kingMoves(piece.parentElement,pieceColor));


    let n = moves.length
    for(let i =n - 1; i>=0;i--){
        let previousParent = piece.parentElement;
        moves[i].prepend(piece);
        if(moveIsLegal(pieceColor)){
            moves[i].classList.add("legal-move");
        }
        else moves.splice(i,1);
        previousParent.append(piece);
    }
    if(!movedKing && (!movedRookL || !movedRookR) && piece.classList.contains("k")){
        let castleMoves = [];
        let shortCastle = false;
        let longCastle = false;
        if(pieceColor === "red"){
            if(!movedRookL){
                let left1 = document.querySelector("#e1");
                let left2 = document.querySelector("#f1");
                let left3 = document.querySelector("#g1");
                if(!left1.firstChild && !left2.firstChild && !left3.firstChild){
                    longCastle = true;
                    castleMoves = findMoves(pieceColor);
                    if(!castleMoves.includes(left1) && !castleMoves.includes(left2) && !castleMoves.includes(left3)){
                        left2.classList.add("legal-move");
                        moves.push(left2);
                    }
                }
            }
            if(!movedRookR){
                let right1 = document.querySelector("#i1");
                let right2 = document.querySelector("#j1");
                if(!right1.firstChild && !right2.firstChild){
                    shortCastle = true;
                    if(!longCastle)castleMoves = findMoves(pieceColor);
                    if(!castleMoves.includes(right1) && !castleMoves.includes(right2)){
                        right2.classList.add("legal-move");
                        moves.push(right2);
                    }
                }
            }
        }
    
        else if(pieceColor === "blue"){
            if(!movedRookL){
                let left1 = document.querySelector("#a10");
                let left2 = document.querySelector("#a9");
                let left3 = document.querySelector("#a8");
                if(!left1.firstChild && !left2.firstChild && !left3.firstChild){
                    longCastle = true;
                    castleMoves = findMoves(pieceColor);
                    if(!castleMoves.includes(left1) && !castleMoves.includes(left2) && !castleMoves.includes(left3)){
                        left2.classList.add("legal-move");
                        moves.push(left2);
                    }
                }
            }
            if(!movedRookR){
                let right1 = document.querySelector("#a6");
                let right2 = document.querySelector("#a5");
                if(!right1.firstChild && !right2.firstChild){
                    shortCastle = true;
                    if(!longCastle)castleMoves = findMoves(pieceColor);
                    if(!castleMoves.includes(right1) && !castleMoves.includes(right2)){
                        right2.classList.add("legal-move");
                        moves.push(right2);
                    }
                }
            }
        }
    
        else if(pieceColor === "yellow"){
            if(!movedRookL){
                let left1 = document.querySelector("#h14");
                let left2 = document.querySelector("#i14");
                let left3 = document.querySelector("#j14");
                if(!left1.firstChild && !left2.firstChild && !left3.firstChild){
                    longCastle = true;
                    if(!castleMoves.includes(left1) && !castleMoves.includes(left2) && !castleMoves.includes(left3)){
                        left2.classList.add("legal-move");
                        moves.push(left2);
                    }
                }
            }
            if(!movedRookR){
                let right1 = document.querySelector("#f14");
                let right2 = document.querySelector("#e14");
                if(!right1.firstChild && !right2.firstChild){
                    shortCastle = true;
                    if(!longCastle)castleMoves = findMoves(pieceColor);
                    if(!castleMoves.includes(right1) && !castleMoves.includes(right2)){
                        right2.classList.add("legal-move");
                        moves.push(right2);
                    }
                }
            }
        }
    
        else if(pieceColor === "green"){
            if(!movedRookL){
                let left1 = document.querySelector("#n5");
                let left2 = document.querySelector("#n6");
                let left3 = document.querySelector("#n7");
                if(!left1.firstChild && !left2.firstChild && !left3.firstChild){
                    longCastle = true;
                    castleMoves = findMoves(pieceColor);
                    if(!castleMoves.includes(left1) && !castleMoves.includes(left2) && !castleMoves.includes(left3)){
                        left2.classList.add("legal-move");
                        moves.push(left2);
                    }
                }
            }
            if(!movedRookR){
                let right1 = document.querySelector("#n9");
                let right2 = document.querySelector("#n10");
                if(!right1.firstChild && !right2.firstChild){
                    shortCastle = true;
                    if(!longCastle)castleMoves = findMoves(pieceColor);
                    if(!castleMoves.includes(right1) && !castleMoves.includes(right2)){
                        right2.classList.add("legal-move");
                        moves.push(right2);
                    }
                }
            }
        }
    }
    return moves;
}
function resetLegalMoves(){
    let squares = document.querySelectorAll(".legal-move");
    for(let i = 0;i<squares.length;i++)squares[i].classList.remove("legal-move");
    legalMoves = [];
}



let marginTopBottom=20;
let marginLeftRight = 20;
addEventListener("resize", (event) => {

    let size = Math.min(document.querySelector("body").offsetWidth - marginLeftRight, document.querySelector("body").offsetHeight - marginTopBottom) / 14;
    document.querySelector(":root").style.setProperty("--square-size",size+"px");
});
addEventListener("load", (event) => {

    let size = Math.min(document.querySelector("body").offsetWidth - marginLeftRight, document.querySelector("body").offsetHeight - marginTopBottom) / 14;
    document.querySelector(":root").style.setProperty("--square-size",size+"px");
});
function containsLegalMoves(){
    if(legalMoves.length === 0 ) return false;
    else return true;
}
function castles(){
    if(piece.classList.contains("red")){
        if(piece.parentElement.id === "f1"){
            document.querySelector("#g1").append(document.querySelector("#d1").firstChild);
            movedRookL = true;
        }
        else if(piece.parentElement.id === "j1"){
            document.querySelector("#i1").append(document.querySelector("#k1").firstChild);
            movedRookR = true;
        }
    }
    else if(piece.classList.contains("blue")){
        if(piece.parentElement.id === "a9"){
            document.querySelector("#a8").append(document.querySelector("#a11").firstChild);
            movedRookL = true;
        }
        else if(piece.parentElement.id === "a5"){
            document.querySelector("#a6").append(document.querySelector("#a4").firstChild);
            movedRookR = true;
        }
    }
    else if(piece.classList.contains("yellow")){
        if(piece.parentElement.id === "i14"){
            document.querySelector("#h14").append(document.querySelector("#k14").firstChild);
            movedRookL = true;
        }
        else if(piece.parentElement.id === "e14"){
            document.querySelector("#f14").append(document.querySelector("#d14").firstChild);
            movedRookR = true;
        }
    }
    else if(piece.classList.contains("green")){
        if(piece.parentElement.id === "n6"){
            document.querySelector("#n7").append(document.querySelector("#n4").firstChild);
            movedRookL = true;
        }
        else if(piece.parentElement.id === "n10"){
            document.querySelector("#n9").append(document.querySelector("#n11").firstChild);
            movedRookR = true;
        }
        movedKing = true;
    }
}
function changeRookStatus(){
    if(piece.classList.contains("red")){
        if(snapElement.id === "d1")movedRookL = true;
        else if(snapElement.id === "k1") movedRookR = true;
    }
    else if(piece.classList.contains("blue")){
        if(snapElement.id === "a11")movedRookL = true;
        else if(snapElement.id === "a4") movedRookR = true;
    }
    else if(piece.classList.contains("yellow")){
        if(snapElement.id === "k14")movedRookL = true;
        else if(snapElement.id === "d14") movedRookR = true;
    }
    else if(piece.classList.contains("green")){
        if(snapElement.id === "n4")movedRookL = true;
        else if(snapElement.id === "n11") movedRookR = true;
    }
}

function checkmate(){
    if(!checkmated.includes("red")){
        let red = document.querySelectorAll(".red");
        let legal = false;
        for(let i =0;i<red.length;i++){
            piece = red[i];
            if(movePiece().length > 0){
                legal = true;
                break;
            }
        }
        if(!legal){
            for(let i =0;i<red.length;i++){
                red[i].classList.add("gray");
            }
            checkmated.push("red");
        }
    }

    if(!checkmated.includes("blue")){
        let blue = document.querySelectorAll(".blue");
        let legal = false;
        for(let i =0;i<blue.length;i++){
            piece = blue[i];
            if(movePiece().length > 0){
                legal = true;
                break;
            }
        }
        if(!legal){
            for(let i =0;i<blue.length;i++){
                blue[i].classList.add("gray");
            }
            checkmated.push("blue");
        }
    }

    if(!checkmated.includes("yellow")){
        let yellow = document.querySelectorAll(".yellow");
        let legal = false;
        for(let i =0;i<yellow.length;i++){
            piece = yellow[i];
            if(movePiece().length > 0){
                legal = true;
                break;
            }
        }
        if(!legal){
            for(let i =0;i<yellow.length;i++){
                yellow[i].classList.add("gray");
            }
            checkmated.push("yellow");
        }
    }

    if(!checkmated.includes("green")){
        let green = document.querySelectorAll(".green");
        let legal = false;
        for(let i =0;i<green.length;i++){
            piece = green[i];
            if(movePiece().length > 0){
                legal = true;
                break;
            }
        }
        if(!legal){
            for(let i =0;i<green.length;i++){
                green[i].classList.add("gray");
            }
            checkmated.push("green");
        }
    }
}
function promote(){
    if(piece.classList.contains("red")){
        if(piece.parentElement.id.slice(1) === "8"){
            piece.setAttribute("src","img/chesspieces/red/d.svg");
            piece.classList.remove("p");
            piece.classList.add("d");
        }
    }
    else if(piece.classList.contains("blue")){
        if(piece.parentElement.id[0] === "h"){
            piece.setAttribute("src","img/chesspieces/red/d.svg");
            piece.classList.remove("p");
            piece.classList.add("d");
        }
    }
    else if(piece.classList.contains("yellow")){
        if(piece.parentElement.id.slice(1) === "7"){
            piece.setAttribute("src","img/chesspieces/red/d.svg");
            piece.classList.remove("p");
            piece.classList.add("d");
        }
    }
    else if(piece.classList.contains("green")){
        if(piece.parentElement.id[0] === "g"){
            piece.setAttribute("src","img/chesspieces/red/d.svg");
            piece.classList.remove("p");
            piece.classList.add("d");
        }
    }
}
function getPosition(){
    let s = "";
    let squares = document.querySelectorAll(".square");

    for(let i =0;i<squares.length;i++){
        if(!squares[i].firstChild)s+="0";
        else {
            if(squares[i].firstChild.classList.contains("red"))s+="R";
            else if(squares[i].firstChild.classList.contains("blue"))s+="B";
            else if(squares[i].firstChild.classList.contains("yellow"))s+="Y";
            else if(squares[i].firstChild.classList.contains("green"))s+="G";

            if(squares[i].firstChild.classList.contains("p"))s+="p";
            else if(squares[i].firstChild.classList.contains("n"))s+="n";
            else if(squares[i].firstChild.classList.contains("b"))s+="b";
            else if(squares[i].firstChild.classList.contains("r"))s+="r";
            else if(squares[i].firstChild.classList.contains("q"))s+="q";
            else if(squares[i].firstChild.classList.contains("k"))s+="k";
            else if(squares[i].firstChild.classList.contains("d"))s+="d";
        }
    }
    return s;
}
function getFullPosition(){
    let gameParams = fullPosition.split(" ");
    gameParams[0] = getPosition();
    fullPosition = gameParams.join(" ");
}
function setPosition(position){
    let positionIndex = 0;
    let squares = document.querySelectorAll(".square");

    for(let i =0;i<squares.length;i++){
        if(squares[i].firstChild)squares[i].firstChild.remove();
        if(position[positionIndex] !== "0"){
            let pieceColor="";
            if(position[positionIndex] === "R")pieceColor="red";
            else if(position[positionIndex] === "B")pieceColor="blue";
            else if(position[positionIndex] === "Y")pieceColor="yellow";
            else if(position[positionIndex] === "G")pieceColor="green";

            positionIndex++;
            squares[i].append(createPiece(position[positionIndex],pieceColor));
        }
        positionIndex++;
    }
}


let dragging = false;
let piece = document.querySelector("red");
let snapElement;
let movedKing = false;
let movedRookL = false;
let movedRookR = false;
let legalMoves = [];
let checkmated = [];

let created = false;
let turn = "";
let players = 0;
let gameName = "";
let color = "red";
let score = 0;
let time = 60;
let channel;
let fullPosition="";

function init(){
    createBoard();
    connect();
}
init();

function drag(element, event){
    if(!dragging && element.classList.contains(color) && !element.classList.contains("gray") && turn === color){
        dragging = true;
        piece = element;
        piece.classList.add("drag");
        snapElement = piece.parentElement;
        legalMoves = [];
        resetLegalMoves();
        legalMoves = movePiece();
        document.querySelector("#game").append(piece);
        moveAt(event);
    }
  }
  function moveAt(event) {
    piece.style.left = event.pageX - piece.offsetWidth/2 + 'px';
    piece.style.top = event.pageY - piece.offsetHeight/2 + 'px';
  }
  function onMouseMove(event) {
    if(dragging)moveAt(event);
  }
document.addEventListener('mousemove', onMouseMove);
async function dragEnd(event){
    if((dragging || containsLegalMoves()) && turn === color){
        let elementsUnder = document.elementsFromPoint(event.clientX,event.clientY);
        let moved = false;
        for(let i=0;i<elementsUnder.length;i++){
            if(elementsUnder[i].classList.contains("square") && legalMoves.includes(elementsUnder[i])){
                if(elementsUnder[i].firstChild){
                    if(elementsUnder[i].firstChild.classList.contains("p") || elementsUnder[i].firstChild.classList.contains("d")) score += 1;
                    else if(elementsUnder[i].firstChild.classList.contains("n")) score += 3;
                    else if(elementsUnder[i].firstChild.classList.contains("b")) score += 3;
                    else if(elementsUnder[i].firstChild.classList.contains("r")) score += 5;
                    else if(elementsUnder[i].firstChild.classList.contains("q")) score += 8;
                    else if(elementsUnder[i].firstChild.classList.contains("k")) score += 20;
                    elementsUnder[i].firstChild.remove();
                }
                elementsUnder[i].append(piece);
                if(!movedKing && piece.classList.contains("k"))castles();
                if(!movedKing && (!movedRookL || !movedRookR) && piece.classList.contains("r"))changeRookStatus();
                if(piece.classList.contains("p"))promote();
                moved = true;
                break;
            }
        }
        piece.classList.remove("drag");
        piece.style.top = "0";
        piece.style.left = "0";
        dragging = false;
        if(!moved)snapElement.append(piece);
        else{
            getFullPosition();
            let castleParams;
            if(color === "red")castleParams = fullPosition.split(" ")[1];
            else if(color === "blue")castleParams = fullPosition.split(" ")[2];
            else if(color === "yellow")castleParams = fullPosition.split(" ")[3];
            else if(color === "green")castleParams = fullPosition.split(" ")[4];
            
            if(fullPosition.includes("-"))fullPosition = fullPosition.replace(castleParams, updatePositionParams(castleParams));


            checkmate();
            resetLegalMoves();
            if(checkmated.length<3)nextTurn();
            if(new URLSearchParams(document.location.search).get("id")){
                const { data, error } = await client
                    .from('chess_four')
                    .update({ board: fullPosition, turn: turn})
                    .eq('game_name', gameName)
            }
        }
    }
}
function nextTurn(){
    if(turn === "red"){
        turn = "blue";
        if(checkmated.includes("blue"))nextTurn();
    }
    else if(turn === "blue"){
        turn = "yellow";
        if(checkmated.includes("yellow"))nextTurn();
    }
    else if(turn === "yellow"){
        turn = "green";
        if(checkmated.includes("green"))nextTurn();
    }
    else if(turn === "green"){
        turn = "red";
        if(checkmated.includes("red"))nextTurn();
    }
}

function updatePositionParams(params){
    let newParams = params.split("-");
    let castleParams = "";
    if(movedKing)newParams[0] = "11";
    else{
        if(movedRookL)castleParams += "1";
        else castleParams += "0";
        if(movedRookR)castleParams += "1";
        else castleParams += "0";
        newParams[0] = castleParams;
    }
    newParams[1] = score;
    return newParams.join("-");
}


function setBodyColor(){
    if(turn === "red") return "#bf3b43";
    else if(turn === "blue") return "#4185bf";
    else if(turn === "yellow") return "#c09526";
    else return "#4e9161";
}
  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  function getColor(availableColors){
    let result = availableColors.split(" ");
    let index = Math.floor(Math.random() * result.length);
    return result[index];
  }
  function getAvailableColors(availableColors){
    let result = "";
    for(let i = 0;i<availableColors.length;i++)result += availableColors[i];
    return result;
  }

  function randomizeColors(availableColors){
    let result = availableColors.split(" ");
    let s = "";
    let n = result.length;
    for(let i = 0; i< n;i++){
        let index = Math.floor(Math.random() * result.length);
        s+=result[index] + " ";
        result.splice(index, 1);
    }
    return s.trim();
  }
  async function connect(){
    let search = new URLSearchParams(document.location.search);
    let id = search.get("id")
    if(id){
        gameName = id;
        document.querySelector("#create-cover").style.display = "none";
        let inviteField = document.querySelector("#gameID");
        inviteField.value = document.URL;
        inviteField.style.maxWidth = document.URL.length + "ch";
        if(sessionStorage.getItem(id)){
            color = sessionStorage.getItem(id);
            const { data, error } = await client
                .from('chess_four')
                .select('board, turn, started')
                .eq('game_name', gameName)
            created = data[0].started;
            if(created){
                turn = data[0].turn;
                document.querySelector("body").style.backgroundColor = setBodyColor();
                fullPosition = data[0].board;
                setPosition(fullPosition.split(" ")[0]);
                checkmate();
                resetLegalMoves();
            }
            else document.querySelector("#wait-cover").style.display = "block";
        }
        else {
            document.querySelector("#wait-cover").style.display = "block";
            const { data, error } = await client
            .from('chess_four')
            .select('board, available_colors')
            .eq('game_name', gameName)
            if(data.length != 0 && data[0].available_colors != ""){
                fullPosition = data[0].board;
                color = data[0].available_colors.split(" ")[0];
                sessionStorage.setItem(id, color);
                let availableColors = data[0].available_colors.replace(color,"").replace(/\s\s+/g, " ").trim();
                const { error } = await client
                .from('chess_four')
                .update({ available_colors: availableColors })
                .eq('game_name', gameName)
            }
        }
        document.querySelector("#board").classList.add(color + "-player");
        channel = client.channel(id, {
            config: {
              presence: {
              },
            },
          })
          channel.on('presence', { event: 'join' }, async ({ newPresences }) => {
            console.log('New users have joined: ', newPresences)
            players++;
            document.querySelector("#player-number").innerHTML = players;
            if((JSON.stringify(channel.presenceState()).match(/presence/g) || []).length === 4){
                document.querySelector("#wait-cover").style.display = "none";
                created = true;
                const { error } = await client
                .from('chess_four')
                .update({ started: true })
                .eq('game_name', gameName)
            }
          })
          
          channel.on('presence', { event: 'leave' }, async ({ leftPresences }) => {
            console.log('Users have left: ', leftPresences)
            players--;
            document.querySelector("#player-number").innerHTML = players;
            if(players === 1 && created){
                const { error } = await client
                .from('chess_four')
                .delete()
                .eq('game_name', gameName)
                let url = new URL(document.URL);
                location.href = url.pathname;
            }
          })
          channel.subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
              const status = await channel.track({ online_at: new Date().toISOString() })
              console.log(status)
            }
        })

    }
  }
  async function joinGame(){
    let url = new URL(document.URL);
    let id = uuidv4();
    url.searchParams.set("id",id);

    let availableColors = "red blue yellow green";
    color = getColor(availableColors);
    sessionStorage.setItem(id, color);
    availableColors = availableColors.replace(color,"").replace(/\s\s+/g, " ").trim();
    const { data, error } = await client
    .from('chess_four')
    .insert([
        {game_name: id, available_colors: randomizeColors(availableColors) },
    ])
    location.href = url;
  }

  client
  .channel('games')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'chess_four',
      filter: `game_name=eq.${gameName}`,
    },
    (payload) => {
        created = payload.new.started;
        if(created){
            turn = payload.new.turn;
            document.querySelector("body").style.backgroundColor = setBodyColor();
            fullPosition = payload.new.board;
            setPosition(fullPosition.split(" ")[0]);
            checkmate();
            resetLegalMoves();
            let castleParams;
            if(color === "red")castleParams = fullPosition.split(" ")[1];
            else if(color === "blue")castleParams = fullPosition.split(" ")[2];
            else if(color === "yellow")castleParams = fullPosition.split(" ")[3];
            else if(color === "green")castleParams = fullPosition.split(" ")[4];
            score = parseInt(castleParams.split("-")[1]);
            movedRookL = Boolean(parseInt(castleParams[0]));
            movedRookR = Boolean(parseInt(castleParams[1]));
            movedKing = false;
        }
        else{

        }
    }
  )
  .subscribe()