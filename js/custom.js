/* function show custom workout */
var videotime=0; /* Total Video Time tobe Played Which will come from radio button value */
var inttime; /* Interval Time */
var restintervaltime; // interval for restime
var timeout;
var stopallactivity=false;
var pauseflag=false; 				/* flag for resttime counter play pause functionality */
var state=false;					/* flag for resttime counter play pause functionality */
var customflag = false;				/* flag for play pause video functionality */
var pageIdArray=new Array();	/* store all video id for play random video */
var resttimeflag=0;  // flag for check if resttime is set then dont show again
var extra_time="init";
var total_length=10;
var current_page=0;
var play_next_prev=false; // play_next_prev when clicked on next/prev in rest time for custom video   
/* Double Click Custom Code...*/
(function($) {
 $.fn.doubleTap = function(doubleTapCallback) {
 return this.each(function(){
                  var elm = this;
                  var lastTap = 0;
                  $(elm).bind('vmousedown', function (e) {
                              var now = (new Date()).valueOf();
                              var diff = (now - lastTap);
                              lastTap = now ;
                              if (diff < 500) {
                              if($.isFunction( doubleTapCallback ))
                              {
                              doubleTapCallback.call(elm);
                              }
                              }      
                              });
                  });
 }
 })(jQuery);

function stopallvideo()
{  
  	$('video').each(function(index) {
		if($(this)[0].readyState!=0){
				$(this)[0].pause();
				$(this)[0].currentTime=0;
		 }
	});
deleteEntireCache();
/*remove displaynone clss which is added for hide first prev button*/
	$('.footer').each(function(index, element) {
		});
}// function end
function removeallforrandom()
{
	$('.footer').each(function(index, element) {
        	
			$(this).find(".randomnav").remove();
			
			$(this).find(".previous").css("display","block");
			$(this).find(".next").css("display","block");
	
    });
}

$(document).ready(function(){
$(".clearall").click(function()
{
	$('.custom_workoutul input[type=checkbox]').each(function() 
	{ 
        $(this).prop( "checked", false ).checkboxradio( "refresh" );
	});
});

$(".clearall").doubleTap(function(){
	$.mobile.changePage("#workout_routine", {
			transition: "slide",
			reverse: true,
			changeHash: false
			});
});
});//function end */


$(document).on('pageshow','#workout_routine',function(){
			resttimeflag=0;
			stopallactivity=true;
			clearInterval(inttime);
			clearInterval(restintervaltime);
			clearTimeout(timeout);
			stopallvideo();
			$('.loading').hide();
			$('body').removeClass('bodyloading');
			$('a.next.ui-link,a.previous').removeClass('dont_play_next_prev');
			$('a.previous').removeClass('hiddenprev');
});
$(document).on('pageshow','#setting',function(){
		resttimeflag=0;
		stopallactivity=true;
		clearInterval(inttime);
		clearInterval(restintervaltime);
		clearTimeout(timeout);
		stopallvideo();
		$('.loading').hide();
$('body').removeClass('bodyloading');
$('a.next.ui-link,a.previous').removeClass('dont_play_next_prev');
$('a.previous').removeClass('hiddenprev');
});
$(document).on('pageshow','#disclaimer',function(){
			resttimeflag=0;
			stopallactivity=true;		
			clearInterval(inttime);
			clearInterval(restintervaltime);
			clearTimeout(timeout);
			stopallvideo();
			$('.loading').hide();
$('body').removeClass('bodyloading');
$('a.next.ui-link,a.previous').removeClass('dont_play_next_prev');
$('a.previous').removeClass('hiddenprev');
	});
