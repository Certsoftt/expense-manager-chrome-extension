$(document).ready(function(){
    $("#save_limit_btn").click(()=>{
        var limit = $("#limit").val()
        var limitSetNotifyOpt = {
            type: "basic",
            iconUrl:"icon48.png",
            title:`Limit Set To ${limit}`,
            message: `Your limit has been set to ${limit}`
        }
        chrome.notifications.create('limitSet',limitSetNotifyOpt)
        chrome.storage.sync.set({'limit':limit},function(){
            close()
        })
    })
    $("#reset_total_btn").click(()=>{
        chrome.storage.sync.set({'total':0},()=>{
            var resetNotifyOpt = {
                type: "basic",
                iconUrl:'icon48.png',
                title:"Total Reset To 0",
                message:"You have reset total to 0!"
            }
            chrome.notifications.create('totalReset',resetNotifyOpt)
        })
    })
})