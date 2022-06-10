// schedule The page checks whether an empty prompt is displayed
checkshow();

// CheckLogin: the function of login (tutors can can log in by entering any email address and password)
function checklogin(){
	var login=document.login;
	var email=login.email.value;
	var password=login.password.value;
	if(email==''){
		showMsg('Please enter email');
		return false;
	}
	
	if(password==''){
		showMsg('Please enter password');
		return false;
	}
	

	showMsg('Login successful');
	toUrl('discovery.html');
	return false;
}

// checkSearch: the function of searchbar, users can search the resources they need from here
function checkSearch(){
	var search=document.search;
	var keyword=search.keyword.value;
	if(keyword==''){
		showMsg('Please enter keywords');
		return false;
	}else{
		$('.discovery .result').show();
	}
	return false;
}


// schedule: the function od schedule, users can add their classes and assignment arrangement from here
var fm;
function postdata(){
	var flag=checkEmpty();
	
	var fm=document.dataform;
	if(flag){
		var type=$('.send').attr('data-type');
		if(type=='add'){
			let Vtime=fm.time.value;
			let Vclass=fm.class.value;
			let Vevent=fm.event.value;
			let Vlate=fm.late.value;
			let Vearly=fm.early.value;
			
			var str=`
				<tr>
					<td class="class">${Vclass}</td>
					<td class="event">${Vevent}</td>
					<td class="late">${Vlate}</td>
					<td class="early">${Vearly}</td>
					<td class="time">${Vtime}</td>
					<td><a href="javascript:;" onclick="showAdd('edit')">Edit</a><a href="javascript:;" class="del">Delete</a></td>
				</tr>
			`;
			
			$('.schedule .table tbody').append(str);
			$('.schedule .list').show();
			$('.schedule .msg').hide();
		}else{
			let obj=$('.schedule table tbody tr').eq(num);
			obj.find('.time').html(fm.time.value);
			obj.find('.class').html(fm.class.value);
			obj.find('.event').html(fm.event.value);
			obj.find('.late').html(fm.late.value);
			obj.find('.early').html(fm.early.value)
		}
		
		hideAdd();
	}
	return false;
}

//A function that verifies whether it is empty 
function checkEmpty(){
	let fm=document.dataform;
	let Vtime=fm.time.value;
	let Vclass=fm.class.value;
	let Vevent=fm.event.value;
	let Vlate=fm.late.value;
	let Vearly=fm.early.value;
	
	if(Vtime==''){
		showMsg('Please select a time');
		return false;
	}
	if(Vclass==''){
		showMsg('Please enter class');
		return false;
	}
	if(Vevent==''){
		showMsg('Please enter event');
		return false;
	}
	if(Vlate==''){
		showMsg('Please enter late start');
		return false;
	}
	if(Vearly==''){
		showMsg('Please enter Early Release');
		return false;
	}
	
	return true;
}
//Add close button
$('#close').click(function(){
	hideAdd();
});

// Open the Form popover
var num;
function showAdd(type){
	if(type=='add'){
		$('.dataform .send').attr('data-type','add');
		clearForm(type,null);
	}
	
	if(type=='edit'){
		$('.dataform .send').attr('data-type','edit');
		$('.schedule table tbody tr').click(function(){
		 	num=$(this).index();
			clearForm(type,num);
		});
	}

	$('.dataform').show();
}
//the function of close windows
function hideAdd(){
	$('.dataform').hide();
}

//Clear form data or assign values
function clearForm(type,num){
	var fm=document.dataform;
	if(type=='add'){
		fm.time.value='';
		fm.class.value='';
		fm.event.value='';
		fm.late.value='';
		fm.early.value='';
	}
	
	if(type=='edit'){
		var obj=$('.schedule tbody tr');
		fm.time.value=obj.eq(num).find('.time').html();
		fm.class.value=obj.eq(num).find('.class').html();
		fm.event.value=obj.eq(num).find('.event').html();
		fm.late.value=obj.eq(num).find('.late').html();
		fm.early.value=obj.eq(num).find('.early').html();
	}
}
//the buttom of deleting
$('.schedule table tbody').on('click','.del',function(event){
	$(this).parent().parent().remove();
	checkshow();
	event.stopPropagation();
});
//Whether to display an empty function
function checkshow(){
	var len=$('.schedule table tbody tr').length;
	if(len > 0){
		$('.schedule .list').show();
		$('.schedule .msg').css('display','none');
	}else{
		$('.schedule .list').hide();
		$('.schedule .msg').css('display','flex');
	}
}

// task tab
$('.tasks .nav li').click(function(){
	let index=$(this).index();
	$(this).addClass('act').siblings().removeClass('act');
	if(index==1){
		$('.tasks .list .red').hide();
	}else{
		$('.tasks .list .red').show();
	}
});


// showMsg
function showMsg(msg,time='2000'){
	$('.showMsg').html(msg).show();
	setTimeout(function(){
		$('.showMsg').hide();
	},time);
}


// url 
function toUrl(url){
	setTimeout(function(){
		window.location.href=url;
	},3000)
}


//studying mode positive timing function
$('.remider .nav li').click(function(){
	let index=$(this).index();
	$(this).addClass('act').siblings().removeClass('act');
	$('.remider .box .dl').eq(index).show().siblings().hide();
});

