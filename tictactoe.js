    let boxes=document.querySelectorAll("#box");
    let resetBtn=document.querySelector("#reset");
    let game=document.querySelector("#new-game");
    let msgContainer=document.querySelector(".msg-container");
    let msg=document.querySelector("#msg");
    let count=0;

    let turnO=true;
    const winPatterns= [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [3,4,5],
        [6,7,8],
    ];
    boxes.forEach(box =>{
        box.addEventListener("click",() =>{
            console.log("box was clicked");
            if(turnO){
                box.innerText="O";
                box.style.color="#FFECDB";
                turnO=false;
            }else{
                box.innerText="X";
                box.style.color="#FF9149";
                turnO=true; 
            }
            box.disabled=true;
            count++;
            let isWinner=checkWinner();

            if(count===9 && !isWinner){
                draw();
            }
        });
    });

    const showWinner = (winner) =>{
        msg.innerText=`Congratulations,Winner is Player ${winner}`;
        msgContainer.classList.remove("hide");
    }

    const draw= () =>{
        msg.innerText="It's a Draw!!";
        msgContainer.classList.remove("hide");
        disabledBoxes();
    }

    const enableBoxes= () =>{
        for(let box of boxes){
            box.disabled=false;
            box.innerText="";
        }
    }

    const disabledBoxes= () =>{
        for(let box of boxes){
            box.disabled=true;
        }
    }

    const checkWinner=()=>{
                for(let patterns of winPatterns){
                    let pos1Val=boxes[patterns[0]].innerText;
                    let pos2Val=boxes[patterns[1]].innerText;
                    let pos3Val=boxes[patterns[2]].innerText;

                    if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
                    if(pos1Val === pos2Val && pos2Val === pos3Val){
                        console.log("winner", pos1Val);
                        disabledBoxes();
                        showWinner(pos1Val);
                        return true;
                    }
                }
                }
            
            }


    const resetGame= () =>{
        turnO= true;
        count=0;
        enableBoxes();
        msgContainer.classList.add("hide");
    }
            
    game.addEventListener("click",resetGame);
    resetBtn.addEventListener("click",resetGame);