function startrandomworkout(videotime)							/* Function for ply random video recursiv*/
{	
	pageIdArray=[];
	$('.video_detail').each(function(index, element) {
        pageIdArray.push($(this).attr('id'));
    });
	RandomVideoArray =new Array();
	
	for(var i=0;i<11; i++)
	{
		
		var index = Math.floor(Math.random() * pageIdArray.length);
		var pagename = pageIdArray[index];	
		RandomVideoArray.push(pagename);
		pageIdArray.splice(index,1);
	} 
	pageIdArray = RandomVideoArray;
	randomworkoutplay(pageIdArray,'');
	
}
function changerandomworkout(pageIdArray)
{
		clearTimeout(timeout);	
		clearInterval(inttime);
		clearInterval(restintervaltime);
      	stopallvideo();
		removeallforrandom();
		$('a.next.ui-link,a.previous').addClass('dont_play_next_prev');
        $('a.previous').addClass('hiddenprev');
		if(resttimeflag==0)
		{
					/* code for show rest time  when we click on next previous button */
		
					resttimeflag=1	;  // flag for check if resttime is set then dont show again								
				  $('.loading').show();
				  $('body').addClass('bodyloading');
       			  if(pageIdArray.length==9){$('a.previous').hide();}
				/* code for find resttime from videotime */
					/* for get videotime */
				if($($('.workoutlength input:radio:checked')[0]).attr('id')=="radio2")
				{
					resttime=10;
				}
				else if($($('.workoutlength input:radio:checked')[0]).attr('id')=="radio3")
				{
					resttime=15;
				}
				else
				{	
					resttime=20;
				}
				
						
			restintervaltime=setInterval(function(){					//Code For show Rest Time After each Excersice
							if(resttime>0)
							{
									$('.resttimespan').html(resttime); 
									resttime=resttime-1;
							}
							else
							{
										stopallactivity=true;
										clearInterval(inttime);
										clearInterval(restintervaltime);
										clearTimeout(timeout);
										$('.loading').hide();
										$('body').removeClass('bodyloading');
                                        if(pageIdArray.length==9){ $('a.previous').show();}
										resttimeflag=0;  // flag for check if resttime is set then dont show again
										randomworkoutplay(pageIdArray,'');
							}
					
					},1000);	
					
		}
		else
		{
				stopallactivity=true;
				clearInterval(inttime);
				clearInterval(restintervaltime);
				clearTimeout(timeout);
				$('.loading').hide();
				$('body').removeClass('bodyloading');
		        if(pageIdArray.length==9){$('a.previous').show();}
				resttimeflag=0;  // flag for check if resttime is set then dont show again								
				randomworkoutplay(pageIdArray,'');
		}	
}
function randomworkoutplay(pageIdArray,paused_pagename) {

    var resttime;
	if(paused_pagename){
		var pagename = paused_pagename;
	}else{
		var index = Math.floor(Math.random() * pageIdArray.length);
		var pagename = pageIdArray[index];	
		pageIdArray.splice(index,1);
	}

	
	if(pageIdArray.length==0)
    {
        /* If all video excercise done then it will redirect to home */
            
            $.mobile.changePage("#workout_routine", {
                transition: "slide",
                reverse: true,
                changeHash: false

                });
				alert("Workout Completed.");
    }
else
{
		/* for get videotime */
		if($($('.workoutlength input:radio:checked')[0]).attr('id')=="radio2")
		{
			var videotime=30;
			resttime=10;
		}
		else if($($('.workoutlength input:radio:checked')[0]).attr('id')=="radio3")
		{
			var videotime=45;
			resttime=15;
		}
		else
		{	
			var videotime=60;
			resttime=20;
		}
		var video = $('#'+pagename+'_video')[0]; // get video name
		if(!paused_pagename)
		{
			
				$.mobile.changePage("#"+pagename, {
					transition: "slide",
					reverse: true,
					changeHash: false
					});
				
				$("#"+pagename+" .remainingExercises").hide();
			    $("#"+pagename+" .remainingExercisesCustom").show();
				$("#"+pagename+" .remainingExercisesCustom").html(total_length + 1 - pageIdArray.length+"/"+total_length); // set remain excerice/totalexcercise

				/*Code for Display none Default Next Prev and put custom next Prev*/
				if(!$("#"+pagename+" .footer .floatleft .previous.randomnav").hasClass('randomnav'))
            {
				$("#"+pagename+" .footer .floatleft .previous").hide();
			/* Conditition for On Page Video thr should not any event on Previous button*/
            if(pageIdArray.length==9)
                    {
                   // $("#"+pagename+" .footer .floatleft ").append('<a class="previous randomnav displaynone" ></a>');
                    }
                    else
                    {
                        //   $("#"+pagename+" .footer .floatleft ").append('<a class="previous randomnav"  onclick="changerandomworkout(pageIdArray)"></a>');
                    }
			}
			if(!$("#"+pagename+" .footer .floatleft .next.randomnav").hasClass('randomnav')){
				$("#"+pagename+" .footer .floatright .next").hide();
				$("#"+pagename+" .footer .floatright").append('<a class="next randomnav" onclick="changerandomworkout(pageIdArray)"></a>');
			}
			if(!$("#"+pagename+" .footer #buttonbar #play .randplay").hasClass('randplay')){
				$("#"+pagename+" .footer #buttonbar #play").hide();
				$("#"+pagename+" .footer #buttonbar").append('<a id="play" class="ui-link randplay" onclick=\'playpauserandom("'+pagename+'","'+pageIdArray+'")\'>play</a>');
			}
           if(video.readyState!=0)                     // it will check video state if 0 then it will set its current time to 0
            {
                video.currentTime=0;
            }

		}
	  	/*Code End for Display none Default Next Prev and put custom next Prev*/
		 
	   
		if(pauseflag==false)
		{
	
			if(video.readyState==0){video.load();}
			if(customflag)
				{
					video.play();
					customflag=false;
				}
				
				else{
						setTimeout(function(){
						window.plugins.html5Video.play($('#'+pagename+'_video').attr("id"), function(video){
							//	alert("video ended");
							});	
						},2000); 
					}
			extra_time="init";		// if video duration is less then video play time then it calculate extra time
		}
	
	var time=videotime;		  
	var stopfirst_counter=false;
	
	resttimeflag=0;  // flag for check if resttime is set then dont show again		
	stopallactivity=false;								// set flag to false for call function if its true then it will not call any function.
	inttime=setInterval(function()
	{
			if(pauseflag==true && state==true){
				clearInterval(inttime);   
		   }
		   
			 if(!stopfirst_counter  && extra_time=="init")						// if video duration is less then video play time for that we have declare flag initial as false
				{
					 $('#'+pagename+' .remainimage').html(":"+Math.round(videotime-video.currentTime));
				}
			 if(Math.round(video.currentTime)==time || video.currentTime==video.duration)			// check whether video is finish or not
				{
					if(Math.round(video.duration)< time)										///  for wait extra time when video duration less then specified time
					{
						if(!stopfirst_counter){							 
							
							 if(extra_time<=0){	
							 stopfirst_counter=true;
							//timeout=setTimeout(function(){				// wait for extra time
									// Code Start For Start Resttime Interval
										
										video.pause();
										clearInterval(inttime);
										restintervaltime=setInterval(function(){					//Code For show Rest Time After each Excersice
										
											if(!stopallactivity)								// If Click on home page then stop all activity.
											{
													$('.loading').show();
													$('body').addClass('bodyloading');
													if(resttime>0)
													{
															$('.resttimespan').html(resttime); 
															resttime=resttime-1;
															resttimeflag=1;  // flag for check if resttime is set then dont show again
															
													}
													else
													{
														clearInterval(restintervaltime);
														clearInterval(inttime);
														$('.loading').hide();
														$('body').removeClass('bodyloading');
														pauseflag=false;
														randomworkoutplay(pageIdArray,'');										// call function recursivly	
													}
											}
											else
											{		
														clearInterval(restintervaltime);
														clearInterval(inttime);
											}
										},1000);
										
								// Code End For Start Resttime Interval
																				// call function recursivly
							//},Math.round(time-video.duration)*1000);	
							 }
						}
					
                        if(extra_time=="init") // condition for check wether get duration or not
                        {
                        extra_time=Math.round(parseInt(time)-parseInt(video.duration));
                        extra_time = parseInt(extra_time-1);
                        
                        }
                        else
                        {
                        extra_time = parseInt(extra_time-1);
                        
                        }
    
						if(extra_time>=0){						// show counter of extra time
						$('#'+pagename+' .remainimage').html(":"+extra_time); 
						}
					}
					else
					{
										/// Code For Show Restime Couter 
										
										
										video.pause();
										clearInterval(inttime);
										restintervaltime=setInterval(function(){					//Code For show Rest Time After each Excersice
										if(!stopallactivity)								// If Click on home page then stop all activity.
										{
											$('.loading').show();
											$('body').addClass('bodyloading');
											if(resttime>0)
											{
												$('.resttimespan').html(resttime); 
													resttime=resttime-1;
													resttimeflag=1;  // flag for check if resttime is set then dont show again
													
											}
											else
											{
												clearInterval(restintervaltime);
												clearInterval(inttime);
												$('.loading').hide();
												$('body').removeClass('bodyloading');
												pauseflag=false;
												randomworkoutplay(pageIdArray,'');										// call function recursivly	
											}
											
										}
										else
										{
												clearInterval(restintervaltime);
												clearInterval(inttime);
										}		
							},1000);
										
										/// Code End For Show Resttime Couter
											
					}
					
				}
			  },1000); 
}

}

