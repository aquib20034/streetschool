<template>
  
  <main>
	<!-- <Toasts></Toasts> -->
    <div class="main-header" data-background-color="light-blue">
			<!-- Logo Header -->
			<div class="logo-header">
				
				<a href="index.html" class="logo">
					<img src="/assets/img/logoazzara.svg" alt="navbar brand" class="navbar-brand">
				</a>
				<button class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon">
						<i class="fa fa-bars"></i>
					</span>
				</button>
				<button class="topbar-toggler more"><i class="fa fa-ellipsis-v"></i></button>
				<div class="navbar-minimize">
					<button class="btn btn-minimize btn-rounded">
						<i class="fa fa-bars"></i>
					</button>
				</div>
			</div>
			<!-- End Logo Header -->
			<Header />
			
		</div>

       <Sidebar />

		<div class="main-panel">
			
			<router-view></router-view>
			<vue-progress-bar></vue-progress-bar>
		</div>
  </main>
</template>


<script>
	import Header from './components/Header.vue';
	import Sidebar from './components/Sidebar.vue';  
    export default {
		components:{
			Header,
			Sidebar
		}
        
    }
</script>