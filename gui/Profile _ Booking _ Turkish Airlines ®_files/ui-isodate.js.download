define([ 'knockout', 'moment', 'eteration/widgets/ui-date-formats', 'eteration/eteration-i18n' ], function(ko, moment, dateFormats, i18n) {

	function updateDateFormatName(dateFormatName) {

		var dateFormatPattern = dateFormats[i18n.getUserLocale()][dateFormatName];

		return function(element, valueAccessor, allBindingsAccessor) {
			var accessor = valueAccessor();
			var date = accessor.value || 0;
			var pattern = dateFormatPattern || accessor.pattern || 'DD/MM/YYYY';
			var upperCase = accessor.upperCase || false;
			var formattedDate = moment(date.customDateTimeMinutesLocal, 'YYYYMMDDHHmm').format(pattern);
			$(element).text(upperCase ? formattedDate.toUpperCase() : formattedDate);
		}

	}

	ko.bindingHandlers['isodate'] = {
		update : updateDateFormatName()
	};

	ko.bindingHandlers['isodate-fulldayfullmonth'] = {
		update : updateDateFormatName('fulldayfullmonth')
	};

	function isSameDay(day, referenceDay) {
		return day == referenceDay;
	}

	function isFutureDay(day, referenceDay) {
		return day > referenceDay;
	}

	function isPastDay(day, referenceDay) {
		return day < referenceDay;
	}

	
	function updateVisibleISO(element, valueAccessor) {
		var accessor = valueAccessor();
		var day = accessor.date.epochDaysLocal;
		var referenceDay = accessor.referenceDate.epochDaysLocal;
		var dayfunction = this;
		ko.bindingHandlers.visible.update(element, function() {
			return dayfunction(day, referenceDay);
		});
	}
	
	function updateVisible(element, valueAccessor) {
		var accessor = valueAccessor();

		var day =  Math.floor((accessor.date + accessor.timeZoneRawOffset)/8.64e7);
		var referenceDay = Math.floor((accessor.referenceDate + accessor.referenceTimeZoneRawOffset)/8.64e7);
		
		var dayfunction = this;
		ko.bindingHandlers.visible.update(element, function() {
			return dayfunction(day, referenceDay);
		});
	}

	ko.bindingHandlers['isodate-visible-if-samelocalday'] = { update : updateVisibleISO.bind(isSameDay) };
	ko.bindingHandlers['isodate-visible-if-futurelocalday'] = { update : updateVisibleISO.bind(isFutureDay) };
	ko.bindingHandlers['isodate-visible-if-pastlocalday'] = { update : updateVisibleISO.bind(isPastDay) };

	ko.bindingHandlers['date-visible-if-futurelocalday'] = { update : updateVisible.bind(isFutureDay) };

});
