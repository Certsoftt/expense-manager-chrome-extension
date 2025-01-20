var contextMenuItem = {//create context menu item
    "id": "spendmoney",
    "title":"SpendMoney",
    "context": ["selection"]
}

//add the context menu item to the contextMenus API
chrome.contextMenus.create(contextMenuItem)

function isInt(value){
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10))
}

//listen out for a click event on the context menu item
chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "spendingmoney" && clickData.selectionText){
        if(isInt(clickData.selectionText)){
            chrome.storage.sync.get(['total', 'limit'], (expense)=>{
                var newTotal = 0;
                if(expense.total){
                    newTotal += parseInt(expense.total)
                }
                newTotal += parseInt(clickData.selectionText)
                if(newTotal >=expense.limit){
                    var lmitReachNotifyOpt = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title:"Expenses Limit Reached!",
                        message:"You have reached your expense limit"
                    }
                    chrome.notifications.create('limitNotif', lmitReachNotifyOpt)
                }
                if(newTotal < expense.limit){
                    chrome.storage.sync.set({'total': newTotal})
                }
            })
        }
    }
})

chrome.storage.onChanged.addListener((changes, storageName)=>{
    chrome.browserAction.setBadgeText({'text':changes.total.newValue.toString()})
})