import {game} from "./game";

export class Calculation { // Класс для расчётов доступных полей фигур, возможности рокировки, битых полей и т.д.
    constructor(i,j,figures,colorwhite, counthod, lastType) {
        this.i = i; // координаты
        this.j = j;
        this.figures = figures; // массив фигур
        this.colorwhite = colorwhite; // цвет
        this.counthod = counthod;  // количество ходов для расчёта возможности рокировки
        this.lastType = lastType;
    }

    blackcastle() { // рокировка чёрных
        let length1 = this.figures.length;
        let i = 0;
        let j = 0;
        let type = "";
        let avaliable = [];
        let colorfigure = 1;
        for (let e = 0; e < length1; e++) {
            type = this.figures[e].type;
            i = this.figures[e].fromi;
            j = this.figures[e].fromj;

            if (this.figures[e].colorwhite == 1) {
                avaliable[e] = this.avaliablecastle(type,i,j,colorfigure); // расчёт доступных полей всех фигур для расчёта возможности рокировки

            }

        }

        return avaliable;
    }

    whitecastle() { // рокировка белых
        let length1 = this.figures.length;
        let i = 0;
        let j = 0;
        let type = "";
        let avaliable = [];
        let colorfigure = 0;
        for (let e = 0; e < length1; e++) {
            type = this.figures[e].type;
            i = this.figures[e].fromi;
            j = this.figures[e].fromj;

            if (this.figures[e].colorwhite == 0) {
                avaliable[e] = this.avaliablecastle(type,i,j,colorfigure);

            }

        }

        return avaliable;
    }

