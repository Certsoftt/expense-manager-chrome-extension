$(document).ready(function(){
    chrome.storage.sync.get([`total`,'limit'],(expense)=>{
        $("#total").text(expense.total)
        $("#your_limit").text(expense.limit)
    })
    $("#submit_btn").click(()=>{
        chrome.storage.sync.get([`total`,'limit'], (expense)=>{
            var newTotal = 0
            if(expense.total){
                newTotal += parseInt(expense.total)
            }
            var amount = $("#amount").val()
            if(amount){
                newTotal += parseInt(amount)
            }
            
            if(amount && newTotal >= expense.limit){
                var expenseNotifyOpt = {
                    type:"basic",
                    iconUrl:"icon48.png",
                    title:"You Have Reached Your Limit!",
                    message:"Yes!, your expense limit has been reached"
                }
                chrome.notifications.create('limitReached',expenseNotifyOpt)
            }
            if(amount && newTotal < expense.limit){
                chrome.storage.sync.set({'total':newTotal})
                $("#total").text(newTotal)
                $('#amount').val('')
            }
            
        })    
    })
})