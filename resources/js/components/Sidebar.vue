<template>
  <!-- Sidebar -->
  <div class="sidebar">
    <div class="sidebar-background"></div>
    <div class="sidebar-wrapper scrollbar-inner">
      <div class="sidebar-content">
        <div class="user">
          <div class="avatar-sm float-left mr-2">
            <img src="/assets/img/profile.jpg" alt="..." class="avatar-img rounded-circle" />
          </div>
          <div class="info">
            <a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
              <span>
               Muhammad Kamran
                <span class="user-level">Administrator</span>
                <span class="caret"></span>
              </span>
            </a>
            <div class="clearfix"></div>

            <div class="collapse in" id="collapseExample">
              <ul class="nav">
                <li>
                  <a href="#profile">
                    <span class="link-collapse">My Profile</span>
                  </a>
                </li>
                <li>
                  <a href="#edit">
                    <span class="link-collapse">Edit Profile</span>
                  </a>
                </li>
                <!-- <li>
                  <a href="#settings">
                    <span class="link-collapse">Settings</span>
                  </a>
                </li> -->
              </ul>
            </div>
          </div>
        </div>
        <ul class="nav">
          <li class="nav-item"  >
            <router-link to="/">
              <i class="fas fa-home"></i>
              <p>Dashboard</p>
              <span class="badge badge-count">5</span>
            </router-link>
          </li>
          <li class="nav-item"   >
            <router-link to="/users" >
              <i class="fas fa-user-cog"></i>
              <p>Users</p>
            </router-link>
          </li>

          <li class="nav-item"   >
            <router-link to="/contents" >
              <i class="fas fa-user-cog"></i>
              <p>Contents</p>
            </router-link>
          </li>
        
          <!-- <li class="nav-item"   >
            <router-link to="/records" >
              <i class="fas fa-tasks"></i>
              <p>Record</p>
            </router-link>
          </li> -->
          <li class="nav-section">
            <span class="sidebar-mini-icon">
              <i class="fa fa-ellipsis-h"></i>
            </span>
            <h4 class="text-section">Gallery</h4>
          </li>
          
          <li class="nav-item"   >
            <router-link to="/galleries" >
              <i class="fas fa-briefcase"></i>
              <p>Gallery</p>
            </router-link>
          </li>

          <li class="nav-item"   >
            <router-link to="/img_categories" >
              <i class="fas fa-briefcase"></i>
              <p>Image Categories</p>
            </router-link>
          </li>
          
          

          <li class="nav-section">
            <span class="sidebar-mini-icon">
              <i class="fa fa-ellipsis-h"></i>
            </span>
            <h4 class="text-section">Milestone</h4>
          </li>
          
          <li class="nav-item"   >
            <router-link to="/works" >
              <i class="fas fa-briefcase"></i>
              <p>Works</p>
            </router-link>
          </li>

          <li class="nav-item"   >
            <router-link to="/projects" >
              <i class="fas fa-tasks"></i>
              <p>Projects</p>
            </router-link>
          </li>

          <li class="nav-item"   >
            <router-link to="/activities" >
              <i class="fas fa-calendar-alt"></i>
              <p>Activities</p>
            </router-link>
          </li>


          <li class="nav-section">
            <span class="sidebar-mini-icon">
              <i class="fa fa-ellipsis-h"></i>
            </span>
            <h4 class="text-section">Members</h4>
          </li>
          <li class="nav-item"   >
            <router-link to="/members" >
              <i class="fas fa-users-cog"></i>
              <p>Members</p>
            </router-link>
          </li>

           <li class="nav-item"   >
            <router-link to="/designations" >
              <i class="fa fa-star"></i>
              <p>Designations</p>
            </router-link>
          </li>

          <li class="nav-section">
            <span class="sidebar-mini-icon">
              <i class="fa fa-ellipsis-h"></i>
            </span>
            <h4 class="text-section">Supporters</h4>
          </li>

           <li class="nav-item"   >
            <router-link to="/sponsors" >
              <i class="fas fa-handshake"></i>
              <p>Sponors</p>
            </router-link>
          </li>



          <li class="nav-section">
            <span class="sidebar-mini-icon">
              <i class="fa fa-ellipsis-h"></i>
            </span>
            <h4 class="text-section">Contacts</h4>
          </li>

          <li class="nav-item"   >
            <router-link to="/countries" >
              <i class="fa fa-flag"></i>
              <p>Countries</p>
            </router-link>
          </li>

          <li class="nav-item"   >
            <router-link to="/contact_types" >
              <i class="fa fa-layer-group"></i>
              <p>Contact Types</p>
            </router-link>
          </li>

            <li class="nav-item"   >
            <router-link to="/contacts" >
              <i class="fas fa-id-card-alt"></i>
              <p>Contacts</p>
            </router-link>
          </li>

           <li class="nav-section">
            <span class="sidebar-mini-icon">
              <i class="fa fa-ellipsis-h"></i>
            </span>
            <h4 class="text-section">FAQS</h4>
          </li>

          <li class="nav-item"   >
            <router-link to="/faqs" >
              <i class="fa fa-question-circle"></i>
              <p>FAQs</p>
            </router-link>
          </li>



          <!-- <li class="nav-item">
            <a data-toggle="collapse" href="#base">
              <i class="fas fa-layer-group"></i>
              <p>Base</p>
              <span class="caret"></span>
            </a>
            <div class="collapse" id="base">
              <ul class="nav nav-collapse">
                <li>
                  <a href="components/avatars.html">
                    <span class="sub-item">Avatars</span>
                  </a>
                </li>
                <li>
                  <a href="components/buttons.html">
                    <span class="sub-item">Buttons</span>
                  </a>
                </li>
                <li>
                  <a href="components/gridsystem.html">
                    <span class="sub-item">Grid System</span>
                  </a>
                </li>
                <li>
                  <a href="components/panels.html">
                    <span class="sub-item">Panels</span>
                  </a>
                </li>
                <li>
                  <a href="components/notifications.html">
                    <span class="sub-item">Notifications</span>
                  </a>
                </li>
                <li>
                  <a href="components/sweetalert.html">
                    <span class="sub-item">Sweet Alert</span>
                  </a>
                </li>
                <li>
                  <a href="components/font-awesome-icons.html">
                    <span class="sub-item">Font Awesome Icons</span>
                  </a>
                </li>
                <li>
                  <a href="components/flaticons.html">
                    <span class="sub-item">Flaticons</span>
                  </a>
                </li>
                <li>
                  <a href="components/typography.html">
                    <span class="sub-item">Typography</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a data-toggle="collapse" href="#forms">
              <i class="fas fa-pen-square"></i>
              <p>Forms</p>
              <span class="caret"></span>
            </a>
            <div class="collapse" id="forms">
              <ul class="nav nav-collapse">
                <li>
                  <router-link to="/members" >
                    <span class="sub-item">Basic Form</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a data-toggle="collapse" href="#tables">
              <i class="fas fa-table"></i>
              <p>Tables</p>
              <span class="caret"></span>
            </a>
            <div class="collapse" id="tables">
              <ul class="nav nav-collapse">
                <li>
                  <a href="tables/tables.html">
                    <span class="sub-item">Basic Table</span>
                  </a>
                </li>
                <li>
                  <a href="tables/datatables.html">
                    <span class="sub-item">Datatables</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a data-toggle="collapse" href="#maps">
              <i class="fas fa-map-marker-alt"></i>
              <p>Maps</p>
              <span class="caret"></span>
            </a>
            <div class="collapse" id="maps">
              <ul class="nav nav-collapse">
                <li>
                  <a href="maps/googlemaps.html">
                    <span class="sub-item">Google Maps</span>
                  </a>
                </li>
                <li>
                  <a href="maps/fullscreenmaps.html">
                    <span class="sub-item">Full Screen Maps</span>
                  </a>
                </li>
                <li>
                  <a href="maps/jqvmap.html">
                    <span class="sub-item">JQVMap</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a data-toggle="collapse" href="#charts">
              <i class="far fa-chart-bar"></i>
              <p>Charts</p>
              <span class="caret"></span>
            </a>
            <div class="collapse" id="charts">
              <ul class="nav nav-collapse">
                <li>
                  <a href="charts/charts.html">
                    <span class="sub-item">Chart Js</span>
                  </a>
                </li>
                <li>
                  <a href="charts/sparkline.html">
                    <span class="sub-item">Sparkline</span>
                  </a>
                </li>
              </ul>
            </div>
          </li> -->

          <!-- <li class="nav-item">
            <a href="widgets.html">
              <i class="fas fa-desktop"></i>
              <p>Widgets</p>
              <span class="badge badge-count badge-success">4</span>
            </a>
          </li>
          <li class="nav-item">
            <a data-toggle="collapse" href="#custompages">
              <i class="fas fa-paint-roller"></i>
              <p>Custom Pages</p>
              <span class="caret"></span>
            </a>
            <div class="collapse" id="custompages">
              <ul class="nav nav-collapse">
                <li>
                  <a href="login.html">
                    <span class="sub-item">Login & Register 1</span>
                  </a>
                </li>
                <li>
                  <a href="login2.html">
                    <span class="sub-item">Login & Register 2</span>
                  </a>
                </li>
                <li>
                  <a href="userprofile.html">
                    <span class="sub-item">User Profile</span>
                  </a>
                </li>
                <li>
                  <a href="404.html">
                    <span class="sub-item">404</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a data-toggle="collapse" href="#submenu">
              <i class="fas fa-bars"></i>
              <p>Menu Levels</p>
              <span class="caret"></span>
            </a>
            <div class="collapse" id="submenu">
              <ul class="nav nav-collapse">
                <li>
                  <a data-toggle="collapse" href="#subnav1">
                    <span class="sub-item">Level 1</span>
                    <span class="caret"></span>
                  </a>
                  <div class="collapse" id="subnav1">
                    <ul class="nav nav-collapse subnav">
                      <li>
                        <a href="#">
                          <span class="sub-item">Level 2</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span class="sub-item">Level 2</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a data-toggle="collapse" href="#subnav2">
                    <span class="sub-item">Level 1</span>
                    <span class="caret"></span>
                  </a>
                  <div class="collapse" id="subnav2">
                    <ul class="nav nav-collapse subnav">
                      <li>
                        <a href="#">
                          <span class="sub-item">Level 2</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#">
                    <span class="sub-item">Level 1</span>
                  </a>
                </li>
              </ul>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
  <!-- End Sidebar -->
</template>