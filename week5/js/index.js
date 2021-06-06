import infomodal from '../components/infomodal.js'
import pagination from '../components/pagination.js'

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});

Vue.createApp({
    data() {
      return {
        url: 'https://vue3-course-api.hexschool.io',
        api_path:'hua1993',
        page:1,
        pagination:{},
        productsData:[],
        cartData:[],
        final_total:0,      
        infoId:'',
        user: {
            name: '',
            email: '',
            tel: '',
            address: '',
        },
        message: ""
      }
    },
    components:{
      infomodal,pagination,
      VForm: Form,
      VField: Field,
      ErrorMessage: ErrorMessage,
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
              this.cartData=res.data.data.carts;
              this.final_total=res.data.data.final_total;
            }else{
              alert(res.data.message); 
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
            alert(res.data.message);          
          }
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
      editModal(index){
        this.infoId=this.productsData[index].id;
        this.$refs.infoComponent.open(this.infoId);
      },
      onSubmit(){
        const postData={ "user": this.user,"message":this.message};
        axios.post(`${this.url}/api/${this.api_path}/order`,{ "data":postData })
        .then((res)=>{
          if (res.data.success){
            alert(res.data.message);
            this.$refs.order.resetForm();
          }else{
            alert(res.data.message);          
          }
        })
        .catch(err => {
          console.log(err.response);
        })
      }
    },
  }).mount('#app');