function customworkout(){
                               
	var i=0;
	var chk=$('.custom_workoutul input:checkbox:checked')[i];
	if($('.custom_workoutul input:checkbox:checked').length==0)
	{
		alert("Please select excersice first ");
		$.mobile.changePage("#workout_routine", {
			transition: "slide",
			reverse: true,
			changeHash: false
		});
	}
	
	else
	{
		resttimeflag=1;  // flag for check if resttime is set then dont show again			  
	  	startcustomlist(chk,i);
	}
	
}
function startcustomlist(chk,i)
{
  							clearTimeout(timeout);	
							clearInterval(inttime);
							clearInterval(restintervaltime);
							stopallvideo();
							
							if(resttimeflag!=1)
							{
								$(".randomnav.previous").bind('click',function(){
									play_next_prev=true;
								});
								$(".randomnav.next").bind('click',function(){
									play_next_prev=true;
								});
										/* code for show rest time  when we click on next previous button */
							
										resttimeflag=0;  // flag for check if resttime is set then dont show again								
									  $('.loading').show();
										$('body').addClass('bodyloading');
									/* code for find resttime from videotime */
										/* for get videotime */
									if($($('.workoutlength input:radio:checked')[0]).attr('id')=="radio2")
									{
										resttime=10;
									}
									else if($($('.workoutlength input:radio:checked')[0]).attr('id')=="radio3")
									{
										resttime=15;
									}
									else
									{	
										resttime=20;
									}
									
											
												restintervaltime=setInterval(function(){					//Code For show Rest Time After each Excersice
												if(resttime>0)
												{
														$('.resttimespan').html(resttime); 
														resttime=resttime-1;
												}
												else
												{
															stopallactivity=true;
															clearInterval(inttime);
															clearInterval(restintervaltime);
															clearTimeout(timeout);
															$('.loading').hide();
															$('body').removeClass('bodyloading');
															customvideoplay(chk,i,'');
												}
											if(play_next_prev==true)
											{
															play_next_prev=false;
															stopallactivity=true;
															clearInterval(inttime);
															clearInterval(restintervaltime);
															clearTimeout(timeout);
															$('.loading').hide();
															$('body').removeClass('bodyloading');
															$(".randomnav").remove();
															customvideoplay(chk,i,'');
															
												}
										
										},1000);	
										
							}
							else
							{
									resttimeflag=0;  // flag for check if resttime is set then dont show again								
									customvideoplay(chk,i,'');
							}	
}
function customvideoplay(chk,i,paused_pagename) {
    var resttime;
    if(i >= $('.custom_workoutul input:checkbox:checked').length)
    {
        /* If all video excercise done then it will redirect to home */
			 $('.footer').each(function(index, element) {		
				$(this).find(".previous").css("display","block");
				$(this).find(".next").css("display","block");
		    });
			alert("Workout Completed.");
            $.mobile.changePage("#workout_routine", {
                transition: "slide",
                reverse: true,
                changeHash: false
                });
    }
else
{
		/* for get videotime */
		if($($('.workoutlength input:radio:checked')[0]).attr('id')=="radio2")
		{
			var videotime=30;
			resttime=10;
		}
		else if($($('.workoutlength input:radio:checked')[0]).attr('id')=="radio3")
		{
			var videotime=45;
			resttime=15;
		}
		else
		{	
			var videotime=60;
			resttime=20;
		}
		if(paused_pagename){
			var pagename = paused_pagename;
		}else{
			var pagename=$(chk).attr('id').replace("_chk",""); // for remove chk from checkbox id
			pagename=pagename.replace("_1","");
		}

		var video = $('#'+pagename+'_video')[0]; // get video name
	//	var video = $(pagename+'_video').attr("id"); // get video name
		var obj=$('.custom_workoutul input:checkbox:checked')[i+1];			// get new checkbox object 
		if(i!=0)
		{
			var obj_prev=$('.custom_workoutul input:checkbox:checked')[i-1];			// get new checkbox object 
		}
		if(!paused_pagename)
		{
			
			$.mobile.changePage("#"+pagename, {
				transition: "slide",
				reverse: true,
				changeHash: false
				});
	$("#"+pagename+" .remainingExercises").hide();
	$("#"+pagename+" .remainingExercisesCustom").show();
	$("#"+pagename+" .remainingExercisesCustom").html(i+1+"/"+$('.custom_workoutul input:checkbox:checked').length); // set remain excerice/totalexcercise


		   if(video.readyState!=0)                     // it will check video state if 0 then it will set its current time to 0
			{
				video.currentTime=0;
			}		
			
			 /*Code for Display none Default Next Prev and put custom next Prev*/
		$("#"+pagename+" .footer #buttonbar #play").hide();
		$("#"+pagename+" .footer #buttonbar").append('<a id="play" class="ui-link randplay" >play</a>');
			$("#"+pagename+" .footer #buttonbar #play").bind('click.myEvents',function(){
						playpausecustom(pagename,obj,i);
				});
            $("#"+pagename+" .footer .floatleft .previous").hide(); 
			if(i!=0)
			{
			//	$("#"+pagename+" .footer .floatleft .previous").hide();
				$("#"+pagename+" .footer .floatleft ").append('<a class="previous randomnav"></a>');
				$("#"+pagename+" .footer .floatleft .randomnav.previous").bind('click.myEvents',function(){
					startcustomlist(obj_prev,i-1);
				});
			}
			$("#"+pagename+" .footer .floatright .next").hide();
			$("#"+pagename+" .footer .floatright").append('<a class="next randomnav"></a>');// onclick="startcustomlist('+obj+','+(i+1)+'")"></a>');
			$("#"+pagename+" .footer .floatright .randomnav.next").bind('click.myEvents',function(){
					startcustomlist(obj,i+1);
			});
			/*Code End for Display none Default Next Prev and put custom next Prev*/
		}
		if(pauseflag==false)
		{
			//video.play();
		//	alert($('#'+pagename+'_video').attr("id"));
          if(video.readyState==0){video.load();}
			if(customflag)
				{
					video.play();
					customflag=false;
				}
				
				else
				{
						setTimeout(function(){
						window.plugins.html5Video.play($('#'+pagename+'_video').attr("id"), function(video){
						//	alert("video ended");
							});	
						},2000);
				}
			extra_time="init";		// if video duration is less then video play time then it calculate extra time
		}
		 
		
	
	var time=videotime;		  
	var stopfirst_counter=false;
	
	
	stopallactivity=false;								// set flag to false for call function if its true then it will not call any function.
	inttime=setInterval(function()
	{//alert('int');
	
	if(pauseflag==true && state==true){
				clearInterval(inttime);   
		   }
			 if(!stopfirst_counter  && extra_time=="init")// if video duration is less then video play time for that we have declare flag initial as false
				{
					 $('#'+pagename+' .remainimage').html(":"+Math.round(videotime-video.currentTime));
				}
			 if(Math.round(video.currentTime)==time || video.currentTime==video.duration)			// check whether video is finish or not
				{
					if(Math.round(video.duration)< time)										///  for wait extra time when video duration less then specified time
					{
						if(!stopfirst_counter){							 
							 if(extra_time<=0){	
							 stopfirst_counter=true;
							//timeout=setTimeout(function(){				// wait for extra time
									// Code Start For Start Resttime Interval
										
										video.pause();
										clearInterval(inttime);
										restintervaltime=setInterval(function(){					//Code For show Rest Time After each Excersice
										
											if(!stopallactivity)								// If Click on home page then stop all activity.
											{
													$('.loading').show();
													$('body').addClass('bodyloading');
													if(resttime>0)
													{
															$('.resttimespan').html(resttime); 
															resttime=resttime-1;
													}
													else
													{
														clearInterval(restintervaltime);
														clearInterval(inttime);
														$('.loading').hide();
														$('body').removeClass('bodyloading');
														$("#"+pagename+" .footer .floatleft .randomnav.previous").unbind('click.myEvents'); 
														$("#"+pagename+" .footer .floatright .randomnav.next").unbind('click.myEvents');
														$("#"+pagename+" .footer #buttonbar #play").unbind('click.myEvents');
														pauseflag=false;
														customvideoplay(obj,i+1,'');										// call function recursivly	
													}
											}
											else
											{
														clearInterval(restintervaltime);
														clearInterval(inttime);
											}
										},1000);
										
								// Code End For Start Resttime Interval
																				// call function recursivly
							 }
						}
					
                        if(extra_time=="init") // condition for check wether get duration or not
                        {
                        extra_time=Math.round(parseInt(time)-parseInt(video.duration));
                        extra_time = parseInt(extra_time-1);
                        
                        }
                        else
                        {
                        extra_time = parseInt(extra_time-1);
                        
                        }
    
                        
                        
					if(extra_time>=0){						// show counter of extra time
						$('#'+pagename+' .remainimage').html(":"+extra_time); 
						}
					}
					else
					{
										/// Code For Show Restime Couter 
										
										
										video.pause();
										clearInterval(inttime);
								restintervaltime=setInterval(function(){					//Code For show Rest Time After each Excersice
										if(!stopallactivity)								// If Click on home page then stop all activity.
										{
											$('.loading').show();
											$('body').addClass('bodyloading');
											if(resttime>0)
											{
												$('.resttimespan').html(resttime); 
													resttime=resttime-1;
											}
											else
											{
												clearInterval(restintervaltime);
												clearInterval(inttime);
												$('.loading').hide();
												$('body').removeClass('bodyloading');
												$("#"+pagename+" .footer .floatleft .randomnav.previous").unbind('click.myEvents'); 
												$("#"+pagename+" .footer .floatright .randomnav.next").unbind('click.myEvents');
												$("#"+pagename+" .footer #buttonbar #play").unbind('click.myEvents');
												pauseflag=false;
												customvideoplay(obj,i+1,'');										// call function recursivly	
											}
											
										}
										else
										{
												clearInterval(restintervaltime);
												clearInterval(inttime);
										}		
							},1000);
										
										/// Code End For Show Resttime Couter
											
					}
					
				}
			  },1000); 
}

			  
}
 
