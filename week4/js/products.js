import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import editmodal from '../components/productModal.js'
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
        productModal:'',
        productsData:[],
        delProductModal:{},
        delProductName:'',
        btn:'',
        editInfo:{}
      };
    },
    components:{
      editmodal
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
        this.btn='';
        axios(`${this.url}/api/${this.api_path}/admin/products/`)
          .then((res)=>{
            if (res.data.success){
              this.productsData=res.data.products
            }
          })
          .catch(err => {
            console.log(err.response);
          })
       },
      editModal(btn,index){
        console.log(btn)
        this.btn='';
        if(btn==='create'){
          this.btn=btn;
          this.productModal.show();
        }else{
          this.btn=btn;
          this.productModal.show();
          this.editInfo={...this.productsData[index]};
          // this.productModal.show();
        }
      },
      delModal(id,title){
        this.delProductName=title;
        if (id==='close'){
          this.delProductModal.hide();
        }else{
          this.productId=id;
          this.delProductModal.show();
        }
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