<template>
  <div class="content">
    <div class="content-header">
        <div class="title">Danh sách nhân viên</div>
        <div class="button" v-on:click="addEmployee" id="btnAdd">
            <div class="button-icon"></div>
            <div class="button-text">Thêm nhân viên</div>
        </div>
    </div>
    <div class="filter">
        <div class="d-flex">
            <div class="d-flex p-relative">
                <input class="field-input-icon" type="text" id="searchfield" placeholder="Tìm theo mã, Tên hoặc Số điện thoại" />
                <div class="input-clear-icon"></div>
            </div>
            <div class="department">
                <select id="txtDepartment"  api="api/Department" class="select" fieldId="DepartmentId" fieldName="DepartmentName">
                    <option class="inp" id="inp" selected hidden>Vị trí</option>
                </select>
            </div>
            <div class="position">
                <select id="txtPositionName"  api="v1/Positions" class="select" fieldId="PositionId" fieldName="PositionName">
                    <option class="inp" id="inp" selected hidden>Tất cả phòng ban</option>
                </select>
            </div>
        </div>
        <div class="refresh"></div>
    </div>
    <div id="gridEmployee">
        <table>
            <thead>
                <tr>
                    <th fieldName="EmployeeCode">Mã nhân viên</th>
                    <th fieldName="FullName">Họ và tên</th>
                    <th fieldName="GenderName">Giới tính</th>
                    <th fieldName="DateOfBirth" formatType="ddmmyyyy">Ngày sinh</th>
                    <th fieldName="PhoneNumber">Điện thoại</th>
                    <th fieldName="Email">Email</th>
                    <th fieldName="PositionName">Chức vụ</th>
                    <th fieldName="DepartmentName">Phòng ban</th>
                    <th fieldName="Salary" formatType="MoneyVND">Mức lương cơ bản</th>
                    <th fieldName="WorkStatus">Tình trạng công việc</th>
                </tr>
            </thead>
            <EmployeeList v-bind:hideDialog='hideDialog'
            v-bind:btnType='btnType'
            v-on:btnEdit='btnEdit'
            v-on:changeEvent='handleShowDialog'/>
        </table>
    </div>
    <div class="page-navigator">
        <div class="ml-10" id="div1-paging"></div>
        <div class="paging">
            <div class="btn common-page first-page"></div>
            <div class="btn common-page prev-page"></div>
            <div class="btn page-number">1</div>
            <div class="btn page-number">2</div>
            <div class="btn page-number">3</div>
            <div class="btn page-number">4</div>
            <div class="btn common-page next-page"></div>
            <div class="btn common-page last-page"></div>
        </div>
        <div class="mr-10" id="div2-paging">10 nhân viên/trang</div>
    </div>
    <EmployeeDetail 
    v-bind:hideDialog='hideDialog'
    v-bind:EmployeeId='EmployeeId'
    v-bind:btnType='btnType'
    v-on:setMessage='setMessage'
    v-on:loadData='loadData'
    v-on:changeEvent='handleShowDialog'/> 
    <Report 
    v-bind:show='show'
    v-bind:message='message'
    />
    <div class="button-edit" id="abc">
        <button class="update" id="btnUpdate">Sửa</button>
        <button class="delete" id="btnDelete">Xóa</button>
    </div>
</div>
</template>

<script>
import Report from '../../components/base/BaseReport.vue'
import EmployeeList from '../../view/employee/EmployeeList.vue'
import EmployeeDetail from '../../view/employee/EmployeeDetail.vue'
export default {
  name: 'Content',
  components: {
    EmployeeList,
    EmployeeDetail,
    Report
  },
  data(){
    return{
        hideDialog: true,
        EmployeeId: '',
        btnType: 0,
        message: '',
        show: false
    }
  },
  methods: {
    handleShowDialog(e){
        this.hideDialog = e.hideDialog;
        this.EmployeeId = e.EmployeeId;
        this.btnType = e.btnType;
    },
    addEmployee(){
        this.hideDialog = false;
        this.btnType = 1;
    },
    loadData(e){
        this.btnType = e.btnType;
    },
    setMessage(e){
        this.message = e.message;
        this.show = e.show;
        console.log(this.message);
        console.log(this.show)
    },
    btnEdit(e){
        console.log(e);
        var a = document.getElementById('abc');

        // document.getElementsByClassName('button-edit').css({'top':e.pageY-50,'left':e.pageX, 'position':'absolute', 'padding':'5px'});
        // document.getElementsByClassName('button-edit').show();
        a.style.position = 'absolute';
        a.style.padding = '5px';
        a.style.display = 'block';
        a.style.top = '50';
        a.style.left = '60';
        // console.log(a);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import '../../css/layout/content.css';
</style>
