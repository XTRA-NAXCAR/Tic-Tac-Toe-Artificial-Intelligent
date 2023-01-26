const buttons = document.querySelectorAll('.box');
const player = document.querySelector('.player').innerHTML;
let board = ['', '', '',
            '', '', '',
            '', '', ''];

let winnings = [
    [0,1,2],
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,6], 
    [0,4,8], 
    [2,4,6]
];

let random = 0;

buttons.forEach(button => {
        button.innerHTML = '';
});

let intervalo = setInterval(verify, 10)

if (player == 'O'){
    random = Math.floor(Math.random() * 8);
    board[random] = 'X';
    buttons.forEach(button => {
        if (button.value - 1 == random){
            button.innerHTML = 'X';
        }
    });
}

function verify() {
    buttons.forEach(button =>{
        if (button.innerHTML != ''){
            button.disabled = true;
        }
    });
}

buttons.forEach(button => {
        button.addEventListener('click', () =>{
            button.innerHTML = move_player(button);
            computer();
        });
});

function move_player(local_button){
    let temp_X = 0;
    let temp_O = 0;
    board.forEach(element =>{
        if (element == 'X'){
            temp_X += 1;
        }
        if (element == 'O'){
            temp_O += 1;
        }
    });
    if (player == 'X'){
        if (temp_X == temp_O){
            for (let i = 0; i < 10; i++){
                if (local_button.value == i){
                    board[i - 1] = 'X'
                }
            }
            return 'X'
        }else{
            return ''
        }
    }else{
        if (temp_X > temp_O){
            for (let i = 0; i < 10; i++){
                if (local_button.value == i){
                    board[i - 1] = 'O'
                }
            }
            return 'O'
        }else{
            return ''
        }
    }
}

function win (new_board){
    let i = false;
    winnings.forEach(element => {
        if (new_board[element[0]] == 'X' && new_board[element[1]] == 'X' && new_board[element[2]] == 'X' || new_board[element[0]] == 'O' && new_board[element[1]] == 'O' && new_board[element[2]] == 'O'){
            i = true;
        }
    });
    if (new_board[2] == 'X' && new_board[4] == 'X' && new_board[6] == 'X' || new_board[2] == 'O' && new_board[4] == 'O' && new_board[6] == 'O'){
        i = true;
    }
    return i
}

function computer(){
    let new_board = board;
    let points = []
    let know = false;
    if (player == 'X'){
        for (let i = 0; i < 9; i++){
            if (new_board[i] == ''){
                new_board[i] = 'O';
                points.push(win(new_board));
                points.forEach(element => {
                    if (element == true){
                        computer_win(new_board);
                    }
                });
                know = imagine(new_board);
                if ( know == false ){
                    computer_move(new_board);
                }
                new_board[i] = '';
            }
        }
        
    }
    if (player == 'O'){
        for (let i = 0; i < 9; i++){
            if (new_board[i] == ''){
                new_board[i] = 'X';
                points.push(win(new_board));
                points.forEach(element => {
                    if (element == true){
                        computer_win(new_board);
                    }
                });
                know = imagine(new_board);
                if ( know == false ){
                    computer_move(new_board);
                }
                new_board[i] = '';
            }
        }
    }
}

function computer_win (new_board){
    let i = 0;
    buttons.forEach(button =>{
        button.innerHTML = new_board[i];
        i ++;
    });
    buttons.disabled = true;
}

function computer_move (new_board){
    board = ['','','','','','','','','']
    let i = 0;
    buttons.forEach(button => {
        button.innerHTML = new_board[i];
        board[i] = new_board[i];
        i ++;
    });
}

function imagine (new_board2){
    let points = []
    let know = false;
    if ( player == 'X'){
        for (let i = 0; i < 9; i++){
            if (new_board2[i] == ''){
                new_board2[i] = 'X';
                points.push(win(new_board2));
                new_board2 [i] = '';
            }
        }
        points.forEach(element => {
        if (element == true){
            know = true;
        }
        });
    }else{
        for (let i = 0; i < 9; i++){
            if (new_board2[i] == ''){
                new_board2[i] = 'O';
                points.push(win(new_board2));
                new_board2 [i] = '';
            }
        }
        points.forEach(element => {
        if (element == true){
            know = true;
        }
        });
    }
    return know
}