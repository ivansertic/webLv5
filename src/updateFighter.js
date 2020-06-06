class UpdateFighter{

    constructor(dataForm){
        this.dataForm = dataForm;
    }

    init(){
        this._submitUpdateData(this.dataForm);
    }

    _submitUpdateData(dataForm){
        const updateForm = document.querySelector(dataForm);

        updateForm.addEventListener("submit", function (e){
            e.preventDefault();

            const updateData = new FormData(this);
            console.log(updateData);
            fetch('controller/db/updateCatInfo.php',{
                method: 'POST',
                body: updateData
            }).then(response => response.text())
            .then(response => {
                location.replace("index.php");
            })
            .catch(error => alert(error));
        });
    }
}

const dataForm = {
    form: "form"
}

const updateCat = new UpdateFighter(dataForm.form);
updateCat.init();