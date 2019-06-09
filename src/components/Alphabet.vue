<template>
    <div class="alphabet">
        <!-- 字母表 -->
        <div class="scroll_wrap">
            <div class="hot_wrap">
                <div class="title">热门城市</div>
                <ul class="hot_city">
                    <p></p>
                    <li v-for="(itme,index) in cityInfo.hotCities" :key="index">{{item.name}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"alphabet",
    // 接收city字母表kyes
    props:{
        cityInfo:Object,
        keys:Array
    },
}
</script>
<style scoped>

</style>
