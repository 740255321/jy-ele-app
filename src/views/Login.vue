<template>
  <div class="login">
      <div class="logo">
        <img src="../assets/logo.jpg" alt="logo">
      </div>
      <!-- 手机号 -->
      <InputGroup
        type="number"
        v-model="phone"
        placeholder="手机号"
        :btnTitle="btnTitle"
        :disabled="disabled"
        :error="errors.phone"
        @btnClick="getVerifyCode"  
      />
      <!-- 验证码 -->
      <InputGroup
        type="number"
        v-model="verifyCode"
        placeholder="验证码"
        :error="errors.code"
      />
      <!-- 用户服务协议 -->
      <div class="login_des">
        <p>
          新用户登录即自动注册,表示已同意
          <span>《用户服务协议》</span>
        </p>
      </div>
      <!-- 登录按钮 -->
      <div class="login_btn">
        <button :disabled="isClick" @click="handleLogin">登录</button>
      </div>
  </div>
</template>
<script>
import InputGroup from '../components/InputGroup'
export default {
    name:"login",
    components:{
      InputGroup
    },
    data(){
      return{
        phone:"", //手机号
        verifyCode:"", //验证码
        errors:{}, //验证错误提示
        btnTitle:"获取验证码",  //验证码按钮
        disabled:false  //验证码是否可用
      }
    },
    computed:{                                                                   
      isClick(){
        if(!this.phone || !this.verifyCode) return true ;                           
        else return false;
      }
    },

    methods:{
      handleLogin(){
        // 取消错误提醒
        this.errors = {}
        // if(!/^1[345678]\d{9}$/.test(this.phone)){
        //   this.errors = {
        //     phone:"请填写正确手机号"
        //   }
        //   return false
        // }else{
            // 发送请求
          this.$axios
            .post("/api/posts/sms_send",{
              phone:this.phone,
              code:this.verifyCode
          })
          .then(res => {
            console.log(res)
            // 验证成功 设置登录状态并且跳转到
              localStorage.setItem("ele_login",true)
              alert("登录成功")
              this.$router.push("/")
          })
          .catch(err => {
            // 返回错误信息
            this.errors = {
              code : err.response.data.msg
            }
          })
        // }
      },
      getVerifyCode(){      //获取验证码方法
        if(this.validatePhone()){
          this.validateBtn() //倒计时函数
          // 如果手机号合法-发送网络请求
          this.$axios
            .post("/api/posts/sms_send",{
              tpl_id:"162681",
              key:"e19524a44e533939bd4026d19456c7f4",
              phone:this.phone
          })
          .then(res=>{
            console.log(res)
          })
        }
      },
      validateBtn(){
        let time = 60
        let timer = setInterval(()=>{
          if(time == 0){
            clearInterval(timer)
            this.disabled = false
            this.btnTitle = "获取验证码"
          }else{
            // 倒计时
            this.btnTitle = time + "秒后重发"
            this.disabled = true
            time--
          }
        },1000)
      },
      validatePhone(){
        // 验证手机号是否合法
        if(!this.phone){
           this.errors = {
             phone:"手机号码不能为空"
           }
           return false
        }else if(!/^1[345678]\d{9}$/.test(this.phone)){
          this.errors = {
            phone:"请填写正确手机号"
          }
          return false
        }else{
          // 手机号合法
          this.errors = {}
          return true
        }
      }
    }
}
</script>
<style scoped>
    .login{
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;
        background: #fff;
    }
    .logo{
        text-align: center;
    }
    .logo img{
        width: 150px;
    }
    .text_group,
    .login_des,
    .login_btn {
        margin-top: 20px;
    }
    .login_des {
        color: #aaa;
        line-height: 22px;
    }
    .login_des span {
        color: #4d90fe;
    }
    .login_btn button {
        width: 100%;
        height: 40px;
        background-color: #48ca38;
        border-radius: 4px;
        color: white;
        font-size: 14px;
        border: none;
        outline: none;
    }
    .login_btn button[disabled] {
        background-color: #8bda81;
    }
</style>


