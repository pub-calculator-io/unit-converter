const UNITS_CONVERTER = _('units_converter'),
	UNITS_LIST_FROM = _('from_units'),
	UNITS_LIST_TO = _('to_units'),
	UNITS_FROM_POSTFIX = $('#from_value + span'),
	UNITS_TO_POSTFIX = $('#to_value + span');

const LIST_OF_UNITS = {
	'Area': [
		['Square Meter', 'm²', '1'],
		['Square Kilometer', 'km²', '1e6'],
		['Square Centimeter', 'cm²', '1e-4'],
		['Square Millimeter', 'mm²', '1e-6'],
		['Square Micrometer', 'µm²', '1e-12'],
		['Hectare', 'ha', '1e4'],
		['Square Mile', 'mi²', '1609.34^2', '63360^2in²'],
		['Square Yard', 'yd²', '0.9144^2', '16^2in²'],
		['Square Foot', 'ft²', '0.3048^2', '12^2in²'],
		['Square Inch', 'in²', '0.0254^2', '1in²'],
		['Acre', 'ac', '4046.8564224', '4840*16^2in²'],
	],
	'Data Transfer Rate': [
		['Bit per second', 'bit/s', '1'],
		['Kilobit per second', 'kbit/s', '1e3'],
		['Kilobyte per second', 'kB/s', '8e3'],
		['Kibibit per second', 'Kibit/s', '2^10'],
		['Megabit per second', 'Mbit/s', '1e6'],
		['Megabyte per second', 'MB/s', '8e6'],
		['Mebibit per second', 'Mibit/s', '2^20'],
		['Gigabit per second', 'Gbit/s', '1e9'],
		['Gigabyte per second', 'GB/s', '8e9'],
		['Gibibit per second', 'Gibit/s', '2^30'],
		['Terabit per second', 'Tbit/s', '1e12'],
		['Terabyte per second', 'TB/s', '8e12'],
		['Tebibit per second', 'Tibit/s', '2^40'],
	],
	'Digital Storage': [
		['Bit', 'bit', '1'],
		['Kilobit', 'kbit', '1e3'],
		['Kibibit', 'Kibit', '2^10'],
		['Megabit', 'Mbit', '1e6'],
		['Mebibit', 'Mibit', '2^20'],
		['Gigabit', 'Gbit', '1e9'],
		['Gibibit', 'Gibit', '2^30'],
		['Terabit', 'Tbit', '1e12'],
		['Tebibit', 'Tibit', '2^40'],
		['Petabit', 'Pbit', '1e15'],
		['Pebibit', 'Pibit', '2^50'],
		['Byte', 'B', '8'],
		['Kilobyte', 'kB', '8e3'],
		['Kibibyte', 'KiB', '8*2^10'],
		['Megabyte', 'MB', '8e6'],
		['Mebibyte', 'MiB', '8*2^20'],
		['Gigabyte', 'GB', '8e9'],
		['Gibibyte', 'GiB', '8*2^30'],
		['Terabyte', 'TB', '8e12'],
		['Tebibyte', 'TiB', '8*2^40'],
		['Petabyte', 'PB', '8e15'],
		['Pebibyte', 'PiB', '8*2^50'],
	],
	'Energy': [
		['Joule', 'J', '1'],
		['Kilojoule', 'kJ', '1e3'],
		['Gram calorie', 'cal', '4.184'],
		['Kilocalorie', 'kcal', '4.184e3'],
		['Watt hour', 'Wh', '3.6e3'],
		['Kilowatt hour', 'kWh', '3.6e6'],
		['Electronvolt', 'eV', '1.602176565e-19'],
		['British thermal unit', 'BTU', '1055.06'],
		['US therm', 'thm', '1.054804e8'],
		['Foot-pound', 'ft⋅lbf', '1.3558179483'],
	],
	'Frequency': [
		['Hertz', 'Hz', '1'],
		['Kilohertz', 'kHz', '1e3'],
		['Megahertz', 'MHz', '1e6'],
		['Gigahertz', 'GHz', '1e9'],
	],
	'Fuel Economy': [
		['Kilometer per liter', 'km/L', '1'],
		['Miles per gallon', 'mpg', '0.425143707'],
		['Miles per gallon (Imperial)', 'imp.mpg', '0.354006'],
		['Liter per 100 kilometers', '100']
	],
	'Length': [
		['Meter', 'm', '1'],
		['Kilometer', 'km', '1e3'],
		['Centimeter', 'cm', '1e-2'],
		['Millimeter', 'mm', '1e-3'],
		['Micrometer', 'µm', '1e-6'],
		['Nanometer', 'nm', '1e-9'],
		['Mile', 'mi', '1609.35', '63360in'],
		['Yard', 'yd', '0.9144', '36in'],
		['Foot', 'ft', '0.3048', '12in'],
		['Inch', 'in', '0.0254', '1in'],
		['Light Year', 'ly', '9.46066e+15'],
	],
	'Mass': [
		['Gram', 'g', '1'], 
		['Kilogram', 'kg', '1e3'], 
		['Milligram', 'mg', '1e-3'], 
		['Tonne', 't', '1e6'], 
		['Long Ton (Imperial)', 'l.t.', '1016046.9088', '35840oz'], 
		['Short Ton (US)', 'sh.t', '907184.74', '32000oz'], 
		['Pound', 'lb', '453.59237', '16oz'], 
		['Ounce', 'oz', '28.34952', '1oz'], 
		['Carat', 'ct', '0.2'], 
		['Atomic Mass Unit (Dalton)', 'u', '1.6605402e-24'],
	],
	'Plane Angle': [
		['Degree', '°', '1'],
		['Radian', 'rad', '180/pi'],
		['Milliradian', 'mrad', '180/pi*1e-3'],
		['Gradian', 'gon', '0.9'],
		['Arcsecond', '″', '1/3600'],
		['Arcminute', '′', '1/60'],
	],
	'Pressure': [
		['Pascal', 'Pa', '1'],
		['Bar', 'bar', '100000'],
		['Pound per square inch', 'psi', '6894.7573'],
		['Standard atmosphere', 'atm', '101325'],
		['Torr', 'torr', '133.3223684211'],
	],
	'Speed': [
		['Meter per second', 'm/s', '1'],
		['Kilometer per hour', 'km/h', '1/3.6'],
		['Miles per hour', 'mph', '0.44704'],
		['Foot per second', 'ft/s', '0.3048'],
		['Knot', 'kn', '0.514444'],
	],
	'Temperature': [
		['Celsius', '°C', 'x', 'x'],
		['Kelvin', 'K', 'x-273.15', 'x+273.15'],
		['Fahrenheit', '°F', '5/9*(x-32)', '9/5*x+32'],
	],
	'Time': [
		['Second', 's', '1'],
		['Nanosecond', 'ns', '1e-9'],
		['Microsecond', 'µs', '1e-6'],
		['Millisecond', 'ms', '1e-3'],
		['Minute', 'min', '60'],
		['Hour', 'h', '3600'],
		['Day', 'd', '86400'],
		['Week', 'wk', '7*86400'],
		['Month', 'mo', '86400*30.4167', '1mo'],
		['Calendar year', 'y', '365*86400', '12mo'],
		['Decade', 'dec', '3650*86400', '120mo'],
		['Century', 'c', '36500*86400', '1200mo'],
	],
	'Volume': [
		['Cubic Meter', 'm³', '1'],
		['Cubic Kilometer', 'km³', '1e9'],
		['Cubic Centimeter', 'cm³', '1e-6'],
		['Cubic Millimeter', 'mm³', '1e-9'],
		['Liter', 'L', '1e-3'],
		['Milliliter', 'mL', '1e-6'],
		['US Gallon', 'gal', '0.00378541', '768tsp'],
		['US Quart', 'qt', '0.000946353', '192tsp'],
		['US Pint', 'pt', '0.000473176', '96tsp'],
		['US Cup', 'cup', '0.00024', '48.6922tsp'],
		['US Fluid Ounce', 'fl oz', '2.9574e-5', '6tsp'],
		['US Table Spoon', 'tbsp', '1.4787e-5', '3tsp'],
		['US Tea Spoon', 'tsp', '4.9289e-6', '1tsp'],
		['Imperial Gallon', 'imp.gal', '0.00454609', '768imp.tsp'],
		['Imperial Quart', 'imp.qt', '0.00113652', '192imp.tsp'],
		['Imperial Pint', 'imp.pt', '0.000568261', '96imp.tsp'],
		['Imperial Cup', 'imp.cup', '0.000284131', '48imp.tsp'],
		['Imperial Fluid Ounce', 'imp.fl oz', '2.8413e-5', '4.8imp.tsp'],
		['Imperial Table Spoon', 'imp.tbsp', '1.7758e-5', '3imp.tsp'],
		['Imperial Tea Spoon', 'imp.tsp', '5.9194e-6', '1imp.tsp'],
		['Cubic Mile', 'mi³', '1609.34^3', '63360^3in³'],
		['Cubic Yard', 'yd³', '0.9144^3', '16^3in³'],
		['Cubic Foot', 'ft³', '0.3048^3', '12^3in³'],
		['Cubic Inch', 'in³', '0.0254^3', '1in³'],
	]
};

