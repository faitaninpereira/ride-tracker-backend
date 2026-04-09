function calcularGanhoLiquido(valorBruto, taxaPlataforma) {
    const desconto= valorBruto * taxaPlataforma
    return valorBruto - desconto
}

module.exports= { calcularGanhoLiquido }