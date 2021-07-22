loadData();
//Load dữ liệu cho vị trí
getPosition();

//Load dữ liệu cho phòng ban
getDepartment();
/**
 * Event hiện pop up 
 * Focus vào ô mã nhân viên và thêm 1 mã nhân viên mới
 * Thêm mới dữ liệu
 * Dvanh 21/7/2021
 */
$(".content-header #btnAdd").click(function() {
    $("#popup").show();
    $(".wrapper").addClass("fade");
    $.ajax({
        url: "http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode",
        method: "GET",
    }).done(res => {
        $("#txtEmployeeCode").val(res);
        $("#txtEmployeeCode").focus();
    }).fail(res => {
        alert("Không lấy được mã nhân viên");
        $("#popup").hide();
    })

    // //Load dữ liệu cho vị trí
    // getPosition();

    // //Load dữ liệu cho phòng ban
    // getDepartment();

    //Hàm reset các trường
    resetPopup();

    $('#btnSave').click(function() {
        const employeeCode = $('#txtEmployeeCode').val();
        const fullName = $('#txtFullName').val();
        const dateOfBirth = $('#txtDateOfBirth').val();
        const gender = $('#txtGender').attr("Value");
        const identityNumber = $('#txtIdentityNumber').val();
        const identityDate = $('#txtIdentityDate').val();
        const identityPlace = $('#txtIdentityPlace').val();
        const email = $('#txtEmail').val();
        const phoneNumber = $('#txtPhoneNumber').val();
        const positionId = $('#txtPositionName').attr("Value");
        const departmentId = $('#txtDepartmentName').attr("Value");
        const personalTaxCode = $('#txtPersonalTaxCode').val();
        const salary = CommonFn.formatNumber($('#txtSalary').val());
        const joinDate = $('#txtJoinDate').val();
        const workStatus = $('#txtWorkStatus').attr("Value");

        let employee = {
            "employeeCode": employeeCode,
            "fullName": fullName,
            "gender": gender,
            "dateOfBirth": dateOfBirth,
            "phoneNumber": phoneNumber,
            "email": email,
            "identityNumber": identityNumber,
            "identityDate": identityDate,
            "identityPlace": identityPlace,
            "joinDate": joinDate,
            "departmentId": departmentId,
            "positionId": positionId,
            "workStatus": workStatus,
            "personalTaxCode": personalTaxCode,
            "salary": salary
        }


        $.ajax({
            url: "http://cukcuk.manhnv.net/v1/Employees",
            method: "POST",
            data: JSON.stringify(employee),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
        }).done(res => {
            alert("Thêm mới thành công");
            $('table tbody').empty();
            loadData();
            $("#popup").hide();
            $(".wrapper").removeClass("fade");

        }).fail(function(res) {
            console.log(res);
        });
    })
});

/**
 * Hàm reset các trường
 * Dvanh 21/7/2021
 */
function resetPopup() {

    $('input').val("");
}
/**
 * Hàm lấy dữ liệu vị trí cho dropdown
 * Dvanh 21/7/2021
 */
function getPosition() {
    $.ajax({
        url: "http://cukcuk.manhnv.net/v1/Positions",
        method: "GET",
    }).done(res => {
        res.forEach(position => {
            const positionName = position['PositionName'];
            const positionId = position['PositionId'];
            let dropdown = $(".dropdown.dd-Position");
            let item = `<div class="dropdown-item">
            <div class="dropdown-icon"></div>
            <div class="dropdown-text" Value = "${positionId}">${positionName}</div>
            </div>`
            dropdown.append(item);
        })

    })
};

/**
 * Hàm lấy dữ liệu phòng ban cho dropdown
 * Dvanh 21/7/2021
 */
function getDepartment() {
    $.ajax({
        url: "http://cukcuk.manhnv.net/api/Department",
        method: "GET",
    }).done(res => {
        res.forEach(department => {
            const departmentName = department['DepartmentName'];
            const departmentId = department['DepartmentId'];
            let dropdown = $(".dropdown.dd-Department");
            let item = `<div class="dropdown-item">
            <div class="dropdown-icon"></div>
            <div class="dropdown-text" Value = "${departmentId}">${departmentName}</div>
            </div>`
            dropdown.append(item);
        })

    })
};

/**
 * Event ẩn pop up 
 * Dvanh 21/7/2021
 */
$(".head-close, .button.cancel").click(function() {
    $("#popup").hide();
    $(".wrapper").removeClass("fade");
    $(".X").attr("style", "visibility: hidden;")
})

/**
 * reload lại trang
 * Dvanh 21/7/2021
 */
$(".refresh").click(function() {
    location.reload();
})

/**
 * Load ảnh từ máy lên form thêm mới
 * Dvanh 21/7/2021
 */
$('.image').click(function() {
    $('#myFile').trigger('click');
})

$('#myFile').click(function(e) {
    $('#myFile').change(function(e) {
        var img = URL.createObjectURL(e.target.files[0]);
        $('.image').css("background-image", `url(${img})`);
    })
})

/**
 * Hàm lấy all nhân viên từ API
 * Dvanh 21/7/2021
 */
