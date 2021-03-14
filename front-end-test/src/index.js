/**
 * Babel: Responsavel por converter - transpilar - codigo React para um codigo queo browser entenda.
 * Webpack: Para cada tipo de arquivos (.js, .css, .png) eu vou converter o codigo de uma maneira diferente.
 * 
 * Webpack Loaders: babel-loader, css-loader, image-loader, file-loader.
 */

const soma = (a, b) => {
    return a+b;
}

console.log(soma(3,1));