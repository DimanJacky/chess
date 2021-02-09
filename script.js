class Calculation { // Класс для расчётов доступных полей фигур, возможности рокировки, битых полей и т.д.
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

let chess = document.getElementsByClassName("chess")[0]; // Создаётся поле
let chessi = [];
let div, div1, divin; // переменная для внутренних div, чтобы вставлять фигуру

for (let i = 1; i <= 8; i++) {
	chessi[i] = [];
	for (let j = 1; j <= 8; j++) {
		chessi[i][j] = document.createElement('div'); // Создание поля
		div = document.createElement('div'); // переменная для внутренних div чтобы вставить background фигуру
		div.className = "chessi" + i + j + 1; // в класс добавляем 1
		divin = document.createElement('div'); // переменная для внутренних div чтобы вставить background фигуру при ходе
		divin.className = "chessi" + i + j + "in"; // в класс добавляем in
		div1 = document.createElement('div'); // переменная для внутренних div чтобы вставить доступные поля
		div1.className = "chessi" + i + j + 1 + 1; // в класс добавляем 11
		chessi[i][j].className = "chessi" + i + j; // в класс добавляем координаты
		chessi[i][j].style.float = "left";
		chessi[i][j].style.backgroundColor = (i + j) % 2 == 0 ? "white": "brown";
		div.append(div1);
		divin.append(div);
		chessi[i][j].append(divin);
		chess.append(chessi[i][j]);
	}
}

let figure = { // объект прототип для фигур
	fromi: 0, // координаты
	fromj: 0,
	background: "",
	move() {
		
	},
	toi: 0,
	toj: 0,
	ready: false,
	colorwhite: 1,
	type: "",
	counthod: 0

};

let figure1 = {};
let figure2 = {};
let figure3 = {};
let figure4 = {};
let figure5 = {};
let figure6 = {};
let figure7 = {};
let figure8 = {};
let figure9 = {};
let figure10 = {};
let figure11 = {};
let figure12 = {};
let figure13 = {};
let figure14 = {};
let figure15 = {};
let figure16 = {};
let figure17 = {};
let figure18 = {};
let figure19 = {};
let figure20 = {};
let figure21 = {};
let figure22 = {};
let figure23 = {};
let figure24 = {};
let figure25 = {};
let figure26 = {};
let figure27 = {};
let figure28 = {};
let figure29 = {};
let figure30 = {};
let figure31 = {};
let figure32 = {};

let figureArr = [figure1, figure2, figure3, figure4, figure5, figure6, figure7, figure8, figure9, figure10, figure11, figure12, figure13, figure14, figure15, figure16, figure17, figure18, figure19, figure20, figure21, figure22, figure23, figure24, figure25, figure26, figure27, figure28, figure29, figure30, figure31, figure32];

figure1.fromi = 1;
figure1.fromj = 1;
figure1.name = "blackRock";
figure1.colorwhite = 0;
figure1.type = "rook";
figure1.id = 1;
figure1.counthod = 0;

figure2.fromi = 1;
figure2.fromj = 2;
figure2.name = "blackKnight";
figure2.colorwhite = 0;
figure2.type = "knight";
figure2.id = 2;
figure2.counthod = 0;

figure3.fromi = 1;
figure3.fromj = 3;
figure3.name = "blackBishop";
figure3.colorwhite = 0;
figure3.type = "bishop";
figure3.id = 3;
figure3.counthod = 0;

figure4.fromi = 1;
figure4.fromj = 4;
figure4.name = "blackQueen";
figure4.colorwhite = 0;
figure4.type = "queen";
figure4.id = 4;
figure4.counthod = 0;

figure5.fromi = 1;
figure5.fromj = 5;
figure5.name = "blackKing";
figure5.colorwhite = 0;
figure5.type = "king";
figure5.id = 5;
figure5.counthod = 0;

figure6.fromi = 1;
figure6.fromj = 6;
figure6.name = "blackBishop";
figure6.colorwhite = 0;
figure6.type = "bishop";
figure6.id = 6;
figure6.counthod = 0;

figure7.fromi = 1;
figure7.fromj = 7;
figure7.name = "blackKnight";
figure7.colorwhite = 0;
figure7.type = "knight";
figure7.id = 7;
figure7.counthod = 0;

figure8.fromi = 1;
figure8.fromj = 8;
figure8.name = "blackRock";
figure8.colorwhite = 0;
figure8.type = "rook";
figure8.id = 8;
figure8.counthod = 0;

figure9.fromi = 2;
figure9.fromj = 1;
figure9.name = "blackPiece";
figure9.colorwhite = 0;
figure9.type = "piece";
figure9.id = 9;
figure9.counthod = 0;

figure10.fromi = 2;
figure10.fromj = 2;
figure10.name = "blackPiece";
figure10.colorwhite = 0;
figure10.type = "piece";
figure10.id = 10;
figure10.counthod = 0;

figure11.fromi = 2;
figure11.fromj = 3;
figure11.name = "blackPiece";
figure11.colorwhite = 0;
figure11.type = "piece";
figure11.id = 11;
figure11.counthod = 0;

figure12.fromi = 2;
figure12.fromj = 4;
figure12.name = "blackPiece";
figure12.colorwhite = 0;
figure12.type = "piece";
figure12.id = 12;
figure12.counthod = 0;

figure13.fromi = 2;
figure13.fromj = 5;
figure13.name = "blackPiece";
figure13.colorwhite = 0;
figure13.type = "piece";
figure13.id = 13;
figure13.counthod = 0;

figure14.fromi = 2;
figure14.fromj = 6;
figure14.name = "blackPiece";
figure14.colorwhite = 0;
figure14.type = "piece";
figure14.id = 14;
figure14.counthod = 0;

figure15.fromi = 2;
figure15.fromj = 7;
figure15.name = "blackPiece";
figure15.colorwhite = 0;
figure15.type = "piece";
figure15.id = 15;
figure15.counthod = 0;

figure16.fromi = 2;
figure16.fromj = 8;
figure16.name = "blackPiece";
figure16.colorwhite = 0;
figure16.type = "piece";
figure16.id = 16;
figure16.counthod = 0;

figure17.fromi = 7;
figure17.fromj = 1;
figure17.name = "whitePiece";
figure17.colorwhite = 1;
figure17.type = "piece";
figure17.id = 17;
figure17.counthod = 0;

figure18.fromi = 7;
figure18.fromj = 2;
figure18.name = "whitePiece";
figure18.colorwhite = 1;
figure18.type = "piece";
figure18.id = 18;
figure18.counthod = 0;

figure19.fromi = 7;
figure19.fromj = 3;
figure19.name = "whitePiece";
figure19.colorwhite = 1;
figure19.type = "piece";
figure19.id = 19;
figure19.counthod = 0;

figure20.fromi = 7;
figure20.fromj = 4;
figure20.name = "whitePiece";
figure20.colorwhite = 1;
figure20.type = "piece";
figure20.id = 20;
figure20.counthod = 0;

figure21.fromi = 7;
figure21.fromj = 5;
figure21.name = "whitePiece";
figure21.colorwhite = 1;
figure21.type = "piece";
figure21.id = 21;
figure21.counthod = 0;

figure22.fromi = 7;
figure22.fromj = 6;
figure22.name = "whitePiece";
figure22.colorwhite = 1;
figure22.type = "piece";
figure22.id = 22;
figure22.counthod = 0;

figure23.fromi = 7;
figure23.fromj = 7;
figure23.name = "whitePiece";
figure23.colorwhite = 1;
figure23.type = "piece";
figure23.id = 23;
figure23.counthod = 0;

figure24.fromi = 7;
figure24.fromj = 8;
figure24.name = "whitePiece";
figure24.colorwhite = 1;
figure24.type = "piece";
figure24.id = 24;
figure24.counthod = 0;

figure25.fromi = 8;
figure25.fromj = 1;
figure25.name = "whiteRock";
figure25.colorwhite = 1;
figure25.type = "rook";
figure25.id = 25;
figure25.counthod = 0;

figure26.fromi = 8;
figure26.fromj = 2;
figure26.name = "whiteKnight";
figure26.colorwhite = 1;
figure26.type = "knight";
figure26.id = 26;
figure26.counthod = 0;

figure27.fromi = 8;
figure27.fromj = 3;
figure27.name = "whiteBishop";
figure27.colorwhite = 1;
figure27.type = "bishop";
figure27.id = 27;
figure27.counthod = 0;

figure28.fromi = 8;
figure28.fromj = 4;
figure28.name = "whiteQueen";
figure28.colorwhite = 1;
figure28.type = "queen";
figure28.id = 28;
figure28.counthod = 0;

figure29.fromi = 8;
figure29.fromj = 5;
figure29.name = "whiteKing";
figure29.colorwhite = 1;
figure29.type = "king";
figure29.id = 29;
figure29.counthod = 0;

figure30.fromi = 8;
figure30.fromj = 6;
figure30.name = "whiteBishop";
figure30.colorwhite = 1;
figure30.type = "bishop";
figure30.id = 30;
figure30.counthod = 0;

figure31.fromi = 8;
figure31.fromj = 7;
figure31.name = "whiteKnight";
figure31.colorwhite = 1;
figure31.type = "knight";
figure31.id = 31;
figure31.counthod = 0;

figure32.fromi = 8;
figure32.fromj = 8;
figure32.name = "whiteRock";
figure32.colorwhite = 1;
figure32.type = "rook";
figure32.id = 32;
figure32.counthod = 0;

figure1.__proto__ = figure;
figure2.__proto__ = figure;
figure3.__proto__ = figure;
figure4.__proto__ = figure;
figure5.__proto__ = figure;
figure6.__proto__ = figure;
figure7.__proto__ = figure;
figure8.__proto__ = figure;
figure9.__proto__ = figure;
figure10.__proto__ = figure;
figure11.__proto__ = figure;
figure12.__proto__ = figure;
figure13.__proto__ = figure;
figure14.__proto__ = figure;
figure15.__proto__ = figure;
figure16.__proto__ = figure;
figure17.__proto__ = figure;
figure18.__proto__ = figure;
figure19.__proto__ = figure;
figure20.__proto__ = figure;
figure21.__proto__ = figure;
figure22.__proto__ = figure;
figure23.__proto__ = figure;
figure24.__proto__ = figure;
figure25.__proto__ = figure;
figure26.__proto__ = figure;
figure27.__proto__ = figure;
figure28.__proto__ = figure;
figure29.__proto__ = figure;
figure30.__proto__ = figure;
figure31.__proto__ = figure;
figure32.__proto__ = figure;

let game = { // объект для отслеживания состояния по ходу игры
	ready: false, // выбрана ли фигура для хода
	colorwhite: 1, // чей ход	
	readyclass: "",
	readyi: "",
	readyj: "",
	figures: [], // какие клетки заняты фигурами
	clearAvaliable() {
		for (let i = 1; i <= 8; i++) {
			chessi[i] = [];
			for (let j = 1; j <= 8; j++) {
				document.getElementsByClassName("chessi" + i + j + "11")[0].style.background = "";
			}
		}
	},
	avaliable: [],
	lastFigurei: 0,
	lastFigurej: 0,
	lastFigurefromi: 0,
	lastFigurefromj: 0,
	bitoePolepiece: 0,
	bitoePolepiecei: 0,
	bitoePolepiecej: 0,
	check: false,
	avaliablefigure: [],
	coordfromi: 0,
	coordfromj: 0,
	figurepre: [],
	indexArr: 0,
	indexArrbitoe: 0,
	indexk: 0,
	indexkbitoe: 0,
	delbitoe: false,
	delvalue: false,
	delbitoeother: false,
	delvalueother: false,
	avaliablefigure1: [],
	avaliablefigurerook: [],
	blackcastle: false,
	whitecastle: false,
	indexArrother: 0,
	indexArrbitoeother: 0,
	avaliablefigure1other: [],
	figureArrother: [],
	indexother: 0
};

// рисование фигур

for (let i = 1; i <= 8; i++) {
	chessi[i] = [];
	for (let j = 1; j <= 8; j++) {
		for(let item of figureArr) {
			if (item.fromi == i && item.fromj == j) {
				document.getElementsByClassName("chessi" + i + j + "1")[0].style.background = "url(" + item.name + ".png) no-repeat";
			}
		}
	}
}

// заполнение свойства figures значениями места фигур

for(let item of figureArr) {
	game.figures.push({fromi: item.fromi, fromj: item.fromj, colorwhite: item.colorwhite, type: item.type, id: item.id, name: item.name, counthod: item.counthod});
}

// клик по клетке

for (let i = 1; i <= 8; i++) {
	chessi[i] = [];
	for (let j = 1; j <= 8; j++) {
		document.getElementsByClassName("chessi" + i + j)[0].onclick = function() {
			
			let aval = false;
			
			if (game.ready == false) { // если не выбрана фигура
			
			// Найти координаты короля этого цвета
			
				for(let item of figureArr) { // ищем фигуры
					if (item.fromi == i && item.fromj == j) { // если есть фигура в поле
						if (item.colorwhite == game.colorwhite) { // если ход этого цвета фигур
							
							if (item.colorwhite == 1 && game.lastFigurefromi == 2 && game.lastFigurei == 4 && game.lastFigurej == (j + 1) && item.fromi == 4 && game.lastType == "piece") { // Если был переход через битое поле								
								
								game.bitoePolepiecei = 3;
								game.bitoePolepiecej = j + 1;
								game.bitoePolepiece = 1;
								
							}
							
							if (item.colorwhite == 1 && game.lastFigurefromi == 2 && game.lastFigurei == 4 && game.lastFigurej == (j - 1) && item.fromi == 4 && game.lastType == "piece") { // Если был переход через битое поле
								
								game.bitoePolepiecei = 3;
								game.bitoePolepiecej = j - 1;
								game.bitoePolepiece = 1;
								
							}
							
							if (item.colorwhite == 0 && game.lastFigurefromi == 7 && game.lastFigurei == 5 && game.lastFigurej == (j + 1) && item.fromi == 5 && game.lastType == "piece") { // Если был переход через битое поле								
								game.bitoePolepiecei = 6;
								game.bitoePolepiecej = j + 1;
								game.bitoePolepiece = 1;
								
							}
							
							if (item.colorwhite == 0 && game.lastFigurefromi == 7 && game.lastFigurei == 5 && game.lastFigurej == (j - 1) && item.fromi == 5 && game.lastType == "piece") { // Если был переход через битое поле
								
								game.bitoePolepiecei = 6;
								game.bitoePolepiecej = j - 1;
								game.bitoePolepiece = 1;
								
							}
							
							let readyclass = "chessi" + i + j;
							let calc = new Calculation(i,j,game.figures,item.colorwhite,item.counthod,game.lastType);							
							let avaliable = calc.avaliable(item.type); // узнать доступные поля
							if (avaliable == 0) return false;
							game.avaliable = avaliable;
							
							document.getElementsByClassName(readyclass + "in")[0].style.backgroundColor = "green";
							
							item.ready = true;
							game.ready = true;
							game.readyclass = readyclass;	// запоминаем класс, чтобы менять фон
							game.readyi = i; // координаты фигуры перед ходом
							game.readyj = j; // координаты фигуры перед ходом
							
							game.lastFigurefromi = i; // координаты предыдущей фигуры перед ходом
							game.lastFigurefromj = j; // координаты предыдущей фигуры перед ходом
							game.lastType = item.type;
							
							
							avaliable.forEach(function(val) { // окрашиваем доступные поля
								document.getElementsByClassName("chessi" + val.i + val.j + "11")[0].style.background = "url(avaliable.png) no-repeat";
								
							});
							
						}	
						
					}
					
				}
			} else { // сделать ход
				
				if (game.bitoePolepiecei == i && game.bitoePolepiecej == j) {
					
					game.figures.forEach(function(value,k) {
						if (value.fromi == game.lastFigurei && value.fromj == game.lastFigurej && game.lastType == "piece") {
							
							game.indexArrbitoe = figureArr.findIndex((val) => val.id == game.figures[k].id); // находим id фигуры для удаления
							game.indexkbitoe = k;
							game.delbitoe = true;
							
						}
						
					});
				}
				
				figureArr.forEach((item, indexitem) => {
					
					if (item.ready == true) {// Проверим какая фигура готова сделать ход	
					
						if (i == item.fromi && j == item.fromj) return false; // если кликнуть по этой же клетке, ничего не делать
						
						game.avaliable.forEach(function(value,k) { // ход делать только по доступным клеткам
							if (value.i == i && value.j == j) {
								aval = true;
							}
						});
						if (aval != true) return false; // если кликнуть по недоступной клетке, ничего не делать
						game.figures.forEach(function(value,k) { // если сделать ход по чужой фигуре
						console.log("выполнен ход по чужой фигуре");
							if (value.fromi == i && value.fromj == j) {
								
								game.indexArr = figureArr.findIndex((val) => val.id == game.figures[k].id); // находим id фигуры для удаления
								
								game.indexk = k;
								
								game.delvalue = true;
								
							}
							
						});
							
							
							
						// Проверка можно ли сделать ход, есть ли шах для своего короля
						// Создать такой же массив фигур, как бы сделать ход и посмотреть есть ли шах, чтобы не менять исходный массив
						// Если нельзя, ничего не делать, массив не менять
							
						let figureArr1 = [];
						
						figureArr.forEach((val, n) => {
							figureArr1[n] = {fromi: figureArr[n].fromi, fromj: figureArr[n].fromj, name: figureArr[n].name, colorwhite: figureArr[n].colorwhite, type: figureArr[n].type, id: figureArr[n].id, counthod: figureArr[n].counthod};
						});
						
						figureArr1.forEach((val, n) => {
							if (val.id == item.id) {
								
								//console.log("координаты где была фигура " + val.fromi + " " + val.fromj);
								
								val.fromi = i; // координаты поля перехода фигуры
								val.fromj = j;
								
								//console.log("координаты где сейчас фигура " + val.fromi + " " + val.fromj);
							}
						});
						
						
						
						
						
						
						
						
						
						
						if (game.delbitoe == true) {
						
							figureArr1.splice(game.indexArrbitoe,1); // удаляем из массива фигур
						
						}
						
						if (game.delvalue == true) {
							
							figureArr1.splice(game.indexArr,1); // удаляем из массива фигур
							
						}
						
						
						
						
						
						
						
						
						
						let avaliablef1 = [];
						// координаты короля
						let kingfi1 = 0;
						let kingfj1= 0;
						let checkhod = false;
						
						figureArr1.forEach((val, n) => { // узнаем координаты короля
							if (val.colorwhite == game.colorwhite && val.type == "king") {
								kingfi1 = val.fromi;
								kingfj1 = val.fromj;
							}
						});
						
						figureArr1.forEach((val, n) => {
							if (val.colorwhite != game.colorwhite) {
								avaliablef1 = new Calculation(val.fromi,val.fromj,figureArr1,val.colorwhite,val.counthod,game.lastType);
								game.avaliablefigure1.push(avaliablef1.avaliable(val.type)); // узнать доступные поля всех фигур
								
							}
						});
						
						for (let e = 0; e < game.avaliablefigure1.length; e++) { // Есть ли пересечения доступных полей чужих фигур и своего короля
							for (let item of game.avaliablefigure1[e]) {
								if (item.i == kingfi1 && item.j == kingfj1) {
									checkhod = true;
								}
							}
						}
						
						game.avaliablefigure1 = [];
						
						
						
						if (checkhod == true) {
							game.check = true;
							
							for(let item of figureArr) {
								if (item.ready == true) {
									item.ready = false;
									game.delvalue = false;
								}
								
							}
							
						} else {
							game.check = false;
						}
						
						if (game.check == true) { //если при попытке хода есть шах королю, не делать ход
							game.ready = false;
							document.getElementsByClassName(game.readyclass + "in")[0].style.backgroundColor = ""; // поле готовности хода убрать фон
							return false;
						}
							
						if (game.delbitoe == true) {
						
							game.figures.splice(game.indexkbitoe,1); // удаляем из массива game.figures 
							figureArr.splice(game.indexArrbitoe,1); // удаляем из массива фигур
							document.getElementsByClassName("chessi" + game.lastFigurei + game.lastFigurej + "1")[0].style.background = "";
							game.bitoePolepiecei = 0;
							game.bitoePolepiecej = 0;
						
						}
						
						if (game.delvalue == true) {
							console.log("game.check " + game.check);
							console.log("game.delvalue " + game.delvalue);
							game.figures.splice(game.indexk,1); // удаляем из массива game.figures 
							figureArr.splice(game.indexArr,1); // удаляем из массива фигур
							
						}
						
						game.delbitoe = false;
						game.delvalue = false;
						
						let figurepiece = 0;
						let typefigurepiece = "";
						let figurepiecename = 0;
						
						// когда пешка доходит до края
						
						if (item.colorwhite == 1 && item.type == "piece" && i == 1) {
							
							figurepiece = +prompt("1 - ферзь, 2 - ладья, 3 - слон, 4 - конь, иначе ферзь");	
							
							switch(figurepiece) {
								case 1:
									typefigurepiece = "queen";
									figurepiecename = "whiteQueen";
									break;
								case 2:
									typefigurepiece = "rook";
									figurepiecename = "whiteRock";
									break;
								case 3:
									typefigurepiece = "bishop";
									figurepiecename = "whiteBishop";
									break;
								case 4:
									typefigurepiece = "knight";
									figurepiecename = "whiteKnight";
									break;
								default:
									typefigurepiece = "queen";
									figurepiecename = "whiteQueen";
									break;
							}
							
							item.type = typefigurepiece;
							item.name = figurepiecename;
							
						}
						
						if (item.colorwhite == 0 && item.type == "piece" && i == 8) {
							figurepiece = +prompt("1 - ферзь, 2 - ладья, 3 - слон, 4 - конь, иначе ферзь");	
							
							switch(figurepiece) {
								case 1:
									typefigurepiece = "queen";
									figurepiecename = "blackQueen";
									break;
								case 2:
									typefigurepiece = "rook";
									figurepiecename = "blackRock";
									break;
								case 3:
									typefigurepiece = "bishop";
									figurepiecename = "blackBishop";
									break;
								case 4:
									typefigurepiece = "knight";
									figurepiecename = "blackKnight";
									break;
								default:
									typefigurepiece = "queen";
									figurepiecename = "blackQueen";
									break;
							}
							
							item.type = typefigurepiece;
							item.name = figurepiecename;
						}
						
						
						
						document.getElementsByClassName("chessi" + i + j + "1")[0].style.background = "url(" + item.name + ".png) no-repeat";
						item.ready = false;
						game.ready = false;
						item.fromi = i; // координаты поля перехода фигуры
						item.fromj = j;
						figureArr[indexitem].counthod++;
						
						game.colorwhite = game.colorwhite == 0 ? 1 : 0; // следующий ход другого цвета
						let colorStr = (game.colorwhite == 1) ? "белых" : "черных";
						document.getElementsByClassName("message")[0].innerHTML = "Ход " + colorStr;
						document.getElementsByClassName(game.readyclass + "1")[0].style.background = ""; // при завершении хода снимаем раскраску с предыдущей клетки
						document.getElementsByClassName(game.readyclass + "in")[0].style.background = "";
						
						game.figures.forEach(function(value,k) { // смотрим какие занятые клетки
							if (value.fromi == game.readyi && value.fromj == game.readyj) { // если среди занятых клеток есть фигура, которая готова сделать ход
								game.figures.splice(k,1); // удаляем эти координаты из занятых
								game.figures.push({fromi: item.fromi, fromj: item.fromj, colorwhite: item.colorwhite, type: item.type, id: item.id, counthod: item.counthod}); // вставляем новые данные фигуры, которая сделала ход
							}
							
						});
						
					}
					
						
				});
				
				
				
				if (aval == true) {
					game.clearAvaliable();
				}
				game.lastFigurei = i;
				game.lastFigurej = j;
				
				let avaliablef = [];
				// координаты короля
				let kingfi = 0;
				let kingfj = 0;
				let check = false;
				
				figureArr.forEach((val, n) => { // узнаем координаты короля
					if (val.colorwhite == game.colorwhite && val.type == "king") {
						kingfi = val.fromi;
						kingfj = val.fromj;
					}
				});
				
				figureArr.forEach((val, n) => {
					if (val.colorwhite != game.colorwhite) {
						avaliablef = new Calculation(val.fromi,val.fromj,game.figures,val.colorwhite, val.counthod,game.lastType);
						game.avaliablefigure.push(avaliablef.avaliable(val.type)); // узнать доступные поля всех фигур
					}
				});
				
				for (let e = 0; e < game.avaliablefigure.length; e++) { // Есть ли пересечения доступных полей фигур и чужого короля
					for (let item of game.avaliablefigure[e]) {
						if (item.i == kingfi && item.j == kingfj) {
							check = true;
						}
					}
				}
				
				if (check == true) {
					game.check = true;
					document.getElementsByClassName("message1")[0].innerHTML = "Шах";
				} else {
					game.check = false;
					document.getElementsByClassName("message1")[0].innerHTML = "&nbsp;";
				}
				
				// Расчет можно ли делать рокировку
				let kingcastling = false;
				
				if (game.lastFigurefromi == 1 && game.lastFigurefromj == 5 && game.lastFigurei == 1 && game.lastFigurej == 7) { // Если король перешёл с 1,5 на 1,7, то начал делать рокировку
					
					figureArr.forEach(function(val, i) {
						if (val.fromi == game.lastFigurei && val.fromj == game.lastFigurej && val.type == "king") { // Если эта фигура король
							kingcastling = true;							
						}
					});
				}
				
				if (kingcastling == true) {
					figureArr.forEach(function(val, i) {
						if (val.fromi == 1 && val.fromj == 8 && val.type == "rook") { // Если ладья на 1,8
							figureArr[i].fromj = 6; // Перемещаем ее на 1,6
							document.getElementsByClassName("chessi161")[0].style.background = "url(" + val.name + ".png) no-repeat";
							document.getElementsByClassName("chessi181")[0].style.background = "";
						}
					});
					game.figures.forEach(function(val, i) {
						if (val.fromi == 1 && val.fromj == 8 && val.type == "rook") { // Меняем в фигурах
							game.figures[i].fromj = 6;
						}
					});
				}
				
				kingcastling = false;
				
				if (game.lastFigurefromi == 1 && game.lastFigurefromj == 5 && game.lastFigurei == 1 && game.lastFigurej == 3) { // Если король перешёл с 1,5 на 1,3, то начал делать рокировку
					
					figureArr.forEach(function(val, i) {
						if (val.fromi == game.lastFigurei && val.fromj == game.lastFigurej && val.type == "king") { // Если эта фигура король
							kingcastling = true;
						}
					});
				}
				
				if (kingcastling == true) {
					figureArr.forEach(function(val, i) {
						if (val.fromi == 1 && val.fromj == 1 && val.type == "rook") { // Если ладья на 1,1
							figureArr[i].fromj = 4; // Перемещаем ее на 1,4
							document.getElementsByClassName("chessi141")[0].style.background = "url(" + val.name + ".png) no-repeat";
							document.getElementsByClassName("chessi111")[0].style.background = "";
						}
					});
					game.figures.forEach(function(val, i) {
						if (val.fromi == 1 && val.fromj == 1 && val.type == "rook") { // Меняем в фигурах
							game.figures[i].fromj = 4;
						}
					});
				}
				
				kingcastling = false;
				
				if (game.lastFigurefromi == 8 && game.lastFigurefromj == 5 && game.lastFigurei == 8 && game.lastFigurej == 7) { // Если король перешёл с 8,5 на 8,7, то начал делать рокировку
					
					figureArr.forEach(function(val, i) {
						if (val.fromi == game.lastFigurei && val.fromj == game.lastFigurej && val.type == "king") { // Если эта фигура король
							kingcastling = true;
						}
					});
				}
				
				if (kingcastling == true) {
					figureArr.forEach(function(val, i) {
						if (val.fromi == 8 && val.fromj == 8 && val.type == "rook") { // Если ладья на 8,8
							figureArr[i].fromj = 6; // Перемещаем ее на 8,6
							document.getElementsByClassName("chessi861")[0].style.background = "url(" + val.name + ".png) no-repeat";
							document.getElementsByClassName("chessi881")[0].style.background = "";
						}
					});
					game.figures.forEach(function(val, i) {
						if (val.fromi == 8 && val.fromj == 8 && val.type == "rook") { // Меняем в фигурах
							game.figures[i].fromj = 6;
						}
					});
				}
				
				kingcastling = false;
				
				if (game.lastFigurefromi == 8 && game.lastFigurefromj == 5 && game.lastFigurei == 8 && game.lastFigurej == 3) { // Если король перешёл с 8,5 на 8,3, то начал делать рокировку
					
					figureArr.forEach(function(val, i) {
						if (val.fromi == game.lastFigurei && val.fromj == game.lastFigurej && val.type == "king") { // Если эта фигура король
							kingcastling = true;
						}
					});
				}
				
				if (kingcastling == true) {
					figureArr.forEach(function(val, i) {
						if (val.fromi == 8 && val.fromj == 1 && val.type == "rook") { // Если ладья на 8,1
							figureArr[i].fromj = 4; // Перемещаем ее на 8,4
							document.getElementsByClassName("chessi841")[0].style.background = "url(" + val.name + ".png) no-repeat";
							document.getElementsByClassName("chessi811")[0].style.background = "";
						}
					});
					game.figures.forEach(function(val, i) {
						if (val.fromi == 8 && val.fromj == 1 && val.type == "rook") { // Меняем в фигурах
							game.figures[i].fromj = 4;
						}
					});
				}
				
				kingcastling = false;
				
				game.avaliablefigure = [];
				
				// Проверка на пат и мат
							
						let figureArrother = [];
						
						let figureArrother1 = [];
						
						let fromiii = 0;
						let fromjjj = 0;
						
						figureArr.forEach((val, n) => {
							
							figureArrother[n] = {fromi: figureArr[n].fromi, fromj: figureArr[n].fromj, name: figureArr[n].name, colorwhite: figureArr[n].colorwhite, type: figureArr[n].type, id: figureArr[n].id, counthod: figureArr[n].counthod};
						});
				
				let calcAll = [];
				let avaliableAll = [];
				
				let calcAll1 = [];
				let avaliableAll1 = [];
				
				figureArr.forEach((val,k) => {
					if (game.colorwhite == val.colorwhite) {
						calcAll[k] = new Calculation(val.fromi,val.fromj,game.figures,val.colorwhite,val.counthod,game.lastType);							
						avaliableAll[k] = {figure: val, move: calcAll[k].avaliable(val.type)}; // узнать доступные поля каждой фигуры
					}								
				});
				
				let countcheck = 0;
				
				// Нужно по каждой фигуре, по каждому её доступному полю попробовать сделать ход и узнать нет ли шаха королю
				
				// Попробуем пойти королём id 6
				
				avaliableAll.forEach((val,k) => {
					
						val.move.forEach((vmove,imove) => { // Находим его возможные ходы
						
							figureArrother1 = [];
						
							figureArrother.forEach((value,n) => { // Находим его возможные ходы
								if (value.id == val.figure.id) {
									figureArrother[n].fromi = vmove.i;
									figureArrother[n].fromj = vmove.j;
									
									fromiii = vmove.i;
									fromjjj = vmove.j;
									
									game.indexother = 0;
									
									figureArrother.forEach(function(value1,k1) { // если сделать ход по чужой фигуре
										if (value1.fromi == value.fromi && value1.fromj == value.fromj && value.id != value1.id) {
											
											game.indexother = value1.id;
											
										}
										
									});
									
									figureArrother.forEach((val1, n1) => {
										if (val1.id != game.indexother) {
											if (val1.id == val.figure.id) {
												figureArrother1.push({fromi: fromiii, fromj: fromjjj, name: figureArr[n1].name, colorwhite: figureArr[n1].colorwhite, type: figureArr[n1].type, id: figureArr[n1].id, counthod: figureArr[n1].counthod});
											} else {
												figureArrother1.push({fromi: figureArr[n1].fromi, fromj: figureArr[n1].fromj, name: figureArr[n1].name, colorwhite: figureArr[n1].colorwhite, type: figureArr[n1].type, id: figureArr[n1].id, counthod: figureArr[n1].counthod});
											}
										}
																				
									});
									
									let avaliablef1other = [];
										// координаты короля
										let kingfi1other = 0;
										let kingfj1other = 0;
										let checkhodother = false;
																			
										figureArrother1.forEach((val3, n3) => { // узнаем координаты короля
											if (val3.colorwhite == game.colorwhite && val3.type == "king") {
												kingfi1other = val3.fromi;
												kingfj1other = val3.fromj;
											}
										});
										
										if (value.colorwhite == game.colorwhite && value.type == "king") {
												kingfi1other = value.fromi;
												kingfj1other = value.fromj;											
										}
										
										//console.log("король " + kingfi1other + " " + kingfj1other);
										
										figureArrother1.forEach((val4, n) => {
												if (val4.colorwhite != game.colorwhite) {
													avaliablef1other = new Calculation(val4.fromi,val4.fromj,figureArrother1,val4.colorwhite,val4.counthod,game.lastType);
													game.avaliablefigure1other.push(avaliablef1other.avaliable(val4.type)); // узнать доступные поля всех фигур
													
												}
											});
										
										//console.log("Доступные поля всех фигур");
										//console.log(game.avaliablefigure1other);
										
										for (let e = 0; e < game.avaliablefigure1other.length; e++) { // Есть ли пересечения доступных полей фигур и короля
											for (let item of game.avaliablefigure1other[e]) {
												if (item.i == kingfi1other && item.j == kingfj1other) {
													checkhodother = true;
												}
											}
										}
										
										if (checkhodother == true) {
											//console.log("Королю будет шах");
										}
										
										if (checkhodother == false) {
											//console.log("Король может уйти от шаха");
											countcheck++;
										}
										
									//console.log(figureArrother1);
									//console.log(countcheck);
									
									game.avaliablefigure1other = [];
								}
							});
												
						});
												
				});
				
				let patmat = "";
				
				if (countcheck == 0) { // если нет доступных ходов, чтобы не попасть на шах короля, то пат
					patmat = "Пат";
					if (game.check == true) { // если ещё шах, то мат
						patmat = "Мат";
					}
					document.getElementsByClassName("message1")[0].innerHTML = patmat;
				}
				
				//console.log(game.check);
				console.log(game);
				console.log(figureArr);
				console.log(game.check);
			}
			
		};
		
	}
}