    avaliable(type) { // доступные поля

        let arr = [];

        if (type == "bishop") {

            arr = arr.concat(this.directions(1,1,-1,-1,0)); // доступные поля влево вверх
            arr = arr.concat(this.directions(1,8,-1,1,0));  // доступные поля вправо вверх
            arr = arr.concat(this.directions(8,1,1,-1,0)); // доступные поля влево вниз
            arr = arr.concat(this.directions(8,8,1,1,0));  // доступные поля вправо вниз
        } else if (type == "rook") {

            arr = arr.concat(this.directions(0,1,0,-1,0)); // доступные поля влево
            arr = arr.concat(this.directions(0,8,0,1,0));  // доступные поля вправо
            arr = arr.concat(this.directions(1,0,-1,0,0)); // доступные поля вверх
            arr = arr.concat(this.directions(8,0,1,0,0));  // доступные поля вниз
        } else if (type == "queen") {

            arr = arr.concat(this.directions(1,1,-1,-1,0)); // доступные поля влево вверх
            arr = arr.concat(this.directions(1,8,-1,1,0));  // доступные поля вправо вверх
            arr = arr.concat(this.directions(8,1,1,-1,0)); // доступные поля влево вниз
            arr = arr.concat(this.directions(8,8,1,1,0));  // доступные поля вправо вниз
            arr = arr.concat(this.directions(0,1,0,-1,0)); // доступные поля влево
            arr = arr.concat(this.directions(0,8,0,1,0));  // доступные поля вправо
            arr = arr.concat(this.directions(1,0,-1,0,0)); // доступные поля вверх
            arr = arr.concat(this.directions(8,0,1,0,0));  // доступные поля вниз
        } else if (type == "king") {
            arr = arr.concat(this.directions(1,1,-1,-1,1)); // доступные поля влево вверх
            arr = arr.concat(this.directions(1,8,-1,1,1));  // доступные поля вправо вверх
            arr = arr.concat(this.directions(8,1,1,-1,1)); // доступные поля влево вниз
            arr = arr.concat(this.directions(8,8,1,1,1));  // доступные поля вправо вниз
            arr = arr.concat(this.directions(0,1,0,-1,1)); // доступные поля влево
            arr = arr.concat(this.directions(0,8,0,1,1));  // доступные поля вправо
            arr = arr.concat(this.directions(1,0,-1,0,1)); // доступные поля вверх
            arr = arr.concat(this.directions(8,0,1,0,1));  // доступные поля вниз
            if (this.colorwhite == 0) { // Доступность рокировки для чёрных
                let blackcastle = this.blackcastle();
                let castlenone = false;
                blackcastle.forEach(function(val,i) { // Узнаём мешают ли чужие фигуры рокировке
                    for(let item of val) {
                        if ((item.i == 1 && item.j == 6) || (item.i == 1 && item.j == 7)) {
                            castlenone = true;
                        }
                    }

                });
                if (castlenone == true) {
                    game.blackcastle = true;
                } else {
                    game.blackcastle = false;
                }

                let rooktrue = false;
                this.figures.forEach(function(val,i) { // Проверяем стоят ли ладьи на своих местах и не делали хода
                    if (val.type == "rook" && val.fromi == 1 && val.fromj == 8 && val.counthod <= 1) {
                        rooktrue = true;
                    }

                });
                this.figures.forEach(function(val,i) {

                    if ((val.fromi == 1 && val.fromj == 6) || (val.fromi == 1 && val.fromj == 7)) {
                        rooktrue = false;
                    }
                });

                if (game.blackcastle == false && game.check == false && this.i == 1 && this.j == 5 && rooktrue == true && this.counthod <= 1) {
                    arr.push({i: 1, j: 7});
                }
                rooktrue = false;
            }
            if (this.colorwhite == 0) { // Доступность рокировки для чёрных
                let blackcastle = this.blackcastle();
                let castlenone = false;
                blackcastle.forEach(function(val,i) {
                    for(let item of val) {
                        if ((item.i == 1 && item.j == 2) || (item.i == 1 && item.j == 3) || (item.i == 1 && item.j == 4)) {
                            castlenone = true;
                        }
                    }

                });
                if (castlenone == true) {
                    game.blackcastle = true;
                } else {
                    game.blackcastle = false;
                }

                let rooktrue = false;
                this.figures.forEach(function(val,i) {
                    if (val.type == "rook" && val.fromi == 1 && val.fromj == 1 && val.counthod <= 1) {
                        rooktrue = true;
                    }

                });

                this.figures.forEach(function(val,i) {

                    if ((val.fromi == 1 && val.fromj == 2) || (val.fromi == 1 && val.fromj == 3) || (val.fromi == 1 && val.fromj == 4)) {
                        rooktrue = false;
                    }
                });

                if (game.blackcastle == false && game.check == false && this.i == 1 && this.j == 5 && rooktrue == true && this.counthod <= 1) {
                    arr.push({i: 1, j: 3});
                }
                rooktrue = false;
            }
            if (this.colorwhite == 1) { // Доступность рокировки для белых
                let whitecastle = this.whitecastle();
                let castlenone = false;
                whitecastle.forEach(function(val,i) {
                    for(let item of val) {
                        if ((item.i == 8 && item.j == 6) || (item.i == 8 && item.j == 7)) {
                            castlenone = true;
                        }
                    }

                });
                if (castlenone == true) {
                    game.whitecastle = true;
                } else {
                    game.whitecastle = false;
                }

                let rooktrue = false;
                this.figures.forEach(function(val,i) {
                    if (val.type == "rook" && val.fromi == 8 && val.fromj == 8 && val.counthod <= 1) {

                        rooktrue = true;
                    }

                });

                this.figures.forEach(function(val,i) {

                    if ((val.fromi == 8 && val.fromj == 6) || (val.fromi == 8 && val.fromj == 7)) {
                        rooktrue = false;
                    }
                });

                if (game.whitecastle == false && game.check == false && this.i == 8 && this.j == 5 && rooktrue == true && this.counthod <= 1) {
                    arr.push({i: 8, j: 7});
                }
                rooktrue = false;
            }
            if (this.colorwhite == 1) { // Доступность рокировки для белых
                let whitecastle = this.whitecastle();
                let castlenone = false;
                whitecastle.forEach(function(val,i) {
                    for(let item of val) {
                        if ((item.i == 8 && item.j == 2) || (item.i == 8 && item.j == 3) || (item.i == 8 && item.j == 4)) {
                            castlenone = true;
                        }
                    }

                });
                if (castlenone == true) {
                    game.whitecastle = true;
                } else {
                    game.whitecastle = false;
                }

                let rooktrue = false;
                this.figures.forEach(function(val,i) {
                    if (val.type == "rook" && val.fromi == 8 && val.fromj == 1 && val.counthod <= 1) {
                        rooktrue = true;
                    }

                });

                this.figures.forEach(function(val,i) {

                    if ((val.fromi == 8 && val.fromj == 2) || (val.fromi == 8 && val.fromj == 3) || (val.fromi == 8 && val.fromj == 4)) {
                        rooktrue = false;
                    }
                });

                if (game.whitecastle == false && game.check == false && this.i == 8 && this.j == 5 && rooktrue == true && this.counthod <= 1) {
                    arr.push({i: 8, j: 3});
                }
                rooktrue = false;
            }
        } else if (type == "piece") {
            if (this.colorwhite == 1) {
                let peredfigure = 0;
                this.figures.forEach((val) => { // ищем фигуры на битых полях пешки
                    if (val.fromi == this.i - 1 && val.fromj == this.j - 1) {
                        if (val.colorwhite != this.colorwhite) { // если чужая фигура, то ее можно побить
                            arr = arr.concat(this.directions(1,1,-1,-1,0)); // доступные поля влево вверх
                        }
                    }
                    if (val.fromi == this.i - 1 && val.fromj == this.j + 1) {
                        if (val.colorwhite != this.colorwhite) { // если чужая фигура, то ее можно побить
                            arr = arr.concat(this.directions(1,8,-1,1,0));  // доступные поля вправо вверх
                        }
                    }
                    if (val.fromi == this.i - 1 && val.fromj == this.j) {

                        peredfigure++;
                    }
                });
                if (peredfigure == 0) { // если перед фигурой нет фигур, доступны поля вперед
                    if (this.i == 7) {
                        arr = arr.concat(this.directions(1,0,-1,0,2)); // доступные поля вверх
                    } else {
                        arr = arr.concat(this.directions(1,0,-1,0,1)); // доступные поля вверх
                    }
                }
                if (this.i == 4 && game.lastFigurefromi == 2 && game.lastFigurei == 4 && this.lastType == "piece" && game.lastFigurej == this.j + 1) {
                    arr = arr.concat(this.directions(1,8,-1,1,1));  // доступные поля вправо вверх
                }
                if (this.i == 4 && game.lastFigurefromi == 2 && game.lastFigurei == 4 && this.lastType == "piece" && game.lastFigurej == this.j - 1) {
                    arr = arr.concat(this.directions(1,1,-1,-1,1)); // доступные поля влево вверх
                }

            } else {

                let peredfigure = 0;
                this.figures.forEach((val) => { // ищем фигуры на битых полях пешки
                    if (val.fromi == this.i + 1 && val.fromj == this.j - 1) {
                        if (val.colorwhite != this.colorwhite) { // если чужая фигура, то ее можно побить
                            arr = arr.concat(this.directions(8,1,1,-1,0)); // доступные поля влево вниз
                        }
                    }
                    if (val.fromi == this.i + 1 && val.fromj == this.j + 1) {
                        if (val.colorwhite != this.colorwhite) { // если чужая фигура, то ее можно побить
                            arr = arr.concat(this.directions(8,8,1,1,0));  // доступные поля вправо вниз
                        }
                    }
                    if (val.fromi == this.i + 1 && val.fromj == this.j) {

                        peredfigure++;
                    }
                });
                if (peredfigure == 0) {
                    if (this.i == 2) {
                        arr = arr.concat(this.directions(8,0,1,0,2));  // доступные поля вниз
                    } else {
                        arr = arr.concat(this.directions(8,0,1,0,1));  // доступные поля вниз
                    }
                }
                if (this.i == 5 && game.lastFigurefromi == 7 && game.lastFigurei == 5 && this.lastType == "piece" && game.lastFigurej == this.j + 1) {
                    arr = arr.concat(this.directions(8,8,1,1,1));  // доступные поля вправо вниз
                }
                if (this.i == 5 && game.lastFigurefromi == 7 && game.lastFigurei == 5 && this.lastType == "piece" && game.lastFigurej == this.j - 1) {
                    arr = arr.concat(this.directions(8,1,1,-1,1)); // доступные поля влево вниз
                }
            }

        } else if (type == "knight") {
            arr = arr.concat(this.directionsKnight());

        }

        return arr;
    }

