
export const currentKeys = {

}

export function addKeyListeners(){
    document.addEventListener('keydown', (e) => {
        currentKeys[e.key] = true;
        // console.log(currentKeys)
    })
    document.addEventListener('keyup', (e) => {
        currentKeys[e.key] = false;
        // console.log(currentKeys)
    })
}