function redirecttoworkoutlist(pagename)
		{
			$.mobile.changePage("#"+pagename, {
			transition: "slide",
			reverse: true,
			changeHash: false
			});
			
		}
$(document).ready(function(){
$('a.next,a.previous').click(function(e){
	e.preventDefault();
});
});

  function stopvido(NextPrevPage,CurrentPage)
  {

		clearTimeout(timeout);	
		clearInterval(inttime);
		clearInterval(restintervaltime);
      	stopallvideo();

		if($('a.next').hasClass('dont_play_next_prev')){
			    stopallactivity=true;
				$('.loading').hide();
				$('body').removeClass('bodyloading');
				resttimeflag=0;  // flag for check if resttime is set then dont show again		
				randomworkoutplay(pageIdArray,'');
			return;
		}
	
		if(resttimeflag==0)
		{
			
					/* code for show rest time  when we click on next previous button */
		
					resttimeflag=1;  // flag for check if resttime is set then dont show again								
				    $('.loading').show();
					$('body').addClass('bodyloading');
				/* code for find resttime from videotime */
					if(videotime==30)
					{
						resttime=10;
					}
					else if(videotime==45)
					{
						resttime=15;
					}
					else
					{
						resttime=20;
					}
				
						
			restintervaltime=setInterval(function(){					//Code For show Rest Time After each Excersice
							if(resttime>0)
							{
									$('.resttimespan').html(resttime); 
									resttime=resttime-1;
							}
							else
							{
										stopallactivity=true;
										clearInterval(inttime);
										clearInterval(restintervaltime);
										clearTimeout(timeout);
										$('.loading').hide();
										resttimeflag=0;  // flag for check if resttime is set then dont show again
										$('body').removeClass('bodyloading');
										playnextprev(NextPrevPage,CurrentPage);
							}
					
					},1000);	
					
		}
		else
		{
				//	resttimeflag=0;  // flag for check if resttime is set then dont show again								
										stopallactivity=true;
										clearInterval(inttime);
										clearInterval(restintervaltime);
										clearTimeout(timeout);
										$('.loading').hide();
										resttimeflag=0;  // flag for check if resttime is set then dont show again			
										$('body').removeClass('bodyloading');
										playnextprev(NextPrevPage,CurrentPage);
		}
	}
  function playnextprev(NextPrevPage,CurrentPage)
    {
		

		clearTimeout(timeout);
		if(NextPrevPage=="")
		{
			$.mobile.changePage("#workout_routine", {
										transition: "slide",
										reverse: true,
										changeHash: false
						});
						alert("Workout Completed.");
		}
        else
		{
					var currvideo = $('#'+CurrentPage+'_video')[0];
					var nextvideo = $('#'+NextPrevPage+'_video')[0];
					currvideo.pause();
					if(currvideo.readyState!=0)
                    {
                       currvideo.currentTime = 0; 
                    }
						if(nextvideo.readyState==0){nextvideo.load();}
					setTimeout(function(){
						window.plugins.html5Video.play($('#'+NextPrevPage+'_video').attr("id"), function(video){
     					});	
					},2000);
					$.mobile.changePage("#"+NextPrevPage, {
									transition: "slide",
									reverse: true,
									changeHash: false
					});
					
					$("#"+NextPrevPage+" .remainingExercises").show();
					 $("#"+NextPrevPage+" .remainingExercisesCustom").hide();
					 
		var stopfirst_counter=false;
		extra_time="init"; // intial init for once we get video duration then we store it
		
		var resttime;
		stopallactivity=false;								// set flag to false for call function if its true then it will not call any function.
		
		/* code for find resttime from videotime */
		if(videotime==30)
		{
			resttime=10;
		}
		else if(videotime==45)
		{
			resttime=15;
		}
		else
		{
			resttime=20;
		}
			
						inttime=setInterval(function()
							{			
							 if(pauseflag==true && state==true){
							 		clearInterval(inttime);   
		 					  }
									 if(!stopfirst_counter && extra_time=="init")
										{	
											 $('#'+NextPrevPage+' .remainimage').html(":"+Math.round(videotime-nextvideo.currentTime));
										}
									 if(Math.round(nextvideo.currentTime)==videotime || nextvideo.currentTime==nextvideo.duration)
										{
											if(Math.round(nextvideo.duration)< videotime)
											{
													if(!stopfirst_counter){
														if(extra_time<=0){
																stopfirst_counter=true;
			
											 						nextvideo.pause();
																	clearInterval(inttime);
							
																	
																	/* code end for show rest time clock */
																	$('#'+NextPrevPage+' .next').trigger('click');
															}
														//},Math.round(videotime-nextvideo.duration)*1000);	
													}
											if(extra_time=="init") // condition for check wether get duration or not
                                            {
                                            extra_time=Math.round(parseInt(videotime)-parseInt(nextvideo.duration));
                                            extra_time = parseInt(extra_time-1);
                                            
                                            }
                                            else
                                            {
                                            extra_time = parseInt(extra_time-1);
                                            
                                            }

												if(extra_time>=0)
												{
													$('#'+NextPrevPage+' .remainimage').html(":"+extra_time); 
												}
											}
											else
											{		
												/* code start for show rest time clock */
													
													nextvideo.pause();
													clearInterval(inttime);

														/* code end for show rest time clock */	
														$('#'+NextPrevPage+' .next').trigger('click');			
											}
											
										}
									  },1000); 
						 
    	 }          
 }

