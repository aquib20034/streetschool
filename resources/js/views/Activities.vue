<template>
 <div class="content">
    <div class="page-inner">
        <div class="page-header">
            <h4 class="page-title">Activities</h4>
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
                    <router-link to="/activities">Activities</router-link >
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex align-items-center">
                            <h4 class="card-title">Add Activity</h4>
                            <button class="btn btn-primary btn-round ml-auto"  @click="addModal()" >
                                <i class="fa fa-plus"></i>
                                Add Activity
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                           
                            <table id="multi-filter-select" class="display table table-striped table-hover" >
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                   
                                    <tr v-for="activity  in activities.data" :key="activity.id"> 
                                        <td>{{activity.name|upText}}</td>
                                        <td>{{activity.description}}</td>
                                        <td>{{activity.created_at|myDate}}</td>
                                        <td>

                                            <div class="list-group-item-figure">
                                                <div class="dropdown">
                                                    <button class="btn btn-dropdown" data-toggle="dropdown">
                                                        <i class="fa fa-ellipsis-v"></i>
                                                    </button>
                                                    <div class="dropdown-arrow"></div>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <a class="dropdown-item" @click="editModal(activity)">
                                                            <i class="fa fa-edit"></i> Edit
                                                        </a>

                                                        <a class="dropdown-item" @click="showModal(activity)">
                                                            <i class="fa fa-eye"></i> show
                                                        </a>
                                                        <a class="dropdown-item"  @click ="deleteactivity(activity.id,activity.name)">
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
                        <pagination :data="activities" @pagination-change-page="getResults"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addDataModal" tabindex="-1" role="dialog" aria-labelledby="addDataModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editMode" id="addDataModalLabel">Add activity</h5>
                      <h5 class="modal-title" v-show="editMode" id="addDataModalLabel">Update activity</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editMode ? updateData() :createData()" >
                    <div class="modal-body">
                        <div class="form-group">
                            <input v-model="form.name" placeholder="Enter activity Name" id ="name" type="text" name="name"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <has-error :form="form" field="name" ></has-error>
                        </div>


                        <div class="form-group">
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

    <div class="modal fade" id="showDataModal" tabindex="-1" role="dialog" aria-labelledby="showDataModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                      <h5 class="modal-title" id="showDataModalLabel">Show activity</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form >
                    <div class="modal-body">
                        <strong>Activity Name: {{form.name}}</strong>
                        <hr>
                        <strong >Description: {{form.description}}</strong>
                        <hr>
                        <center>
                            <img id="blah" :src="getImage()"  class= "proImage" height="64" width="64" alt="your image"/>
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
            activities:{},
            designations:{},  
            form: new Form({
                    id:'',
                    name:'',
                    description:'',
                    created_by:'',
                    image:'no_image.png'
                })
            }
        },
        methods:{
            getResults(page=1){
            axios.get('api/activity?page=' + page)
                .then(response => {
                    this.activities = response.data;
                });

            },
             getUploadImage() {
                let image = (this.form.image.length>200)? this.form.image:"img/activity/"+this.form.image ;
                return image;
                
            },
            getImage() {
                let prefix = (this.form.image.match(/\//) ? '' : '/img/activity/');
                return prefix + this.form.image;
            },
            updateImage(e){
                // console.log('uploading');

                let file = e.target.files[0];
                let reader = new FileReader();
                // console.log(file);
                if(file['size']<2111775)
                {
                    reader.onloadend =(file)=> {
                    this.form.image= reader.result; 
                }
                reader.readAsDataURL(file);
                }else{
                    this.notifyMe("error","Image must be less than 2MB ");
                }
            },
         
            updateData(){
                this.$Progress.start();
                this.form.put('api/activity/'+this.form.id)
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
            editModal(activity){
                this.editMode = true;
                this.form.reset();
                $('#addDataModal').modal('show');
                this.form.fill(activity);

            },

            showModal(activity){
                this.form.reset();
                $('#showDataModal').modal('show');
                this.form.fill(activity);

            },
            loadactivities(){
                axios.get("api/activity").then(({data})=>(this.activities=data));

            },
            deleteactivity(id,name){
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
                        this.form.delete('api/activity/'+id).then(()=>{
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
                this.form.post('api/activity')
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
                this.loadactivities();              
                Fire.$on('AfterCreate',()=>{
                    this.loadactivities();
                });
            }
    }
</script>