<template>
 <div class="content">
    <div class="page-inner">
        <div class="page-header">
            <h4 class="page-title">Members</h4>
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
                    <router-link to="/members">Members</router-link >
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex align-items-center">
                            <h4 class="card-title">Add Member</h4>
                            <button class="btn btn-primary btn-round ml-auto"  @click="addModal()" >
                                <i class="fa fa-plus"></i>
                                Add Member
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                           
                            <table id="multi-filter-select" class="display table table-striped table-hover" >
                                <thead>
                                    <tr>
                                        <!-- <th>image</th> -->
                                        <th>Fullname</th>
                                        <th>Email</th>
                                        <th>Designation</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <!-- <th>image</th> -->
                                        <th>Fullname</th>
                                        <th>Email</th>
                                        <th>Designation</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                   
                                    <tr v-for="member  in members.data" :key="member.id"> 
                                        <td>{{member.fullname|upText}}</td>
                                        <td>{{member.email}}</td>
                                        <td>{{member.name}}</td>
                                        <td>{{member.created_at|myDate}}</td>
                                        <td>

                                            <div class="list-group-item-figure">
                                                <div class="dropdown">
                                                    <button class="btn btn-dropdown" data-toggle="dropdown">
                                                        <i class="fa fa-ellipsis-v"></i>
                                                    </button>
                                                    <div class="dropdown-arrow"></div>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <a class="dropdown-item" @click="editModal(member)">
                                                            <i class="fa fa-edit"></i> Edit
                                                        </a>

                                                        <a class="dropdown-item" @click="showModal(member)">
                                                            <i class="fa fa-eye"></i> show
                                                        </a>
                                                        <a class="dropdown-item"  @click ="deleteMember(member.id,member.fullname)">
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
                        <pagination :data="members" @pagination-change-page="getResults"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addMember" tabindex="-1" role="dialog" aria-labelledby="addMemberLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editMode" id="addMemberLabel">Add Member</h5>
                      <h5 class="modal-title" v-show="editMode" id="addMemberLabel">Update Member</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editMode ? updateMember() :createMember()" >
                    <div class="modal-body">
                        <div class="form-group">
                            <!-- <input name="created_by" value= "Auth->id " type="hidden"> -->
                            <!-- <label for="fullname">Full name</label> -->
                            <input v-model="form.fullname" placeholder="Enter Fullname" id ="fullname" type="text" name="fullname"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('fullname') }">
                            <has-error :form="form" field="fullname" ></has-error>
                        </div>

                        <div class="form-group">
                            <!-- <label for="email">Email</label> -->
                            <input v-model="form.email" placeholder="Enter Email" id ="email" type="email" name="email"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <has-error :form="form" field="email" ></has-error>
                        </div>

                        <div class="form-group">
                            <select name="designation_id" v-model="form.designation_id" id="designation_id" class="form-control" :class="{'is-invalid':form.errors.has('designation_id')}">
                                <option value = "0">Select Designation</option>
                                <option  v-for="designation  in designations.data" :key="designation.id" v-bind:value="designation.id"> {{ designation.name }} </option>
                               
                            </select>
                            <has-error :form="form" field="type"></has-error>
                        </div>

                        <div class="form-group">
                            <!-- <label for="description">Description</label> -->
                            <textarea v-model="form.description" placeholder="Enter Description"  rows="5" id ="description" type="text" name="description"
                                class="form-control"  :class="{ 'is-invalid': form.errors.has('description') }"></textarea>
                            <has-error :form="form" field="description" ></has-error>
                        </div>

                        <div class="form-group">
                            <input type="file" id="image" name="image" @change="updateImage"
                                class="form-control-file" accept='image/*' :class="{ 'is-invalid': form.errors.has('image') }">
                            <has-error :form="form" field="image" ></has-error>
                        </div>

                        <span></span>
                        <center>
                            <img id="blah" :src="getUploadImage()"  class= "proImage" height="64" width="64" alt="your image"/>
                        </center>
                      
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

    <div class="modal fade" id="showMember" tabindex="-1" role="dialog" aria-labelledby="showMemberLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                      <h5 class="modal-title" id="showMemberLabel">Show Member</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="" >
                    <div class="modal-body">
                        <strong>Full Name: {{form.fullname}}</strong>
                        <hr>
                        <strong >Email: {{form.email}}</strong>
                        <hr>
                        <strong >Description: {{form.description}}</strong>
                        <hr>
                       
                        <strong >Designation : {{ form.name}}</strong>
                        <hr>
                        <center>
                            <!-- <img class="img-circle" v-bind:src="'img/member/' +form.image" height="64" width="64" alt="your image" > -->
                            <img id="blah" :src="getImage()" class= "proImage" height="64" width="64" alt="your image"/>
                        </center>
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
            members:{},
            designations:{},  
            form: new Form({
                    id:'',
                    fullname:'',
                    description:'',
                    email:'',
                    designation_id:0,
                    name:'',
                    created_by:'',
                    image:'no_image.png'
                })
            }
        },
        methods:{
            getResults(page=1){
            axios.get('api/member?page=' + page)
                .then(response => {
                    this.members = response.data;
                });

            },
            getUploadImage() {
                // let prefix = (this.form.image.match(/\//) ? '' : '/img/member/');
                // return prefix + this.form.image;
                let image = (this.form.image.length>200)? this.form.image:"img/member/"+this.form.image ;
                return image;
                
            },
            getImage() {
                let prefix = (this.form.image.match(/\//) ? '' : '/img/member/');
                return prefix + this.form.image;
                
            },
            updateImage(e){
                console.log('uploading');

                let file = e.target.files[0];
                let reader = new FileReader();
                // console.log(file);
                if(file['size']<2111775)
                {
                       reader.onloadend =(file)=> {
                        // console.log('RESULT', reader.result)
                        // console.log('asdfdsaf');
                        // this.notifyMe("success","Image uploaded ");
                        this.form.image= reader.result; 
                        // this.getImage();
                    }
                    reader.readAsDataURL(file);
                }else{
                    this.notifyMe("error","Image must be less than 2MB ");

                }
                

            },
         
            updateMember(){
                this.$Progress.start();
                this.form.put('api/member/'+this.form.id)
                .then(()=>{
                    Fire.$emit('AfterCreate');
                    $('#addMember').modal('hide');
                    var fullname = $("input[name='fullname']").val();
                    fullname= '"'+ fullname + '" updated successfull';
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
                this.loadDesignation();
                $('#addMember').modal('show');
                 

            },
            editModal(member){
                this.editMode = true;
                this.form.reset();
                this.loadDesignation();
                $('#addMember').modal('show');
                this.form.fill(member);

            },

            showModal(member){
                // this.editMode = true;
                this.form.reset();
                this.loadDesignation();
                $('#showMember').modal('show');
                this.form.fill(member);

            },
            // loadData: function() {
            //     axios.get('api/designation').then(response => {
            //         this.designations = response.data;

            //     }).catch(e => {

            //     })
            // },
            loadDesignation(){
                axios.get("api/designation").then(({data})=>(this.designations=data));

            },
            loadMembers(){
                axios.get("api/member").then(({data})=>(this.members=data));

            },
            deleteMember(id,fullname){
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
                        this.form.delete('api/member/'+id).then(()=>{
                            fullname= '"'+ fullname + '" deleted successfull';
                            this.notifyMe("success",fullname);
                            Fire.$emit('AfterCreate');
                        }).catch(()=>{
                            swal("Failed!","There was something wrong","warning");
                        })
                    }
                   
                })

            },
            createMember(){
                this.$Progress.start();
                this.form.post('api/member')
                .then(()=>{
                    Fire.$emit('AfterCreate');
                    $('#addMember').modal('hide');
                    var fullname = $("input[name='fullname']").val();
                    fullname= '"'+ fullname + '" added successfull';
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
              
                this.loadMembers();
              

                Fire.$on('AfterCreate',()=>{
                    this.loadMembers();
                });
                // this.notifyMe("success","fullname");
                 
            }
    
   
    }
</script>