function startworkout(pagename,time)
{	

	videotime=time;
	var video = $(pagename+'_video')[0];
 	$('.footer').each(function(index, element) {
    		$(this).find("a.previous").css("display","block");
	});
	if(pauseflag==false)
	{
        if(video.readyState==0){video.load();}
				if(customflag)
				{
					video.play();
					customflag=false;
				}
				 else {
						setTimeout(function(){
						window.plugins.html5Video.play($(pagename+'_video').attr("id"), function(video){
						});	
					},2000);
				
			 	}
			 extra_time="init";
		
	}
	var stopfirst_counter=false;
	
  
	var resttime;
	stopallactivity=false;								// set flag to false for call function if its true then it will not call any function.
	
	/* code for find resttime from videotime */
	if(videotime==30)
	{
		resttime=10;
	}
	else if(videotime==45)
	{
		resttime=15;
	}
	else
	{
		resttime=20;
	}
    	
		$(pagename+" .remainingExercises").show();
			 $(pagename+" .remainingExercisesCustom").hide();
    
    
	inttime=setInterval(function()	
	{
		   if(pauseflag==true && state==true){
				clearInterval(inttime);   
		   }
			 if(!stopfirst_counter && extra_time=="init")
				{								
					 $(pagename+' .remainimage').html(":"+Math.round(videotime-video.currentTime));
				}
				
			 if(Math.round(video.currentTime)==time || video.currentTime==video.duration)
				{
					if(Math.round(video.duration)< time)
					{
						if(!stopfirst_counter){
							
							
							  if(extra_time<=0){	
							  stopfirst_counter=true;
                                                    // flag with true when rest time start
										video.pause();
										clearInterval(inttime);
									 	restintervaltime=setInterval(function(){			//Code For show Rest Time After each Excersice
                                        
											if(!stopallactivity)								// If Click on home page then stop all activity.
											{
												$('.loading').show();
												$('body').addClass('bodyloading');
												if(resttime>0)
												{
													
													$(' .resttimespan').html(resttime); 
													resttime=resttime-1;
													   resttimeflag=1;  // flag for check if resttime is set then dont show again
												}
												else
												{
													clearInterval(restintervaltime);
													clearInterval(inttime);
													$('.loading').hide();
													$('body').removeClass('bodyloading');
													$(pagename+' .next').trigger('click');				
												}
											}
											else
											{
													clearInterval(restintervaltime);
													clearInterval(inttime);
											}
										},1000); 
										
							  }
							
						}
						
					
							if(extra_time=="init") // condition for check wether get duration or not
							{
								extra_time=Math.round(parseInt(time)-parseInt(video.duration));
								extra_time = parseInt(extra_time-1);
								
							}
							else
							{
							extra_time = parseInt(extra_time-1);
							 
							}
							if(extra_time>=0){
							$(pagename+' .remainimage').html(":"+extra_time); 
							}
				
					}
					else
					{	
							// code for show rest timer
								video.pause();
								clearInterval(inttime);
								var restintervaltime=setInterval(function(){					//Code For show Rest Time After each Excersice
											if(!stopallactivity)						// If Click on home page then stop all activity.
											{
												$('.loading').show();
												$('body').addClass('bodyloading');
												if(resttime>0)
												{
			  											$(' .resttimespan').html(resttime);
														resttime=resttime-1;
				 									   resttimeflag=1;  // flag for check if resttime is set then dont show again
												}
												else
												{
													clearInterval(restintervaltime);
													clearInterval(inttime);
													$('.loading').hide();
													$('body').removeClass('bodyloading');
													$(pagename+' .next').trigger('click');		
												}
											}
											else
											{
													clearInterval(restintervaltime);
													clearInterval(inttime);
											}
										},1000);
										
										// code for show rest timer
					}  // end  if
				}
			  },1000); 
    }

	
