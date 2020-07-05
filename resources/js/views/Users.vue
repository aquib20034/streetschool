<template>
 <div class="content">
    <div class="page-inner">
        <div class="page-header">
            <h4 class="page-title">Users</h4>
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
                    <router-link to="/users">Users</router-link >
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex align-items-center">
                            <h4 class="card-title">Add Users</h4>
                            <button class="btn btn-primary btn-round ml-auto"  @click="addModal()" >
                                <i class="fa fa-plus"></i>
                                Add Users
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table id="multi-filter-select" class="display table table-striped table-hover" >
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    <tr v-for="user  in users.data" :key="user.id"> 
                                        <td>{{user.name|upText}}</td>
                                        <td>{{user.email}}</td>
                                        <td>{{user.created_at|myDate}}</td>
                                        <td>
                                            <div class="list-group-item-figure">
                                                <div class="dropdown">
                                                    <button class="btn btn-dropdown" data-toggle="dropdown">
                                                        <i class="fa fa-ellipsis-v"></i>
                                                    </button>
                                                    <div class="dropdown-arrow"></div>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <a class="dropdown-item" @click="editModal(user)">
                                                            <i class="fa fa-edit"></i> Edit
                                                        </a>
                                                        <a class="dropdown-item"  @click ="deleteuser(user.id)">
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
                        <pagination :data="users" @pagination-change-page="getResults"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="adduser" tabindex="-1" role="dialog" aria-labelledby="adduserLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editMode" id="adduserLabel">Add user</h5>
                      <h5 class="modal-title" v-show="editMode" id="adduserLabel">Update user</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editMode ? updateuser() :createuser()" >
                    <div class="modal-body">
                        <div class="form-group">
                            <input v-model="form.name" placeholder="Enter Name" id ="name" type="text" name="name"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <has-error :form="form" field="name" ></has-error>
                        </div>


                        <div class="form-group">
                            <input v-model="form.email" placeholder="Enter Email"   id ="email" type="email" name="email"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <has-error :form="form" field="email" ></has-error>
                        </div>

                        <div class="form-group">
                            <input v-model="form.password" placeholder="Enter Password"   id ="password" type="password" name="password"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                            <has-error :form="form" field="password" ></has-error>
                        </div>
                        
                        <div class="form-group">
                            <input v-model="form.confirm_password" placeholder="Enter Confirm Password"   id ="confirm_password" type="password" name="confirm_password"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('confirm_password') }">
                            <has-error :form="form" field="confirm_password" ></has-error>
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
 </div>
</template>

<script>
    import Form from 'vform';
    import Swal from 'sweetalert2';
    export default {
        
        data(){
            return{
            editMode: false,
            users:{}, 
            form: new Form({
                    id:'',
                    name:'',
                    email:'',
                    password:'',
                    confirm_password:''
                   
                })
            }
        },
        methods:{
            getResults(page=1){
            axios.get('api/user?page=' + page)
                .then(response => {
                    this.users = response.data;
                });

            },
            updateuser(){
                this.$Progress.start();
                this.form.put('api/user/'+this.form.id)
                .then(()=>{
                    Fire.$emit('AfterUserCRUD');
                    $('#adduser').modal('hide');
                    var fullname= 'user updated successfull';
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
                $('#adduser').modal('show');

            },
            editModal(user){
                this.editMode = true;
                this.form.reset();
                $('#adduser').modal('show');
                this.form.fill(user);

            },
            loadusers(){
                axios.get("api/user").then(({data})=>(this.users=data));

            },
            deleteuser(id){
                console.log(id);
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
                        this.form.delete('api/user/'+id).then(()=>{
                            this.notifyMe("success","user deleted successfull");
                            Fire.$emit('AfterUserCRUD');
                        }).catch(()=>{
                            swal("Failed!","There was something wrong","warning");
                        })
                    }
                   
                })

            },
            createuser(){
                this.$Progress.start();
                this.form.post('api/user')
                .then(()=>{
                    Fire.$emit('AfterUserCRUD');
                    $('#adduser').modal('hide');
                    fullname= 'user added successfull';
                    this.notifyMe("success",fullname);
                    this.$Progress.finish();
                    // this.$toast.success('"'+ fullname + '" added successfull');
                }).catch(()=>{
                         this.$Progress.fail();
                    // swal("Failed!","There was something wrong","warning");
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
                this.loadusers();
                Fire.$on('AfterUserCRUD',()=>{
                    this.loadusers();
                });
                // this.notifyMe("success","fullname");
                 
            }
    
   
    }
</script>