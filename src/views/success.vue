<template>
    <div class="apply">
        <div class="header">
            <img :src="img1" alt="" />
        </div>
        <div class="content">
            <div class="success">
                <div class="icon"><van-icon name="success" /></div>
                <p>报名成功</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import getAssetsFile from '../util/getAssetsFile'
    const img1 = getAssetsFile('logo.png')
</script>

<style scoped lang="scss">
    .apply {
        .header {
            background-color: #fff;
            box-shadow: 0 2px 4px #e5e5e580;
            height: 60px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px;

            img {
                width: 250px;
                height: auto;
            }
        }
        .content {
            margin-top: 20px;
            width: 100%;
            height: 200px;
            // background-color: #fff;
            // box-shadow: 0 2px 4px #e5e5e580;
            display: flex;
            align-items: center;
            justify-content: center;
            .success {
                .icon {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .van-icon {
                        color: white;
                        background-color: #1f883d;
                        padding: 10px;
                        border-radius: 50%;
                    }
                }

                p {
                    margin-top: 20px;
                    width: 100%;
                    text-align: center;
                    color: gray;
                }
            }
        }
    }
</style>
