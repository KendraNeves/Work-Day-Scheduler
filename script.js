$(document).ready(function(){

    //Displays Date @ top of page
    $(".date").text(moment().format('ll'));

    //Current Time
    let currentTime = parseInt(moment().format("HH"));

    //Creates new row with time, plan, and save
    for(let i = 0; i < 9; i++){
        let newRow = $("<div></div>").appendTo("main").attr("class","row").css("margin", "5px"); 
        let newSpace = $("<div></div>").appendTo(newRow).attr("class", "col-1");
        let newTime = $("<div></div>").appendTo(newRow).attr("class", "col-2 btn btn-secondary " + [i + 9]).text((i +9) + ":00");
        let newPlan = $("<div></div>").appendTo(newRow).attr("class", "col-6 btn planIndex" + [i]);
        // let newInput = $("<input class=input>").appendTo(newPlan);
        let newSave = $("<div></div>").appendTo(newRow).attr("class", "col-2 btn btn-info"); //no "saveIndex" bc save btn is same for every row
        $('<img src="save-icon.svg">').appendTo(newSave);  //Save icon
        newSpace;
        let timeBlock = (i + 9);
        
        if (currentTime < timeBlock){
            $(".planIndex" + [i]).addClass("btn-success");
        }

        if (currentTime > timeBlock){
            $(".planIndex" + [i]).addClass("btn-light");
        }
        
        if (currentTime == timeBlock){
            $(".planIndex" + [i]).addClass("btn-warning");

        }

        let planObj = newPlan.get(0);
        let stored = localStorage.getItem(planObj.classList[2]);
        if (stored) {
            let inputObj = $("<input></input>").attr("class", "input" + [i]).appendTo(planObj);
            inputObj.val(stored);
        }
        else {
            //On.click for PLAN
            $(".planIndex" + [i]).one("click", function(){
                $("<input></input>").attr("class", "input" + [i]).appendTo(this);
            });
        }  
    }   


    //On.click for SAVE
    let saveClick = $(".btn-info").click(function(){
        let planButton = this.parentElement.children[2];
        if (planButton.hasChildNodes()) {
            let planInput = planButton.children[0];
            localStorage.setItem(planButton.classList[2], planInput.value);
        }
        else {
            alert("No plan exists in that slot!");
        }
    });

});
