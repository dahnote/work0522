export default{
        data() {
          return {
            url: 'https://vue3-course-api.hexschool.io',
            api_path:'hua1993',
          };
        },
        props:[
          "delProductModal","delProductObj"
        ],
        mounted() {
        },
        watch: {
        },
        methods: {
          deleteProducet(){
            axios.delete(`${this.url}/api/${this.api_path}/admin/product/${this.delProductObj.productId}`)
              .then((res)=>{
                // console.log(res);
                alert(res.data.message);
                if (res.data.success){
                  this.delProductModal.hide();
                  this.$emit('refesh');
                }
              })
              .catch(err => {
                console.log(err.response);
              })
          },
          close(){
            this.delProductModal.hide();
          }
        },
        template: ` <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
        aria-labelledby="delProductModalLabel" aria-hidden="true">
     <div class="modal-dialog">
       <div class="modal-content border-0">
         <div class="modal-header bg-danger text-white">
           <h5 id="delProductModalLabel" class="modal-title">
             <span>刪除產品</span>
           </h5>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
           是否刪除
           <strong class="text-danger">{{delProductObj.productName}}</strong> 商品(刪除後將無法恢復)。
         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"  @click="close">
             取消
           </button>
           <button type="button" class="btn btn-danger" @click="deleteProducet">
             確認刪除
           </button>
         </div>
       </div>
     </div>
   </div>`
}