function playpausedefault(pagename) {
  
	 var video = $('#'+pagename+'_video')[0];


		if(video.paused && video.currentTime!=video.duration) 
	   {
		pauseflag=false;
        $('#buttonbar #play').css('background','url("images/pause.png") no-repeat scroll 0 0 transparent');
		startworkout("#"+pagename,videotime);

		
	   }
	   else if(video.paused && video.currentTime==video.duration && !state){
		 
			pauseflag=true;
			state=true;
            video.pause();
             $('#buttonbar #play').css('background','url("images/play_new.png") no-repeat scroll 0 0 transparent');

		
	   } 
	   	else if(video.paused && video.currentTime==video.duration && state){
			state=false;
             $('#buttonbar #play').css('background','url("images/pause.png") no-repeat scroll 0 0 transparent');
         startworkout("#"+pagename,videotime);
	   } 
	   
        else
        { 
			clearInterval(inttime);
			customflag = true;
            video.pause();
             $('#buttonbar #play').css('background','url("images/play_new.png") no-repeat scroll 0 0 transparent');
        }
}
function playpauserandom(pagename,pageIdArray)
 {
	   
	    var video = $('#'+pagename+'_video')[0];
		pageIdArray = pageIdArray.split(",");
		if(video.paused && video.currentTime!=video.duration) 
	   {
		 
		pauseflag=false;
        $('#buttonbar #play').css('background','url("images/pause.png") no-repeat scroll 0 0 transparent');
		randomworkoutplay(pageIdArray,pagename);
		
	   }
	   else if(video.paused && video.currentTime==video.duration && !state){
		 
			pauseflag=true;
			state=true;
            video.pause();
             $('#buttonbar #play').css('background','url("images/play_new.png") no-repeat scroll 0 0 transparent');
		
	   } 
	   	else if(video.paused && video.currentTime==video.duration && state){
			state=false;
             $('#buttonbar #play').css('background','url("images/pause.png") no-repeat scroll 0 0 transparent');
           randomworkoutplay(pageIdArray,pagename);
		
	   } 
	   
        else
        { 
			clearInterval(inttime);
			customflag = true;
            video.pause();
             $('#buttonbar #play').css('background','url("images/play_new.png") no-repeat scroll 0 0 transparent');
        }
	  
   	 
 }
 function playpausecustom(pagename,obj,i)
 {
	   
	    var video = $('#'+pagename+'_video')[0];
		
		if(video.paused && video.currentTime!=video.duration) 
	   {
		 
		pauseflag=false;
             $('#buttonbar #play').css('background','url("images/pause.png") no-repeat scroll 0 0 transparent');
		customvideoplay(obj,i,pagename);
		
	   }
	   else if(video.paused && video.currentTime==video.duration && !state){
		 
			pauseflag=true;
			state=true;
             $('#buttonbar #play').css('background','url("images/play_new.png") no-repeat scroll 0 0 transparent');
            video.pause();
	   } 
	   	else if(video.paused && video.currentTime==video.duration && state){
			state=false;
             $('#buttonbar #play').css('background','url("images/pause.png") no-repeat scroll 0 0 transparent');
      customvideoplay(obj,i,pagename);
		
	   } 
	   
        else
        { 
			clearInterval(inttime);
			customflag = true;
            video.pause();
             $('#buttonbar #play').css('background','url("images/play_new.png") no-repeat scroll 0 0 transparent');
        }
	  
   	 
 }