    directions(predeli, predelj, inci, incj, count) { // до какой клетки двигаться i,j, + или -, сколько клеток идти
        let arr = [];
        let i1 = this.i;
        let j1 = this.j;
        let color = 0; // фигура своя
        let other = 0; // фигура не своя
        let indexhod = 0;

        while (i1 != predeli && j1 != predelj) {
            indexhod++;
            i1 = i1 + inci;
            j1 = j1 + incj;
            this.figures.forEach((val) => { // ищем фигуры на пути доступных
                if (val.fromi == i1 && val.fromj == j1) {
                    if (val.colorwhite == this.colorwhite) { // если своя фигура, то это недоступное поле, и остальные
                        color++;
                    } else {
                        other++;
                    }
                }
            });

            if (color > 0) { // на свою фигуру стать нельзя и дальше тоже
                break;
            } else if (other > 0) { // на клетку с чужой фигурой стать можно а дальше нельзя
                arr.push({i: i1, j: j1});
                break;
            } else { // если нет фигур продолжаем
                arr.push({i: i1, j: j1});
            }
            if (count > 0) {
                if (indexhod == count) {
                    break;
                }
            }
        }
        return arr;
    }

    directionsKnight() { // расчет доступных полей для коня
        let arr = [];
        let i1 = this.i;
        let j1 = this.j;
        let figure = 0;

        let arrij = [
            {i: i1 - 2, j: j1 - 1},
            {i: i1 - 2, j: j1 + 1},
            {i: i1 - 1, j: j1 - 2},
            {i: i1 - 1, j: j1 + 2},
            {i: i1 + 1, j: j1 - 2},
            {i: i1 + 1, j: j1 + 2},
            {i: i1 + 2, j: j1 - 1},
            {i: i1 + 2, j: j1 + 1},
        ];

        for (let y = 0; y < arrij.length; y++) {
            if (arrij[y].i < 1 || arrij[y].i > 8 || arrij[y].j < 1 || arrij[y].j > 8) continue;
            this.figures.forEach((val) => { // ищем фигуры на пути доступных

                if (val.fromi == arrij[y].i && val.fromj == arrij[y].j) {
                    figure++;

                    if (val.colorwhite != this.colorwhite) {
                        arr.push({i: arrij[y].i, j: arrij[y].j});
                    }
                }
            });
            if (figure == 0) {
                arr.push({i: arrij[y].i, j: arrij[y].j});
            }
            figure = 0;
        }

        return arr;
    }

