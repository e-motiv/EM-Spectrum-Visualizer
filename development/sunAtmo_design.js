/***************** For Importing stuff ***********************************/
/*************************************************************************/
function loadedXML(e) {
	var re = /f.*N="([^"]*)" E="([^"]*)" val="([^"]*)"/gi;
	points = ""
	while ((found = re.exec(this.responseText)) !== null) {
		var fA = HzWlSwap(found[1], found[2] / 3)
		var x = fE2SVGX(fA[0], fA[2] * 3) - 2695
		var y = 2146 - found[3]
		points += x.toFixed(0) + "," + y.toFixed(0) + " "
//		console.log(x, y, fA, found);
	}
	graph.addSvgPolyLine(points.trim(), "white", 1, "hsla(64,100%,50%,0.7)")

}
function loadXMLPlot(xml){
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadedXML);
	oReq.open("GET", xml);
	oReq.send();
}
/*************************************************************************/
/*************************************************************************/