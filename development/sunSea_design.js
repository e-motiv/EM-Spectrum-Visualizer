/***************** For Importing stuff ***********************************/
/*************************************************************************/
function loadedXML(e) {
	var re = /f.*N="([^"]*)" E="([^"]*)" val="([^"]*)"/gi;
	var fA0	= HzWlSwap(3, -2)
	var x0 = fE2SVGX(fA0[0], fA0[2] * 3) - 2792 //for export - 2792
	points	= x0 + "," + tSvgDomH + " "
	while ((found = re.exec(this.responseText)) !== null) {
		var fA = HzWlSwap(found[1], found[2] / 3)
		var x = fE2SVGX(fA[0], fA[2] * 3) - 2792 //for export - 2792
		var y = tSvgDomH - found[3]*tSvgDomH/4
		points += x.toFixed(0) + "," + y.toFixed(0) + " "
		console.log(fA, x, y, found);
	}
	graph.addSvgPolyLine(points.trim(), "white", 1, "hsla(64,100%,50%,0.7)")
	move2( 2*xStep - x0 ) 

}
function loadXMLPlot(xml){
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadedXML);
	oReq.open("GET", xml);
	oReq.send();
}
/*************************************************************************/
/*************************************************************************/