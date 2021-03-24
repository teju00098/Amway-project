




if ((teamaCardData[0].SumQtyCard) > (teambCardData[0].SumQtyCard)) {
    var diff = (teamaCardData[0].SumQtyCard) - (teambCardData[0].SumQtyCard);
    var width = 100-((diff * 100) / (teamaCardData[0].SumQtyCard));
    var myWidth = width+"%";
    document.getElementById('myWidth').style.width = myWidth;
} else if ((teamaCardData[0].SumQtyCard) < (teambCardData[0].SumQtyCard)) { 
   var diff = (teambCardData[0].SumQtyCard) - (teamaCardData[0].SumQtyCard); 
   var width = 100-((diff * 100) / (teambCardData[0].SumQtyCard));
   var myWidth = width+"%";
   document.getElementById('myWidth').style.width = myWidth;
} else {
 var myWidth = 100+"%";
 document.getElementById('myWidth').style.width = myWidth;
} 