export default{
        data() {
          return {
            url: 'https://vue3-course-api.hexschool.io',
            api_path:'hua1993',
            tempid:'',
            productData:{}
            // mode:''
          };
        },
        props:[
          "infoId"
        ],
        mounted() {
          this.modal=new bootstrap.Modal(this.$refs.infoModal, {
            keyboard: false
          });
        },
        methods: {
          open(id){
            console.log(id);
            this.modal.show();
            axios(`${this.url}/api/${this.api_path}/product/${id}`)
            .then((res)=>{
              if (res.data.success){
                // console.log(res.data.product)
                this.productData=res.data.product;
              }
            })
            .catch(err => {
              console.log(err.response);
            })
          }
        },
        template: `<div id="productModal2" ref="infoModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
        aria-hidden="true">
     <div class="modal-dialog modal-lg">
       <div class="modal-content border-0">
         <div class="modal-header bg-dark text-white">
           <h5 id="productModalLabel" class="modal-title">
             詳細資訊
           </h5>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
         <div class="row">
         <div class="col-8">
          <div class="card">
            <img :src="productData.imageUrl" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">{{productData.content}}</p>
            </div>
          </div>
         </div>
         <div class="col-4">
            <ul class="list-group">
              <li class="list-group-item">產品名稱 {{productData.title}}</li>
              <li class="list-group-item">種類 {{productData.category}}</li>
              <li class="list-group-item">單位 {{productData.unit}}</li>
              <li class="list-group-item">原價 {{productData.origin_price}}</li>
              <li class="list-group-item">折扣價 {{productData.price}}</li>
            </ul>
         </div>
       </div>
         </div>
       </div>
     </div>
   </div>`
}