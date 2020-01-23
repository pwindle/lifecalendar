

const now = Date.now();

var _div_calendar = document.querySelector("#calendar");
_div_calendar.appendChild(document.createElement('div'));

for ( var i = 1; i <= 52; i++ ) {

	var _div_week_col = document.createElement('div');
	_div_week_col.classList.add('col');
	_div_week_col.classList.add('col' + i);
	_div_calendar.appendChild(_div_week_col);
	var _txt = document.createElement('p');
	_txt.innerText = i;
	_div_week_col.appendChild(_txt);
}

for ( var i = 0; i < 52 * 90; i++ ) {
	if ( i % 52 === 0 ) {
		var _div_week_row = document.createElement('div');
		_div_week_row.classList.add('row');
		_div_week_row.classList.add('row' + i);
		_div_calendar.appendChild(_div_week_row);
		var _txt = document.createElement('p');
		_txt.innerText = i / 52;
		_div_week_row.appendChild(_txt);
	}
	var _div_week = document.createElement('div');
	_div_week.classList.add('week');
	_div_week.classList.add('week' + i);
	_div_calendar.appendChild(_div_week);
}


const landscape = document.querySelector('input#landscape');
landscape.addEventListener('input', orient);

function orient()
{
	if (landscape.checked) {
		var orient = document.querySelector('#orient');
		orient.classList.add("landscape");
		var row = document.querySelectorAll(".row");
		for (i = 0; i < row.length; ++i) {
			row[i].style.transform = "rotate(90deg)";
		}
		var col = document.querySelectorAll(".col");
		for (i = 0; i < col.length; ++i) {
			col[i].style.transform = "rotate(90deg)";
			col[i].style.height = "unset";
		}
		document.querySelector("#now90").style.transform = "rotate(90deg)";
	}
	else {
		var orient = document.querySelector('#orient');
		orient.classList.remove("landscape");
		var row = document.querySelectorAll(".row");
		for (i = 0; i < row.length; ++i) {
			row[i].style.transform = "rotate(0deg)";
		}
		var col = document.querySelectorAll(".col");
		for (i = 0; i < col.length; ++i) {
			col[i].style.transform = "rotate(0deg)";
			col[i].style.height = "";
		}
		document.querySelector("#now90").style.transform = "rotate(0deg)";
	}
}

const dob = document.querySelector('input#dob');
dob.addEventListener('input', refresh_calendar);



function refresh_calendar() 
{
	var highlighted_count = document.querySelectorAll(".highlighted").length;
	
	
	var dob = document.querySelector("input#dob").value;
	
	dob = Date.parse(dob);
	
	var weeks_since_birth = (now - dob) / 60 / 60 / 24 / 7 / 1000;
	weeks_since_birth = Math.floor(weeks_since_birth);
	
	var highlighted_diff = Math.floor(Math.abs(highlighted_count - weeks_since_birth));
	if (highlighted_count > weeks_since_birth) {
		// remove highlights from tail
		var highlighted_last_item = document.querySelectorAll(".highlighted").item(highlighted_count-1);
		for ( var i = 0; i < highlighted_diff; i++ ) {
			// highlighted_count - highlighted_diff
			var week = document.querySelector(".week" + (highlighted_count - 1 - i));
			week.classList.remove("highlighted");
			week.innerHTML = "";
		}
	}
	else {
		// add highlights to tail
		var highlighted_last_item = document.querySelectorAll(".highlighted").item(highlighted_count-1);
		for ( var i = 0; i < highlighted_diff; i++ ) {
			// highlighted_count - highlighted_diff
			var week = document.querySelector(".week" + (highlighted_count + i));
			week.classList.add("highlighted");
			week.innerHTML = "&cross;";
		}
	}
}