    avaliablecastle(type, i, j, colorfigure) { // доступные поля для рокировки

        let arr = [];

        if (type == "bishop") {

            arr = arr.concat(this.directionscastle(1,1,-1,-1,0, i, j, colorfigure)); // доступные поля влево вверх
            arr = arr.concat(this.directionscastle(1,8,-1,1,0, i, j, colorfigure));  // доступные поля вправо вверх
            arr = arr.concat(this.directionscastle(8,1,1,-1,0, i, j, colorfigure)); // доступные поля влево вниз
            arr = arr.concat(this.directionscastle(8,8,1,1,0, i, j, colorfigure));  // доступные поля вправо вниз
        } else if (type == "rook") {

            arr = arr.concat(this.directionscastle(0,1,0,-1,0, i, j, colorfigure)); // доступные поля влево
            arr = arr.concat(this.directionscastle(0,8,0,1,0, i, j, colorfigure));  // доступные поля вправо
            arr = arr.concat(this.directionscastle(1,0,-1,0,0, i, j, colorfigure)); // доступные поля вверх
            arr = arr.concat(this.directionscastle(8,0,1,0,0, i, j, colorfigure));  // доступные поля вниз
        } else if (type == "queen") {

            arr = arr.concat(this.directionscastle(1,1,-1,-1,0, i, j, colorfigure)); // доступные поля влево вверх
            arr = arr.concat(this.directionscastle(1,8,-1,1,0, i, j, colorfigure));  // доступные поля вправо вверх
            arr = arr.concat(this.directionscastle(8,1,1,-1,0, i, j, colorfigure)); // доступные поля влево вниз
            arr = arr.concat(this.directionscastle(8,8,1,1,0, i, j, colorfigure));  // доступные поля вправо вниз
            arr = arr.concat(this.directionscastle(0,1,0,-1,0, i, j, colorfigure)); // доступные поля влево
            arr = arr.concat(this.directionscastle(0,8,0,1,0, i, j, colorfigure));  // доступные поля вправо
            arr = arr.concat(this.directionscastle(1,0,-1,0,0, i, j, colorfigure)); // доступные поля вверх
            arr = arr.concat(this.directionscastle(8,0,1,0,0, i, j, colorfigure));  // доступные поля вниз
        } else if (type == "king") {
            arr = arr.concat(this.directionscastle(1,1,-1,-1,1, i, j, colorfigure)); // доступные поля влево вверх
            arr = arr.concat(this.directionscastle(1,8,-1,1,1, i, j, colorfigure));  // доступные поля вправо вверх
            arr = arr.concat(this.directionscastle(8,1,1,-1,1, i, j, colorfigure)); // доступные поля влево вниз
            arr = arr.concat(this.directionscastle(8,8,1,1,1, i, j, colorfigure));  // доступные поля вправо вниз
            arr = arr.concat(this.directionscastle(0,1,0,-1,1, i, j, colorfigure)); // доступные поля влево
            arr = arr.concat(this.directionscastle(0,8,0,1,1, i, j, colorfigure));  // доступные поля вправо
            arr = arr.concat(this.directionscastle(1,0,-1,0,1, i, j, colorfigure)); // доступные поля вверх
            arr = arr.concat(this.directionscastle(8,0,1,0,1, i, j, colorfigure));  // доступные поля вниз
        } else if (type == "piece") { // для пешки рассчитываем только битые поля
            if (colorfigure == 1) {

                arr = arr.concat(this.directionscastle(1,1,-1,-1,1, i, j, colorfigure)); // доступные поля влево вверх

                arr = arr.concat(this.directionscastle(1,8,-1,1,1, i, j, colorfigure));  // доступные поля вправо вверх

            } else {

                arr = arr.concat(this.directionscastle(8,1,1,-1,1, i, j, colorfigure)); // доступные поля влево вниз

                arr = arr.concat(this.directionscastle(8,8,1,1,1, i, j, colorfigure));  // доступные поля вправо вниз

            }

        } else if (type == "knight") {
            arr = arr.concat(this.directionsKnightcastle(i, j, colorfigure));

        }

        return arr;
    }

