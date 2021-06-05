import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import infomodal from '../components/infomodal.js'
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
        productModal:'',
        productsData:[],
        delProductModal:{},
        delProductObj:{
          productId:'',
          productName:'',
        },
        btn:'',
        infoId:''
      };
    },
    components:{
      infomodal,pagination
    },
    mounted() {
      this.getData(); 
    },
    methods: {
      getData(item) {
        if (item!==undefined){
          this.page=item;
        }
        ///api/:api_path/admin/products?page=:page
        this.btn='';
        axios(`${this.url}/api/${this.api_path}/products/?page=${this.page}`)
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
        this.infoId=this.productsData[index].id;
        this.$refs.infoComponent.open();
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