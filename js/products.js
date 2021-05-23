import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
// let productModal = null;
createApp({
    data() {
      return {
        url: 'https://vue3-course-api.hexschool.io',
        api_path:'hua1993',
        page:'1',
        loginData:{
            username:'',
            password:''
        },
        token:'',
        productsData:[],
        mode:'',
        productModal:{},
        delProductModal:{},
        productId:'',
        productInfo:{
          imagesUrl: [],
          is_enabled:0
        },
        imagesUrl:[]
      };
    },
    mounted() {
      this.productModal = new bootstrap.Modal(document.getElementById('productModal'), {
        keyboard: false
      });
      this.delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
        keyboard: false
      });
      this.token=document.cookie.replace(/(?:(?:^|.*;\s*)mytoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = this.token;
      this.getData();
      
    },
    methods: {
      getData() {
        ///api/:api_path/admin/products?page=:page
        axios(`${this.url}/api/${this.api_path}/admin/products/?page=${this.page}`)
          .then((res)=>{
            if (res.data.success){
              this.productsData=res.data.products
            }
          })
          .catch(err => {
            console.log(err.response);
          })
       },
      editModal(mode,index){
        this.mode=mode
        if(mode==='create'){
          this.productInfo={};
          this.productInfo.imagesUrl= [];
          this.productInfo.is_enabled=0;
          this.productModal.show();
        }else{
          this.productId=this.productsData[index].id;
          this.productInfo={...this.productsData[index]};
          this.productModal.show();
        }
      },
      delModal(id){
        if (id==='close'){
          this.delProductModal.hide();
        }else{
          this.productId=id;
          this.delProductModal.show();
        }
      },
      processingflow(){
        if(this.mode==='create'){
          this.createProducet()
        }else if(this.mode==='edit'){
          this.updateProducet()
        }
      },
      createProducet(){
        axios.post(`${this.url}/api/${this.api_path}/admin/product`,{ "data": this.productInfo})
        .then((res)=>{
          if (res.data.success){
            alert(res.data.message);
            this.productModal.hide();
            this.getData();
          }else{
            console.log(res.data.message[0]);
          }
          // this.data.productsData=res.data.products;      
        })
        .catch(err => {
          console.log(err.response);
        })
      },
      updateProducet(){
        axios.put(`${this.url}/api/${this.api_path}/admin/product/${this.productId}`,{ "data": this.productInfo})
        .then((res)=>{
          if (res.data.success){
            alert(res.data.message);
            this.productModal.hide();
            this.getData();
          }else{
            console.log(res.data.message[0]);
          }
          // this.data.productsData=res.data.products;      
        })
        .catch(err => {
          console.log(err.response);
        })
      },
      deleteProducet(){
        axios.delete(`${this.url}/api/${this.api_path}/admin/product/${this.productId}`)
          .then((res)=>{
            // console.log(res);
            alert(res.data.message);
            if (res.data.success){
              this.delProductModal.hide();
              this.getData();
            }
          })
          .catch(err => {
            console.log(err.response);
          })
      },
      addImage(){
        if (this.imagesUrl!==''){
          this.productInfo.imagesUrl.push(this.imagesUrl);
          this.imagesUrl='';
        }
      },
      delImage(index){
        this.productInfo.imagesUrl.splice(index, 1);
      }

    },
  }).mount('#app');