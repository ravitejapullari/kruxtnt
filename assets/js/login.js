'use strict';
var _setTimeInterval = '';
(function($) {
    _barclaysAdserver = {
        _checklogin: function(k, l) {
            var _userdata = _logindata;
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('segment');
            for (var i = 0, j = _userdata.length; i < j; i++) {
                if (_userdata[i]['username'] === k) {
                    if (_userdata[i]['password'] === l) {
                        _barclaysUser = _userdata[i]; // location.href = 'barclays-in.html';
                        sessionStorage.setItem('username', k);
                        location.href = 'account.html';
                    }
                }
            }
        },
        _setSegment: function(_segment) {
            var _setSegment = sessionStorage.setItem('segment', _segment);
            _barclaysAdserver._selectedProduct(_segment);

        },
        _executeLogin: function() {
            var _uname = $('#username').val(),
                _pword = $('#userpassword').val();

            console.log($('#username'));
            if (_uname != '' && _pword != '') {
                _barclaysAdserver._checklogin(_uname, _pword);
            }
        },
        _accessStorageData: function(username) {
            if (typeof(Storage) != undefined) {
                dataLayer.user.userId = username;
                $('#b_username').html(username);
                var i = 0,
                    oJson = {},
                    sKey;
                for (; sKey = window.localStorage.key(i); i++) {
                    oJson[sKey] = window.localStorage.getItem(sKey);
                }
                _setTimeInterval = setInterval(function() {
                    if (localStorage.getItem('kxbarclays_bank_segs')) {
                        clearInterval(_setTimeInterval);
                        _barclaysAdserver._sasAdServCall(oJson);
                    }
                }, 10);
            }
        },
        _adAjaxServ: function(serviceUrl) {
            var _ajaxCall = $.ajax({
                method: "GET",
                crossDomain: true,
                url: serviceUrl,
                dataType: 'jsonp'
            }).done(function() {
                console.log('Success');
            });
            var _timerSet = setTimeout(function() {
                _barclaysAdserver._updateSegments();
            }, 1000);
        },
        _selectedProduct: function(selProd) {
            var _seleprod = _sasObj.csegment[selProd];
            console.log(_seleprod);
            _barclaysAdserver._sasAdServCall(oJson);
        },
        _sasAdServCall: function(sData, sProd) {
            var _kruxSegments = sData,
                _segmentpair = '',
                _urlCall = '',
                _adserver = _sasObj.saswebsever + _sasObj.adcallmethod;
            _urlCall = _adserver + _barclaysAdserver._cacheBuster() + '/b1/Segments=' + sData.kxbarclays_bank_segs + '/Location_AccountType=accountPromo_current/b2/Segments=' + sData.kxbarclays_bank_segs + '/Location_AccountType=accountPromo_savings?api_key=rlMrAZKoTouXh0SNxInC';
            _barclaysAdserver._adAjaxServ(_urlCall);
        },
        _updateSegments: function() {
            $('#adserve1').html(b1);
            $('#adserve2').html(b2);
            $('#adserve3').html(b3);
        },
        _cacheBuster: function() {
            var _aimRnd = Math.round(Math.random() * 100000000);
            return "/ball/random=" + _aimRnd + "/viewid=" + _aimRnd;
        }
    }
})(jQuery);