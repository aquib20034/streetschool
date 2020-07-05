<template>
 <div class="content">
    <div class="page-inner">
        <div class="page-header">
            <h4 class="page-title">Contents</h4>
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
                    <router-link to="/contents">Contents</router-link >
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex align-items-center">
                            <h4 class="card-title">Add Content</h4>
                            <button class="btn btn-primary btn-round ml-auto"  @click="addModal()" >
                                <i class="fa fa-plus"></i>
                                Add Content
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                           
                            <table id="multi-filter-select" class="display table table-striped table-hover" >
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Keyword</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Title</th>
                                        <th>Keyword</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                   
                                    <tr v-for="content  in contents.data" :key="content.id"> 
                                        <td>{{content.title|upText}}</td>
                                        <td>{{content.keyword}}</td>
                                        <td>{{content.created_at|myDate}}</td>
                                        <td>

                                            <div class="list-group-item-figure">
                                                <div class="dropdown">
                                                    <button class="btn btn-dropdown" data-toggle="dropdown">
                                                        <i class="fa fa-ellipsis-v"></i>
                                                    </button>
                                                    <div class="dropdown-arrow"></div>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <a class="dropdown-item" @click="editModal(content)">
                                                            <i class="fa fa-edit"></i> Edit
                                                        </a>

                                                        <a class="dropdown-item" @click="showModal(content)">
                                                            <i class="fa fa-eye"></i> show
                                                        </a>
                                                        <a class="dropdown-item"  @click ="deletecontent(content.id,content.title)">
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
                        <pagination :data="contents" @pagination-change-page="getResults"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addDataModal" tabindex="-1" role="dialog" aria-labelledby="addDataModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editMode" id="addDataModalLabel">Add Content</h5>
                      <h5 class="modal-title" v-show="editMode" id="addDataModalLabel">Update Content</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editMode ? updateData() :createData()" >
                    <div class="modal-body">
                        <div class="form-group">
                            <input v-model="form.title" placeholder="Enter content title" id ="title" type="text" name="title"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('title') }">
                            <has-error :form="form" field="title" ></has-error>
                        </div>
                        <div class="form-group">
                            <input v-model="form.keyword" placeholder="Enter content keyword" id ="keyword" type="text" name="keyword"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('keyword') }">
                            <has-error :form="form" field="keyword" ></has-error>
                        </div>

                        <div class="form-group">

                             <ckeditor :editor="editor" v-model="form.description" :config="editorConfig" rows="5" 
                             :class="{ 'is-invalid': form.errors.has('description') }"></ckeditor>
                             <has-error :form="form" field="description" ></has-error>
                            <!-- <textarea v-model="form.description" placeholder="Enter Description"  rows="5" id ="description" type="text" name="description"
                                class="form-control"  :class="{ 'is-invalid': form.errors.has('description') }"></textarea>
                            <has-error :form="form" field="description" ></has-error> -->
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
                      <h5 class="modal-title" id="showDataModalLabel">Show Content</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="" >
                    <div class="modal-body">
                        <strong>Content Title: {{form.title}}</strong>
                        <hr>
                        <strong >Keyword: {{form.keyword}}</strong>
                        <hr>
                        <!-- <strong >Description: {{form.description}}</strong> -->
                        <input v-model="form.description" placeholder="Firstname">
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
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    export default {
        
        data(){
            return{
            editor: ClassicEditor,
            editMode: false,
            contents:{},
            form: new Form({
                    id:'',
                    title:'',
                    keyword:'',
                    description:'',
                    created_by:''
                })
            }
        },
        methods:{
            getResults(page=1){
            axios.get('api/content?page=' + page)
                .then(response => {
                    this.contents = response.data;
                });

            },
            
            updateData(){
                this.$Progress.start();
                this.form.put('api/content/'+this.form.id)
                .then(()=>{
                    Fire.$emit('AfterCreate');
                    $('#addDataModal').modal('hide');
                    var title = $("input[name='title']").val();
                    title= '"'+ title + '" updated successfull';
                    this.notifyMe("success",title);
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
            editModal(content){
                this.editMode = true;
                this.form.reset();
                $('#addDataModal').modal('show');
                this.form.fill(content);

            },

            showModal(content){
                this.form.reset();
                $('#showDataModal').modal('show');
                this.form.fill(content);

            },
            loadcontents(){
                axios.get("api/content").then(({data})=>(this.contents=data));

            },
            deletecontent(id,title){
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
                        this.form.delete('api/content/'+id).then(()=>{
                            title= '"'+ title + '" deleted successfull';
                            this.notifyMe("success",title);
                            Fire.$emit('AfterCreate');
                        }).catch(()=>{
                            swal("Failed!","There was something wrong","warning");
                        })
                    }
                   
                })

            },
            createData(){
                this.$Progress.start();
                this.form.post('api/content')
                .then(()=>{
                    Fire.$emit('AfterCreate');
                    $('#addDataModal').modal('hide');
                    var title = $("input[name='title']").val();
                    title= '"'+ title + '" added successfull';
                    this.notifyMe("success",title);
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
                this.loadcontents();              
                Fire.$on('AfterCreate',()=>{
                    this.loadcontents();
                });
            }
    }
</script>