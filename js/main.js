
//save button functionality
function saveData() {

    if ($("#id").val() == "" || $("#name").val() == "" || $("#address").val() == "" || $("#salary").val() == "") {
        $("#message").html("<div class='alert alert-warning col p-1 m-0' role='alert'>"
            + "All fields are required" + "</div>")
    } else {
        var s_id = $("#id").val();
        var s_name = $("#name").val();
        var s_address = $("#address").val();
        var s_salary = $("#salary").val();

        fetch('http://localhost:8080/student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: s_id,
                name: s_name,
                address: s_address,
                salary: s_salary
            })
        })
            .then(res => {
                if (res.ok) {
                    console.log('save successful');
                    $("#message").html("<div class='alert alert-success col p-1 m-0' role='alert'>"
                        + "Saved Successfully" + "</div>")
                } else {
                    console.log('save failed');
                    $("#message").html("<div class='alert alert-danger col p-1 m-0' role='alert'>"
                        + "Failed to Save Data" + "</div>")
                }
                // return res.json()        
            })
            // .then(data => console.log(data))
            .catch(err => {
                console.log(err.message)
                $("#message").html("<div class='alert alert-danger col p-1 m-0' role='alert'>"
                    + "An error occurred" + "</div>")
            })
            .finally(clearFields())
    }
}


// clear button functionality
// $("#clearBtn").click(function(){
//     $("#id").val("");
//     $("#name").val("");
//     $("#address").val("");
//     $("#salary").val("");
// })

// clear button functionality
function clearFields() {
    $("#id").val("");
    $("#name").val("");
    $("#address").val("");
    $("#salary").val("");
    $("#message").html('');
}


// // load all data
// function loadAll() {
//     var tableRow;

//     fetch('http://localhost:8080/student/students')
//     .then(res => res.json())
//     .then(data => {
//         for (var d of data) {            
//             tableRow = "<tr></tr><th scope='row'>"+d.id+"</th><td>"+d.name+"</td><td>"+d.address+"</td><td>"+d.salary+"</td></tr>";
//             $("#tablebody").append(tableRow);
//         }
//     })
//     .catch(err => console.log(err))
// }

// load all data to table
function loadAllData() {
    fetch('http://localhost:8080/student/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(dataset => {
            $("#allData").DataTable({
                data: dataset,
                "columns": [
                    { "data": "id" },
                    { "data": "name" },
                    { "data": "address" },
                    { "data": "salary" },
                ]
            })
        })
        .catch(err => {
            console.log(err.message)
            $("#message").removeAttr("hidden")
            $("#message").html("<div class='alert alert-dark m-0 p-2 w-50 text-center opacity-75 text-danger' role='alert'>" +
                "An Error occurred when loading data" +
                "</div>")
        })
}
