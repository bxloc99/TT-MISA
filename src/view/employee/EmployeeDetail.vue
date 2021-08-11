<template>
    <div id="popup" v-bind:class="{hide: showDialog}">
        <div class="head">
            <div class="head-text">THÔNG TIN NHÂN VIÊN</div>
            <div class="head-close"></div>
        </div>
        <div class="main">
            <div class="avatar">
                <div class="image"></div>
                <div class="ta-center">(Vui lòng chọn ảnh có định</div>
                <div class="ta-center">dạng</div>
                <div class="ta-center">.jqg,.jepg,.png,.gif.)</div>
                <input class="d-none" type="file" name="" id="myFile">
            </div>
            <div class="info">
                <div class="A">
                    <div>A. THÔNG TIN CHUNG:</div>
                    <div class="line"></div>
                    <div class="row mt-8">
                        <div class="col">
                            <label for="">Mã nhân viên<span class="cl-red">(*)</span></label><br>
                            <input v-model="employee.EmployeeCode" type="text" fieldName="EmployeeCode" class="textbox-default" id="txtEmployeeCode" required>
                        </div>
                        <div class="col">
                            <label for="">Họ và tên<span class="cl-red">(*)</span></label><br>
                            <input v-model="employee.FullName" type="text" fieldName="FullName" class="textbox-default" id="txtFullName" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="">Ngày sinh</label><br>
                            <input v-model="employee.DateOfBirth" type="date" fieldName="DateOfBirth" class="textbox-default" id="txtDateOfBirth">
                        </div>
                        <div class="col">
                            <label for="">Giới tính</label><br>
                            <select v-model="employee.Gender" class="textbox-default" fieldName="Gender">
                                <option value="">Nam</option>
                                <option value="">Nữ</option>
                            </select>
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="">Số CMTND/ Căn cước<span class="cl-red">(*)</span></label><br>
                            <input v-model="employee.IdentityNumber" type="text" fieldName="IdentityNumber" class="textbox-default" id="txtIdentityNumber" required>
                        </div>
                        <div class="col">
                            <label for="">Ngày cấp</label><br>
                            <input v-model="employee.IdentityDate" type="date" fieldName="IdentityDate" class="textbox-default" id="txtIdentityDate">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="">Nơi cấp</label><br>
                            <input v-model="employee.IdentityPlace" type="text" fieldName="IdentityPlace" class="textbox-default" id="txtIdentityPlace">
                        </div>

                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="">Email<span class="cl-red">(*)</span></label><br>
                            <input v-model="employee.Email" type="text" fieldName="Email" class="textbox-default" id="txtEmail" required>
                        </div>
                        <div class="col">
                            <label for="">Số điện thoại<span class="cl-red">(*)</span></label><br>
                            <input v-model="employee.PhoneNumber" type="text" fieldName="PhoneNumber" class="textbox-default" id="txtPhoneNumber" required>
                        </div>
                    </div>
                </div>
                <div class="B">
                    <div>B.THÔNG TIN CÔNG VIỆC</div>
                    <div class="line"></div>
                    <div class="row mt-8">
                        <div class="col">
                            <label for="">Vị trí</label><br>
                            <select v-model="employee.PositionId" id="txtPositionName" api="v1/Positions" class="textbox-default" fieldId="PositionId" fieldName="PositionName">
                                <option v-for="position in positions" :key="position.PositionId" :value="position.PositionId">{{position.PositionName}}</option>
                            </select>
                        </div>
                        <div class="col">
                            <label for="">Phòng ban</label><br>
                            <select v-model="employee.DepartmentId" id="txtDepartmentName" api="api/Department" class="textbox-default" fieldId="DepartmentId" fieldName="DepartmentName">
                                <option v-for="department in departments" :key="department.DepartmentId" :value="department.DepartmentId">{{department.DepartmentName}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="">Mã số thuế cá nhân</label><br>
                            <input v-model="employee.PersonalTaxCode" fieldName="PersonalTaxCode" type="text" class="textbox-default" id="txtPersonalTaxCode">
                        </div>
                        <div class="col">
                            <label for="">Mức lương cơ bản</label><br>
                            <input v-model="employee.Salary" fieldName="Salary" type="text" id="txtSalary" class="textbox-default ta-r pd-19" maxlength="10">
                            <div class="currency">
                                (VNĐ)
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="">Ngày gia nhập công ty</label><br>
                            <input v-model="employee.JoinDate" fieldName="JoinDate" type="date" class="textbox-default" id="txtJoinDate">
                        </div>
                        <div class="col">
                            <label for="">Tình trạng công việc</label><br>
                            <div class="select">
                                <div class="inp" id="txtWorkStatus" Value="0">Đang làm việc</div>
                                <div class="X"></div>
                                <div class="select-arrow rot-0"></div>
                            </div>
                            <div class="dropdown d-none">
                                <div class="dropdown-item">
                                    <div class="dropdown-icon"></div>
                                    <div class="dropdown-text" Value="1">Đã nghỉ việc</div>
                                </div>
                                <div class="dropdown-item">
                                    <div class="dropdown-icon"></div>
                                    <div class="dropdown-text" Value="2">Nghỉ có phép</div>
                                </div>
                                <div class="dropdown-item">
                                    <div class="dropdown-icon"></div>
                                    <div class="dropdown-text" Value="3">Nghỉ không phép</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot">
            <button class="button save" v-on:click="btnSave" id="btnSave">Lưu</button>
            <button v-on:click="cancelDialog" class="button cancel" id="btnCancel">Hủy</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'EmployeeDetail',
    props: {
        hideDialog: {
            type: Boolean,
            default: true
        },
        EmployeeId: {
            type: String,
            default: ''
        },
        btnType: {
            type: Number,
            default: 0
        },
        checked: {
            type: Number,
            default: 0
    }
    },
    data(){
        return{
            employee: {},
            positions: {},
            departments: {}
        };
    },
    created() {
        axios
        .get('http://cukcuk.manhnv.net/v1/Positions')
        .then(response =>{
            this.positions = response.data;
        }),
        axios
        .get('http://cukcuk.manhnv.net/api/Department')
        .then(response =>{
            this.departments = response.data;
        })
    },
    methods: {
        cancelDialog(){
            var data = {
                hideDialog: true,
            }
            this.$emit('changeEvent', data);
        },

        loadData(){
            var data = {
                btnType: 3
            }
            this.$emit('loadData', data);
        },

        setMessage(title, type){
            var data = {
                show: type,
                message: title
            }
            this.$emit('setMessage', data);
        },

        btnSave(){
            let me = this;
            me.setMessage('', false);
            if(this.btnType === 2){
                console.log('update');
                console.log(this.employee);

                axios
                .put('http://cukcuk.manhnv.net/v1/Employees/' + this.EmployeeId, this.employee)
                .then(function(res){
                    console.log(res);
                    me.cancelDialog();
                    me.setMessage('Sửa thành công', true);
                    me.loadData();
                })
            }
            else if(this.btnType === 1) {
                console.log(this.employee)
                axios
                .post('http://cukcuk.manhnv.net/v1/Employees', this.employee)
                .then(function(res){
                    console.log(res);
                    me.cancelDialog();
                    me.setMessage('Thêm thành công', true);
                    me.loadData();
                })
            }
        }
    },
    watch: {
        btnType(){ 
            if(this.btnType === 2){
                axios
                .get('http://cukcuk.manhnv.net/v1/Employees/' + this.EmployeeId)
                .then(response =>{
                    this.employee = response.data;
                })
            }
            else{
                axios
                .get('http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode')
                .then(response =>{
                    var obj = {};
                    obj.EmployeeCode = response.data;
                    this.employee = obj;
                })
            }
        },
        // getPositionId(){

        // }
    },
    computed: {
        showDialog(){
            return this.hideDialog;
        },
        // getPositionId(){
        //     return this.employee.PositionId;
        // }
    }
}
</script>
<style scoped>
    
</style>