let UNITS_GROUP = 'Length';
let FROM_UNIT = ''; 
let TO_UNIT = '';

window.unitsChange = function(element) {
	_('to_value').value = '';
	_('result').innerHTML = '';	
	let value = element.value
	UNITS_GROUP = value;
	setNewList(LIST_OF_UNITS[value])
}
setNewList(LIST_OF_UNITS[UNITS_GROUP])

function setNewList(listUnits) {
	UNITS_LIST_FROM.innerHTML = ''
	UNITS_LIST_TO.innerHTML = ''
	
	listUnits.forEach((unit, index) => {
		let buttonFrom = document.createElement('button')
		buttonFrom.classList.add('input-button')
		buttonFrom.innerHTML = unit[0]
		let buttonTo = buttonFrom.cloneNode(true)
		buttonFrom.addEventListener('click', (event) => {
			FROM_UNIT = unit[0];
			switchUnit(event, unit[1]);
		})
		buttonTo.addEventListener('click', (event) => {
			TO_UNIT = unit[0];
			switchUnit(event, unit[1]);
		})

		if(index !== 0 ) {
			UNITS_LIST_FROM.appendChild(buttonFrom)
		} else {
			UNITS_LIST_FROM.appendChild(buttonFrom)
			buttonFrom.classList.add('selected')
			buttonFrom.click()
		}

		if(index !== 1 ) {
			UNITS_LIST_TO.appendChild(buttonTo)
		} else {
			UNITS_LIST_TO.appendChild(buttonTo)
			buttonTo.classList.add('selected')
			buttonTo.click()
		}
	})
}

function switchUnit(event, unit) {
	if(event.clientX && event.clientY){
		_('to_value').value = '';
		_('result').innerHTML = '';	
	}

	let button = event.target
	if(event.composedPath().includes(UNITS_LIST_FROM)) {
		UNITS_LIST_FROM.querySelectorAll('.input-button').forEach((button) => button.classList.remove('selected'))
		button.classList.add('selected')
		UNITS_FROM_POSTFIX.innerHTML = unit
	} else if (event.composedPath().includes(UNITS_LIST_TO)) {
		UNITS_LIST_TO.querySelectorAll('.input-button').forEach((button) => button.classList.remove('selected'))
		button.classList.add('selected')
		UNITS_TO_POSTFIX.innerHTML = unit
		
	}
	window.calculate && calculate();
}
