const game = document.querySelector("#game")
const startButton = document.querySelector("#start")
const pickaxeButton = document.querySelector("#pickaxe")
const shovelButton = document.querySelector("#shovel")
const axeButton = document.querySelector("#axe")
const pocketButton = document.querySelector("#pocket")
const restartButton = document.querySelector("#restart")
const body = document.querySelector("body")
const init = document.querySelector("#init")

let matrix = []
const types = ['dirt','up-dirt', 'sky', 'leaf', 'trunk', 'cloud','rock']
console.log(matrix)
let pocket
let currentTool = ''
let type = 'pickaxe'
//FUNCTION start
startButton.addEventListener('click',()=>{
    game.classList.remove('hide')
    game.classList.add('game_class')
    body.classList.remove('body_init')
    init.classList.add('hide')
    start()


})
pickaxeButton.addEventListener('click',()=>{
    type = 'pickaxe'
    axeButton.classList.remove("selected")
    shovelButton.classList.remove("selected")
    pocketButton.classList.remove("selected")
    pickaxeButton.classList.add('selected')
})
shovelButton.addEventListener('click',()=>{
    type = 'shovel'
    axeButton.classList.remove("selected")
    pickaxeButton.classList.remove("selected")
    pocketButton.classList.remove("selected")
    shovelButton.classList.add('selected')

})
axeButton.addEventListener('click',()=>{
    type = 'axe'
    pickaxeButton.classList.remove("selected")
    shovelButton.classList.remove('selected')
    pocketButton.classList.remove("selected")
    axeButton.classList.add("selected")

    
})

pocketButton.addEventListener('click',()=>{
    if(pocketButton.innerHTML.trim() !== ''){
        type = 'add'
        pickaxeButton.classList.remove("selected")
        shovelButton.classList.remove('selected')
        axeButton.classList.remove("selected")
        pocketButton.classList.add("selected")
    }
})

restartButton.addEventListener('click',()=>{
    console.log('restart')
    matrix = []
    pocket = null
    currentTool = ''
    type = "pickaxe"
    game.innerHTML = ''
    pocketButton.innerHTML = ''
    start()
})
function start(){
    startButton.classList.add("hide")
    document.querySelector('side').classList.remove("hide")
    for(let y = 0; y < 25; y++ ){
        const l  = []
        for(let x = 0; x < 25; x++){
            l.push("")
        }
        matrix.push(l)
    }
    matrix.forEach((y, iy) => {
        y.forEach((x, ix) => {
            console.log(x)
            const block = document.createElement('button')
            block.setAttribute("x",ix)
            block.setAttribute('y',iy)
            
            if(iy < 17){
                block.classList.remove(...types)
                block.classList.add('sky')
            }else if(iy === 17){
                block.classList.remove(...types)
                block.classList.add('up-dirt')
            }
            else{
                block.classList.remove(...types)
                block.classList.add('dirt')
            }

            if(iy === 7 && ix === 7){
                block.classList.remove(...types)
                block.classList.add('cloud')
            }
            if(iy === 8){
                if(ix >= 5 && ix <= 9){
                    block.classList.remove(...types)
                    block.classList.add('cloud')
                }
                if(ix >= 11 && ix <= 12){
                    block.classList.remove(...types)
                    block.classList.add('cloud')
                }
            }
            if(iy === 9){
                if(ix >= 4 && ix <= 12){
                    block.classList.remove(...types)
                    block.classList.add('cloud')
                }
                
            }
            if(iy === 10){
                if(ix >= 9 && ix <= 10){
                    block.classList.remove(...types)
                    block.classList.add('cloud')
                }
            }

            if(iy === 11){
                if(ix === 20 || ix === 21 || ix == 22){
                    block.classList.remove(...types)
                    block.classList.add('leaf')
                }
            }
            if(iy === 12 ){
                if(ix === 20 || ix === 21 || ix == 22){
                    block.classList.remove(...types)
                    block.classList.add('leaf')
                }
            }
            if(iy === 13 ){
                if(ix === 20 || ix === 21 || ix == 22){
                    block.classList.remove(...types)
                    block.classList.add('leaf')
                }
            }
            if(iy === 14 ){
                if(ix === 21){
                    block.classList.remove(...types)
                    block.classList.add('trunk')
                }
            }
            if(iy === 15){
                if(ix === 6){
                    block.classList.remove(...types)
                    block.classList.add('leaf')
                }
                if(ix === 21){
                    block.classList.remove(...types)
                    block.classList.add('trunk')
                }
            }
            if(iy === 16){
                if(ix === 5 || ix == 6 || ix === 7){
                    block.classList.remove(...types)
                    block.classList.add('leaf')
                }
                if(ix === 21){
                    block.classList.remove(...types)
                    block.classList.add('trunk')
                }
                if(ix === 19 || ix === 24 || ix === 18){
                    block.classList.remove(...types)
                    block.classList.add('rock')
                }
            }

            block.classList.add('block')
            block.setAttribute('onclick',`clickBlock(${ix}, ${iy})`)
            game.append(block)    
        })
    })
}
//FUNCTION pickaxe
    function usePickaxe(x,y,blockType){
        if(blockType !== 'rock') return;
        paint(x,y, blockType)
    }

//FUNCTION shovel
    function useShovel(x,y,blockType){

        if(blockType !== 'dirt' && blockType !== 'up-dirt') return;
        paint(x,y, blockType)
    }


//FUNCITON axe
    function useAxe(x,y,blockType){

        if(blockType !== 'leaf' && blockType !== 'trunk') return;
        paint(x,y, blockType)
    }


function clickBlock(x, y){
    const block = document.querySelector(`button[x="${x}"][y = "${y}"]`)
    let blockType
    block.classList.forEach(e => {
        if(types.includes(e)){
            blockType = e
        }
    })
    console.log(type)
    switch(type){
        case "pickaxe":{
            usePickaxe(x,y, blockType)
        }
        break;
        case "shovel":{
            useShovel(x,y,blockType)
        }
        break;
        case "axe":{
            useAxe(x,y,blockType)
        }
        break;
        case "add":{
            addBlock(x,y,blockType)
        }
        break;
    }
}    
function paint(x, y, blockType){
    const block = document.querySelector(`button[x="${x}"][y = "${y}"]`)
    block.classList.remove(...types)
    block.classList.add('sky')
    pocket = blockType

    const pocketChildNode = document.createElement('div')
    pocketChildNode.classList.add('block',blockType)
    pocketButton.innerHTML = ''
    pocketButton.appendChild(pocketChildNode)
}
function addBlock(x,y, blockType){
    const block = document.querySelector(`button[x="${x}"][y = "${y}"]`)

    
    if(pocket){
        console.log('blocktype',blockType)
        if(blockType !== 'sky' && blockType !== 'cloud') return;
        block.classList.remove(...types)
        block.classList.add(pocket)
        pocket = null
        pocketButton.innerHTML = ''

    }
}