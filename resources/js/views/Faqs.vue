<template>
 <div class="content">
    <div class="page-inner">
        <div class="page-header">
            <h4 class="page-title">FAQs</h4>
            <ul class="breadcrumbs">
                <li class="nav-home">
                    <router-link to="/">
                        <i class="flaticon-home"></i>
                    </router-link >
                </li>
                <li class="separator">
                    <i class="flaticon-right-arrow"></i>
                </li>
                <li class="nav-item">
                    <router-link to="/faqs">FAQs</router-link >
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex align-items-center">
                            <h4 class="card-title">Add FAQ</h4>
                            <button class="btn btn-primary btn-round ml-auto"  @click="addModal()" >
                                <i class="fa fa-plus"></i>
                                Add FAQ
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                           
                            <table id="multi-filter-select" class="display table table-striped table-hover" >
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Answer</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Question</th>
                                        <th>Answer</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                   
                                     <tr v-for="faq  in faqs.data" :key="faq.id"> 
                                        <td>{{faq.question|upText}}</td>
                                        <td>{{faq.answer}}</td>
                                        <td>{{faq.created_at|myDate}}</td>
                                        <td>

                                            <div class="list-group-item-figure">
                                                <div class="dropdown">
                                                    <button class="btn btn-dropdown" data-toggle="dropdown">
                                                        <i class="fa fa-ellipsis-v"></i>
                                                    </button>
                                                    <div class="dropdown-arrow"></div>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <a class="dropdown-item" @click="editModal(faq)">
                                                            <i class="fa fa-edit"></i> Edit
                                                        </a>

                                                        <a class="dropdown-item" @click="showModal(faq)">
                                                            <i class="fa fa-eye"></i> show
                                                        </a>
                                                        <a class="dropdown-item"  @click ="deletefaq(faq.id,faq.name)">
                                                            <i class="fa fa-trash"></i> Delete
                                                        </a>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card-footer">
                        <pagination :data="faqs" @pagination-change-page="getResults"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addDataModal" tabindex="-1" role="dialog" aria-labelledby="addDataModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editMode" id="addDataModalLabel">Add faq</h5>
                      <h5 class="modal-title" v-show="editMode" id="addDataModalLabel">Update faq</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editMode ? updateData() :createData()" >
                     <div class="modal-body">
                        <div class="form-group">
                            <!-- <input type="text" :created_by="1" name="created_by" v-model="form.created_by"> -->
                           
                            <input v-model="form.question" placeholder="Enter Question" id ="question" type="text" name="question"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('question') }">
                            <has-error :form="form" field="question" ></has-error>
                        </div>


                        <div class="form-group">
                            <textarea v-model="form.answer" placeholder="Enter Answer"  rows="5" id ="answer" type="text" name="answer"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('answer') }"></textarea>
                            <has-error :form="form" field="answer" ></has-error>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button v-show="editMode" class="btn btn-primary" type="submit" >Update</button>
                        <button v-show="!editMode" type="submit" class="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="showDataModal" tabindex="-1" role="dialog" aria-labelledby="showDataModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                      <h5 class="modal-title" id="showDataModalLabel">Show faq</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="" >
                    <div class="modal-body">
                        <strong>Question: {{form.question}}</strong>
                        <hr>
                        <strong >Answer: {{form.answer}}</strong>
                       
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
 </div>
</template>

<script>
    import Form from 'vform';
    import Swal from 'sweetalert2';
    export default {
        
        data(){
            return{
            editMode: false,
            faqs:{},
            designations:{},  
            form: new Form({
                    id:'',
                    question:'',
                    answer:'',
                    created_by:''
                })
            }
        },
        methods:{
            getResults(page=1){
            axios.get('api/faq?page=' + page)
                .then(response => {
                    this.faqs = response.data;
                });

            },
            
            updateData(){
                this.$Progress.start();
                this.form.put('api/faq/'+this.form.id)
                .then(()=>{
                    Fire.$emit('AfterCreate');
                    $('#addDataModal').modal('hide');
                   var fullname= 'FAQ updated successfull';
                    this.notifyMe("success",fullname);
                    this.$Progress.finish();

                })
                .catch(()=>{
                    this.$Progress.fail();

                });
            },

            addModal(){
                this.editMode = false;
                this.form.reset();
                $('#addDataModal').modal('show');
                 

            },
            editModal(faq){
                this.editMode = true;
                this.form.reset();
                $('#addDataModal').modal('show');
                this.form.fill(faq);

            },

            showModal(faq){
                this.form.reset();
                $('#showDataModal').modal('show');
                this.form.fill(faq);

            },
            loadfaqs(){
                axios.get("api/faq").then(({data})=>(this.faqs=data));

            },
            deletefaq(id,name){
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.form.delete('api/faq/'+id).then(()=>{
                            this.notifyMe("success","FAQ deleted successfull");
                            Fire.$emit('AfterCreate');
                        }).catch(()=>{
                            swal("Failed!","There was something wrong","warning");
                        })
                    }
                   
                })

            },
            createData(){
                this.$Progress.start();
                this.form.post('api/faq')
                .then(()=>{
                    Fire.$emit('AfterCreate');
                    $('#addDataModal').modal('hide');
                    this.notifyMe("success","FAQ added successfull");
                    this.$Progress.finish();
                }).catch(()=>{
                         this.$Progress.fail();
                })  
                
                
            },

            notifyMe(ic,ti){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }   
                })
                Toast.fire({
                    icon: ic,
                    title: ti
                })
            }
        },
        created() {
                this.loadfaqs();              
                Fire.$on('AfterCreate',()=>{
                    this.loadfaqs();
                });
            }
    }
</script>