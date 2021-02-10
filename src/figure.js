export const figure = { // объект прототип для фигур
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

for(let i = 1; i <= 32; i++) {
    figure['f' + i] = {};
}

export const figureArr = [figure.f1, figure.f2, figure.f3, figure.f4, figure.f5, figure.f6, figure.f7, figure.f8, figure.f9, figure.f10, figure.f11, figure.f12, figure.f13, figure.f14, figure.f15, figure.f16, figure.f17, figure.f18, figure.f19, figure.f20, figure.f21, figure.f22, figure.f23, figure.f24, figure.f25, figure.f26, figure.f27, figure.f28, figure.f29, figure.f30, figure.f31, figure.f32];

figure.f1.fromi = 1;
figure.f1.fromj = 1;
figure.f1.name = "blackRock";
figure.f1.colorwhite = 0;
figure.f1.type = "rook";
figure.f1.id = 1;
figure.f1.counthod = 0;

figure.f2.fromi = 1;
figure.f2.fromj = 2;
figure.f2.name = "blackKnight";
figure.f2.colorwhite = 0;
figure.f2.type = "knight";
figure.f2.id = 2;
figure.f2.counthod = 0;

figure.f3.fromi = 1;
figure.f3.fromj = 3;
figure.f3.name = "blackBishop";
figure.f3.colorwhite = 0;
figure.f3.type = "bishop";
figure.f3.id = 3;
figure.f3.counthod = 0;

figure.f4.fromi = 1;
figure.f4.fromj = 4;
figure.f4.name = "blackQueen";
figure.f4.colorwhite = 0;
figure.f4.type = "queen";
figure.f4.id = 4;
figure.f4.counthod = 0;

figure.f5.fromi = 1;
figure.f5.fromj = 5;
figure.f5.name = "blackKing";
figure.f5.colorwhite = 0;
figure.f5.type = "king";
figure.f5.id = 5;
figure.f5.counthod = 0;

figure.f6.fromi = 1;
figure.f6.fromj = 6;
figure.f6.name = "blackBishop";
figure.f6.colorwhite = 0;
figure.f6.type = "bishop";
figure.f6.id = 6;
figure.f6.counthod = 0;

figure.f7.fromi = 1;
figure.f7.fromj = 7;
figure.f7.name = "blackKnight";
figure.f7.colorwhite = 0;
figure.f7.type = "knight";
figure.f7.id = 7;
figure.f7.counthod = 0;

figure.f8.fromi = 1;
figure.f8.fromj = 8;
figure.f8.name = "blackRock";
figure.f8.colorwhite = 0;
figure.f8.type = "rook";
figure.f8.id = 8;
figure.f8.counthod = 0;

figure.f9.fromi = 2;
figure.f9.fromj = 1;
figure.f9.name = "blackPiece";
figure.f9.colorwhite = 0;
figure.f9.type = "piece";
figure.f9.id = 9;
figure.f9.counthod = 0;

figure.f10.fromi = 2;
figure.f10.fromj = 2;
figure.f10.name = "blackPiece";
figure.f10.colorwhite = 0;
figure.f10.type = "piece";
figure.f10.id = 10;
figure.f10.counthod = 0;

figure.f11.fromi = 2;
figure.f11.fromj = 3;
figure.f11.name = "blackPiece";
figure.f11.colorwhite = 0;
figure.f11.type = "piece";
figure.f11.id = 11;
figure.f11.counthod = 0;

figure.f12.fromi = 2;
figure.f12.fromj = 4;
figure.f12.name = "blackPiece";
figure.f12.colorwhite = 0;
figure.f12.type = "piece";
figure.f12.id = 12;
figure.f12.counthod = 0;

figure.f13.fromi = 2;
figure.f13.fromj = 5;
figure.f13.name = "blackPiece";
figure.f13.colorwhite = 0;
figure.f13.type = "piece";
figure.f13.id = 13;
figure.f13.counthod = 0;

figure.f14.fromi = 2;
figure.f14.fromj = 6;
figure.f14.name = "blackPiece";
figure.f14.colorwhite = 0;
figure.f14.type = "piece";
figure.f14.id = 14;
figure.f14.counthod = 0;

figure.f15.fromi = 2;
figure.f15.fromj = 7;
figure.f15.name = "blackPiece";
figure.f15.colorwhite = 0;
figure.f15.type = "piece";
figure.f15.id = 15;
figure.f15.counthod = 0;

figure.f16.fromi = 2;
figure.f16.fromj = 8;
figure.f16.name = "blackPiece";
figure.f16.colorwhite = 0;
figure.f16.type = "piece";
figure.f16.id = 16;
figure.f16.counthod = 0;

figure.f17.fromi = 7;
figure.f17.fromj = 1;
figure.f17.name = "whitePiece";
figure.f17.colorwhite = 1;
figure.f17.type = "piece";
figure.f17.id = 17;
figure.f17.counthod = 0;

figure.f18.fromi = 7;
figure.f18.fromj = 2;
figure.f18.name = "whitePiece";
figure.f18.colorwhite = 1;
figure.f18.type = "piece";
figure.f18.id = 18;
figure.f18.counthod = 0;

figure.f19.fromi = 7;
figure.f19.fromj = 3;
figure.f19.name = "whitePiece";
figure.f19.colorwhite = 1;
figure.f19.type = "piece";
figure.f19.id = 19;
figure.f19.counthod = 0;

figure.f20.fromi = 7;
figure.f20.fromj = 4;
figure.f20.name = "whitePiece";
figure.f20.colorwhite = 1;
figure.f20.type = "piece";
figure.f20.id = 20;
figure.f20.counthod = 0;

figure.f21.fromi = 7;
figure.f21.fromj = 5;
figure.f21.name = "whitePiece";
figure.f21.colorwhite = 1;
figure.f21.type = "piece";
figure.f21.id = 21;
figure.f21.counthod = 0;

figure.f22.fromi = 7;
figure.f22.fromj = 6;
figure.f22.name = "whitePiece";
figure.f22.colorwhite = 1;
figure.f22.type = "piece";
figure.f22.id = 22;
figure.f22.counthod = 0;

figure.f23.fromi = 7;
figure.f23.fromj = 7;
figure.f23.name = "whitePiece";
figure.f23.colorwhite = 1;
figure.f23.type = "piece";
figure.f23.id = 23;
figure.f23.counthod = 0;

figure.f24.fromi = 7;
figure.f24.fromj = 8;
figure.f24.name = "whitePiece";
figure.f24.colorwhite = 1;
figure.f24.type = "piece";
figure.f24.id = 24;
figure.f24.counthod = 0;

figure.f25.fromi = 8;
figure.f25.fromj = 1;
figure.f25.name = "whiteRock";
figure.f25.colorwhite = 1;
figure.f25.type = "rook";
figure.f25.id = 25;
figure.f25.counthod = 0;

figure.f26.fromi = 8;
figure.f26.fromj = 2;
figure.f26.name = "whiteKnight";
figure.f26.colorwhite = 1;
figure.f26.type = "knight";
figure.f26.id = 26;
figure.f26.counthod = 0;

figure.f27.fromi = 8;
figure.f27.fromj = 3;
figure.f27.name = "whiteBishop";
figure.f27.colorwhite = 1;
figure.f27.type = "bishop";
figure.f27.id = 27;
figure.f27.counthod = 0;

figure.f28.fromi = 8;
figure.f28.fromj = 4;
figure.f28.name = "whiteQueen";
figure.f28.colorwhite = 1;
figure.f28.type = "queen";
figure.f28.id = 28;
figure.f28.counthod = 0;

figure.f29.fromi = 8;
figure.f29.fromj = 5;
figure.f29.name = "whiteKing";
figure.f29.colorwhite = 1;
figure.f29.type = "king";
figure.f29.id = 29;
figure.f29.counthod = 0;

figure.f30.fromi = 8;
figure.f30.fromj = 6;
figure.f30.name = "whiteBishop";
figure.f30.colorwhite = 1;
figure.f30.type = "bishop";
figure.f30.id = 30;
figure.f30.counthod = 0;

figure.f31.fromi = 8;
figure.f31.fromj = 7;
figure.f31.name = "whiteKnight";
figure.f31.colorwhite = 1;
figure.f31.type = "knight";
figure.f31.id = 31;
figure.f31.counthod = 0;

figure.f32.fromi = 8;
figure.f32.fromj = 8;
figure.f32.name = "whiteRock";
figure.f32.colorwhite = 1;
figure.f32.type = "rook";
figure.f32.id = 32;
figure.f32.counthod = 0;
