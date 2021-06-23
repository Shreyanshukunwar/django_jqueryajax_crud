$(document).ready(function()
{
    //Create and Insert Data
    $('#btn-save').click(function(e)
    {
        let userId = $('#userId').val()
        let userName = $('#nameid').val();
        let email = $('#emailid').val();
        let address = $('#addressid').val();
        let csrfToken = $("input[name='csrfmiddlewaretoken']").val()
        
        if (userName=='' || email== '' || address=='')
        {
            $('#msg').text("Enter all Values")
            $('#msg').show()
        }
        else
        {
            userData = {
                userId: userId,
                name : userName,
                email : email,
                address : address,
                csrfmiddlewaretoken : csrfToken,
            }

            $.ajax({
                url: "http://127.0.0.1:8000/save/",
                method : "POST",
                data : userData,
                success:function(data){
                    if (data.status == 'Save'){
                        let output = ''
                        $('#msg').text("Form Submitted successfully!")
                        $('#msg').show()
                        console.log('Form Submitted successfully!')
                        users = data.user_data

                        for (let i = 0; i < users.length; i++) {
                            output += `
                                <tr>
                                    <td>${users[i].name}</td>
                                    <td>${users[i].email}</td>
                                    <td>${users[i].address}</td>
                                    <td>
                                        <input type="button" data-id="${users[i].id}" value="Edit" class="btn btn-sm btn-info btn-edit">
                                        <input type="button" data-id="${users[i].id}" value="Delete" class="btn btn-sm btn-danger btn-del">
                                    </td>
                                </tr>
                            `
                        }
                        $('#user-table').html(output);
                        $('#user-form')[0].reset();
                        $('#userId').val('')
                    }
                    if(data.Status == 'Failed'){
                        $('#msg').text("Unable to save form")
                        $('#msg').show()
                        $('#user-form')[0].reset();
                        $('#userId').val('')
                    }
                }
            })
        }
    })

    //Delete Data
    $('tbody').on('click', '.btn-del', function(){
        console.log('Delete clicked')
        let csrfToken = $("input[name='csrfmiddlewaretoken']").val()
        let id = $(this).attr("data-id")
        let deleteThis = this
        userData = {
            id : id,
            csrfmiddlewaretoken : csrfToken,
        }

        $.ajax({
            url: "http://127.0.0.1:8000/delete/",
            method: 'POST',
            data: userData,
            success: function(data){
                if (data.status==1){
                    $('#msg').text("Row Deleted Successfully!")
                    $('#msg').show()
                    $(deleteThis).closest("tr").fadeOut()
                }
            }
        })
    })

    //Editing Data
    $('tbody').on('click', '.btn-edit', function(){
        console.log('Edit Clicked clicked')
        let csrfToken = $("input[name='csrfmiddlewaretoken']").val()
        let id = $(this).attr("data-id")
        let editThis = this
        userData = {
            id : id,
            csrfmiddlewaretoken : csrfToken,
        }

        $.ajax({
            url: "http://127.0.0.1:8000/edit/",
            method: 'POST',
            data: userData,
            success: function(data){
                // console.log(data)
                $('#userId').val(data.id)
                $('#nameid').val(data.name)
                $('#emailid').val(data.email)
                $('#addressid').val(data.address)
            }
        })
    })
})