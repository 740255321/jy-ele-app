<template>
  <div class="text_group">
        <!-- 组件结构 -->
        <!-- 组件容器 -->
        <div class="input_group" :class="{'is-invalid':error}">
            <!-- 输入框 -->
            <input  
            :type="type" 
            :value="value" 
            :placeholder="placeholder" 
            :name="name"
            @input="$emit('input',$event.target.value)"
             >
             <!-- 输入框中的验证码按钮 -->
             <button 
             v-if="btnTitle"     
             :disabled="disabled" 
             @click="$emit('btnClick')"
             >
                 {{btnTitle}}
             </button>
             <!-- 验证码错误提示 -->   
        </div>
        <div v-if="error" class="invalid-feedback">
                {{error}}
        </div>
  </div>
</template>
<script>
export default {
    name:"input_group",
    props:{             //创建组件属性
        // 组件类型
        type:{
            type:String,
            default:"text"
        },
        // 组件value值
        value:String,
        placeholder:String,
        name:String,
        btnTitle:String, //是否拥有获取验证码
        disabled:Boolean, //按钮是否可用
        error:String   //错误提示
    }
}
</script>
<style scoped>
.input_group{
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.input_group input {
  height: 100%;
  width: 60%;
  outline: none;
  border: none;
}
.input_group button{
    border: none;
    outline: none;
    background: #fff;
}
.input_group button[disabled] {
  color: #aaa;
}
.is-invalid{
    border: 1px solid red;
}
.invalid-feedback{
    color: red;
    padding-top: 5px
}

</style>
