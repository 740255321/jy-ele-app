<template>
  <div class="address">
      <Header title="请选择收货地址" :isLeft="true" ></Header>
      <div class="caty_search">
          <div class="search">
              <span class="city">
                  {{city}}
                  <i class="fa fa-angle-dow"></i>
              </span>
          </div>
      </div>
  </div>
</template>
<script>
import Header from '../components/Header'
export default {
    name:"Address",
    data(){
        return{
            city:"成都",  //当前的城市
            search_val:""
        }
    },
    components:{
        Header
    }
}
</script>

<style scoped>
.address{
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding-top: 45px;
}
</style>