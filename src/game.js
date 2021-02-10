import {chessi} from "./chess";

export const game = { // объект для отслеживания состояния по ходу игры
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
