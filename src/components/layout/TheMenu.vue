<template>
  <div class="menu">
        <div class="menu-item">
            <div class="menu-item-icon dashboard"></div>
            <div class="menu-item-text">Tổng quan</div>
        </div>
        <div class="menu-item">
            <div class="menu-item-icon report"></div>
            <div class="menu-item-text">Báo cáo</div>
        </div>
        <div class="menu-item">
            <div class="menu-item-icon buy"></div>
            <div class="menu-item-text">Mua hàng</div>
        </div>
        <div class="menu-item">
            <div class="menu-item-icon employee"></div>
            <div class="menu-item-text">Danh mục nhân viên</div>
        </div>
        <div class="menu-item">
            <div class="menu-item-icon employee"></div>
            <div class="menu-item-text">Danh mục khách hàng</div>
        </div>
        <div class="menu-item">
            <div class="menu-item-icon setting"></div>
            <div class="menu-item-text">Thiết lập hệ thống</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Menu',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import '../../css/layout/menu.css';
</style>
