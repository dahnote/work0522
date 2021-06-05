import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
createApp({
    data() {
      return {
        url: 'https://vue3-course-api.hexschool.io/',
        loginData:{
            username:'',
            password:''
        }
      };
    },
    methods: {
      login() {
        if (this.loginData.username!=='' & this.loginData.username!==''){
          axios.post(`${this.url}admin/signin`,this.loginData)
            .then((res)=>{
              if (res.data.success){
                  alert(res.data.message);
                  const [token,expired]=[res.data.token,res.data.expired];
                  // const expired=res.data.expired;
                  document.cookie = `mytoken=${token}; expires=${new Date(expired)}`;
                  window.location = './html/products.html';
              }else{
                  alert(res.data.message);
              }
            })
            .catch(err => {
              console.log(err.response);
            })
        }
      }
    },
  }).mount('#app');