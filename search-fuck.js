function IsPC(){  
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
    var flag = true;  
    for (var v = 0; v < Agents.length; v++) {  
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
    }  
    return flag;  
 }
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
   //alert(navigator.userAgent);  
//    alert(">>>");
   document.getElementById("pcmenu").innerHTML="";
} else if (/(Android)/i.test(navigator.userAgent)) {
//    alert(">>>");
   //alert(navigator.userAgent); 
   document.getElementById("pcmenu").innerHTML="";
};