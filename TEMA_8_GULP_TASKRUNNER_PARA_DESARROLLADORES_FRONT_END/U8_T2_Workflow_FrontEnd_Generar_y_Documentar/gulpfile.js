const{series,parallel,src,dest,watch} = require("gulp");
const sassdoc = require("sassdoc");
const sass = require("gulp-dart-scss");


//Tarea para generar sassdoc
let doc_options = {
    dest : './dist/docs',
    verbose: true
}
function sassDoc(){
    return src("./scss/*.scss").pipe(sassdoc(doc_options));
}

//Tarea para generar css a partir del scss
function generarCss(){
    return src("./scss/style.scss").pipe(sass()).pipe(dest("./css/"));
}

//Si hay algún cambio en el scss se generará el css
function watch_scss(cb){
    watch("./scss/style.scss",generarCss);
    cb();
}

//Tarea para copiar todas las imagenes a la carpeta img dentro de dist
function copiarImg(){
    return src("./img/*").pipe(dest("./dist/img/"));
}

//He intentado hacer esta funcion pero no he encontrado solucion,
//no se copian todos los archivos ni el arbol completo.
//copia la documentacion generada a la carpeta dist/
function copiarDoc(){
    return src(['./docs/**/*']).pipe(dest('./dist/docs'));
    //Esta parte comentada es una prueba que tampoco ha salido bien, 
    //pero aun asi pienso que no iba mal encaminado
    /*return src([
        './docs/**',
        './docs/assets/css/*.*',
        './docs/assets/images/*.*',
        './docs/assets/js/*.*',
        './docs/assets/js/vendor/*.*'
    ],  {base: './docs/'}) 
    .pipe(dest('./dist/docs'));*/
}

//copia el html y el css generado a la carpeta dist/
function copiarHtmlCss(){
    return src("./index.html").pipe(dest("./dist/")),
        src("./css/style.css").pipe(dest("./dist/css/"));
}

exports.sassDoc = sassDoc;
exports.generarCss = generarCss;
exports.copiarImg = copiarImg;
exports.watch_scss = watch_scss;
exports.default = series(parallel(sassDoc,generarCss,copiarImg),copiarHtmlCss);