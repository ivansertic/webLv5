class DeleteFighter{

    constructor(dataForm){
        this.dataForm = dataForm;
    }

    init(){
        this._deleteFighter(this.dataForm);
    }

    _deleteFighter(dataForm){

        const deleteFighterForm = document.querySelector(dataForm);

        document.querySelector("#delete").addEventListener("click", (e)=>{
            e.preventDefault();

            let deletedFighter = new FormData(deleteFighterForm);
            fetch('controller/db/delete.php',{
                method: "POST",
                body: deletedFighter
            }).then(response => response.text())
            .then(response => {
                location.replace("index.php");
            })
            .catch(error => alert(error));
        });
        
    }
}

const data = {
    form: "form"
}

const deleteFighterObj = new DeleteFighter(data.form);
deleteFighterObj.init();