<template>
 <div class="content">
    <div class="page-inner">
        <div class="page-header">
            <h4 class="page-title">Gallery</h4>
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
                    <router-link to="/galleries">Gallery</router-link >
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex align-items-center">
                            <h4 class="card-title">Add gallery</h4>
                            <button class="btn btn-primary btn-round ml-auto"  @click="addModal()" >
                                <i class="fa fa-plus"></i>
                                Add gallery
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                           
                            <table id="multi-filter-select" class="display table table-striped table-hover" >
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Sort Order</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Category</th>
                                        <th>Sort Order</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                   
                                    <tr v-for="gallery  in galleries.data" :key="gallery.id"> 
                                        <td>{{gallery.name|upText}}</td>
                                        <td>{{gallery.sort_order}}</td>
                                        <td>{{gallery.created_at|myDate}}</td>
                                        <td>

                                            <div class="list-group-item-figure">
                                                <div class="dropdown">
                                                    <button class="btn btn-dropdown" data-toggle="dropdown">
                                                        <i class="fa fa-ellipsis-v"></i>
                                                    </button>
                                                    <div class="dropdown-arrow"></div>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <a class="dropdown-item" @click="editModal(gallery)">
                                                            <i class="fa fa-edit"></i> Edit
                                                        </a>

                                                        <a class="dropdown-item" @click="showModal(gallery)">
                                                            <i class="fa fa-eye"></i> show
                                                        </a>
                                                        <a class="dropdown-item"  @click ="deletegallery(gallery.id,gallery.name)">
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
                        <pagination :data="galleries" @pagination-change-page="getResults"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addDataModal" tabindex="-1" role="dialog" aria-labelledby="addDataModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editMode" id="addDataModalLabel">Add gallery</h5>
                      <h5 class="modal-title" v-show="editMode" id="addDataModalLabel">Update gallery</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editMode ? updateData() :createData()" >
                    <div class="modal-body">
                        <div class="form-group">
                            <input v-model="form.sort_order" placeholder="Enter Sort order" id ="sort_order" type="number" name="sort_order"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('sort_order') }">
                            <has-error :form="form" field="sort_order" ></has-error>
                        </div>

                        <div class="form-group">
                            <select name="img_category_id" v-model="form.img_category_id" id="img_category_id" class="form-control" :class="{'is-invalid':form.errors.has('img_category_id')}">
                                <option value = "0">Select Image </option>
                                <option  v-for="img_category  in img_categories.data" :key="img_category.id" v-bind:value="img_category.id"> {{ img_category.name }} </option>
                               
                            </select>
                            <has-error :form="form" field="img_category_id"></has-error>
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
                      <h5 class="modal-title" id="showDataModalLabel">Show gallery</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="" >
                    <div class="modal-body">
                        <strong>Image Category: {{form.name}}</strong>
                        <hr>
                        <strong >Sort Order: {{form.sort_order}}</strong>
                        <hr>
                        <center>
                            <img id="blah" :src="getImage()"   class= "proImage"  height="64" width="64" alt="your image"/>
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
            galleries:{},
            img_categories:{},  
            form: new Form({
                    id:'',
                    img_category_id:'',
                    sort_order:'',
                    created_by:'',
                    image:'no_image.png'
                })
            }
        },
        methods:{
            getResults(page=1){
            axios.get('api/gallery?page=' + page)
                .then(response => {
                    this.galleries = response.data;
                });

            },
             getUploadImage() {
                let image = (this.form.image.length>200)? this.form.image:"img/gallery/"+this.form.image ;
                return image;
                
            },
            getImage() {
                let prefix = (this.form.image.match(/\//) ? '' : '/img/gallery/');
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
                this.form.put('api/gallery/'+this.form.id)
                .then(()=>{
                    Fire.$emit('AfterCreate');
                    $('#addDataModal').modal('hide');
                    var name = "image";
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
                this.load_img_categories();
                $('#addDataModal').modal('show');
                 

            },
            editModal(gallery){
                this.editMode = true;
                this.form.reset();
                 this.load_img_categories();
                $('#addDataModal').modal('show');
                this.form.fill(gallery);

            },

            showModal(gallery){
                this.form.reset();
                this.load_img_categories();
                $('#showDataModal').modal('show');
                this.form.fill(gallery);

            },
             load_img_categories(){
                axios.get("api/img_category").then(({data})=>(this.img_categories=data));

            },
            loadgalleries(){
                axios.get("api/gallery").then(({data})=>(this.galleries=data));

            },
            deletegallery(id,name){
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
                        this.form.delete('api/gallery/'+id).then(()=>{
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
                this.form.post('api/gallery')
                .then(()=>{
                    Fire.$emit('AfterCreate');
                    $('#addDataModal').modal('hide');
                    var name = "image"
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
                this.loadgalleries();              
                Fire.$on('AfterCreate',()=>{
                    this.loadgalleries();
                });
            }
    }
</script>