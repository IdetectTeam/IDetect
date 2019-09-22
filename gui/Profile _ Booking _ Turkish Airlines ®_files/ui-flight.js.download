//     Eteration UI 1.0
//     (c) 2014 Eteration A.S.
//     http://eteration.com

define(['jquery', 'knockout', 'eteration/widgets/widget-util', 'moment', 'eteration/eteration-i18n', 'excanvas', 'humanize-duration'], function($, ko,widgetUtil,m,i18n){
	
	widgetUtil.setupStringBasedTemplate(ko);
	
	var bufferwidth = 300;
	var grid = true;

	function relMouseCoords(canvas, event) {
	    var curleft = 0, curtop = 0;
	    if (canvas.offsetParent) {
	        do {
	            curleft += canvas.offsetLeft;
	            curtop += canvas.offsetTop;
	        } while (canvas = canvas.offsetParent);
	        return { x: event.pageX - curleft, y: event.pageY - curtop };
	    }
	    return undefined;    		    
	}
	  
	$(document).on({
		mouseenter: function(){
			$(this).addClass('active');
			$($(this).attr('data-target')).show();
		},
		mouseleave: function(){
			$(this).removeClass('active');
			$($(this).attr('data-target')).hide();
		}
	}, '.showcanvasoverlay');


    ko.bindingHandlers["flightChart"] = {
    		
    	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    		
			var options = ko.utils.unwrapObservable(valueAccessor());
			var flightData = options.flightData;
			var mobileCanvas = options.mobileCanvas;
			var segments = flightData.segments;
			var canvas = options.canvasId ? $( '#' + options.canvasId ) : $(element);
			var activeSegment = options.activeSegment;
			var timeframe = options.timeframe || {};
			var isoDTEnabled = !options.isoDTDisabled;

			//check flight for airport transfer
			flightData.segments.forEach(function(key, val) {
				if(flightData.segments.length > 1 && val < flightData.segments.length - 1 && key.destinationAirport.code != flightData.segments[val + 1].originAirport.code) {
					key.transferPortNotSame = true;	
				}
			});
			
			var flightId = options.flightId || "0";
			
			var extractDataFromFlightData = function(flightData){
				
				var firstSegment = flightData.firstSegment;
				var lastSegment = flightData.lastSegment;
				
				var departureDateTimeISO = isoDTEnabled && firstSegment.departureDateTimeISO;
				var arrivalDateTimeISO = isoDTEnabled && lastSegment.arrivalDateTimeISO;

				var departureCityName = i18n.get('portcitylookup.' + firstSegment.originAirport.code);
				var departurePortCode = firstSegment.originAirport.code;
				var departureDateTimeWithTimeZone = firstSegment.departureDateTime + firstSegment.departureDateTimeTimeZoneRawOffset;
				var departureTimeText = departureDateTimeISO ? departureDateTimeISO.hourMinuteLocal : moment.utc(departureDateTimeWithTimeZone).format("HH:mm");
				
				var arrivalCityName = i18n.get('portcitylookup.' + lastSegment.destinationAirport.code);
				var arrivalPortCode = lastSegment.destinationAirport.code;
				var arrivalDateTimeWithTimeZone = lastSegment.arrivalDateTime + lastSegment.arrivalDateTimeTimeZoneRawOffset;
				var arrivalTimeText = arrivalDateTimeISO ? arrivalDateTimeISO.hourMinuteLocal : moment.utc(arrivalDateTimeWithTimeZone).format("HH:mm");
				

				return {
					'departureCityName' : departureCityName,
					'departurePortCode' : departurePortCode,
					'departureTimeText' : departureTimeText,
					'departureDateTimeWithTimeZone' : departureDateTimeWithTimeZone,
					'departureDateTimeISO' : departureDateTimeISO,
					'arrivalCityName' : arrivalCityName,
					'arrivalPortCode' : arrivalPortCode,
					'arrivalTimeText' : arrivalTimeText,
					'arrivalDateTimeWithTimeZone' : arrivalDateTimeWithTimeZone,
					'arrivalDateTimeISO' : arrivalDateTimeISO,
					'totalTravelDurationISO' : flightData.totalTravelDurationISO
				};
				
			}
			
			
			
			var extractDataFromSegments = function(segment, nextSegment){
				
				var data =  {'sure' : 0, 'waitingDuration' : 0, 'waitingCity' : "" };
				
				if (segment) {
					if(isoDTEnabled && segment.arrivalDateTimeISO) {
						data.sure = (segment.arrivalDateTimeISO.epochMilisecondsUtc - segment.departureDateTimeISO.epochMilisecondsUtc)/60000;
					} else {
						data.sure = segment.flightDuration ? segment.flightDuration/60000 : ((segment.arrivalDateTime + segment.arrivalDateTimeTimeZoneRawOffset) - (segment.departureDateTime + segment.departureDateTimeTimeZoneRawOffset))/60000;
					}
					
					data.waitingCity = segment.destinationAirport.code;
				}
				
				if (segment && nextSegment) {
					if(isoDTEnabled && nextSegment.departureDateTimeISO && segment.arrivalDateTimeISO) {
						data.waitingDuration=(nextSegment.departureDateTimeISO.epochMilisecondsUtc - segment.arrivalDateTimeISO.epochMilisecondsUtc)/60000;
					} else {
						data.waitingDuration=((nextSegment.departureDateTime + nextSegment.departureDateTimeTimeZoneRawOffset) - (segment.arrivalDateTime + segment.arrivalDateTimeTimeZoneRawOffset) )/60/1000;
					}
					//check segment for airport transfer and set data for canvas
					if(segment.transferPortNotSame) {
						data.transferPortNotSame = segment.transferPortNotSame;
						data.waitingCityPort = nextSegment.originAirport.code;
					}
				}
				
				return data;
				
			}
			

			
			var extractedFlightData = extractDataFromFlightData(flightData);
			var firstSegmentData  = extractDataFromSegments(segments[0],segments[1]);
			var secondSegmentData  = extractDataFromSegments(segments[1],segments[2]);
			var thirdSegmentData  = extractDataFromSegments(segments[2],segments[3]);
			
			var dayChangeCount;
			if(isoDTEnabled && flightData.firstSegment.departureDateTimeISO) {
				dayChangeCount = flightData.lastSegment.arrivalDateTimeISO.epochDaysLocal - flightData.firstSegment.departureDateTimeISO.epochDaysLocal;
			} else {
				dayChangeCount = Math.floor((segments[segments.length-1].arrivalDateTime + segments[segments.length-1].arrivalDateTimeTimeZoneRawOffset)/8.64e7) - Math.floor((segments[0].departureDateTime + segments[0].departureDateTimeTimeZoneRawOffset)/8.64e7);
			}
			
			var drawCanvas = function() { ko.bindingHandlers["flightChart"].drawFlight(canvas[0], extractedFlightData, firstSegmentData, secondSegmentData, thirdSegmentData, timeframe, segments, flightId, activeSegment, dayChangeCount, mobileCanvas) }
			
			$(window).resize(drawCanvas);

			drawCanvas();
			
	  },
	  	  	 
	  drawFlight : function (canvas, extractedFlightData, firstSegmentData, secondSegmentData, thirdSegmentData, timeframe, segments, flightId, activeSegment, dayChangeCount, mobileCanvas) {
		  	
			// Canvas Parent Width
		    var context = canvas.getContext('2d');
		    
	        var devicePixelRatio = window.devicePixelRatio || 1;
	        
	        var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;

	        var ratio = devicePixelRatio / backingStoreRatio;

	        var parentWidth = $(canvas).parent().width();
	        var parentHeight = $(canvas).parent().height();

			var departureDateTimeWithTimeZone = extractedFlightData.departureDateTimeWithTimeZone;
			var departureTimeText = extractedFlightData.departureTimeText;
			var departureCityName = extractedFlightData.departureCityName;
			var departurePortCode = extractedFlightData.departurePortCode;

			
			var departureDateTimeISO = extractedFlightData.departureDateTimeISO;

			var firstDuration = firstSegmentData.sure;
			var firstWaitingDuration = firstSegmentData.waitingDuration;
			var firstWaitingCity = firstSegmentData.waitingCity;

			var secondDuration = secondSegmentData.sure;
			var secondWaitingDuration = secondSegmentData.waitingDuration;
			var secondWaitingCity = secondSegmentData.waitingCity;

			var thirdDuration = thirdSegmentData.sure;
			var thirdWaitingDuration = thirdSegmentData.waitingDuration;
			var thirdWaitingCity = thirdSegmentData.waitingCity;
			
			var arrivalTimeText = extractedFlightData.arrivalTimeText;
			var arrivalCityName = extractedFlightData.arrivalCityName;
			var arrivalPortCode = extractedFlightData.arrivalPortCode;
		  	

            var sliderValues = timeframe.sliderValues;
	        var sliceCount = sliderValues.length-1;
	        
			var sliceStep = sliderValues[1]-sliderValues[0];
			var offset = sliderValues[0];

		    var sureHumanize = function(sure){
		    	return humanizeDuration(sure*60000, { spacer: "", delimiter: "", language : i18n.getUserLocale() });
		    }
		    
		    var fillText = function(context, font, fillStyle, textAlign, textBaseline, text, x, y){
		    	
		    	if (!text) {
		    		return;
				}
		    	
				context.shadowBlur = null;
				context.shadowColor = null;
				
		    	context.font = font;
				context.fillStyle = fillStyle;
				context.textAlign = textAlign;
				context.textBaseline = textBaseline;
				context.fillText(text, x, y);
		    }
		    
		    
		    var stroke = function(context, lineWidth, lineJoin, lineCap, strokeStyle, movePoint, linePoints){
				context.lineWidth = lineWidth;
				context.lineJoin = lineJoin;
				context.lineCap = lineCap;
				context.strokeStyle = strokeStyle;
				context.beginPath();
				
				var noMovePoint = movePoint == null;
				
				if (noMovePoint) {
					movePoint = linePoints[0];
				}
				
				
				if (movePoint) {
					context.moveTo(movePoint.x, movePoint.y);
				}
				
				for (var linePointIndex = noMovePoint ? 1: 0; linePointIndex < linePoints.length; linePointIndex++) {
					var linePoint = linePoints[linePointIndex];
					context.lineTo(linePoint.x, linePoint.y);
				}
				
				context.stroke();		    

		    }
		    		    
		    var drawImage = function(context, src, point){
				var imageObj = new Image();
				imageObj.src = src;
				imageObj.onload = function(){ 
					context.drawImage(imageObj, point.x, point.y, 15, 15);
				};
				clickableElements.push({ width: 15, height: 15, top: point.y, left: point.x });
		    }
		    
			var dayChangeText = function(dayChangeCount){
				
				switch (dayChangeCount) {
				case 1:
					return i18n.get('TextField-OB-165.nextday'); //'Next Day';
				case 2:
					return i18n.get('TextField-OB-165.2days'); //'2 Days';
				case 3:
					return i18n.get('TextField-OB-165.3days'); //'3 Days';
				default:
					return null;
				}
				
			}
		    
		    
		    
		    var isCoordinateInsideElement = function(element,coordinate){
		    	
		    	var top = element.top;
		    	var bottom = element.top + element.height;
		    	var left = element.left;
		    	var right = element.left + element.width;
		    	
		    	var x = coordinate.x;
		    	var y = coordinate.y;
		    	
		    	return (y > top && y < bottom) && (x > left && x < right);
		    	
		    }
		    
		    
		    var showHideTooltip = function(event,coordinate,show,index){
		    	
		    	var elemId = event.target.id;
		    	
		    	var indexElem = elemId.substring(9,elemId.length)  + '_' + (index+1);
		    	
		    	var $tooltip = $('#fTooltip_'+indexElem+'');
		    	
		    	if (!$tooltip.length) {
		    		return;
		    	}
		    	
		    	var canvas = $tooltip.siblings('canvas')[0] || $tooltip.parent().siblings('canvas')[0];		    			    	
		    	var marginLeftOfCanvas = parseFloat($(canvas).css('margin-left'));
		    	
		    	var marginLeftOfTooltip = marginLeftOfCanvas + coordinate.x - ($tooltip.width() / 2);
		    	
		    	$tooltip.css({'left': marginLeftOfTooltip,'top': coordinate.y + 16});
		    	
		    	if (show) {
		    		$tooltip.show()
		    	} else{
		    		$tooltip.hide()
		    	}
		    	
		    	event.stopPropagation();
		    	
		    }
		    
		    
		  	if ($.browser.msie && $.browser.version < 9) {
				G_vmlCanvasManager.initElement(canvas);
			}
		    
		    
			
			var clickableElements = [];
			
			

		    canvas.addEventListener('mousemove', function(event) {
		        var coordinate = relMouseCoords(canvas,event);
		    	clickableElements.forEach(function(element, index, array) {
		    		showHideTooltip(event,coordinate,isCoordinateInsideElement(element,coordinate),index);
		    	});
		    	
		    }, false);		    
		    

		    var determineSegmentDrawColor = function(segment){
		    	var blueColor = '#2E8FFD';
		    	var redColor = '#EF2636';
		    	
		    	if (!segment) {
  					return blueColor;
  				}
		    	
	            if (segment.relevantAirline && segment.relevantAirline.shortName == 'TK') {
		    		return redColor;
		    	}
	            
		    	return blueColor;
		    };
		    
		    
			// Set Color
			var color1 = determineSegmentDrawColor(segments[0]);
			var color2 = determineSegmentDrawColor(segments[1]);
			var color3 = determineSegmentDrawColor(segments[2]);
			
			// Check Slice Width
		    var oneSliceWidth = parentWidth / sliceCount;
		    var oneHourWidth = oneSliceWidth / sliceStep;
		    
			// Calculate Time
			var ilk_ucus = oneHourWidth * ( firstDuration / 60 );
			var ilk_bekleme = oneHourWidth * ( firstWaitingDuration / 60 );
			var ikinci_ucus = oneHourWidth * ( secondDuration / 60 );
			var ikinci_bekleme = oneHourWidth * ( secondWaitingDuration / 60 );
			var ucuncu_ucus = oneHourWidth * ( thirdDuration / 60 );
			

			
			var wholeFlightWidth = ilk_ucus+ilk_bekleme+ikinci_ucus+ikinci_bekleme+ucuncu_ucus;
			
			var windowWidth = $(window).width();
			
			mobileCanvas = windowWidth < (768 - 30);
			
			canvas.width = parentWidth;
			canvas.height = mobileCanvas ? 50 : 85;

			var strokeWidth = mobileCanvas ? 6 : 8;
			var segmentGap = mobileCanvas ? 0 : 6;
			var textGap = mobileCanvas ? 10 : 6;
			var legSize = mobileCanvas ? 0 : 10;
			
			
			var strokeStyle = mobileCanvas ? 'butt' : 'round';
			var lineCap = mobileCanvas ? 'butt' : 'round';
			
			// Calculate Margin
			var timeDifference = null;
			var leftTimeMargin = null;
			var rightTimeMargin = null;
			
			
			
			if ($(canvas).hasClass('nowidth')) {
				
				leftTimeMargin = 0;
				rightTimeMargin = 0;
				
			} else{
				var startTime = departureDateTimeISO ? moment.utc(departureDateTimeISO.epochMilisecondsUtc + departureDateTimeISO.offsetMilisecondsLocal) : moment.utc(departureDateTimeWithTimeZone);
				timeDifference = departureDateTimeISO ? ((departureDateTimeISO.epochMinutesUtc/60) - offset) : ((startTime.hour() - offset) + startTime.minute() / 60);
				timeDifference += timeDifference < 0 ? 24 : 0;
				leftTimeMargin = oneHourWidth * timeDifference - oneSliceWidth;
				rightTimeMargin = parentWidth - (oneSliceWidth+leftTimeMargin+wholeFlightWidth+oneSliceWidth);
				leftTimeMargin = leftTimeMargin < 8 ? 8:leftTimeMargin;
			}
			
			
			var canvasWidth = canvas.width
			var canvasHeight = canvas.height
			
			//DONT USE CANVAS.WIDTH OR CANVAS.HEIGHT AFTER THIS POINT 
		    if (devicePixelRatio !== backingStoreRatio) {
		        var oldWidth = canvas.width;
		        var oldHeight = canvas.height;
		        canvas.width = oldWidth * ratio;
		        canvas.height = oldHeight * ratio;
		        canvas.style.width = oldWidth + 'px';
		        canvas.style.height = oldHeight + 'px';
		        context.scale(ratio, ratio);
		    }

			$(canvas).parent().find('.canvas-overlay').remove();
			
			var activePart = activeSegment;
			var durationCount = thirdDuration > 0 ? 3 : secondDuration > 0 ? 2 : 1;
			if(firstDuration > 0 && activeSegment > durationCount){
				activePart = activeSegment - 1;
				
				if(secondDuration > 0 && activeSegment > durationCount){
					activePart = activeSegment - 2;
				}
				
				if(thirdDuration > 0 && activeSegment > durationCount){
					activePart = activeSegment - 3;
				}
			}
			 
			if (activePart == 1) {
		    	context.fillStyle = "#EEFFCF";
		    	context.fillRect(oneSliceWidth + leftTimeMargin, 0, ilk_ucus, canvasHeight);
		    } 
		    	
		    if (activePart == 2) {
		    	context.fillStyle = "#EEFFCF";
		    	context.fillRect(oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme, 0, ikinci_ucus, canvasHeight);
		    }
		    
		    if (activePart == 3) {
		    	context.fillStyle = "#EEFFCF";
		    	context.fillRect(oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme + ikinci_ucus + ikinci_bekleme, 0, ucuncu_ucus, canvasHeight);
		    }
		    
		    				
				$(canvas).parent().addClass('relative').append('<div class="red canvas-overlay f_'+flightId+'_0" style="width:'+(ilk_ucus)		+'px;margin-left:'+(leftTimeMargin+oneSliceWidth)+'px;"></div>');
				
				if (firstWaitingDuration > 0){
					$(canvas).parent().addClass('relative').append('<div class="red canvas-overlay o_'+flightId+'_1" style="width:'+(ilk_bekleme)	+'px;margin-left:'+(leftTimeMargin+oneSliceWidth+ilk_ucus)+'px;"></div>');
					$(canvas).parent().addClass('relative').append('<div class="red canvas-overlay f_'+flightId+'_1" style="width:'+(ikinci_ucus)	+'px;margin-left:'+(leftTimeMargin+oneSliceWidth+ilk_ucus+ilk_bekleme)+'px;"></div>');
				}
	
				if (secondWaitingDuration > 0){
					$(canvas).parent().addClass('relative').append('<div class="red canvas-overlay o_'+flightId+'_2" style="width:'+(ikinci_bekleme)+'px;margin-left:'+(leftTimeMargin+oneSliceWidth+ilk_ucus+ilk_bekleme+ikinci_ucus)+'px;"></div>');
					$(canvas).parent().addClass('relative').append('<div class="red canvas-overlay f_'+flightId+'_2" style="width:'+(ucuncu_ucus)	+'px;margin-left:'+(leftTimeMargin+oneSliceWidth+ilk_ucus+ilk_bekleme+ikinci_ucus+ikinci_bekleme)+'px;"></div>');
				}
				
				
				var firstSegmentLegStart = 		{x: leftTimeMargin + oneSliceWidth + strokeWidth/2, 											y: (canvasHeight / 2) + legSize}
				var firstSegmentBodyStart = 	{x: leftTimeMargin + Math.min(oneSliceWidth+ilk_ucus/2,oneSliceWidth + legSize), 				y: (canvasHeight / 2)};
				var firstSegmentBodyEnd =		{x: Math.max(firstSegmentBodyStart.x,leftTimeMargin + oneSliceWidth + ilk_ucus - legSize), 		y: (canvasHeight / 2)};
				var firstSegmentLegEnd0 = 		{x: Math.max(firstSegmentBodyEnd.x,leftTimeMargin + oneSliceWidth + ilk_ucus - strokeWidth/2), 	y: (canvasHeight / 2) + legSize};
				var firstSegmentLegEnd1 = 		{x: Math.max(firstSegmentBodyEnd.x,leftTimeMargin + oneSliceWidth + ilk_ucus - segmentGap),		y: (canvasHeight / 2)};
																																												
				var firstWaitBodyStart = 		{x: Math.max(firstSegmentLegEnd1.x + segmentGap,firstSegmentLegEnd1.x + segmentGap + segmentGap), 													y: (canvasHeight / 2)};
				var firstWaitBodyEnd =	 		{x: Math.max(firstWaitBodyStart.x+1,firstSegmentLegEnd1.x + segmentGap + segmentGap + ilk_bekleme - segmentGap - segmentGap), 						y: (canvasHeight / 2)};
																												
				var secondSegmentBodyStart = 	{x: Math.max(firstWaitBodyEnd.x + segmentGap,firstWaitBodyEnd.x + segmentGap + segmentGap), 															y: (canvasHeight / 2)};
				var secondSegmentBodyEnd =		{x: Math.max(secondSegmentBodyStart.x,firstWaitBodyEnd.x + segmentGap + segmentGap + ikinci_ucus - legSize - segmentGap), 								y: (canvasHeight / 2)};
				var secondSegmentLegEnd0 = 		{x: Math.max(secondSegmentBodyEnd.x,firstWaitBodyEnd.x + segmentGap + segmentGap + ikinci_ucus - legSize + legSize - segmentGap - strokeWidth/2), 		y: (canvasHeight / 2) + legSize};
				var secondSegmentLegEnd1 = 		{x: Math.max(secondSegmentBodyEnd.x,firstWaitBodyEnd.x + segmentGap + segmentGap + ikinci_ucus - legSize + legSize - segmentGap - segmentGap), 		y: (canvasHeight / 2)};
																					
				var secondWaitBodyStart = 		{x: Math.max(secondSegmentLegEnd1.x + segmentGap,secondSegmentLegEnd1.x + segmentGap + segmentGap), 													y: (canvasHeight / 2)};
				var secondWaitBodyEnd = 		{x: Math.max(secondWaitBodyStart.x+1,secondSegmentLegEnd1.x + segmentGap + segmentGap + ikinci_bekleme - segmentGap - segmentGap), 					y: (canvasHeight / 2)};
	
				var thirdSegmentBodyStart = 	{x: Math.max(secondWaitBodyEnd.x + segmentGap,secondWaitBodyEnd.x + segmentGap + segmentGap), 								y: (canvasHeight / 2)};
				var thirdSegmentBodyEnd =		{x: Math.max(thirdSegmentBodyStart.x,secondWaitBodyEnd.x + segmentGap + ucuncu_ucus - legSize), 							y: (canvasHeight / 2)};
				var thirdSegmentLegEnd0 = 		{x: Math.max(thirdSegmentBodyEnd.x,secondWaitBodyEnd.x + segmentGap + ucuncu_ucus - strokeWidth/2), 						y: (canvasHeight / 2) + legSize};
	
	
				
				var firstSegmentPoints 	= [firstSegmentLegStart,firstSegmentBodyStart,firstSegmentBodyEnd, (firstWaitingDuration) ? firstSegmentLegEnd1 : firstSegmentLegEnd0	];
				var secondSegmentPoints = [secondSegmentBodyStart,secondSegmentBodyEnd, (secondWaitingDuration) ? secondSegmentLegEnd1 : secondSegmentLegEnd0];
				var thirdSegmentPoints = [thirdSegmentBodyStart,thirdSegmentBodyEnd,thirdSegmentLegEnd0];
				
				var firstWaitPoints = [firstWaitBodyStart,firstWaitBodyEnd];
				var secondWaitPoints = [secondWaitBodyStart,secondWaitBodyEnd];
				
				
				var usableAreaSizeDeparture = (oneSliceWidth + leftTimeMargin) - 10;
				var usableAreaSizeArrival = (oneSliceWidth + rightTimeMargin) - 10;
				
				//TO MAKE THE MEASURE WORK
				context.font = '10pt "MuseoSans-700"';
				var longTextSizeDeparture = context.measureText(departureCityName + ' ' + departurePortCode).width;
				var longTextSizeArrival = context.measureText(arrivalCityName + ' ' + arrivalPortCode).width;
				
				var mediumTextSizeDeparture = context.measureText(departureCityName).width;
				var mediumTextSizeArrival = context.measureText(arrivalCityName).width;
				
				var smallTextSizeDeparture = context.measureText(departurePortCode).width;
				var smallTextSizeArrival =  context.measureText(arrivalPortCode).width;
				
				
				
				var longTextSizeUsableDeparture = (usableAreaSizeDeparture > longTextSizeDeparture);
				var longTextSizeUsableArrival = (usableAreaSizeArrival > longTextSizeArrival);
				
				var mediumTextSizeUsableDeparture = (usableAreaSizeDeparture > mediumTextSizeDeparture);
				var mediumTextSizeUsableArrival = (usableAreaSizeArrival > mediumTextSizeArrival);
				
				var smallTextSizeUsableDeparture = (usableAreaSizeDeparture > smallTextSizeDeparture);
				var smallTextSizeUsableArrival = (usableAreaSizeArrival > smallTextSizeArrival);
				
				
				
				
				//TO MAKE THE MEASURE WORK
				context.font = '16pt "MuseoSans-700"';
				var longTimeSizeDeparture = context.measureText(departureTimeText).width;
				var longTimeSizeArrival = context.measureText(arrivalTimeText).width;
				
				//TO MAKE THE MEASURE WORK
				context.font = '14pt "MuseoSans-700"';
				var mediumTimeSizeDeparture = context.measureText(departureTimeText).width;
				var mediumTimeSizeArrival = context.measureText(arrivalTimeText).width;
				
				//TO MAKE THE MEASURE WORK
				context.font = '12pt "MuseoSans-700"';
				var smallTimeSizeDeparture = context.measureText(departureTimeText).width;
				var smallTimeSizeArrival = context.measureText(arrivalTimeText).width;
				
				var longTimeSizeUsableDeparture = (usableAreaSizeDeparture > longTimeSizeDeparture);
				var longTimeSizeUsableArrival = (usableAreaSizeArrival > longTimeSizeArrival);
				
				var mediumTimeSizeUsableDeparture = (usableAreaSizeDeparture > mediumTimeSizeDeparture);
				var mediumTimeSizeUsableArrival = (usableAreaSizeArrival > mediumTimeSizeArrival);
				
				var smallTimeSizeUsableDeparture = (usableAreaSizeDeparture > smallTimeSizeDeparture);
				var smallTimeSizeUsableArrival = (usableAreaSizeArrival > smallTimeSizeArrival);
				
				
				
				var departureTextStart = leftTimeMargin + oneSliceWidth-10;
				var arrivalTextStart = oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme + ikinci_ucus + ikinci_bekleme + ucuncu_ucus + 10;
				
				
				var dayChangeTextString = dayChangeText(dayChangeCount);
	
				//TO MAKE THE MEASURE WORK
				context.font = '10pt "MuseoSans-700"';
				var dayChangeTextStringWidth =  context.measureText(dayChangeTextString).width;
				var dayChangeTextTopPos = 80;
				var dayChangeTextFits = (dayChangeTextStringWidth) < usableAreaSizeArrival;
				var dayChangeTextAlignment = dayChangeTextFits ? 'left' : 'right';
				var dayChangeTextStart = dayChangeTextFits ? arrivalTextStart : oneSliceWidth+leftTimeMargin+ilk_ucus+ilk_bekleme+ikinci_ucus+ikinci_bekleme+ucuncu_ucus+rightTimeMargin+oneSliceWidth;
				
				//DEPARTURE DATA
				if (longTextSizeUsableDeparture && longTextSizeUsableArrival) {
					fillText(context,'10pt "MuseoSans-700"','#647286','right','bottom', departureCityName + ' ' + departurePortCode, departureTextStart, (canvasHeight / 2)+20);
					fillText(context,'10pt "MuseoSans-700"','#647286','left', 'bottom', arrivalCityName   + ' ' + arrivalPortCode, arrivalTextStart, (canvasHeight / 2)+20)
				} else if (mediumTextSizeUsableDeparture && mediumTextSizeUsableArrival) {
					fillText(context,'10pt "MuseoSans-700"','#647286','right','bottom', departurePortCode, departureTextStart, (canvasHeight / 2)+20);
					fillText(context,'10pt "MuseoSans-700"','#647286','right','bottom', departureCityName, departureTextStart, (canvasHeight / 2)+34);
					fillText(context,'10pt "MuseoSans-700"','#647286','left', 'bottom', arrivalPortCode, arrivalTextStart, (canvasHeight / 2)+20)
					fillText(context,'10pt "MuseoSans-700"','#647286','left', 'bottom', arrivalCityName, arrivalTextStart, (canvasHeight / 2)+34)
					dayChangeTextTopPos = 25
				} else if (smallTextSizeUsableDeparture && smallTextSizeUsableArrival) {
					fillText(context,'10pt "MuseoSans-700"','#647286','right','bottom', departurePortCode, departureTextStart, (canvasHeight / 2)+20);
					fillText(context,'10pt "MuseoSans-700"','#647286','left', 'bottom', arrivalPortCode, arrivalTextStart, (canvasHeight / 2)+20)
				} else{
					fillText(context,'10pt "MuseoSans-700"','#647286','right','bottom', departurePortCode, departureTextStart, (canvasHeight / 2)+28);
					fillText(context,'10pt "MuseoSans-700"','#647286','left', 'bottom', arrivalPortCode, arrivalTextStart, (canvasHeight / 2)+28)	
				}
	
				if(dayChangeTextString) {
					fillText(context,'9pt "MuseoSans-700"','#FF0000',dayChangeTextAlignment, 'bottom', dayChangeTextString, dayChangeTextStart, dayChangeTextTopPos)
				}
				
				if (longTimeSizeUsableDeparture && longTimeSizeUsableArrival) {
					fillText(context,'16pt "MuseoSans-700"','#232B38','right','bottom', departureTimeText, departureTextStart, (canvasHeight / 2)+6);
					fillText(context,'16pt "MuseoSans-700"','#232B38','left','bottom', arrivalTimeText, arrivalTextStart, (canvasHeight / 2)+6)
				} else if (mediumTimeSizeUsableDeparture && mediumTimeSizeUsableArrival) {
					fillText(context,'14pt "MuseoSans-700"','#232B38','right','bottom', departureTimeText, departureTextStart, (canvasHeight / 2)+6);
					fillText(context,'14pt "MuseoSans-700"','#232B38','left','bottom', arrivalTimeText, arrivalTextStart, (canvasHeight / 2)+6)
				} else if (smallTimeSizeUsableDeparture && smallTimeSizeUsableArrival) {
					fillText(context,'12pt "MuseoSans-700"','#232B38','right','bottom', departureTimeText, departureTextStart, (canvasHeight / 2)+6);
					fillText(context,'12pt "MuseoSans-700"','#232B38','left','bottom', arrivalTimeText, arrivalTextStart, (canvasHeight / 2)+6)
				} else{
					fillText(context,'12pt "MuseoSans-700"','#232B38','left','bottom', departureTimeText, leftTimeMargin, (canvasHeight / 2) + 9);
					fillText(context,'12pt "MuseoSans-700"','#232B38','right','bottom', arrivalTimeText, oneSliceWidth+leftTimeMargin+ilk_ucus+ilk_bekleme+ikinci_ucus+ikinci_bekleme+ucuncu_ucus+oneSliceWidth, (canvasHeight / 2) + 9)
				}
			
				//TO MAKE THE MEASURE WORK
				context.font = '8pt "MuseoSans-900"';
				
				// 1. SEGMENT
				stroke(context, strokeWidth, strokeStyle, lineCap, color1, null, firstSegmentPoints);
					
				if ((!firstWaitingDuration) || (context.measureText(sureHumanize(firstDuration)).width < ilk_ucus)) {
					fillText(context,'8pt "MuseoSans-900"','#232B38','center','bottom', sureHumanize(firstDuration), oneSliceWidth + leftTimeMargin + ilk_ucus / 2, (canvasHeight / 2) - textGap);
				} else if (context.measureText(sureHumanize(firstDuration)).width > ilk_ucus && context.measureText(sureHumanize(firstDuration)).width < 10 + ilk_ucus) {
					fillText(context,'8pt "MuseoSans-900"','#232B38','right','bottom', sureHumanize(firstDuration), oneSliceWidth + leftTimeMargin + ilk_ucus, (canvasHeight / 2) - textGap);
				} else{
					fillText(context,'8pt "MuseoSans-900"','rgba(0, 0, 0, 0.1)','right','bottom', sureHumanize(firstDuration), oneSliceWidth + leftTimeMargin + ilk_ucus, (canvasHeight / 2) - textGap);
				}
	
				if (firstWaitingDuration > 0) {
					
					//1. WAIT
					stroke(context, strokeWidth, strokeStyle, lineCap, '#647286',  null, firstWaitPoints);
					if (context.measureText(sureHumanize(firstWaitingDuration)).width < ilk_bekleme) {
						fillText(context,'8pt "MuseoSans-700"','#647286','center','bottom', sureHumanize(firstWaitingDuration), oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme/2, (canvasHeight / 2) - textGap);
					}
					if(!firstSegmentData.transferPortNotSame) {
						fillText(context,'8pt "MuseoSans-500"','#647286','center','bottom', firstWaitingCity, oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme/2, (canvasHeight / 2) + textGap + 15);
					} else {
						fillText(context,'8pt "MuseoSans-500"','#647286','center','bottom', firstWaitingCity, oneSliceWidth + leftTimeMargin + ilk_ucus + (ilk_bekleme/2) - 20, (canvasHeight / 2) + textGap + 15);
						fillText(context,'8pt "MuseoSans-500"','#647286','center','bottom', firstSegmentData.waitingCityPort, oneSliceWidth + leftTimeMargin + ilk_ucus + (ilk_bekleme/2) + 20, (canvasHeight / 2) + textGap + 15);
						fillText(context,'10pt "MuseoSans-500"','#000000','center','bottom', '➡', oneSliceWidth + leftTimeMargin + ilk_ucus + (ilk_bekleme/2) - 2, (canvasHeight / 2) + textGap + 15);
					}
					drawImage(context,'/theme/img/icons/canvas-info.png', {x: oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme/2 - 7, y: (canvasHeight / 2) + textGap + 15})
	
					// 2. SEGMENT
					stroke(context, strokeWidth, strokeStyle, lineCap, color2, null, secondSegmentPoints);
					if (secondWaitingDuration) {
						fillText(context,'8pt "MuseoSans-900"','#232B38','center','bottom', sureHumanize(secondDuration), oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme + ikinci_ucus / 2, (canvasHeight / 2) - textGap);
					} else if (context.measureText(sureHumanize(secondDuration)).width < ikinci_ucus) {
						fillText(context,'8pt "MuseoSans-900"','#232B38','center','bottom', sureHumanize(secondDuration), oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme + ikinci_ucus / 2, (canvasHeight / 2) - textGap);
					} else if (context.measureText(sureHumanize(secondDuration)).width < 10 + ikinci_ucus) {
						fillText(context,'8pt "MuseoSans-900"','#232B38','left','bottom', sureHumanize(secondDuration), oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme, (canvasHeight / 2) - textGap);
					} else {
						fillText(context,'8pt "MuseoSans-900"','rgba(0, 0, 0, 0.1)','left','bottom', sureHumanize(secondDuration), 	oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme, (canvasHeight / 2) - textGap);
					}
					
				}
				
				if (secondWaitingDuration > 0 ) {
					
					// 2. WAIT
					stroke(context, strokeWidth, strokeStyle, lineCap, '#647286', null, secondWaitPoints);
					
					if (context.measureText(sureHumanize(secondWaitingDuration)).width < ikinci_bekleme) {
						fillText(context,'8pt "MuseoSans-700"','#647286','center','bottom', sureHumanize(secondWaitingDuration), oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme + ikinci_ucus  + ikinci_bekleme/ 2, (canvasHeight / 2) - textGap);
					}
					if(!secondSegmentData.transferPortNotSame) {
						fillText(context,'8pt "MuseoSans-500"','#647286','center','bottom', secondWaitingCity, oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme + ikinci_ucus  + ikinci_bekleme/ 2, (canvasHeight / 2) + textGap + 15);
					} else {
						fillText(context,'8pt "MuseoSans-500"','#647286','center','bottom', secondWaitingCity, oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme + ikinci_ucus  + (ikinci_bekleme/ 2) - 20, (canvasHeight / 2) + textGap + 15);
						fillText(context,'8pt "MuseoSans-500"','#647286','center','bottom', secondSegmentData.waitingCityPort, oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme + ikinci_ucus  + (ikinci_bekleme/ 2) + 20, (canvasHeight / 2) + textGap + 15);
						fillText(context,'10pt "MuseoSans-500"','#000000','center','bottom', '➡', oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme + ikinci_ucus  + (ikinci_bekleme/ 2) - 2, (canvasHeight / 2) + textGap + 15);
					}
					drawImage(context,'/theme/img/icons/canvas-info.png', {x: oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme + ikinci_ucus  + ikinci_bekleme/2 - 7, y: (canvasHeight / 2) + textGap + 15})
	
					// 3. SEGMENT
					stroke(context, strokeWidth, strokeStyle, lineCap, color3, null, thirdSegmentPoints);
					if (context.measureText(sureHumanize(thirdDuration)).width < ucuncu_ucus) {
						fillText(context,'8pt "MuseoSans-900"','#232B38','center','bottom', sureHumanize(thirdDuration), oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme + ikinci_ucus + ikinci_bekleme + ucuncu_ucus/2, (canvasHeight / 2) - textGap);
					} else if (context.measureText(sureHumanize(thirdDuration)).width < 10 + ucuncu_ucus) {
						fillText(context,'8pt "MuseoSans-900"','#232B38','left','bottom', sureHumanize(thirdDuration), oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme + ikinci_ucus + ikinci_bekleme, (canvasHeight / 2) - textGap);
					} else {
						fillText(context,'8pt "MuseoSans-900"','rgba(0, 0, 0, 0.1)','left','bottom', sureHumanize(thirdDuration), oneSliceWidth + leftTimeMargin + ilk_ucus + ilk_bekleme + ikinci_ucus + ikinci_bekleme, (canvasHeight / 2) - textGap);
					}
				}

			
		    if (!$(canvas).parent().is(':has(span.sr-only)')) {
		    	var flightDetailsText = i18n.get('Label-OB-94') + ' ' + i18n.get('Label-OB-95') + ' ' + departureCityName + ' ' + departureTimeText + ' ' + i18n.get('Label-OB-96') + ' ' + arrivalCityName + ' ' + arrivalTimeText;
		    	$(canvas).parent().append('<span class="sr-only">' + flightDetailsText + '</span>');
			}
			
		}
	  
	};
});