    directionscastle(predeli, predelj, inci, incj, count, i, j, colorfigure) { // до какой клетки двигаться i,j, + или -, сколько клеток идти
        let arr = [];
        let i1 = i;
        let j1 = j;
        let color = 0; // фигура своя
        let other = 0; // фигура не своя
        let indexhod = 0;

        while (i1 != predeli && j1 != predelj) {
            indexhod++;
            i1 = i1 + inci;
            j1 = j1 + incj;
            this.figures.forEach((val) => { // ищем фигуры на пути доступных
                if (val.fromi == i1 && val.fromj == j1) {
                    if (val.colorwhite == colorfigure) { // если своя фигура, то это недоступное поле, и остальные
                        color++;
                    } else {
                        other++;
                    }
                }
            });

            if (color > 0) { // на свою фигуру стать нельзя и дальше тоже
                break;
            } else if (other > 0) { // на клетку с чужой фигурой стать можно а дальше нельзя
                arr.push({i: i1, j: j1});
                break;
            } else { // если нет фигур продолжаем
                arr.push({i: i1, j: j1});
            }
            if (count > 0) {
                if (indexhod == count) {
                    break;
                }
            }
        }
        return arr;
    }

    directionsKnightcastle(i,j, colorfigure) {
        let arr = [];
        let i1 = i;
        let j1 = j;
        let figure = 0;

        let arrij = [
            {i: i1 - 2, j: j1 - 1},
            {i: i1 - 2, j: j1 + 1},
            {i: i1 - 1, j: j1 - 2},
            {i: i1 - 1, j: j1 + 2},
            {i: i1 + 1, j: j1 - 2},
            {i: i1 + 1, j: j1 + 2},
            {i: i1 + 2, j: j1 - 1},
            {i: i1 + 2, j: j1 + 1},
        ];

        for (let y = 0; y < arrij.length; y++) {
            if (arrij[y].i < 1 || arrij[y].i > 8 || arrij[y].j < 1 || arrij[y].j > 8) continue;
            this.figures.forEach((val) => { // ищем фигуры на пути доступных

                if (val.fromi == arrij[y].i && val.fromj == arrij[y].j) {
                    figure++;

                    if (val.colorwhite != colorfigure) {
                        arr.push({i: arrij[y].i, j: arrij[y].j});
                    }
                }
            });
            if (figure == 0) {
                arr.push({i: arrij[y].i, j: arrij[y].j});
            }
            figure = 0;
        }

        return arr;
    }


}
