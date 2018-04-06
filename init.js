$(document).ready(function () {

    //set margin of absolutely positioned controls to be half of the window width 
    windowWidth = $(window).width();
    controlWidth = ($('#controls').outerWidth());
    controlMargin = (windowWidth / 2) - (controlWidth / 2);
    $('#controls').css('left', '' + controlMargin + 'px');
	
    font = new Array(12);
    font[0] = "'IconicStroke'";
    font[1] = "Arial, sans-serif";
    font[2] = "'Arial Black', sans-serif";
    font[3] = "'Bookman Old Style', serif";
    font[4] = "'Comic Sans MS', cursive";
    font[5] = "Courier, monospace";
    font[6] = "Garamond, serif";
    font[7] = "Geneva, serif";
    font[8] = "Georgia, serif";
    font[9] = "'Helvetica Neue',Helvetica, sans-serif";
    font[10] = "Tahoma, sans-serif";
    font[11] = "'Times New Roman', Times, sans-serif";
    font[12] = "Verdana, sans-serif";
 
//create jQuery UI Elements
  
    fontSize = $('#fontSize').val();
  	fontSet=font[$('#font').val()];
    fontPadding=$('#fontPadding').val();
    fontColor=$('#fontColor').val();

    height = $('#height').val();
    heightGradientMin = $('#heightGradientMin').val();
    heightGradientMax = $('#heightGradientMax').val();
   	shadowOpacity = $('#shadowOpacity').val();
   	fontColor = $('#fontColor').val();
   	backgroundColor = $('#backgroundColor').val();
    $('.3DText').css('color', ''+fontColor+'');	
    $('#colorInner').css('backgroundColor', ''+fontColor+'');
    $('body').css('background-color', ''+backgroundColor+'');
    $('#colorInner2').css('backgroundColor', ''+backgroundColor+'');
    $('.fontColor').text(''+fontColor+'');

    $('#colorInner').ColorPicker({
   		color:fontColor,
   		
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('.3DText').css('color', '#' + hex);
            $('#colorInner').css('backgroundColor', '#' + hex);
            $('#fontColor').val('#' + hex);
            $('.fontColor').empty().text('#' + hex);
            textShadow();
        }
    });

    $('#colorInner2').ColorPicker({
        color: backgroundColor,
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('body').css('background-color', '#' + hex);
            $('#colorInner2').css('backgroundColor', '#' + hex);
            $('#backgroundColor').val('#' + hex);
           $('.backgroundColor').text('#' + hex);
            textShadow();
        }

    });
    
    function changeFont(){
    		fontSet=font[$('#font').val()];
    		fontVal=$('#font').val();
			 fontSize = $('#fontSize').val();
    		if (fontVal==0){
    			fontPadding=20;
    			$("#fontMessage").show();
    		}
    		else{
    			fontPadding=0;
    			$("#fontMessage").hide();
    		}
    		    		
    		$("#fontSizeSlider").slider("value", fontSize);
    		$("#fontSize").val(fontSize);
			$('.3DText').css('font-size',''+fontSize+'px');
       	    $('.3DText').css('font-family', '' + fontSet + '');
       	    $('.3DText').css('padding-bottom',''+fontPadding+'px');
       	    $('.fontFamily').text(fontSet);
       	    $('h1').removeClass('hide');
    }changeFont();
   	
   	$("#font").change(function() {
    	changeFont();
    });
	
    function resetDefaults() {
        $('#font').val(6);
        $('#fontSize').val(134);
        fontSize=  134;
        $('#fontPadding').val(0);
        $('#angle').val(315);
        $('#height').val(6);
        $("#fontSizeSlider").slider("value", 134);
        $("#fontHeightSlider").slider("value", 9);
        $("#heightGradientMin").val(10);
        $("#heightGradientMax").val(87);
        $("#heightGradientSlider").slider('values', 0, 10);
        $("#heightGradientSlider").slider('values', 1, 87);
        $("#shadowOpacity").val(.6);
        $("#shadowOpacitySlider").slider("value", .6);
		
		/*colors*/
        $('#colorInner').ColorPickerSetColor('#ffffff').css('background-color', '#ffffff');
        $('#colorInner2').ColorPickerSetColor('#ad0303').css('background-color', '#ad0303');
        $('#fontColor').val('#ffffff');
        $('#backgroundColor').val('#ad0303');
        $('body').css('background-color', '#ad0303');
        $('.3DText').css('color', '#ffffff');
        $('.3DText').css('font-size', '124px');
        $('.3DText').css('paddingBottom', '0px');
        $('#check3,#check2').removeAttr('checked');
        $('.3DText').removeClass('underline italic bold');
        changeFont();
        textShadow();
 
    }resetDefaults();
 
    $("#fontSizeSlider").slider({
        range: "min",
        value: fontSize,
        min: 10,
        max: 400,
        slide: function (event, ui) {
            $("#fontSize").val(ui.value);
            textShadow();
        }
    });
    $("#fontSize").val($("#fontSizeSlider").slider("value"));

    $("#fontHeightSlider").slider({
        range: "min",
        value: height,
        min: 1,
        max: 20,
        slide: function (event, ui) {
            $("#height").val(ui.value);
            textShadow();
        }
    });
    $("#height").val($("#fontHeightSlider").slider("value"));

    $("#heightGradientSlider").slider({
        range: true,
        min: 0,
        max: 255,
        values: [heightGradientMin, heightGradientMax],
        slide: function (event, ui) {
            $("#heightGradientMin").val(ui.values[0]);
            $("#heightGradientMax").val(ui.values[1]);

            textShadow();
        }
    });
    $("#heightGradientMin").val($("#heightGradientSlider").slider("values", 0));
    $("#heightGradientMax").val($("#heightGradientSlider").slider("values", 1));

    $("#shadowOpacitySlider").slider({
        range: "min",
        min: 0,
        max: 1,
        step: .05,
        value: shadowOpacity,
        slide: function (event, ui) {
            $("#shadowOpacity").val(ui.value);
            textShadow();

        }
    });
    $("#shadowOpacity").val($("#shadowOpacitySlider").slider("value"));

    //create jQuery UI Interactions
    $("#controls").draggable({
        containment: "body",
        handle: ".move"
    });
    //	$( ".3DText" ).draggable({containment: [0,0,1265,2000], handle:".editorMove" });	

    //More Interactions
    //button events for sizing the control box
    $(".minimize").live('click', function () {
        $(this).effect("highlight", {
            color: '#a30000'
        }, 500);
        $("#controlsInner").animate({
            height: '20',
            width: '80'
        });
        $(".minimize a").text('+');
        $(".minimize").removeClass('minimize').addClass('maximize');
    });

    $(".maximize").live('click', function () {
        $(this).effect("highlight", {
            color: '#a30000'
        }, 500);
        scrollHeight = $("#controlsInner2")[0].scrollHeight;
        $("#controlsInner").animate({
            height: '' + scrollHeight + '',
            width: '500'
        });
        $(".maximize a").text('-');
        $(".maximize").removeClass('maximize').addClass('minimize');
    });

    //interactions for the buttons
    $('.reset').click(function () {
        resetDefaults();
        $(this).effect("highlight", {
            color: '#a30000'
        }, 500);
	  $('#resetMessage').show('slow', function() {
			$('#resetMessage').delay(1000).hide('slow')
 	 });
 	 
     });
    $('.close').click(function () {
    	 $(this).effect("highlight", {
            color: '#a30000'
        }, 500);
        $('footer').fadeOut();
 	 });
 	 
    $('#check1').change(function () {
        fontStyle();
    });

    $('#check2').change(function () {
        fontStyle();
    });

    $('#check3').change(function () {
        fontStyle();
    });    
    
    function fontStyle(){
    	
    	boldCheck = $('#check1').attr('checked'); 
      	italicCheck = $('#check2').attr('checked'); 
    	underlineCheck = $('#check3').attr('checked'); 
       		$('.fontWeight, .fontStyle, .textDecoration').remove();

    	if(boldCheck==true){
       		$('.3DText').css('font-weight','bold');
       		$('.fontStyles').append('<span class="fontWeight">font-weight:bold;<br/></span>')
       		
    	} 
    	
    	else {
       		$('.3DText').css('font-weight','normal');
       		$('.fontWeight').remove();
    	} 
    	
    	if(italicCheck==true){
       		$('.3DText').css('font-style','italic');
       		$('.fontStyles').append('<span class="fontStyle">font-style:italic;<br/></span>')
       		
    	} 
    	
    	else{
    		$('.3DText').css('font-style','normal');
       		$('.fontStyle').remove();
    	
    	}
    	
    	if(underlineCheck==true){
       		$('.3DText').css('text-decoration','underline');
       		$('.fontStyles').append('<span class="textDecoration">text-decoration:underline;<br/></span>')
       		
    	} 
    	
    	else{
    		$('.3DText').css('text-decoration','none');
       		$('.textDecoration').remove();
    	}
        	
    }fontStyle(); 

    $('#angle, #fontSize').change(textShadow);

    function textShadow() {
        //get the selections from the controls
        height = parseInt($('#height').val());
        angle = $('#angle').val();
       	fontsize=$('#fontSize').val();

        heightGradientMin = $('#heightGradientMin').val();
        heightGradientMax = $('#heightGradientMax').val();
        shadowOpacity = $('#shadowOpacity').val();

        //set the font based on select
        //Display download for Iconic Font  
 
        if (angle == 0 || angle == 360) {
            $('#gradient').css('background-image', '-moz-linear-gradient(0% 100% 0deg,transparent, #000000)').css('background-image', '-webkit-gradient(linear, 0% 0%, 100% 0%, from(transparent), to(#000000))');
        } else if (angle == 45) {
            $('#gradient').css('background-image', '-moz-linear-gradient(0% 100% 45deg,transparent, #000000)').css('background-image', '-webkit-gradient(linear, 0% 100%, 100% 0%, from(transparent), to(#000000))');
        } else if (angle == 90) {
            $('#gradient').css('background-image', '-moz-linear-gradient(0% 100% 90deg,transparent, #000000)').css('background-image', '-webkit-gradient(linear, 100% 100%, 100% 0%, from(transparent), to(#000000))');
        } else if (angle == 135) {
            $('#gradient').css('background-image', '-moz-linear-gradient(0% 100% 315deg,#000000, transparent)').css('background-image', '-webkit-gradient(linear, 100% 100%, 0% 0%, from(transparent), to(#000000))');
        } else if (angle == 180) {
            $('#gradient').css('background-image', '-moz-linear-gradient(0% 100% 360deg,#000000, transparent)').css('background-image', '-webkit-gradient(linear, 100% 0%, 0% 0%, from(transparent), to(#000000))');
        } else if (angle == 225) {
            $('#gradient').css('background-image', '-moz-linear-gradient(0% 100% 45deg,#000000, transparent)').css('background-image', '-webkit-gradient(linear, 40% 0%, 0% 100%, from(#333), to(#000000))');

        } else if (angle == 270) {
            $('#gradient').css('background-image', '-moz-linear-gradient(90deg, #000000, transparent 100%)').css('background-image', '-webkit-gradient(linear, 0% 0%, 0% 100%, from(transparent), to(#000000))');
        } else if (angle == 315) {
            $('#gradient').css('background-image', '-moz-linear-gradient(100% 100% 135deg,#000000, transparent)').css('background-image', '-webkit-gradient(linear, 0% 0%, 100% 100%, from(transparent), to(#000000))');
        }

        //SHADOWS
        //set string variables
        string2 = '';
        shadowStringSum = '';
        //Height gradient colors
        percentFade = 1 / height;
        percentFadeIncrement = percentFade;
        
        shadowStrokeOpacity = .5;

        startColorred = (parseInt($('.colorpicker_rgb_r input').val())) - heightGradientMin;
        endColorred = startColorred - heightGradientMax;

        startColorgreen = parseInt($('.colorpicker_rgb_g input').val()) - heightGradientMin;
        endColorgreen = startColorgreen - heightGradientMax;

        startColorblue = parseInt($('.colorpicker_rgb_b input').val()) - heightGradientMin;
        endColorblue = startColorblue - heightGradientMax;

        for (i = 0; i <= height; i++) {

            if (angle == 0 || angle == 360) {
                x = i;
                y = 0;
                xshadow = height + 1;
                yshadow = 0;

            } else if (angle == 45) {
                x = i;
                y = -i;
                xshadow = height + 1;
                yshadow = -(height + 1);

            } else if (angle == 90) {
                x = 0;
                y = -i;
                xshadow = 0;
                yshadow = -(height + 1);
            } else if (angle == 135) {
                x = -i;
                y = -i;
                xshadow = -(height + 1);
                yshadow = -(height + 1);

            } else if (angle == 180) {
                x = -i;
                y = 0;
                xshadow = -(height + 1);
                yshadow = 0;

            } else if (angle == 225) {
                x = -i;
                y = i;
                xshadow = -(height + 1);
                yshadow = height + 1;

            } else if (angle == 270) {
                x = 0;
                y = i;
                xshadow = 0;
                yshadow = height + 1;

            } else if (angle == 315) {
                x = i;
                y = i;
                xshadow = height + 1;
                yshadow = height + 1;

            }

            //Shadow Colors
            var diffRed = endColorred - startColorred;
            var diffGreen = endColorgreen - startColorgreen;
            var diffBlue = endColorblue - startColorblue;

            diffRed = Math.round((diffRed * percentFade) + startColorred);
            diffGreen = Math.round((diffGreen * percentFade) + startColorgreen);
            diffBlue = Math.round((diffBlue * percentFade) + startColorblue);

            if (i < height) {

                //color
                string = '' + x + 'px ' + y + 'px 0 rgb(' + diffRed + ',' + diffGreen + ',' + diffBlue + '),';
                string2 = string2 + string;
                percentFade = percentFade + percentFadeIncrement;
            } else {
                //first stroke shadow
                shadowStrokeString = '' + xshadow + 'px ' + yshadow + 'px 1px rgba(0,0,0,' + shadowStrokeOpacity + '),';

                //Outer Glow
                if (x == 0) {
                    glowBlur = Math.abs(y);
                } else {
                    glowBlur = Math.abs(x);
                }

                shadowGlow = '0px 0px ' + glowBlur + 'px rgba(0,0,0,.2)';
                shadowString = '' + xshadow + 'px ' + yshadow + 'px ' + height + 'px rgba(0,0,0,' + shadowOpacity + '),';
                string = '' + x + 'px ' + y + 'px  0 rgb(' + diffRed + ',' + diffGreen + ',' + diffBlue + '),'
                string2 = string2  + '\n' + string + shadowString + shadowStrokeString + shadowGlow;
            }
        }
   
        //Write Code Area	
        $('.3DText').css('text-shadow', '' + string2 + '');
        $('.3DText').css('font-size', '' + fontsize + 'px');
        $('.code').text(string2);
        $('.fontSize').text(fontsize + 'px');
        $('.fontFamily').text(fontSet);
        
}textShadow();
    
$('.throbber').fadeOut('slow', function() {
$('#controls').fadeIn();
});
	
});