const grid = document.querySelector('.grid')
let jogador = 'o'
let totalCasasPreenchidas = 0
// Cada subarray representa uma combinação de vitória:
// [0] linha 0, [1] linha 1, [2] linha 2
// [3] coluna 0, [4] coluna 1, [5] coluna 2
// [6] diagonal principal, [7] diagonal secundária
const jogadas = [[], [], [], [], [], [], [], []]

let posicoesParaCombos = {
    0: [0, 3, 6],
    1: [0, 4],
    2: [0, 5, 7],
    3: [1, 3],
    4: [1, 4, 6, 7],
    5: [1, 5],
    6: [2, 3, 7],
    7: [2, 4],
    8: [2, 5, 6]
}

let criarJogo = (elemento) => {
    for (let i = 0; i < 9; i++) {
        const casa = document.createElement(elemento)
        casa.classList = `casa`
        casa.dataset.id = i.toString()
        grid.appendChild(casa)
    }
}

let resultado = (arrayjogadas, jogador_) => {
    for (let array of arrayjogadas) {
        if (array.length === 3) {
            if (
                array[0] === 'x' && array[1] === 'x' && array[2] === 'x' ||
                array[0] === 'o' && array[1] === 'o' && array[2] === 'o'
            ) {
                alert(`O jogador ${jogador_} venceu`)
                grid.style.pointerEvents = "none" // impede mais jogadas
                return
            }
        }
    }

    // Verifica empate (todas as casas preenchidas e ninguém venceu)
    totalCasasPreenchidas++
    if (totalCasasPreenchidas === 9) {
        alert('Empatou')
        grid.style.pointerEvents = "none"
    }
}

let marcarXorY = (event, jogador_) => {
    let elemento = event.target

    // impede sobreposição de jogada
    if (elemento.innerText) return

    // alternar jogador
    jogador = jogador_ === 'o' ? 'x' : 'o'
    elemento.innerText = jogador

    let pos = parseInt(elemento.dataset.id)
    let combos = posicoesParaCombos[pos]

    for (let c of combos) {
        jogadas[c].push(jogador)
    }

    resultado(jogadas, jogador)
}

criarJogo('div')
grid.addEventListener('click', (event) => marcarXorY(event, jogador))
