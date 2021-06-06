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
        productsData:[],
        cartData:[],
        infoId:''
      };
    },
    components:{
      infomodal,pagination
    },
    mounted() {
      this.getData();
      this.getCart();
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
      getCart(){
        axios(`${this.url}/api/${this.api_path}/cart`)
          .then((res)=>{
            if (res.data.success){
              // console.log(res.data);
              this.cartData=res.data.data.carts;
            }
          })
          .catch(err => {
            console.log(err.response);
          })
      },
      addCart(id){
        // console.log(id);
        const postData={ product_id: id,"qty":1};
        axios.post(`${this.url}/api/${this.api_path}/cart`,{ "data":postData })
        .then((res)=>{
          if (res.data.success){
            alert(res.data.message);
            this.getCart();
          }else{
            this.alertMessage=res.data.message[0];
          }
          // this.data.productsData=res.data.products;      
        })
        .catch(err => {
          console.log(err.response);
        })
      },
      updataCart(index){
        // if (this.cartData[index])
        const postData={ product_id: this.cartData[index].id,"qty":this.cartData[index].qty};
        axios.put(`${this.url}/api/${this.api_path}/cart/${this.cartData[index].id}`,{ "data":postData })
        .then((res)=>{
          if (res.data.success){
            alert(res.data.message);
            this.getCart();
          }else{
            alert(res.data.message);
          }
          // this.data.productsData=res.data.products;      
        })
        .catch(err => {
          console.log(err.response);
        })
      },
      deleteItem(id){
        axios.delete(`${this.url}/api/${this.api_path}/cart/${id}`)
        .then((res)=>{
          // console.log(res);
          if (res.data.success){
            alert(res.data.message);
            this.getCart();
          }else{
            alert(res.data.message);
          }
        })
        .catch(err => {
          console.log(err.response);
        })
      },
      editModal(btn,index){
        this.infoId=this.productsData[index].id;
        this.$refs.infoComponent.open();
      }
    },
  }).mount('#app');