<template>
 <div class="content">
    <div class="page-inner">
        <div class="page-header">
            <h4 class="page-title">Contacts</h4>
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
                    <router-link to="/contacts">Contacts</router-link >
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex align-items-center">
                            <h4 class="card-title">Add Contact</h4>
                            <button class="btn btn-primary btn-round ml-auto"  @click="addModal()" >
                                <i class="fa fa-plus"></i>
                                Add Contact
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                           
                            <table id="multi-filter-select" class="display table table-striped table-hover" >
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Email</th>
                                        <th>Contact Type</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Email</th>
                                        <th>Contact Type</th>
                                        <th>Created At</th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                   
                                    <tr v-for="contact  in contacts.data" :key="contact.id"> 
                                        <td>{{contact.firstname|upText}}</td>
                                        <td>{{contact.email}}</td>
                                        <td>{{contact.name}}</td>
                                        <td>{{contact.created_at|myDate}}</td>
                                        <td>

                                            <div class="list-group-item-figure">
                                                <div class="dropdown">
                                                    <button class="btn btn-dropdown" data-toggle="dropdown">
                                                        <i class="fa fa-ellipsis-v"></i>
                                                    </button>
                                                    <div class="dropdown-arrow"></div>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <a class="dropdown-item" @click="editModal(contact)">
                                                            <i class="fa fa-edit"></i> Edit
                                                        </a>

                                                        <a class="dropdown-item" @click="showModal(contact)">
                                                            <i class="fa fa-eye"></i> show
                                                        </a>
                                                        <a class="dropdown-item"  @click ="deletecontact(contact.id,contact.firstname)">
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
                        <pagination :data="contacts" @pagination-change-page="getResults"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addDataModal" tabindex="-1" role="dialog" aria-labelledby="addDataModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editMode" id="addDataModalLabel">Add Contact</h5>
                      <h5 class="modal-title" v-show="editMode" id="addDataModalLabel">Update Contact</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editMode ? updateData() :createData()" >
                    <div class="modal-body">
                        <div class="form-group">
                            <input v-model="form.firstname" placeholder="Enter First Name" id ="firstname" type="text" name="firstname"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('firstname') }">
                            <has-error :form="form" field="firstname" ></has-error>
                        </div>

                        <div class="form-group">
                            <input v-model="form.lastname" placeholder="Enter Last Name" id ="lastname" type="text" name="lastname"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('lastname') }">
                            <has-error :form="form" field="lastname" ></has-error>
                        </div>

                        <div class="form-group">
                            <input v-model="form.email" placeholder="Enter Email" id ="email" type="email" name="email"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <has-error :form="form" field="email" ></has-error>
                        </div>

                        <div class="form-group">
                            <select name="contact_type_id" v-model="form.contact_type_id" id="contact_type_id" 
                                class="form-control" :class="{'is-invalid':form.errors.has('contact_type_id')}">
                                <option value = "0">Select Contact Type</option>
                                <option  v-for="contact_type  in contact_types.data" :key="contact_type.id" v-bind:value="contact_type.id"> {{ contact_type.name }} </option>
                            </select>
                            <has-error :form="form" field="contact_type_id"></has-error>
                        </div>

                         <div class="form-group">
                            <select name="country_id" v-model="form.country_id" id="country_id" 
                                class="form-control" :class="{'is-invalid':form.errors.has('country_id')}">
                                <option value = "0">Select Country</option>
                                <option  v-for="country  in countries.data" :key="country.id" v-bind:value="country.id"> {{ country.name }} </option>
                            </select>
                            <has-error :form="form" field="country_id"></has-error>
                        </div>

                        <div class="form-group">
                            <input v-model="form.phone" placeholder="Enter Phone No" id ="phone" type="text" name="phone"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('phone') }">
                            <has-error :form="form" field="phone" ></has-error>
                        </div>

                        <div class="form-group">
                            <input v-model="form.education" placeholder="Enter your last Education" id ="education" type="text" name="education"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('education') }">
                            <has-error :form="form" field="education" ></has-error>
                        </div>

                        <div class="form-group">
                            <textarea v-model="form.msg" placeholder="Enter Message"  rows="5" id ="msg" type="text" name="msg"
                                class="form-control"  :class="{ 'is-invalid': form.errors.has('msg') }"></textarea>
                            <has-error :form="form" field="msg" ></has-error>
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

    <div class="modal fade" id="showcontact" tabindex="-1" role="dialog" aria-labelledby="showcontactLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                      <h5 class="modal-title" id="showcontactLabel">Show Contact</h5>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="" >
                    <div class="modal-body">
                        <strong>Firstname: {{form.firstname}}</strong>
                        <hr>
                        <strong >Email: {{form.email}}</strong>
                        <hr>
                        <strong >Message: {{form.msg}}</strong>
                        <hr>
                        <strong >Email: {{form.email}}</strong>
                        <hr>
                        <strong >Contact Type : {{ form.name}}</strong>
                        <hr>
                     
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
            contacts:{},
            contact_types:{},  
            countries:{},  
            form: new Form({
                    id:'',
                    firstname:'',
                    lastname:'',
                    email:'',
                    country_id:0,
                    contact_type_id:0,
                    phone:'',
                    msg:'',
                    education:''
                })
            }
        },
        methods:{
            getResults(page=1){
            axios.get('api/contact?page=' + page)
                .then(response => {
                    this.contacts = response.data;
                });

            },
           
            updateData(){
                this.$Progress.start();
                this.form.put('api/contact/'+this.form.id)
                .then(()=>{
                    Fire.$emit('AfterCreate');
                    $('#addDataModal').modal('hide');
                    var firstname = $("input[name='firstname']").val();
                    firstname= '"'+ firstname + '" updated successfull';
                    this.notifyMe("success",firstname);
                    this.$Progress.finish();

                })
                .catch(()=>{
                    this.$Progress.fail();

                });
            },

            addModal(){
                this.editMode = false;
                this.form.reset();
                this.loadCountry();
                this.loadContactType();
                $('#addDataModal').modal('show');
                 

            },
            editModal(contact){
                this.editMode = true;
                this.form.reset();
                this.loadCountry();
                this.loadContactType();
                $('#addDataModal').modal('show');
                this.form.fill(contact);

            },

            showModal(contact){
                // this.editMode = true;
                this.form.reset();
                this.loadCountry();
                this.loadContactType();
                $('#showcontact').modal('show');
                this.form.fill(contact);

            },
          
            loadCountry(){
                axios.get("api/country").then(({data})=>(this.countries=data));
            },
            loadContactType(){
                axios.get("api/contact_type").then(({data})=>(this.contact_types=data));
            },
            loadcontacts(){
                axios.get("api/contact").then(({data})=>(this.contacts=data));
            },
            deletecontact(id,firstname){
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
                        this.form.delete('api/contact/'+id).then(()=>{
                            firstname= '"'+ firstname + '" deleted successfull';
                            this.notifyMe("success",firstname);
                            Fire.$emit('AfterCreate');
                        }).catch(()=>{
                            swal("Failed!","There was something wrong","warning");
                        })
                    }
                   
                })

            },
            createData(){
                this.$Progress.start();
                this.form.post('api/contact')
                .then(()=>{
                    Fire.$emit('AfterCreate');
                    $('#addDataModal').modal('hide');
                    var firstname = $("input[name='firstname']").val();
                    firstname= '"'+ firstname + '" added successfull';
                    this.notifyMe("success",firstname);
                    this.$Progress.finish();
                    // this.$toast.success('"'+ firstname + '" added successfull');
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
              
                this.loadcontacts();
              

                Fire.$on('AfterCreate',()=>{
                    this.loadcontacts();
                });
                // this.notifyMe("success","firstname");
                 
            }
    
   
    }
</script>