<template>
  <div>
      <div class="title">当前定位</div>
      <div class="des">
          <i class="fa fa-location-arrow">
              <span>{{address}}</span>
          </i>
      </div>
  </div>
</template>
<script>
export default {
    name:"location",
    props:{
        address:String,
    }
}
</script>

<style scoped>
.title {
  margin: 10px 0;
  font-size: 12px;
}
.des{
  color: #333;
  overflow: hidden; 
}
.des i::before{
  color: #009eef;
}
.des i span{
  color: #333;
  font-weight: bold;
  margin-left: 5px;
  /* display: inline-block; */
  width: 90%;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>