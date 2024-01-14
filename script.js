var badRatingCount= 0;
var totalRatingCount = 0; 

function rateExperience(rating) {
    if (rating === '0') {
        badRatingCount++;
    } 
}
function submitRating() {
    totalRatingCount++;
}

document.addEventListener('DOMContentLoaded', function () {
    var misClickCount = 0;
    var thresholdValue = 4;
    var misClickCycle = 0;
    var totalClick = 0;
    var totalClickCycle =0;
    var clickHistory = []; 

    var oldTotalClickCycle = 0;
    var oldMisclickCycles = 0;
    var oldTotalRating = 0;
    var oldBadRating = 0;

    var storedData = localStorage.getItem('userData');
    if (storedData) {
        var parsedData = JSON.parse(storedData);
        oldTotalClickCycle = parsedData.totalClickCycle;
        oldMisclickCycles = parsedData.misClickCycles;
        oldTotalRating = parsedData.totalRating;
        oldBadRating = parsedData.badRating;
    }

    // document.addEventListener('click', function (event) {
    //     totalClick++;
    //     if (!event.target.classList.contains('clickable') ) {
    //         misClickCount++;
    //         if (misClickCount >= thresholdValue) {
    //             misClickCycle++;   
    //             misClickCount = 0;              
    //         }
    //     }
    // });
    
    document.addEventListener('click', function (event) {
        totalClick++;
        if (!event.target.classList.contains('clickable') ) {
            clickHistory.push(0); // 0 for a mis-click   
            console.log("mis-click");
		    console.log(clickHistory); 
        }else {
            clickHistory.push(1); // 1 for a valid click
            console.log("valid click");
            console.log(clickHistory); 
        }
        
        if (clickHistory.length >= thresholdValue) {
            totalClickCycle++; 

            if (clickHistory.every(val => val === 0)) {
                misClickCycle++;   
            }
	        clickHistory.length = 0;
        }
    });

 
    document.getElementById('closeButton').addEventListener('click', function() {
        // if (clickHistory.length < thresholdValue) {
        //     totalClickCycle++; 

        //     if (clickHistory.every(val => val === 0)) {
        //         //misClickCycle++;   
        //     }
        // }  
        generateMisclickReport();
    });

    function totalClickCycleCount() {
        //return Math.floor(totalClick/thresholdValue);
        return totalClickCycle;
    }

    function generateMisclickReport() {    
        
        var dataToSave = {
            totalClickCycle: (totalClickCycleCount()+oldTotalClickCycle),
            misClickCycles: (misClickCycle+oldMisclickCycles),
            totalRating: (totalRatingCount+oldTotalRating),
            badRating: (badRatingCount+oldBadRating)
        };

        localStorage.setItem('userData', JSON.stringify(dataToSave));
        //alert('Data saved in local storage.');
    }
});



