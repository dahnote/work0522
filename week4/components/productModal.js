export default{
        data() {
          return {
            url: 'https://vue3-course-api.hexschool.io',
            api_path:'hua1993',
            imagesUrl:'',
            productInfo:{},
            productId:'',
            alertMessage:'',
            // mode:''
          };
        },
        props:[
          "mode","productModal","editInfo"
        ],
        mounted() {
        },
        watch: {
          editInfo(){
            this.imagesUrl='';
            this.alertMessage='';
            this.productInfo={...this.editInfo};
          }
        },
        methods: {
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
                this.$emit('refesh');
                this.alertMessage='';
              }else{
                this.alertMessage=res.data.message[0];
              }
              // this.data.productsData=res.data.products;      
            })
            .catch(err => {
              console.log(err.response);
            })
          },
          updateProducet(){
            axios.put(`${this.url}/api/${this.api_path}/admin/product/${this.productInfo.id}`,{ "data": this.productInfo})
            .then((res)=>{
              if (res.data.success){
                alert(res.data.message);
                this.productModal.hide();
                this.$emit('refesh');
                this.alertMessage='';
              }else{
                this.alertMessage=res.data.message[0];
              }
              // this.data.productsData=res.data.products;      
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
        template: `<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
        aria-hidden="true">
        <div v-if="alertMessage!==''" class="alert alert-danger" role="alert">
         {{alertMessage}}
       </div>
     <div class="modal-dialog modal-xl">
       <div class="modal-content border-0">
         <div class="modal-header bg-dark text-white">
           <h5 id="productModalLabel" class="modal-title">
             <span v-if="mode==='create'">????????????</span>
             <span v-else-if="mode==='edit'">????????????</span>
           </h5>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
           <div class="row">
             <div class="col-sm-4" style="overflow: auto;height: 400PX;">
               <div class="mb-1">
                 <div class="form-group">
                   <label for="imageUrl">????????????</label>
                   <input type="text" class="form-control"
                          placeholder="?????????????????????"
                          v-model="productInfo.imageUrl">
                 </div>
               </div>
               <img class="img-fluid" :src="productInfo.imageUrl" alt="">
               <div class="mb-1">
                 <div class="form-group">
                   <label for="imageUrl">?????????????????????</label>
                   <input type="text" class="form-control"
                          placeholder="?????????????????????"
                          v-model="imagesUrl">
                 </div>
               </div>
               <div>
                 <button class="btn btn-outline-primary btn-sm d-block w-100" @click="addImage">
                   ????????????
                 </button>
               </div>
               <div v-for="(itmm,index) in productInfo.imagesUrl" :key="index">
                 <img class="img-fluid" :src="itmm" alt="">
                 <button class="btn btn-outline-danger btn-sm d-block w-100" @click="delImage(index)">
                   ????????????
                 </button>
               </div>
             </div>
             <div class="col-sm-8">
               <div class="form-group">
                 <label for="title">??????</label>
                 <input v-model="productInfo.title" id="title" type="text" class="form-control" placeholder="???????????????">
               </div>

               <div class="row">
                 <div class="form-group col-md-6">
                   <label for="category">??????</label>
                   <input v-model="productInfo.category" id="category" type="text" class="form-control"
                          placeholder="???????????????">
                 </div>
                 <div class="form-group col-md-6">
                   <label for="price">??????</label>
                   <input v-model.number="productInfo.unit" id="unit" type="text" class="form-control" placeholder="???????????????">
                 </div>
               </div>

               <div class="row">
                 <div class="form-group col-md-6">
                   <label for="origin_price">??????</label>
                   <input v-model.number="productInfo.origin_price" id="origin_price" type="number" min="0" class="form-control" placeholder="???????????????">
                 </div>
                 <div class="form-group col-md-6">
                   <label for="price">??????</label>
                   <input v-model.number="productInfo.price" id="price" type="number" min="0" class="form-control"
                          placeholder="???????????????">
                 </div>
               </div>
               <hr>

               <div class="form-group">
                 <label for="description">????????????</label>
                 <textarea v-model="productInfo.description" id="description" type="text" class="form-control"
                           placeholder="?????????????????????">
                 </textarea>
               </div>
               <div class="form-group">
                 <label for="content">????????????</label>
                 <textarea v-model="productInfo.content" id="description" type="text" class="form-control"
                           placeholder="?????????????????????">
                 </textarea>
               </div>
               <div class="form-group">
                 <div class="form-check">
                   <input v-model="productInfo.is_enabled" id="is_enabled" class="form-check-input" type="checkbox"
                          :true-value="1" :false-value="0">
                   <label class="form-check-label" for="is_enabled">????????????</label>
                 </div>
               </div>
             </div>
           </div>
         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
             ??????
           </button>
           <button type="button" class="btn btn-primary" @click="processingflow">
             ??????
           </button>
         </div>
       </div>
     </div>
   </div>`
}