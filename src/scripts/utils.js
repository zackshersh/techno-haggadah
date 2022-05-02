
export function wait(miliseconds){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, miliseconds);
    })
}

export function lerp(val1, val2, amnt){
    return val1 * (1 - amnt) + val2 * amnt;
}

