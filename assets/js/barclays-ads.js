(function(){
    function inititalizeAds(){
        googletag.cmd.push(function() {
            for(var i=0,j=window._barclaysAds.adscount;i<j;i++){
                googletag.defineSlot(window._barclaysAds.adsobject[i].tagurl, [window._barclaysAds.adsobject[i].width, window._barclaysAds.adsobject[i].height], window._barclaysAds.adsobject[i].tagid).addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
                if(i==j-1){
                    loadAds();
                }
            }
            /*googletag.defineSlot(window._barclaysAds.adsobject[0].tagurl, [window._barclaysAds.adsobject[0].width, 600], window._barclaysAds.adsobject[0].tagid).addService(googletag.pubads());
            googletag.defineSlot(window._barclaysAds.adsobject[1].tagurl, [window._barclaysAds.adsobject[1].width, 600], window._barclaysAds.adsobject[1].tagid).addService(googletag.pubads());
            googletag.defineSlot(window._barclaysAds.adsobject[2].tagurl, [window._barclaysAds.adsobject[2].width, 250], window._barclaysAds.adsobject[2].tagid).addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
            loadAds();
            var _settimeout = setTimeout(function(){
                loadAds();
                clearInterval(_settimeout);
            }, 2000);*/
        });
    }

    function loadAds(){
        for(var i=0,j=window._barclaysAds.adscount;i<j;i++){
            googletag.cmd.push(function() {googletag.display(window._barclaysAds.adsobject[i].tagid); });
        }  
    }

    inititalizeAds();
})();