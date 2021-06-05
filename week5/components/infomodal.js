export default{
        data() {
          return {
            url: 'https://vue3-course-api.hexschool.io',
            api_path:'hua1993',
            // mode:''
          };
        },
        props:[
          "infoId"
        ],
        watch: {
          infoId(){
            console.log(this.infoId)
          }
        },
        mounted() {
          this.modal=new bootstrap.Modal(this.$refs.infoModal, {
            keyboard: false
          });
        },
        methods: {
          open(){
            this.modal.show();
          }
        },
        template: `<div id="productModal2" ref="infoModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
        aria-hidden="true">
     <div class="modal-dialog modal-xl">
       <div class="modal-content border-0">
         <div class="modal-header bg-dark text-white">
           <h5 id="productModalLabel" class="modal-title">
             詳細資訊
           </h5>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
             123
         </div>
       </div>
     </div>
   </div>`
}