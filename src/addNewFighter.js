class AddNewFighter {

    constructor(dataForm){
        this.dataForm = dataForm;
    }

    init(){
        this._createNewFighter(this.dataForm);
    }

    _createNewFighter(dataForm){

        const submitedFormData = document.querySelector(dataForm);

        submitedFormData.addEventListener("submit", function(e){
            e.preventDefault();

            const newData = new FormData(this);

            fetch('controller/db/addCat.php',{
                method: 'POST',
                body: newData
            }).then(response => response.text())
              .then(response =>{
                  location.replace("index.php");
              }).catch(error => alert(error));
                
        })
    }
}

const data = {
    dataForm: "form"
}

const newFighter = new AddNewFighter(data.dataForm);
newFighter.init();