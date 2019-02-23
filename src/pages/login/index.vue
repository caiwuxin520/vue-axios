<template>
  <div class="login-content">
    <h1>登录</h1>
    <el-form label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="username"></el-input>
      </el-form-item>
       <el-form-item label="密码">
        <el-input v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        username:'',
        password:''
      }
    },
    methods: {
      login() {
         let {username,password} = this
         if(username.trim().length === 0 || password.trim().length === 0){
             return this.$message({
                 showClose:true,
                 type:'error',
                 message:'账户或密码不能为空'
             })
         }

         this.$http.post('users/login',{
             username,
             password
         })
            .then(result => {
                 this.$message({
                    showClose:true,
                    type:'success',
                    message:result.data.succMsg
                })
                localStorage.setItem('token',result.data.data.token) 
                localStorage.setItem('userInfo',JSON.stringify(result.data.data))
                this.$router.push('/home')
            })
      }
    }
  }
</script>

<style lang="less">
    .login-content{
        width: 500px;
        height: 500px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        h1{
            text-align: center;
            line-height: 50px;
            font-size: 20px;
            font-weight: 800;
            color: #409EFF;
        }
    }
</style>