function startcustomexcercise(NextPrevPage,CurrentPage)
    {
       
	
	var resttime;
/* for get videotime */
		if($($('.workoutlength input:radio:checked')[0]).attr('id')=="radio2")
		{
			var videotime=30;
			resttime=10;
		}
		else if($($('.workoutlength input:radio:checked')[0]).attr('id')=="radio3")
		{
			var videotime=45;
			resttime=15;
		}
		else
		{	
			var videotime=60;
			resttime=20;
		}
        
		
						clearTimeout(timeout);
						var currvideo = $('#'+CurrentPage+'_video')[0];
						var nextvideo = $('#'+NextPrevPage+'_video')[0];
	
				
		if(currvideo.readyState!=0)
		{
          currvideo.currentTime = 0;
        }
			
						setTimeout(function(){
							window.plugins.html5Video.play($('#'+CurrentPage+'_video').attr("id"), function(video){
     				
     						});	
						},1000);
        
						$.mobile.changePage("#"+CurrentPage, {
										transition: "slide",
										reverse: true,
										changeHash: false
						});
		var stopfirst_counter=false;
		
		extra_time="init";
		stopallactivity=false;								// set flag to false for call function if its true then it will not call any function.
						
			$("#"+CurrentPage+" .remainingExercises").show();
			$("#"+CurrentPage+" .remainingExercisesCustom").hide();
						inttime=setInterval(function()
							{			
									 if(!stopfirst_counter)
										{	
											 $('#'+CurrentPage+' .remainimage').html(":"+Math.round(videotime-currvideo.currentTime));
										}
									 if(Math.round(currvideo.currentTime)==videotime || currvideo.currentTime==currvideo.duration)
										{
											if(Math.round(currvideo.duration)< videotime)
											{
													if(!stopfirst_counter){
														stopfirst_counter=true;
														timeout=setTimeout(function(){
															
																																
																		/* code start for show rest time clock */
													
													currvideo.pause();
													clearInterval(inttime);
													restintervaltime=setInterval(function(){		//Code For show Rest Time After each Excersice
														if(!stopallactivity)						// If Click on home page then stop all activity.
														{
																$('.loading').show();
																$('body').addClass('bodyloading');
																if(resttime>0)
																{
																	$('.resttimespan').html(resttime); 
																		resttime=resttime-1;
																}
																else
																{
																				clearInterval(restintervaltime);
																				clearInterval(inttime);
																				clearTimeout(timeout);
																			
																			$('.loading').hide();
																			$('body').removeClass('bodyloading');
																		// for check wether this is last li or not
																				if(NextPrevPage=="")
																				{
																						$.mobile.changePage("#workout_routine", {
																						transition: "slide",
																						reverse: true,
																						changeHash: false
																						});	
																						alert("Workout Completed.");
																				}
																				else
																				{
																				$('.'+NextPrevPage+'_li').trigger('click');		
																				}
																				
																}
														}
														else
														{
																	clearInterval(restintervaltime);
																				clearInterval(inttime);
																				clearTimeout(timeout);
														}
													},1000);	
														/* code end for show rest time clock */			
														
																		
																		
														},Math.round(videotime-currvideo.duration)*1000);	
													}
												
                                            if(extra_time=="init") // condition for check wether get duration or not
                                            {
                                            extra_time=Math.round(parseInt(videotime)-parseInt(currvideo.duration));
                                            extra_time = parseInt(extra_time-1);
                                            
                                            }
                                            else
                                            {
                                            extra_time = parseInt(extra_time-1);
                                            
                                            }
												if(extra_time>=0)
												{
													$('#'+CurrentPage+' .remainimage').html(":"+extra_time); 
												}
											}
											else
											{
																				/* code start for show rest time clock */
													
													currvideo.pause();
													clearInterval(inttime);
													restintervaltime=setInterval(function(){		//Code For show Rest Time After each Excersice
														
														
														if(!stopallactivity)						// If Click on home page then stop all activity.
														{
															
																$('.loading').show();
																$('body').addClass('bodyloading');
																if(resttime>0)
																{
																	$('.resttimespan').html(resttime); 
																		resttime=resttime-1;
																}
																else
																{
																			$('.loading').hide();
																			$('body').removeClass('bodyloading');
																				clearInterval(restintervaltime);
																				clearInterval(inttime);
																				
																				// for check wether this is last li or not
																				if(NextPrevPage=="")
																				{
																						$.mobile.changePage("#workout_routine", {
																						transition: "slide",
																						reverse: true,
																						changeHash: false
																						});	
																						alert("Workout Completed.");
																				}
																				else
																				{
																				$('.'+NextPrevPage+'_li').trigger('click');		
																				}	
																}
													}
													else
													{
																clearInterval(restintervaltime);
																clearInterval(inttime);
													}
													},1000);	
														/* code end for show rest time clock */		
													
																
											}
											
										}
									  },1000); 
						 
    }

 
