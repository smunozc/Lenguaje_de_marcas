const {series,src,dest} = require("gulp");

function inicio(cb) {
    console.log("Generando proyecto CV...")
    cb();
}

function final(cb) {
    console.log("Proyecto CV generado.")
    cb();
}

function pipeline(){
    return src("./css/tema_claro/tema_claro.css").pipe(dest("./dist/")), src("./*.html").pipe(dest("./dist/"));
}

exports.inicio = inicio;
exports.final = final;
exports.default = pipeline;

///exports.default = series(inicio,final); para ejecutar en serie la funcion inicio y final.