function loadData() {
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Employees',
        method: 'GET',
        dataType: 'json',    
    }).done(function(res){
        res.forEach(employee => {
            var tr = `<tr Value = ${employee.EmployeeId}>
            <td class="employee-id">${employee.EmployeeCode}</td>
            <td class="employee-name">${employee.FullName}</td>
            <td class="employee-gender">${employee.GenderName}</td>
            <td class="employee-dob">${CommonFn.formatDate(employee.DateOfBirth)}</td>
            <td class="employee-phone">${employee.PhoneNumber}</td>
            <td class="employee-email">${employee.Email}</td>
            <td class="employee-role">${employee.PositionName}</td>
            <td class="employee-department">${employee.DepartmentName}</td>
            <td class="employee-wage">${CommonFn.formatMoney(employee.Salary)}</td>
            <td class="employee-status">${employee.WorkStatus}</td>
            </tr>`
            $("table tbody").append(tr);
        });
    }).fail(function(error){
        console.log(error.responseText);
    })
}

/**
 * hàm validate dữ liệu (nhập các trường bắt buộc)
 * Dvanh 21/7/2021
 */
$('input[required]').blur(function() {
    let me = $(this)
    let value = me.val();
    if (value == '') {
        me.css('border', '1px solid red');
        me.attr('title', 'Thông tin này bắt buộc nhập');
    } else {
        me.css('border', '1px solid #bbbbbb');
        me.removeAttr('tittle')
    }
    me.focus(function() {
        me.css("border", "1px solid #01B075");
    })
})


/**
 * Hàm bấp đúp vào tr để lên form sửa 
 * Dvanh 21/7/2021
 */

$("tbody").on("click", "tr", function() {
    let me = $(this),
        employeeId = me.attr("Value");

    // //Load dữ liệu cho vị trí
    // getPosition();

    // //Load dữ liệu cho phòng ban
    // getDepartment();
    $("#popup").show();

    $.ajax({
        url: `http://cukcuk.manhnv.net/v1/Employees/${employeeId}`,
        method: 'GET',
        dataType: 'json',
        
    }).done(function(employee){
            $('#txtEmployeeCode').val(employee.EmployeeCode);
            $('#txtFullName').val(employee.FullName);
            $('#txtDateOfBirth').val(employee.DateOfBirth.slice(0,10));
            $('#txtGender').attr("Value", `${employee.Gender}`);
            $('#txtIdentityNumber').val(employee.IdentityNumber);
            $('#txtIdentityDate').val(employee.IdentityDate.slice(0,10));
            $('#txtIdentityPlace').val(employee.IdentityPlace);
            $('#txtEmail').val(employee.Email);
            $('#txtPhoneNumber').val(employee.PhoneNumber);
            $('#txtPositionName').attr("Value", `${employee.PositionId}`);
            $('#txtPositionName').text(`${employee.PositionName}`);
            $('#txtDepartmentName').attr("Value", `${employee.DepartmentId}`);
            $('#txtDepartmentName').text(`${employee.DepartmentName}`);
            $('#txtPersonalTaxCode').val(employee.PersonalTaxCode);
            $('#txtSalary').val(CommonFn.formatMoney(employee.Salary));
            $('#txtJoinDate').val(employee.JoinDate.slice(0,10));
            $('#txtWorkStatus').attr("Value", `${employee.WorkStatus}`);
    })
    
    $('#btnSave').click(function() {
        const employeeCode = $('#txtEmployeeCode').val();
        const fullName = $('#txtFullName').val();
        const dateOfBirth = $('#txtDateOfBirth').val();
        const gender = $('#txtGender').attr("Value");
        const identityNumber = $('#txtIdentityNumber').val();
        const identityDate = $('#txtIdentityDate').val();
        const identityPlace = $('#txtIdentityPlace').val();
        const email = $('#txtEmail').val();
        const phoneNumber = $('#txtPhoneNumber').val();
        const positionId = $('#txtPositionName').attr("Value");
        const departmentId = $('#txtDepartmentName').attr("Value");
        const personalTaxCode = $('#txtPersonalTaxCode').val();
        const salary = CommonFn.formatNumber($('#txtSalary').val());
        const joinDate = $('#txtJoinDate').val();
        const workStatus = $('#txtWorkStatus').attr("Value");

        let employeeEdit = {
            "employeeCode": employeeCode,
            "fullName": fullName,
            "gender": gender,
            "dateOfBirth": dateOfBirth,
            "phoneNumber": phoneNumber,
            "email": email,
            "identityNumber": identityNumber,
            "identityDate": identityDate,
            "identityPlace": identityPlace,
            "joinDate": joinDate,
            "departmentId": departmentId,
            "positionId": positionId,
            "workStatus": workStatus,
            "personalTaxCode": personalTaxCode,
            "salary": salary
        }
        $.ajax({
            url: `http://cukcuk.manhnv.net/v1/Employees/${employeeId}`,
            method: "PUT",
            data: JSON.stringify(employeeEdit),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
        }).done(res => {
            alert("Sửa thành công");
            loadData();
            $("#popup").hide();
            $(".wrapper").removeClass("fade");

        }).fail(function(res) {
            console.log(res);
        });
    })
})