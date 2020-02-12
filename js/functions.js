
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

/*自定义代码段*/
var getMusicURL = "http://www.xsky.vip/music.php";
var musicbaseurl = "http://www.xsky.vip/music/";
var playing = false;
var showBK = false;
var offsetX,offsetY,garden;

$(function(){
	var firstscreenwidth=document.body.offsetHeight;
	
	$('#firstScreen').css('margin-left',$(window).width()/2-35);
	$('#text').css('margin-top',$(window).height()/2-450);
	$('#text').fadeIn(5000,function(){
		$('#firstScreen').fadeOut(6000,function(){
			$('#mainDiv').fadeIn(1000,function(){setupGarden()})
		});
	});
	/*
	$('#firstScreen').css('padding-left',clientWidth/2-50);
	var txt="春水初生，春林初盛。春风十里，不如你。"
	var ftext=document.getElementById('firstText');
	var cnt=0
	var writer=window.setInterval(function(){
		if (++cnt<=txt.length)
		{
			ftext.innerHTML=txt.substring(0,cnt);
		}
		else{
			window.clearInterval(writer);
			$("#firstScreen").fadeOut(5000,function(){
				$('#mainDiv').fadeIn(1000,function(){setupGarden()})
			});
		}
	},400);
	*/
});

document.addEventListener("touchstart", function (myevent) {
	/*$("#fpath")[0].src=musicbaseurl+"0.mp3";
	$("#bgmusic")[0].load();
	$("#bgmusic")[0].pause();
	*/
	initplayer();
	//playmusic();
});
function initplayer() {
	var bg = $("#bgmusic")[0];
	$("#fpath")[0].src = musicbaseurl + "1.mp3";
	bg.load();
	bg.volume = 0;
	bg.play();
	bg.pause();
}
function playmusic() {
	//initplayer();
	var bgaudio = document.getElementById('bgmusic');
	bgaudio.volume = 0.2;
	var musictotal = 8;
	var musicid = Math.floor(Math.random() * musictotal);
	if (bgaudio.ended) { playing = false; }
	if (!playing) {

		//var$("#bgmusic")[0].load()

		/*var musicurl=musicbaseurl+musicid+".mp3";
		document.getElementById("fpath").src=musicurl;
		bgaudio.volume=0.2;
		bgaudio.load();
		bgaudio.play();
		playing=true;
		*/
		$.get(getMusicURL, function (data) {
			$("#fpath")[0].src = data;
			//$("#loveu")[0].innerHTML=data;
			var bgmusic = document.getElementById("bgmusic");
			console.log(bgmusic);
			bgmusic.load();
			bgmusic.play();

			playing = true;
		});

	}
	else {
		bgaudio.pause();
		playing = false;
	}
	//显示背景图片
	if (!showBK) {
		$("#bkimg").fadeIn("normal",function(){
		//	$('#messages-bottom').css("top", $("#bkimg").height() + 0);
			$("#messages-bottom").fadeIn("normal");
		});
		//$('#mainDiv').css("position","static");
		$("#content").fadeOut("normal");
		
		showBK=true;
	}

}

/*以上*/

function setupGarden() {
	// setup garden
	$loveHeart = $("#loveHeart");
	offsetX = $loveHeart.width() / 2;
	offsetY = $loveHeart.height() / 2 - 55;
	$garden = $("#garden");
	gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
	gardenCanvas.height = $("#loveHeart").height()
	gardenCtx = gardenCanvas.getContext("2d");
	gardenCtx.globalCompositeOperation = "lighter";
	garden = new Garden(gardenCtx, gardenCanvas);

	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

	// renderLoop
	setInterval(function () {
		garden.render();
	}, Garden.options.growSpeed);

	offsetX = $("#loveHeart").width() / 2;
	offsetY = $("#loveHeart").height() / 2 - 55;
	together = new Date();
	together.setFullYear(2017, 4, 28);
	together.setHours(8);
	together.setMinutes(6);
	together.setSeconds(0);
	together.setMilliseconds(0);

	if (!document.createElement('canvas').getContext) {
		var msg = document.createElement("div");
		msg.id = "errorMsg";
		msg.innerHTML = "Your browser doesn't support HTML5!<br/>Recommend use Chrome 14+/IE 9+/Firefox 7+/Safari 4+";
		document.body.appendChild(msg);
		$("#code").css("display", "none")
		$("#copyright").css("position", "absolute");
		$("#copyright").css("bottom", "10px");
		document.execCommand("stop");
	} else {
		setTimeout(function () {
			startHeartAnimation();
		}, 500);

		timeElapse(together);
		setInterval(function () {
			timeElapse(together);
		}, 500);
		
					adjustCodePosition();
					$("#code").typewriter();
		
	}
}

$(window).resize(function () {
	var newWidth = $(window).width();
	var newHeight = $(window).height();
	if (newWidth != clientWidth && newHeight != clientHeight) {
		location.replace(location);
	}
});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var hScale = 1.4;
	var x = hScale * 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = hScale * - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
	var interval = 50;
	var angle = 10;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 30) {
			clearInterval(animationTimer);
			showMessages();
		} else {
			angle += 0.15;
		}
	}, interval);
}

(function ($) {
	$.fn.typewriter = function () {
		this.each(function () {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function () {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(date) {
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = "<span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 小时 <span class=\"digit\">" + minutes + "</span> 分 <span class=\"digit\">" + seconds + "</span> 秒";
	$(".elapseClock").html(result);
}

function showMessages() {
	adjustWordsPosition();
	$('#messages').fadeIn(5000, function () {
		showLoveU();

	});
}

function adjustWordsPosition() {
	$('#words').css("position", "absolute");
	$('#words').css("top", $("#garden").position().top + 195);
	$('#words').css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
	$('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}

function showLoveU() {
	$('#loveu').fadeIn(5000);
}
