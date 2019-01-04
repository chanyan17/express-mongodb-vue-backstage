<template>
    <el-container>
        <div class="logo">
            <span class="pic">
                <img src="http://temp.im/40x40" alt="">
            </span>
            <span class="name">Backstage</span>
        </div>
    </el-container>
</template>
<style lang="less" scoped>
    .el-container {
        position: absolute;
        left: 0;
        top: 0;
        padding-left: 20px;
        width: 100%;
        height: 68px;
        line-height: 68px;
        color: #FFF;
        text-align: left;

        div {
            width: 100%;
        }
    }

    .logo {
        .pic {
            display: inline-block;
            vertical-align: middle;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: aliceblue;
            overflow: hidden;
        }
        .name {
            display: inline-block;
            vertical-align: middle;
            margin-left: 10px;
        }
    }
</style>