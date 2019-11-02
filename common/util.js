function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}

function checkPhone(phone) {
	if(!(/^\d{11}$/.test(phone))){
		return false;
	}
	return true;
}

/*对象转换数组*/
function objectConverArray(obj) {
	var arr = [];
	for(var i in obj) {
		arr.push(obj[i]);
	}
	return arr;
	var arr = Object.getOwnPropertyNames(obj); //arr=["one", "two"]
	var arr2 = Object.keys(obj);//arr=["one", "two"]
	var valArr = arr.map(function(i){return obj[i]});//["I am 1", "I am 2"]
	var valArr2 = arr2.map(function(i){return obj[i]});//["I am 1", "I am 2"]
	//或者2,4和3,5各自合并成一条语句
	var valArr22 = Object.keys(obj).map(function(i){return obj[i]});//["I am 1", "I am 2"]
	
	return valArr2;
}


/**
 * 处理服务器扫码带进来的参数
 * @param string param 扫码携带参数
 * @param string k 整体分割符 默认为：&
 * @param string p 单个分隔符 默认为：=
 * @return object
 * 
*/
function getUrlParams(param,k,p) {
  if (typeof param!='string') return {};
  k = k ? k : '&';//整体参数分隔符
  p = p ? p : '=';//单个参数分隔符
  var value = {};
  if (param.indexOf(k) !== -1) {
    param = param.split(k);
    for (var val in param) {
      if (param[val].indexOf(p) !== -1) {
        var item = param[val].split(p);
        value[item[0]] = item[1];
      }
    }
  }else
  {
    var item = param.split(p);
    value[item[0]] = item[1];
  }
  return value;
}

var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	objectConverArray:objectConverArray,
	checkPhone: checkPhone,
	getUrlParams: getUrlParams
}