var oneI=0;
var oneS=0;
var oneTime=null;
var onestatu="start";
var twoI=59;
var twoS=60;
var twoTime=null;
var twostatu="start";
$('.remider .dl01 ul li:eq(0)').click(function(){
	if(onestatu=='start'){
		oneTime=setInterval(onelock,1000);
		onestatu='stop';
		$(this).find('i').removeClass('icon-24gf-play').addClass('icon-zanting');
	}else{
		clearInterval(oneTime);
		$(this).find('i').removeClass('icon-zanting').addClass('icon-24gf-play');
		onestatu='start';
	}
});

function onelock(){
	oneS++;
	if(oneS=='60'){
		oneI++;
		oneS=0;
	}
	
	if(oneI < 10){
		oneI_str='0'+oneI;
	}else{
		oneI_str=oneI;
	}
	if(oneS==60){
		oneS_str='00';
	}else if(oneS < 10){
		oneS_str='0'+oneS;
	}else{
		oneS_str=oneS;
	}
	
	if(oneI==60){
		oneI=0;
		oneS=0;
	}
	
	$('.remider .dl01 span:eq(0)').html(oneI_str);
	$('.remider .dl01 span:eq(2)').html(oneS_str);
}

$('.remider .dl01 ul li:eq(1)').click(function(){
	clearInterval(oneTime);
	oneI=0;
	oneS=0;
	oneTime=null;
	onestatu="start";
	
	$('.remider .dl01 span:eq(0)').html('00');
	$('.remider .dl01 span:eq(2)').html('00');
	$('.remider .dl01 ul li:eq(0)').find('i').removeClass('icon-zanting').addClass('icon-24gf-play');
});

//Longbreak's countdown feature
$('.remider .dl02 ul li:eq(0)').click(function(){
	if(twostatu=='start'){
		twoTime=setInterval(twolock,1000);
		twostatu='stop';
		$(this).find('i').removeClass('icon-24gf-play').addClass('icon-zanting');
	}else{
		clearInterval(twoTime);
		$(this).find('i').removeClass('icon-zanting').addClass('icon-24gf-play');
		twostatu='start';
	}
});

function twolock(){
	twoS--;
	if(twoS==0){
		twoI--;
		twoS=60;
	}
	
	var twoS_str;	
	if(twoS==60){
		twoS_str='00';
	}else if(twoS < 10){
		twoS_str='0'+twoS;
	}else{
		twoS_str=twoS;
	}
	
	var twoI_str;
	if(twoI < 10){
		twoI_str='0'+twoI
	}else{
		twoI_str=twoI
	}
	
	if(twoI < 0){
		twoI==59;
		twoS==60;
	}
	
	$('.remider .dl02 span:eq(0)').html(twoI_str);
	$('.remider .dl02 span:eq(2)').html(twoS_str);
}

$('.remider .dl012 ul li:eq(1)').click(function(){
	clearInterval(twoTime);
	twoI=59;
	twoS=59;
	twoTime=null;
	twostatu="start";
	
	$('.remider .dl02 span:eq(0)').html('00');
	$('.remider .dl02 span:eq(2)').html('00');
	$('.remider .dl02 ul li:eq(0)').find('i').removeClass('icon-zanting').addClass('icon-24gf-play');
});

$('.remider .dl02 ul li:eq(1)').click(function(){
	clearInterval(twoTime);
	twoI=59;
	twoS=60;
	twoTime=null;
	twostatu="start";
	
	$('.remider .dl02 span:eq(0)').html('60');
	$('.remider .dl02 span:eq(2)').html('00');
	$('.remider .dl02 ul li:eq(0)').find('i').removeClass('icon-zanting').addClass('icon-24gf-play');
});


var sted=1;
$('.showMen span').click(function(){
	if(sted==1){
		$('.bodyleft').css('left','0');
		$('.showMen').css('left','160px');
		sted=2;
	}else{
		$('.bodyleft').css('left','-160px');
		$('.showMen').css('left','0px');
		sted=1;
	}
});

// function of musicplayer
var audioObj=null; 
var mpArr=['01.mp3','02.mp3']; //the music files
var mpLen=mpArr.length;
var curr=0;
$('.mp .cd').click(function(){
	let url='img/'+mpArr[curr];
	if(audioObj==null){
		newAudio(url);
	}else if(audioObj.paused){
		audioObj.play();
	}else{
		audioObj.pause();
	}
	mpIcon();
});

function newAudio(url) {
	if(!audioObj){
		audioObj = new Audio();
	}
	audioObj.src=url;
	audioObj.autoplay = true;
	audioObj.loop = true;
	audioObj.play();
}

$('.upper').click(function(){
	curr--
	if(curr < 0){
		curr=mpLen-1;
	}
	let url='file/'+mpArr[curr];
	newAudio(url);
	mpIcon();
});

$('.lower').click(function(){
	curr++
	if(curr > mpLen-1){
		curr=0;
	}
	let url='file/'+mpArr[curr];
	newAudio(url);
	mpIcon();
});
// the icons of musicplayer
function mpIcon(){
	if(audioObj.paused){
		$('.mp .cd i').removeClass('icon-zanting').addClass('icon-24gf-play');
		$('.mp .cd img').removeClass('rat');
	}else{
		$('.mp .cd i').removeClass('icon-24gf-play').addClass('icon-zanting');
		$('.mp .cd img').addClass('rat');
	}
}