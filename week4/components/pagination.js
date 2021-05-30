export default{
        data() {
          return {
            url: 'https://vue3-course-api.hexschool.io',
            api_path:'hua1993',
          };
        },
        props:[
          'page','pagination'
        ],
        mounted() {
        },
        methods: {
          clickPage(item){
            this.$emit('refesh',item);
          },
          clickNext(){
            if (this.pagination.has_next){
            this.$emit('refesh',this.page+1);
            }
          },
          clickPrev(){
            if (this.pagination.has_pre){
              this.$emit('refesh',this.page-1);
            }
          }
        },
        template: `<nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" 
          :class="{disabled:!pagination.has_pre}"
          @click="clickPrev">
            <span  class="page-link myMOUSE">
              Previous
            </span>
          </li>
          <li v-for="(item, index) in pagination.total_pages" :key="index" class="page-item" 
            :class="{active:pagination.current_page===item}"
            @click="clickPage(item)"
          >
            <span class="page-link myMOUSE">{{item}}</span >
          </li>
          <li class="page-item" 
          :class="{disabled:!pagination.has_next}" 
          @click="clickNext">
            <span class="page-link myMOUSE">Next</span>
          </li>
        </ul>
      </nav>`
}