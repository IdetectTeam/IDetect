define(['jquery', 'knockout', 'eteration/eteration-i18n', 'eteration/widgets/ui-layover-duration','eteration/widgets/booking/transitpassengerwarn/ui-transitpassengerwarn'], 

function($, ko, i18n) {

	function nullSafeDestinationPortCode(segment) {
		return (segment && segment.destinationAirport && segment.destinationAirport.code ) || "unknown";
	}
	
	function nullSafeOriginPortCode(segment) {
		return (segment && segment.originAirport && segment.originAirport.code ) || "unknown";
	}
	
	ko.components.register('layover-tooltip', {
	    viewModel: function(params) {	    	
	    	var self = this;
	    	self.segments = ko.unwrap(params.segments);
	    	self.idPrefix = ko.unwrap(params.idPrefix || 'fTooltip_0');
	    	


	    	self.hasPlaneChange = function(index) {
	    		var segment = self.segments[index];
	    		var prevSegment = self.segments[index - 1];
		    	var samePort = nullSafeDestinationPortCode(prevSegment) == nullSafeOriginPortCode(segment) && nullSafeDestinationPortCode(prevSegment) !=  "unknown";
	    		return !samePort;
	    	}

	    },
	    
	    template:
	    	'<!-- ko foreach:segments -->\
	    	<!-- ko if :$index() > 0 -->\
	    	<div class="popover fade bottom in" data-bind="attr: { id: $component.idPrefix + \'_\' + $index() }" style="display: none">\
	    		<div class="arrow"></div>\
	    		<div class="popover-content">\
				    <div class="fw700 fs-16">\
			    		<span data-bind="i18n-text:{key: $component.hasPlaneChange($index()) ? \'TextField-OB-230\' : \'TextField-OB-231\',  args:{\'portcitylookup\':$component.segments[$index() - 1].destinationAirport.code, \'countrylookup\':$component.segments[$index() - 1].destinationAirport.country ? $component.segments[$index() - 1].destinationAirport.country.code : \'\'}}"></span>\
			    	</div>\
			    	<div class="fs-14 fw300">\
						<span data-bind="i18n-text:{key: \'TextField-OB-97\',  args:{\'portnamelookup\':$component.segments[$index() - 1].destinationAirport.code}}"></span>\
			    	</div>\
	    			<div data-bind="cms:{schema: \'Airport\', cache : true, keyword: [{\'Application Metadata\':\'SelectFlight.AirportLayoverInfo\', \'Airport Code\':$component.segments[$index() - 1].destinationAirport.code}],template: \'Select Flight Layover Airport Information\',maxItems: 1}"></div>\
	    		</div>\
	    	</div>\
	    	<!-- /ko -->\
	    	<!-- /ko -->'
	});

	
	ko.components.register('layover-panel', {
	    viewModel: function(params) {	    	
	    	var self = this;
	    	self.flight = ko.isObservable(params.flight) ? params.flight : ko.observable(params.flight);
	    	self.dataTarget = ko.unwrap(params.dataTarget || '.o_1_0');
	    	self.tourIstanbul = ko.unwrap(params.tourIstanbul || false);
	    	self.hotelIstanbul = ko.unwrap(params.hotelIstanbul || false);
	    	self.links = ko.unwrap(params.links);
	    	self.index = ko.isObservable(params.index) ? params.index : ko.observable(params.index);
	    	self.segment = self.flight().segments[self.index()];
	    	self.prevSegment = self.flight().segments[self.index() - 1];
	    	self.cabinType = self.flight().hasPriceForSelectedFareBasisCode && self.flight().hasPriceForSelectedFareBasisCode() ? self.flight().priceForSelectedFareBasisCode().cabinClass:'';

	    	self.stopOverHotelIstanbulUtility = ko.unwrap(params.stopOverHotelIstanbul || false);
	    	
	    	self.isStopOverHotelIstanbulAvailable = ko.computed(function() {
	    	    return self.stopOverHotelIstanbulUtility &&
	    	    	(self.prevSegment.stopOverHotel ||
	    	    	(self.prevSegment.stopOverHotelCabinTypes && self.prevSegment.stopOverHotelCabinTypes.indexOf(self.cabinType) != -1));
	    	})
	    	self.isHotelIstanbulAvailable = ko.computed(function() {
	    		return self.hotelIstanbul && self.segment.hotelIstanbul && self.prevSegment.hotelIstanbul && !self.isStopOverHotelIstanbulAvailable();
	    	})
	    	self.hasPlaneChange = function() {
		    	var samePort = nullSafeDestinationPortCode(self.prevSegment) == nullSafeOriginPortCode(self.segment) && nullSafeDestinationPortCode(self.prevSegment) !=  "unknown";
	    		return !samePort;
	    	}
	    	
	    	self.transitPassengerWarningAvailable = self.flight().beyond && ( self.segment.domesticFlight || self.segment.containsTransitVisaRequiredPort);
	    	
	    },
	    
	    template:
	    	'<tr class="showcanvasoverlay" data-bind="attr: { \'data-target\': dataTarget }">\
		    	<td colspan="3">\
					<div class="row">\
						<div class="col-xs-9 pb-15">\
					    	<div class="fw700 fs-16">\
					    		<span data-bind="i18n-text:{key: $component.hasPlaneChange() ? \'TextField-OB-230\' : \'TextField-OB-231\',  args:{\'portcitylookup\':prevSegment.destinationAirport.code, \'countrylookup\':prevSegment.destinationAirport.country.code}}"></span>\
					    	</div>\
					    	<div class="fs-14 fw300">\
    							<span data-bind="i18n-text:{key: \'TextField-OB-97\',  args:{\'portnamelookup\':prevSegment.destinationAirport.code}}"></span>\
					    	</div>\
	    					<div data-bind="cms:{schema: \'Airport\', cache : true, keyword: [{\'Application Metadata\':\'SelectFlight.AirportLayoverInfo\', \'Airport Code\':prevSegment.destinationAirport.code}],template: \'Select Flight Layover Airport Information\',maxItems: 1}"></div>\
	    				</div>\
					</div>\
					<!-- ko if: $component.hasPlaneChange() -->\
						<div data-bind="cms:{schema: \'Select Flight Connection Warning\',metadata: [{\'applicationmetadata\':\'SelectFlight.ConnectionWarning\', \'arrivalairportcode\':prevSegment.destinationAirport.code, \'departureairportcode\':segment.originAirport.code}],template: \'Select Flights Connection Warning\',maxItems: 1}"></div>\
					<!-- /ko -->\
				</td>\
				<td>\
					<h4 class="fs-16 fw900"><layover-duration params="value:{\'flight\':flight(),\'index\':index()}"></layover-duration></h4>\
					<!-- ko if: (tourIstanbul && prevSegment.tourIstanbul)-->\
					<div class="text-center mb-10">\
						<a class="dib" href="http://www.istanbulinhours.com/" target="_blank"><div data-bind="cms:{cache:true , schema: \'Image\',keyword: [{\'Application Metadata\':\'TourIstanbul\' }],template: \'Application Image\',maxItems: 1}"></div></a>\
					</div>\
					<!-- /ko -->\
			    	<!-- ko if: isStopOverHotelIstanbulAvailable -->\
					<div class="text-center">\
	    				<a target="_blank" class="dib" data-bind="i18n-attr:{\'key\':\'Tooltip-OB-12\', \'attr\':\'title\'}, attr: {href: links.stopOverOtelLink}" data-toggle="tooltip"><div data-bind="cms:{cache:true , schema: \'Image\',keyword: [{\'Application Metadata\':\'hotelservices\' }],template: \'Application Image\',maxItems: 1}"></div></a>\
					</div>\
					<!-- /ko -->\
	    			<!-- ko if: isHotelIstanbulAvailable -->\
					<div class="text-center">\
						<a target="_blank" class="dib" data-bind="i18n-attr:{\'key\':\'Tooltip-OB-11\', \'attr\':\'title\'}, attr: {href: links.hotelServices}" data-toggle="tooltip"><div data-bind="cms:{cache:true , schema: \'Image\',keyword: [{\'Application Metadata\':\'hotelservices\' }],template: \'Application Image\',maxItems: 1}"></div></a>\
					</div>\
					<!-- /ko -->\
				</td>\
	    	</tr>\
	    	<!-- ko if: transitPassengerWarningAvailable -->\
	    		<!-- ko component: { name: "transitpassengerwarn"} --><!--/ko-->\
	    	<!-- /ko -->'
	});
	
	ko.components.register('stopover-panel', {
	    viewModel: function(params) {	    	
	    	var self = this;
	    	self.segment = ko.unwrap(params.segment);
	    },
	    
	    template:'\
	    	<!-- ko if: segment.technicalStops -->\
	    	<!-- ko foreach:segment.technicalStops-->\
	    	<tr class="showcanvasoverlay">\
	    		<td colspan="3">\
	    			<div class="row">\
	    				<div class="col-xs-12">\
						    <div class="fw700 fs-16">\
					    		<span data-bind="i18n-text:{key: \'TextField-OB-232\',  args:{\'portcitylookup\':stopLocation, \'countrylookup\':country?country.code:\'\'}}"></span>\
					    	</div>\
					    	<div class="fs-14 fw300">\
								<span data-bind="i18n-text:{key: \'TextField-OB-97\',  args:{\'portnamelookup\':stopLocation}}"></span>\
					    	</div>\
	    					<div data-bind="cms:{schema: \'Airport\', cache : true, keyword: [{\'Application Metadata\':\'SelectFlight.AirportLayoverInfo\', \'Airport Code\':stopLocation}],template: \'Select Flight Layover Airport Information\',maxItems: 1}"></div>\
	    				</div>\
	    			</div>\
	    		</td>\
	    		<td>\
	    			<h4 class="fs-16 fw900" data-bind="humanize:{value : stopDuration}"></h4>\
	    		</td>\
	    	</tr>\
	    	<!-- /ko -->\
	    	<!-- /ko -->'
	});	
	
	ko.components.register('mobile-layover-panel', {
	    viewModel: function(params) {	    	
	    	var self = this;
	    	self.callback = params.flight.callback || ko.observable('');
	    	self.flight = ko.isObservable(params.flight) ? params.flight : ko.observable(params.flight);
	    	self.tourIstanbul = ko.unwrap(params.tourIstanbul || false);	    	
	    	self.index = ko.isObservable(params.index) ? params.index : ko.observable(params.index);
	    	self.segment = self.flight().segments[self.index()];
	    	self.prevSegment = self.flight().segments[self.index() - 1];
	    	
	    	self.hasPlaneChange = function() {
		    	var samePort = nullSafeDestinationPortCode(self.prevSegment) == nullSafeOriginPortCode(self.segment) && nullSafeDestinationPortCode(self.prevSegment) !=  "unknown";
		    	if(!samePort)
		    		self.callback();
	    		return !samePort;
	    	}
	    	
	    	self.transitPassengerWarningAvailable = self.flight().beyond && (self.hasPlaneChange() || self.segment.domesticFlight || self.segment.containsTransitVisaRequiredPort);
	    	
	    },
	    
	    template:'\
	    	<div class="list-group-item clearfix list-group-header"> \
		    	<div class="col-xs-8 nomargin"> \
				    <div class="fw700 fs-13">\
			    		<span data-bind="i18n-text:{key: $component.hasPlaneChange() ? \'TextField-OB-230\' : \'TextField-OB-231\',  args:{\'portcitylookup\':prevSegment.destinationAirport.code, \'countrylookup\':prevSegment.destinationAirport.country.code}}"></span>\
			    	</div>\
			    	<div class="fs-12 fw300">\
						<span data-bind="i18n-text:{key: \'TextField-OB-97\',  args:{\'portnamelookup\':prevSegment.destinationAirport.code}}"></span>\
			    	</div>\
	    			<div data-bind="cms:{schema: \'Airport\', cache : true, keyword: [{\'Application Metadata\':\'SelectFlight.AirportLayoverInfo\', \'Airport Code\':prevSegment.destinationAirport.code}],template: \'Select Flight Layover Airport Information\',maxItems: 1}"></div>\
		    	</div> \
		    	<div class="col-xs-4 nopadding text-right"> \
		    	<span> \
		    		<span class="text-muted">\
		    			<i class="fa fa-clock-o"></i>\
		    		</span> \
		    		<span><layover-duration params="value:{\'flight\':flight(),\'index\':$index()}"></span> \
	    			<!-- ko if: (tourIstanbul && prevSegment.tourIstanbul)-->\
		    		<div class="col-xs-12 text-center nopadding">\
		    			<a href="http://www.istanbulinhours.com/" target="_blank"><div data-bind="cms:{cache:true , schema: \'Image\',keyword: [{\'Application Metadata\':\'TourIstanbul\' }],template: \'Application Image\',maxItems: 1}"></div></a>\
		    		</div>\
	    			<!-- /ko -->\
		    	</span> \
		    	</div> \
		    	<!-- ko if: $component.hasPlaneChange() -->\
			    <div class="col-xs-12 bg-white">\
					<div data-bind="cms:{schema: \'Select Flight Connection Warning\',metadata: [{\'applicationmetadata\':\'SelectFlight.ConnectionWarning\', \'arrivalairportcode\':prevSegment.destinationAirport.code, \'departureairportcode\':segment.originAirport.code}],template: \'Select Flights Connection Warning\',maxItems: 1}"></div>\
			    </div>\
		    	<!-- /ko -->\
	    		<!-- ko if: transitPassengerWarningAvailable -->\
	    		<div class="row">\
			    	<div class="col-xs-12 clearfix list-group-item">\
	    				<!-- ko component: { name: "transitpassengerwarn"} --><!--/ko-->\
			    	</div>\
	    		</div>\
	    		<!-- /ko -->\
	    	</div>'
	});
	
	ko.components.register('mobile-stopover-panel', {
	    viewModel: function(params) {	    	
	    	var self = this;
	    	self.segment = ko.unwrap(params.segment);
	    },
	    
	    template:'\
	    	<!-- ko if: segment.technicalStops -->\
	    	<!-- ko foreach:segment.technicalStops -->\
	    	<div class="list-group-item clearfix list-group-header"> \
	    		<div class="col-xs-8">\
				    <div class="fw700 fs-13">\
			    		<span data-bind="i18n-text:{key: \'TextField-OB-232\',  args:{\'portcitylookup\':stopLocation, \'countrylookup\':country?country.code:\'\'}}"></span>\
			    	</div>\
			    	<div class="fs-13 fw300">\
						<span data-bind="i18n-text:{key: \'TextField-OB-97\',  args:{\'portnamelookup\':stopLocation}}"></span>\
			    	</div>\
	    			<div data-bind="cms:{schema: \'Airport\', cache : true, keyword: [{\'Application Metadata\':\'SelectFlight.AirportLayoverInfo\', \'Airport Code\':segment.destinationAirport.code}],template: \'Select Flight Layover Airport Information\',maxItems: 1}"></div>\
	    		</div>\
	    		<div class="col-xs-4 text-right">\
	    			<span>\
	    	       		<span class="text-muted">\
	    	       			<i class="fa fa-clock-o"></i>\
	    	       		</span>\
	    	       		<span data-bind="humanize:{value : stopDuration}"></span>\
	    			</span>\
	    		</div>\
	    	</div>\
	    	<!-- /ko -->\
	    	<!-- /ko -->'
	});	
});
