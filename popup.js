// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// // Use of this source code is governed by a BSD-style license that can be
// // found in the LICENSE file.

function openTab(tabUrl){
    chrome.tabs.create({pinned:true,
                            url:tabUrl
                           });
}

function openListOfTabs(tabs){
    _.each(tabs, openTab);
}


function savePinnedTabs(){
    chrome.tabs.query({
        pinned:true,
    }, function(tabs){
        tabs = _.map(tabs, function(tab){return tab.url;});
        chrome.storage.sync.set({'pinnedTabs': tabs}, function() {
        });
    });
}



function openSavedTabs(){
    chrome.storage.sync.get('pinnedTabs', function(storageObj) {
        openListOfTabs(storageObj['pinnedTabs']);
    });
}



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("save").onclick = savePinnedTabs;
    document.getElementById("open").onclick = openSavedTabs;
});
