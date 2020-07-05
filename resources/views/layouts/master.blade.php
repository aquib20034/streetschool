<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Laravel</title>
        <script src="{{asset('assets/js/plugin/webfont/webfont.min.js')}}"></script>
            <script>
                WebFont.load({
                    google: {"families":["Open+Sans:300,400,600,700"]},
                    custom: {"families":["Flaticon", "Font Awesome 5 Solid", "Font Awesome 5 Regular", "Font Awesome 5 Brands"], urls: ['/assets/css/fonts.css']},
                    active: function() {
                        sessionStorage.fonts = true;
                    }
                });
        </script>

<style>
.proImage{
  max-width:64px;
  max-height:64px;
  min-height:64px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border: 1px solid #ddd;
  /* padding: 5px; */
  margin-top:2%;
  border-radius: 4px;
}

 </style>

        <!-- Fonts -->
        <!-- <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet"> -->

        <!-- Styles -->
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        <!-- CSS Files -->
        <link rel="stylesheet" href="{{asset('assets/css/bootstrap.min.css')}}">
        <link rel="stylesheet" href="{{asset('assets/css/azzara.min.css')}}">
        <link rel="stylesheet" href="{{asset('assets/css/demo.css')}}">

        <!-- CSS Just for demo purpose, don't include it in your project -->
        
    </head>
    <body>
    <!-- asdf -->
    
        <div id="app"></div>
        
        <!-- <Toasts></Toasts> -->
        <script src="{{asset('js/app.js')}}"></script>
        <!--   Core JS Files   -->
    </body>
    <script src="{{asset('assets/js/core/jquery.3.2.1.min.js')}}"></script>
        <script src="{{asset('assets/js/core/popper.min.js')}}"></script>
        <script src="{{asset('assets/js/core/bootstrap.min.js')}}"></script>

        <!-- jQuery UI -->
        <script src="{{asset('assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js')}}"></script>
        <script src="{{asset('assets/js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js')}}"></script>

        <!-- jQuery Scrollbar -->
        <script src="{{asset('assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js')}}"></script>

        <!-- Moment JS -->
        <script src="{{asset('assets/js/plugin/moment/moment.min.js')}}"></script>

        <!-- Chart JS -->
        <script src="{{asset('assets/js/plugin/chart.js/chart.min.js')}}"></script>

        <!-- jQuery Sparkline -->
        <script src="{{asset('assets/js/plugin/jquery.sparkline/jquery.sparkline.min.js')}}"></script>

        <!-- Chart Circle -->
        <script src="{{asset('assets/js/plugin/chart-circle/circles.min.js')}}"></script>

        <!-- Datatables -->
        <script src="{{asset('assets/js/plugin/datatables/datatables.min.js')}}"></script>

        <!-- Bootstrap Notify -->
        <script src="{{asset('assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js')}}"></script>

        <!-- Bootstrap Toggle -->
        <script src="{{asset('assets/js/plugin/bootstrap-toggle/bootstrap-toggle.min.js')}}"></script>

        <!-- jQuery Vector Maps -->
        <script src="{{asset('assets/js/plugin/jqvmap/jquery.vmap.min.js')}}"></script>
        <script src="{{asset('assets/js/plugin/jqvmap/maps/jquery.vmap.world.js')}}"></script>

        <!-- Google Maps Plugin -->
        <script src="{{asset('assets/js/plugin/gmaps/gmaps.js')}}"></script>

        <!-- Sweet Alert -->
        <script src="{{asset('assets/js/plugin/sweetalert/sweetalert.min.js')}}"></script>

        <!-- Azzara JS -->
        <script src="{{asset('assets/js/ready.min.js')}}"></script>

        <!-- Azzara DEMO methods, don't include it in your project! -->
        <!-- <script src="{{asset('assets/js/setting-demo.js')}}"></script>
        <script src="{{asset('assets/js/demo.js')}}"></script> -->

        <script >
        // swal('Good job!', {
		// 				buttons: {        			
		// 					confirm: {
		// 						className : 'btn btn-success'
		// 					}
		// 				},
        // 			});
        
            
			// var content = {};

			// content.message = 'Member Added successfully';
			// content.title = '';
			// content.icon = 'fa fa-bell';
			// content.url = '';
			// content.target = '_blank';

			// $.notify(content,{
			// 	type: "success",
			// 	placement: {
			// 		from: "top",
			// 		align: "right"
			// 	},
			// 	time: 1000,
			// 	delay: 0,
			// });
		
	</script>

    </html>