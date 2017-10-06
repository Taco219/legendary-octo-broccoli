let player = [1, 1];
let goal = [1, 1];

export const move = async (direction) => {
    switch (direction){
        case "up":
            player[1]--;
            break;
        case "down":
            player[1]++;
            break;
        case "left":
            player[0]--;
            break;
        case "right":
            player[0]++;
            break;
    }

    console.log(player);
    console.log(goal);

    if(await arraysEqual(player, goal)){
        console.log('rest!')
    }

    return { player: player, goal: goal }
};

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(let i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}