function startExcercise() {
      if ($("#radio10").prop("checked")) 
		{
			customworkout();
		}
		else
		{
			    if ($("#radio2").prop("checked")) 
			{
				if($("#radio5").prop("checked"))
				{	$.mobile.changePage( "#Hip_Bridge", { transition: "slideup"} );
                    startworkout("#Hip_Bridge",30);

                    
				}
				else if($("#radio7").prop("checked"))
				{
					$.mobile.changePage( "#Opposite_Arm_and_Leg_Raise", { transition: "slideup"} );
                  	startworkout("#Opposite_Arm_and_Leg_Raise",30);
                   
				}
				else if($("#radio8").prop("checked"))
				{
					$.mobile.changePage( "#Spiderman_Planks", { transition: "slideup"} );
                    startworkout("#Spiderman_Planks",30);
                     
                }
				else if($("#radio9").prop("checked"))
				{
                    startrandomworkout(30);
	            }
			}
			else if($("#radio3").prop("checked"))
			{
				
			 	if($("#radio5").prop("checked")) 
				{
					$.mobile.changePage( "#Hip_Bridge", { transition: "slideup"} );
                   startworkout("#Hip_Bridge",45);
                   
                }
				else if($("#radio7").prop("checked"))
				{
					$.mobile.changePage( "#Opposite_Arm_and_Leg_Raise", { transition: "slideup"} );
                  	startworkout("#Opposite_Arm_and_Leg_Raise",45);
                     
				}
				else if($("#radio8").prop("checked"))
				{
					$.mobile.changePage( "#Spiderman_Planks", { transition: "slideup"} );
                     startworkout("#Spiderman_Planks",45);
                }
				else if($("#radio9").prop("checked"))
				{
                    startrandomworkout(45);
	            }
				
			}		
			
			else if($("#radio4").prop("checked"))
			{
				
			 	if($("#radio5").prop("checked")) 
				{					
					$.mobile.changePage( "#Hip_Bridge", { transition: "slideup"} );
					   startworkout("#Hip_Bridge",60);
                    
                }
				else if($("#radio7").prop("checked"))
				{
					$.mobile.changePage( "#Opposite_Arm_and_Leg_Raise", { transition: "slideup"} );
					  	startworkout("#Opposite_Arm_and_Leg_Raise",60);
				}
				else if($("#radio8").prop("checked"))
				{
					$.mobile.changePage( "#Spiderman_Planks", { transition: "slideup"} );
					  startworkout("#Spiderman_Planks",60); 
				}
				else if($("#radio9").prop("checked"))
				{
                    startrandomworkout(60);
	            }
			}	
		}
} // function end

function startworkoutlist() {
       
   			if ($("#radio2").prop("checked")) 
			{
				if($("#radio5").prop("checked"))
				{
					$.mobile.changePage( "#workout_list1", { transition: "slideup"} );
                  	startworkout("#workout_list1",30);
				}
				else if($("#radio7").prop("checked"))
				{
					$.mobile.changePage( "#workout_list2", { transition: "slideup"} );
                  	startworkout("#workout_list2",30);
				}
				else if($("#radio8").prop("checked"))
				{
					$.mobile.changePage( "#workout_list3", { transition: "slideup"} );
                   	startworkout("#workout_list3",30);
                }
                else if($("#radio10").prop("checked"))
				{
					$.mobile.changePage( "#custom_workout", { transition: "slideup"} );
                    startworkout("#custom_workout",30);   
				}
               
			}

			
			else if($("#radio3").prop("checked"))
			{
				
			 	if($("#radio5").prop("checked")) 
				{
					$.mobile.changePage( "#workout_list1", { transition: "slideup"} );
                 	startworkout("#workout_list1",45);
                }
				else if($("#radio7").prop("checked"))
				{
					$.mobile.changePage( "#workout_list2", { transition: "slideup"} );
                    startworkout("#workout_list2",45);
				}
				else if($("#radio8").prop("checked"))
				{
					$.mobile.changePage( "#workout_list3", { transition: "slideup"} );
                	startworkout("#workout_list3",45);
                }
                else if($("#radio10").prop("checked"))
				{
					$.mobile.changePage( "#custom_workout", { transition: "slideup"} );
                    startworkout("#custom_workout",45);
				}
                
			}		
			
			else if($("#radio4").prop("checked"))
			{
				
			 	if($("#radio5").prop("checked")) 
				{					
					$.mobile.changePage( "#workout_list1", { transition: "slideup"} );
					  startworkout("#workout_list1",60);
                    
                }
				else if($("#radio7").prop("checked"))
				{
					$.mobile.changePage( "#workout_list2", { transition: "slideup"} );
					  startworkout("#workout_list2",60);
				}
				else if($("#radio8").prop("checked"))
				{
					$.mobile.changePage( "#workout_list3", { transition: "slideup"} );
					  startworkout("#workout_list3",60);
				}
                else if($("#radio10").prop("checked"))
				{
					$.mobile.changePage( "#custom_workout", { transition: "slideup"} );
                    startworkout("#custom_workout",60);
				}
			}	
 
}

