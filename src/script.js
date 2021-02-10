import {game} from "./game";
import {Calculation} from "./Calculation";
import {chessi} from "./chess";
import {figureArr} from "./figure";

let chess = document.getElementsByClassName("chess")[0]; // Создаётся поле

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

// рисование фигур

for (let i = 1; i <= 8; i++) {
	chessi[i] = [];
	for (let j = 1; j <= 8; j++) {
		for(let item of figureArr) {
			if (item.fromi == i && item.fromj == j) {
				document.getElementsByClassName("chessi" + i + j + "1")[0].style.background = "url(src/images/" + item.name + ".png) no-repeat";
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
								document.getElementsByClassName("chessi" + val.i + val.j + "11")[0].style.background = "url(src/images/avaliable.png) no-repeat";

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

						document.getElementsByClassName("chessi" + i + j + "1")[0].style.background = "url(src/images/" + item.name + ".png) no-repeat";
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
							document.getElementsByClassName("chessi161")[0].style.background = "url(src/images/" + val.name + ".png) no-repeat";
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
							document.getElementsByClassName("chessi141")[0].style.background = "url(src/images/" + val.name + ".png) no-repeat";
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
							document.getElementsByClassName("chessi861")[0].style.background = "url(src/images/" + val.name + ".png) no-repeat";
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
							document.getElementsByClassName("chessi841")[0].style.background = "url(src/images/" + val.name + ".png) no-repeat";
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

										figureArrother1.forEach((val4, n) => {
												if (val4.colorwhite != game.colorwhite) {
													avaliablef1other = new Calculation(val4.fromi,val4.fromj,figureArrother1,val4.colorwhite,val4.counthod,game.lastType);
													game.avaliablefigure1other.push(avaliablef1other.avaliable(val4.type)); // узнать доступные поля всех фигур
												}
											});

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

				console.log(game);
				console.log(figureArr);
				console.log(game.check);
			}
		};
	}
}
