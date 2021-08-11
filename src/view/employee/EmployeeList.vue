<template>
    <tbody>
        <tr v-on:dblclick="showBtnEdit($event)" v-for="employee in employees" :key="employee.EmployeeId">
            <td>{{employee.EmployeeCode}}</td>
            <td>{{employee.FullName}}</td>
            <td>{{employee.GenderName}}</td>
            <td>{{employee.DateOfBirth}}</td>
            <td>{{employee.PhoneNumber}}</td>
            <td>{{employee.Email}}</td>
            <td>{{employee.PositionName}}</td>
            <td>{{employee.DepartmentName}}</td>
            <td>{{employee.Salary}}</td>
            <td>{{employee.WorkStatus}}</td>    
        </tr>
    </tbody>
</template>
<script>
import axios from 'axios'
export default {
    name: 'EmployeeList',
    data(){
        return{
            employees: null,
            // btnType: 0
        }
    },
    props: {
        hideDialog: {
            type: Boolean,
            default: true
        },
        btnType: {
            type: Number,
            default: 0
        }
    },
    created () {
        axios
        .get('http://cukcuk.manhnv.net/v1/Employees')
        .then(response =>{
            this.employees = response.data;
        })
    },
    methods: {
        showDialog(EmployeeId){
            var data = {
                hideDialog: false,
                EmployeeId: EmployeeId,
                btnType : 2
            }
            this.$emit('changeEvent', data);
        },
        showBtnEdit(e){
            // console.log(e.pageX);
            this.$emit('btnEdit', e);
        }
    },
    watch: {
        btnType(){
            if(this.btnType === 3){
                axios
                .get('http://cukcuk.manhnv.net/v1/Employees')
                .then(response =>{
                    this.employees = response.data;
                })
            }
        }
    }
}
</script>
<style scoped>
</style>
