<template>
    <div class="city">
        <div class="search_wrap">
            <div class="search">
                <i class="fa fa-search"></i>
                <input type="text" placeholder="输入城市名" v-model="city_val">
            </div>
            <button @click="$router.push({name:'address',params:{city:city}})">取消</button>
        </div>
        <div style="height:100%" v-if="searchList.length == 0">
            <div class="location">
                <Location :address="city" @click="selectCity({name:city})"/>
            </div>
            <Alphabet @selectCity="selectCity" ref="allcity" :cityInfo="cityInfo" :keys="keys" />
        </div>
        <div class="search_list" v-else>
          <ul>
            <li @click="selectCity(item)" v-for="(item,index) in searchList" :key="index">{{item.name}}</li>
          </ul>
        </div>
    </div>   
</template>
<script>
import Location from '../components/Location'
import Alphabet from '../components/Alphabet'
export default {
    name:"city",
    data(){
        return{
            city_val:"",
            cityInfo:null,
            keys:[],
            allCities:[],
            searchList:[]
        }
    },
    components:{
        Location,
        Alphabet
    },
    computed:{
      city(){
        // 获取城市或省份
        return this.$store.getters.location.addressComponent.city || this.$store.getters.location.addressComponent.province
      }
    },
    watch:{
      city_val(){
        // console.log(this.city_val)  监听city_val
        this.searchCity()  //查询city
      }
    },
    created(){
        this.getCityInfo()
    },
    methods:{
        getCityInfo(){
            this.$axios("/api/posts/cities")
            .then(res => {
                console.log(res)
                this.cityInfo = res.data
                // 获取keys
                this.keys = Object.keys(res.data)
                // 移除keys中最后一个hotCities
                this.keys.pop()
                // 排序
                this.keys.sort()
                this.$nextTick(() => {
                  this.$refs.allcity.initScroll()
                })
                // 存储所有城市,用来搜索过滤
                this.keys.forEach(key => {
                    // console.log(key)    //打印A-Z
                    // console.log(this.cityInfo) 
                    this.cityInfo[key].forEach(city =>{
                      // console.log(city)  //打印所有的城市
                      this.allCities.push(city)
                    })
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        // 点击城市获取对应的地址信息
        selectCity(city){
          this.$router.push({ name: "address", params: { city: city.name} });
        },
        // 查询city
        searchCity(){
          if(!this.city_val){
            // 如果搜索框为空 数组置空
            this.searchList = []
          }else{
            // 根据输入框的关键字检索城市,并存入searchList数组中
            this.searchList = this.allCities.filter(item => {
              return item.name.indexOf(this.city_val) != -1
            })
            // console.log(this.searchList)  打印匹配输入关键字城市
          }
        }
    }
}
</script>
<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap button {
  outline: none;
  color: #009eef;
}
.location {
  background: #fff;
  padding: 8px 16px;
  height: 65px;
  box-sizing: border-box;
}
.search_list {
  background: #fff;
  padding: 5px 16px;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
} 

</style>
