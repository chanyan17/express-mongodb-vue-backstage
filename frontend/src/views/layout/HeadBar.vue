<template>
    <div class="container">
        <div class="top">
            <el-col :span="12">
                <span class="menu-switch"></span>
                <span class="current-time">2019-01-03 17:32</span>
                <span class="current-time">周四</span>
            </el-col>
            <el-col :span="12" class="actions">
                <router-link to="/userCenter">
                    <div class="user">
                        <span class="portrait">
                            <img src="http://temp.im/30x30" alt="">
                        </span>
                        <span class="username">admin</span>
                    </div>
                </router-link>
                <router-link to="/login">
                    <span class="logout">退出</span>
                </router-link>
            </el-col>
        </div>
    </div>
</template>
<style lang="less" scoped>
.container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 68px;
    .top {
        width: 100%;
        height: 48px;
        line-height: 48px;
        background-color: #FFF;
        .el-col {
            height: 48px;
            line-height: 48px;
            text-align: left;
        }
        .menu-switch {
            display: inline-block;
            vertical-align: middle;
            margin-left: 20px;
            width: 20px;
            height: 15px;
            background-color: aquamarine;
            cursor: pointer;
        }
        .current-time {
            margin-right: 5px;
            display: inline-block;
            vertical-align: middle;
            color: #979797;
            font-size: 12px;
        }
        .actions {
            text-align: right;
        }
        .user, .logout {
            display: inline-block;
            vertical-align: middle;
            margin-right: 20px;
            color: #606266;
        }
        .portrait {
            display: inline-block;
            vertical-align: middle;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: aqua;
            overflow: hidden;
        }
        .username {
            display: inline-block;
            vertical-align: middle;
            margin-left: 5px;
            color: #606266;
        }
    }
}
</style>