<template>
 <div class="content">
    <div class="page-inner">
        <div class="page-header">
            <h4 class="page-title">Record</h4>
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
                    <router-link to="/records">Records</router-link >
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex align-items-center">
                            <h4 class="card-title">Add Record</h4>
                            <button class="btn btn-primary btn-round ml-auto"  @click="addModal()" >
                                <i class="fa fa-plus"></i>
                                Add Record
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table id="multi-filter-select" class="display table table-striped table-hover" >
                                <thead>
                                    <tr>
                                        <th>title</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>title</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    <tr v-for="record  in records.data" :key="record.id"> 
                                        <td>{{record.title|upText}}</td>
                                        <td>{{record.created_at|myDate}}</td>
                                        <td>

                                        <div class="list-group-item-figure">
											<div class="dropdown">
												<button class="btn btn-dropdown" data-toggle="dropdown">
													<i class="fa fa-ellipsis-v"></i>
												</button>
												<div class="dropdown-arrow"></div>
												<div class="dropdown-menu dropdown-menu-right">
                                                    <a class="dropdown-item" @click="editModal(record)">
                                                        <i class="fa fa-edit"></i> Edit
                                                    </a>
													 <a class="dropdown-item"  @click ="deleterecord(record.id)">
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
                        <pagination :data="records" @pagination-change-page="getResults"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addrecord" tabindex="-1" role="dialog" aria-labelledby="addrecordLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editMode" id="addrecordLabel">Add record</h5>
                      <h5 class="modal-title" v-show="editMode" id="addrecordLabel">Update record</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editMode ? updaterecord() :createrecord()" >
                    <div class="modal-body">
                        <div class="form-group">
                            <input v-model="form.title" placeholder="Enter Record Title" id ="title" type="text" name="title"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('title') }">
                            <has-error :form="form" field="title" ></has-error>
                        </div>

                        <div class="form-group">
                            <textarea v-model="form.description" placeholder="Enter Description"  rows="5" id ="description" type="text" name="description"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('description') }"></textarea>
                            <has-error :form="form" field="description" ></has-error>
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
            records:{}, 
            form: new Form({
                    id:'',
                    title:'',
                    description:''
                   
                })
            }
        },
        methods:{
            getResults(page=1){
            axios.get('api/record?page=' + page)
                .then(response => {
                    this.records = response.data;
                });

            },
            updaterecord(){
                this.$Progress.start();
                this.form.put('api/record/'+this.form.id)
                .then(()=>{
                    Fire.$emit('AfterRecordCRUD');
                    $('#addrecord').modal('hide');
                    var fullname= 'record updated successfull';
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
                $('#addrecord').modal('show');

            },
            editModal(record){
                this.editMode = true;
                this.form.reset();
                $('#addrecord').modal('show');
                this.form.fill(record);

            },
            loadrecords(){
                axios.get("api/record").then(({data})=>(this.records=data));

            },
            deleterecord(id){
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
                        this.form.delete('api/record/'+id).then(()=>{
                            this.notifyMe("success","record deleted successfull");
                            Fire.$emit('AfterRecordCRUD');
                        }).catch(()=>{
                            swal("Failed!","There was something wrong","warning");
                        })
                    }
                   
                })

            },
            createrecord(){
                this.$Progress.start();
                this.form.post('api/record')
                .then(()=>{
                    Fire.$emit('AfterRecordCRUD');
                    $('#addrecord').modal('hide');
                    var fullname= 'record added successfull';
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
                this.loadrecords();
                Fire.$on('AfterRecordCRUD',()=>{
                    this.loadrecords();
                });
                // this.notifyMe("success","fullname");
                 
            }
    
   
    }
</script>