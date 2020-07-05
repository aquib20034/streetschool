<template>
 <div class="content">
    <div class="page-inner">
        <div class="page-header">
            <h4 class="page-title">Contact Type</h4>
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
                    <router-link to="/contact_types">Contact Type</router-link >
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex align-items-center">
                            <h4 class="card-title">Add Contact Type</h4>
                            <button class="btn btn-primary btn-round ml-auto"  @click="addModal()" >
                                <i class="fa fa-plus"></i>
                                Add Contact Type
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                           
                            <table id="multi-filter-select" class="display table table-striped table-hover" >
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Name</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                   
                                    <tr v-for="contact_type  in contact_types.data" :key="contact_type.id"> 
                                        <td>{{contact_type.name|upText}}</td>
                                        <td>{{contact_type.created_at|myDate}}</td>
                                        <td>

                                            <div class="list-group-item-figure">
                                                <div class="dropdown">
                                                    <button class="btn btn-dropdown" data-toggle="dropdown">
                                                        <i class="fa fa-ellipsis-v"></i>
                                                    </button>
                                                    <div class="dropdown-arrow"></div>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <a class="dropdown-item" @click="editModal(contact_type)">
                                                            <i class="fa fa-edit"></i> Edit
                                                        </a>

                                                        <a class="dropdown-item" @click="showModal(contact_type)">
                                                            <i class="fa fa-eye"></i> show
                                                        </a>
                                                        <a class="dropdown-item"  @click ="deletecontact_type(contact_type.id,contact_type.name)">
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
                        <pagination :data="contact_types" @pagination-change-page="getResults"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addDataModal" tabindex="-1" role="dialog" aria-labelledby="addDataModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editMode" id="addDataModalLabel">Add Contact Type</h5>
                      <h5 class="modal-title" v-show="editMode" id="addDataModalLabel">Update Contact Type</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editMode ? updateData() :createData()" >
                    <div class="modal-body">
                        <div class="form-group">
                            <input v-model="form.name" placeholder="Enter contact_type Name" id ="name" type="text" name="name"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <has-error :form="form" field="name" ></has-error>
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
                      <h5 class="modal-title" id="showDataModalLabel">Show Contact Type</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form >
                    <div class="modal-body">
                        <strong>Contact Type: {{form.name}}</strong>
                       
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
            contact_types:{},
            contact_types:{},  
            form: new Form({
                    id:'',
                    name:''
                })
            }
        },
        methods:{
            getResults(page=1){
            axios.get('api/contact_type?page=' + page)
                .then(response => {
                    this.contact_types = response.data;
                });

            },
            
            updateData(){
                this.$Progress.start();
                this.form.put('api/contact_type/'+this.form.id)
                .then(()=>{
                    Fire.$emit('AfterCreate');
                    $('#addDataModal').modal('hide');
                    var name = $("input[name='name']").val();
                    name= '"'+ name + '" updated successfull';
                    this.notifyMe("success",name);
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
            editModal(contact_type){
                this.editMode = true;
                this.form.reset();
                $('#addDataModal').modal('show');
                this.form.fill(contact_type);

            },

            showModal(contact_type){
                this.form.reset();
                $('#showDataModal').modal('show');
                this.form.fill(contact_type);

            },
            loadcontact_types(){
                axios.get("api/contact_type").then(({data})=>(this.contact_types=data));

            },
            deletecontact_type(id,name){
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
                        this.form.delete('api/contact_type/'+id).then(()=>{
                            name= '"'+ name + '" deleted successfull';
                            this.notifyMe("success",name);
                            Fire.$emit('AfterCreate');
                        }).catch(()=>{
                            swal("Failed!","There was something wrong","warning");
                        })
                    }
                   
                })

            },
            createData(){
                this.$Progress.start();
                this.form.post('api/contact_type')
                .then(()=>{
                    Fire.$emit('AfterCreate');
                    $('#addDataModal').modal('hide');
                    var name = $("input[name='name']").val();
                    name= '"'+ name + '" added successfull';
                    this.notifyMe("success",name);
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
                this.loadcontact_types();              
                Fire.$on('AfterCreate',()=>{
                    this.loadcontact_types();
                });
            }
    }
</script>