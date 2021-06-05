import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import editmodal from '../components/productModal.js'
import deletemodal from '../components/deleteModal.js'
import pagination from '../components/pagination.js'

createApp({
    data() {
      return {
        url: 'https://vue3-course-api.hexschool.io',
        api_path:'hua1993',
        page:1,
        pagination:{},
        loginData:{
            username:'',
            password:''
        },
        token:'',
        productModal:'',
        productsData:[],
        delProductModal:{},
        delProductObj:{
          productId:'',
          productName:'',
        },
        btn:'',
        editInfo:{}
      };
    },
    components:{
      editmodal,deletemodal,pagination
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
      getData(item) {
        if (item!==undefined){
          this.page=item;
        }
        ///api/:api_path/admin/products?page=:page
        this.btn='';
        axios(`${this.url}/api/${this.api_path}/admin/products/?page=${this.page}`)
          .then((res)=>{
            if (res.data.success){
              this.productsData=res.data.products;
              this.pagination=res.data.pagination;
              if (this.page>this.pagination.total_pages){
                this.page-=1;
              }
            }
          })
          .catch(err => {
            console.log(err.response);
          })
       },
      editModal(btn,index){
        // console.log(btn)
        this.btn='';
        if(btn==='create'){
          this.btn=btn;
          this.editInfo={};
          this.editInfo['imagesUrl']= [];
          this.editInfo['is_enabled']=0;
          this.productModal.show();
        }else{
          this.btn=btn;
          this.productModal.show();
          
          this.editInfo={...this.productsData[index]};
          if (this.editInfo.imagesUrl===undefined){
            this.editInfo.imagesUrl=[];
          }
          // this.productModal.show();
        }
      },
      delModal(id,title){
        if (id==='close'){
          this.delProductModal.hide();
        }else{
          this.delProductObj.productId=id;
          this.delProductObj.productName=title;
          this.delProductModal.show();
        }
      }
    },
  }).mount('#app');