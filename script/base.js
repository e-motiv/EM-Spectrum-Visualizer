//Eternal thanks to e-motiv.net (aka Ruben Goethals)
//Free to publish only with a link to e-motiv.net

document.write('<script src="script/constants.js"></script>');

var raf, dir, svgW, svgDomW, tSvgDomH, totalTransform=0, currentBut, tGraphs = new WeakMap();

//////////////////////// START ////////////////////////////////
document.addEventListener("DOMContentLoaded", _startESV);

function _startESV(event) {

	//Get all the elements we want and put them in the variable with same name
	[	"topBand", "left", "right","btmSVG","yelLine", "mLineSVG", "topSVG", "fixTopSVG", 
		"bandsSVG", "bandsDefs", "roFN", "roFPre", "roWN", "roWPre", "roFE", "roWe","info", "tooltip"
	].forEach(s=>{
		window[s]=document.getElementById(s)
	})
	
	//Dimensioning
	updateDims()
	window.addEventListener('resize', updateDims)
	
	//Bottom Band
	mLineSVG.addEventListener('mousemove', mLineMMove)
	mLineSVG.addEventListener('mouseup', lineUpFix)
	
	draw();
	
	//Moving logic	
	left.addEventListener('mouseover', over)
	left.addEventListener("mouseout",out)
	left.addEventListener("mousedown",down)
	left.addEventListener("mouseup",up)
	right.addEventListener('mouseover', over)
	right.addEventListener("mouseout",out)
	right.addEventListener("mousedown",down)
	right.addEventListener("mouseup",up)
	

	//LineCursor & Freq Display
	roFN.addEventListener('keyup',calcWl)
	roFPre.addEventListener('keyup',calcWl)
	roWN.addEventListener('keyup',calcHz)
	roWPre.addEventListener('keyup',calcHz)
	
	//menu
	var menuItems = topBand.querySelectorAll( 'a' );
	for (var item of menuItems) {
		item.addEventListener('click',menuBB, false)
		item.addEventListener('mouseover',showTip) //TODO, MAke graphics from buttons
		item.addEventListener('mouseout',hideTip) 
	}
}



//////////////////////// BASICS ////////////////////////////////
function draw() {
	//Draw metric line
	drawMetric();
	//Draw the bands
	drawBands();
}

function updateDims(e) {
	//Some dimensions
	svgW		= btmSVG.attributes.width.value
	svgDomW		= document.body.clientWidth
	tSvgDomH	= document.body.clientHeight-180-70
	
}

//Convert from frequency exponentials to SVG coords
function fE2SVGX(N,E) {
	N=Number(N)
	if (N==0) return 0
	return (Number(E) + Math.log10(N))*xStep;
}
//Convert from SVG to DOM coords
function SVG2DOMX(x) {
	console.log(x * svgDomW / svgW, svgDomW, svgW)
	return x * svgDomW / svgW;
}
function topSVG2DOMY(y) {
	console.log(y, topSVG.height.baseVal.value, topSVG.attributes.width.value)
//	return y * topSVG / svgW;
}

//////////////////////// Moving ////////////////////////////////
//Apparently, we have to clear and redraw canvas each time (or at least a rectangle of it)

////SVGMatrix solution?  Bad described offline in Zeal offline help // Also SVGMatrix needs a btmSVG image in document
//var matrix = canvas.createSVGMatrix();
//pattern = ctx.createPattern(ctx);
//pattern.setTransform(matrix.rotate(-45).scale(1.5));
//ctx.getImageData solution for getting parts of canvas?
//ctx.getImageData(50, 50, 100, 100)



function scroll() { 
//	console.log(totalTransform, maxX, svgDomW - maxX)é
	
	totalTransform+=dir*dx;
	if(move2(totalTransform)){
		raf = window.requestAnimationFrame(scroll);
		yelLine2Readout()
		return
	}
	out();
}

function move2(x) { 	//TESTED: see decisions.txt
	noEdge	= false
	if ( x < (svgDomW - maxX) ) {
		totalTransform	= svgDomW - maxX
	} else if (	x > 0 )  {
		totalTransform	= 0
	} else {
		totalTransform	= x
		noEdge	= true
	}
	btmSVG.setAttribute( "transform", "translate(" + totalTransform + ",0)" )
	topSVG.setAttribute( "transform", "translate(" + totalTransform + ",0)" )
//	console.log("totalTransform:" + totalTransform);
	return noEdge
}

function over(e) {
//	console.log(e.currentTarget, e.currentTarget.dataset.dir);
	dir = e.currentTarget.dataset.dir;
	raf = window.requestAnimationFrame(scroll);
}
function out(e) {
	window.cancelAnimationFrame(raf);
}
function down(e) {
	dx=40;
}
function up(e) {
	dx=10;
}

//////////////////////////////// LINE ////////////////////////////////
function drawMetric() {
	
	// Main line
	mLineSVG.addSvgLine(0,60, maxX, 60, "hsl(0,0%,90%)", 5)
	//hitregion
	mLineSVG.addSvgRect(0,0, maxX, 65, "transparent")
	
	for (var i = 0; i < maxExp; i++) {

		// Big strokes
		var x = i * xStep;
		mLineSVG.addSvgLine(x,30,x,57, "hsl(0,0%,50%)", 2)
		NP = i2Hz(i)
		mLineSVG.addSvgText(x+3, 20+8, "hsl(0,0%,50%)", NP[0] + " " + NP[1] + "Hz") //"18px serif"
		//TODO: Add color to Hertz prefix (addElement or otherwise?)	
//		var T = addTextElement(i,x,y);
		
		// Small strokes
		for (var j = 2; j < 10; j++) {
//			console.log(Math.log10(j));
			var x = fE2SVGX(j,i);//10*j
			mLineSVG.addSvgLine(x,40,x,57, "hsl(0,0%,20%)", 2)
		}		
	}
}

function addTextElement(T,x,y) {

	console.log(x,y);
	var newDiv = document.createElement("div");
	newDiv.className="metricLabel";
	newDiv.innerHTML=T;
	x = x/svgW;
	y = y/mLineSVG.height;
	console.log(x,y);	
	newDiv.setAttribute("style", "left:" + x*100 + "%;top:" + y*100 + "%"); 
//	document.body.insertBefore(newDiv, canvas);
	document.body.appendChild(newDiv);	 	 
	return newDiv;
}


function prefix(E) {
	return pfxs[E + 8];
}

function i2Hz(i) {
	
	P = Math.floor(i/3)
	return [Math.pow(10,i%3), prefix(P), P];
}

function HzWlSwap(N, P) { 
//	console.log(N,P)

	newN=300/N
	newP=2-P
	if(newN<=1) {
		newN*=1000;
		newP--;
	}
//	console.log(newN,newP)
	return [newN.toPrecision(3),prefix(newP), newP];
}
function pre2P(pre) {

	P = pfxs.indexOf(pre)
	if (P < 0 || pre.length == 0) P = 8; 			//	-1 if not found, 0 if empty string
	return P-8;
}


function calcWl(e) {

	fP = pre2P(roFPre.value);
	wlA = HzWlSwap(roFN.value, fP)
//	console.log("fP:"+ fP,"wlN:"+ wlA[0],"wlPre:"+ wlA[1])
	
	roWN.value		= wlA[0]
	roWPre.value	= wlA[1]
	roWE.innerHTML	= "E" + wlA[2] * 3
	yelLineMovebyF(roFN.value,fP)
}
function calcHz(e) { //e.screenX

	wlP				= pre2P(roWPre.value);
	fA				= HzWlSwap(roWN.value, wlP)
//	console.log("fP:"+ fP,"wlN:"+ wlA[0],"wlPre:"+ wlA[1])
	
	roFN.value		= fA[0]
	roFPre.value	= fA[1]
	roFE.innerHTML	= "E" + fA[2] * 3
	yelLineMovebyF(fA[0], fA[2])
}
function yelLineMove2(x) {

	yelLine.setAttribute("style", "left:" + (x - yelLine.clientWidth/2) + "px");
}
function yelLineMovebyF(fN, fP) {

	x	= fE2SVGX(fN,fP*3)
//	srollintoview
	move2( svgDomW / 2 - x)
	yelLineMove2( x + totalTransform )
//	console.log("x:"+ x,"totalTransform:"+ totalTransform,"svgDomW / 2 - x:"+ svgDomW / 2 - x)
}
function mLineMMove(e) { //e.screenX
//	console.log("e.clientX:" + e.clientX, "xStep:" + xStep, "svgW:" + svgW, "svgDomW:" + svgDomW, "yelLine:", yelLine)

	yelLineMove2(e.clientX)
	yelLine2Readout()
}

function yelLine2Readout() {

	x				= yelLine.offsetLeft + yelLine.clientWidth/2
	
	i				= (x - totalTransform) / xStep
	NP				= i2Hz(i)
	roFN.value		= NP[0].toPrecision(3)
	roFPre.value	= NP[1]
	roFE.innerHTML	= "E" + NP[2] * 3
	
	var wlA 		= HzWlSwap(NP[0],NP[2])
	roWN.value		= wlA[0]
	roWPre.value	= wlA[1]
	roWE.innerHTML	= "E" + wlA[2] * 3
}

function lineUpFix(e) {
	console.log( "x:"+ (e.clientX-totalTransform), "clientX:"+e.clientX, "totalTransformX:"+totalTransform)

	if(mLineSVG.dataset.fix>0) {
		mLineSVG.addEventListener('mousemove', mLineMMove);
		mLineSVG.dataset.fix=0;
	}
	else {
		mLineSVG.removeEventListener('mousemove', mLineMMove);
		mLineSVG.dataset.fix=1;
	}
}


//////////////////////////////// BANDS ////////////////////////////////

function drawBands() {	
	
	bands.forEach((band, i, array) => {
		//if(band[0]) //if visible part then draw (for later when doing own zooming and moving of metric line)
		var x0	= fE2SVGX(band[0],band[1]);
		var x1	= fE2SVGX(band[2],band[3]);
		var W	= x1-x0;
		if (typeof band[7] === "object") {
			var y	= band[7][0];
			var yT	= band[7][1];
			var H	= band[7][2];
			var c1	= "hsla(0, 0%, 0%, 0.1)"
			var c2	= "hsla(0, 0%, 0%, 0.05)"
		} else {
			var H	= (typeof band[7] === "number")?band[7]:100;
			var y	= 15;	//to leave place for text
			var yT	= 10;
			var c1	= band[4];
			var c2	= band[5];
		}
		if (band[4] === "gradVis") {
			id = "gradVis";
		} else {
			var grad = bandsDefs.addSvgGrad(id="band"+i);
			grad.addSvgGradStop("0%",c1);
			grad.addSvgGradStop("100%",c2);
		}
//		text first for hovers not to hover text
		var textFill = (typeof band[7] === "object")?"hsla(0,0%,0%,0.5)":"url(#"+id+")";
		bandsSVG.addSvgText((x1 + x0 - (7.5 * band[6].length) )/2, yT, textFill, band[6] );// width of text estimated
		//Band itself
		rect = bandsSVG.addSvgRect(x0, y, W, H, "url(#"+id+")", 0,"hover")
		rect.addEventListener('click', bandClick)
		rect.dataset.i = i
	})
}
function bandClick(e) {
	console.log(e.currentTarget, e.currentTarget.dataset.i, typeof infos[e.currentTarget.dataset.i]);
	if (infos[e.currentTarget.dataset.i])
		info.src	= "content/" + infos[e.currentTarget.dataset.i]
	showInfo();
}


//////////////////////////////// topSVG & MENU ////////////////////////////////

function showTip(e) {
	tooltip.innerHTML = e.currentTarget.title;
	tooltip.style.transform = "none"
	tooltip.style.left = e.clientX + 30 + "px"
	tooltip.style.top = e.clientY + 50 + "px"
//	console.log(e.clientX, tooltip.style.left, e.clientY, tooltip.style.top)
//	tooltip.style.left = e.currentTarget.offsetLeft + e.currentTarget.clientWidth + 120
//	tooltip.style.top = e.currentTarget.offsetTop + e.currentTarget.clientHeight + 120
}
function hideTip(e) {
	tooltip.style.transform = "scale(0, 0)"	
}

function menuBB(e) {
//	console.log(e.currentTarget, e.cancelable)
	
	//Don't let browser go there
	e.preventDefault()
	currentBut = e.currentTarget
	
	if (tGraphs.has(currentBut)) {
		tGraphs.get(currentBut).remove()
		tGraphs.delete(currentBut)
		currentBut.classList.remove("on")
	}
	else {
		graph = topSVG.newEl('g', ["opacity"], [0.7])

		var fn = window[currentBut.className]
		if (typeof fn === "function") fn(currentBut.href)
		else console.error("Button Class is not a function", currentBut.className)
		tGraphs.set(currentBut,graph)
		currentBut.classList.add("on")
	}
}

function loadedSVG (e) {
	graph = tGraphs.get(currentBut) //How to get buttontarget from menu? let graph safe enough?
//	console.log("loadedSVG", this.responseText);
	var dim	= this.responseText.match(/<svg[^>]*width="([^"]*)"[^>]*height="([^"]*)"/mi);
	var fs	= this.responseText.match(/<metadata.*fmin="([^E"]*)E([^"]*)" fmax="([^E"]*)E([^"]*)"/i);
//	console.log(dim, fs)
	var W		= dim[1]
	var H		= dim[2]

	var x0 = fE2SVGX(fs[1], fs[2]).toFixed(0)
	var x1 = fE2SVGX(fs[3], fs[4]).toFixed(0)
	console.log(x0,x1,W,x1-x0,H,dim,fs,tSvgDomH)
	
	graph.setAttribute(	"transform", 
						"translate("+ x0 +",0)" + 
						( currentBut.dataset.svgscale!=0?
						"scale("+( (x1-x0)/W )+","+ (tSvgDomH/H) +")"
						:"" ) )
	svgInner		= this.responseText.match(/<metadata[^>]*>([\w\W]*)<\/svg>/mi)
//	console.log(svgInner[1])
	graph.innerHTML	= svgInner[1]
	move2( svgDomW / 2 - x0)

//	console.log(topSVG, topSVG.attributes.height.value) // No way to get actual value in browser
//	graph.addSvgRect(2,2, 1598, 718,  "red")
	}
function loadSVG(svg){
	
	showTopSVG();
	
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadedSVG);
	oReq.open("GET", svg);
	oReq.send();
}

function loadedTopSVGs(e) {
	
// TODO: update for when zoomed in and when overlapping
	var	re = /<svg[^>]*>([\s\S]*)<\/svg>/mi,
	found = re.exec(this.responseText)
//	 console.log(found);
	graph.innerHTML =  found[1]
	groups = graph.querySelectorAll("g")
// re2 =
// /<img\s*src="([^"]*).*<span.*data-fN="([^"]*)".*data-fE="([^"]*)"[^>]*>([^<]*).*<\/span>(.*)/i,
	for (var g of groups) {
//		console.log(g.dataset);
		var x = fE2SVGX(g.dataset.fn, g.dataset.fe).toFixed()
		var y = tSvgDomH - 200
		console.log(x,y,found)
		var image = g.getElementsByTagName('image')[0]
		console.log(image, image.getAttribute("href"));
		image.setAttribute("href","content/img/" + image.getAttribute("href"))
		W = Number(image.getAttribute("width"))
		if (x - W/2 > 0) x-=W/2 
		g.setAttribute("transform", "translate(" + x + "," + y + ")" )
	}
// move2( 2*xStep - x0 )

}
	
function loadTopSVGs(svg){
	
	info.style.display = "none"
		
//	console.log(svg);
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadedTopSVGs);
	oReq.open("GET", svg);
	oReq.send();
}
/***************** For Importing stuff ***********************************/
/*************************************************************************/
function loadedXMLPlot(e) {

	showTopSVG();
	
	var re	= /f.*N="([^"]*)" E="([^"]*)" val="([^"]*)" (?:mol="([^"]*)")?/gi,
	points	= "",
	maxY	= 1000	//attAtmLogLog TODO: Learn from development xml file head
	x0		= 1700	//attAtmLogLog TODO: Learn from development xml file head
	while ((found = re.exec(this.responseText)) !== null) {
		var x = fE2SVGX(found[1], found[2])// - 2792 //for export - 2792
		x	= x.toFixed(0)
		var y = tSvgDomH - (found[3]/maxY)*tSvgDomH
		y	= y.toFixed(0)
		points += x + "," + y + " "
		console.log(x, y, found);
		if(found[4]) {
			graph.addSvgText(x-20, y-20, "#eee", found[4])
		}
	}
	graph.addSvgPolyLine(points.trim(), "white", 1, "hsla(240,20%,25%,0.7)")
	move2( 2*xStep - x0 ) 

}
function loadXMLPlot(xml){
	
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadedXMLPlot);
	oReq.open("GET", xml);
	oReq.send();
}
/*************************************************************************/
/*************************************************************************/
function showInfo() {
	info.style.display = "block"
}
function showTopSVG(){
	info.style.display = "none"
	topSVG.style.display = 
	fixTopSVG.style.display = "block"
	if(fixTopSVG.dataset.grid)
		return
	drawGrid()
}
function drawGrid(){
	for(i=0;i<10;i++) {
		var y = i*68
		fixTopSVG.addSvgLine(0,y,"100%",y, "hsla(0, 0%, 100%, 0.5)", 2)
	}
	fixTopSVG.dataset.grid = 1
}

//////////////////////////////// SVG help ///////////////////////////	/////

Element.prototype.addSvgImg = function (href, x=0, y=0, W="100%", H="100%", cls="test") {

	return this.newEl('image', 
			["href", "x", "y", "width", "height", "class"], 
			[href, x, y, W, H, cls]) //arguments doesn't work with default values
}
Element.prototype.addSvgPolyLine = function (points, str, strW, fill) {
	
	//arguments[3]="transparent"

	return this.newEl('polyline', 
			["points", "stroke", "stroke-width", "fill"], 
			arguments);
}
Element.prototype.addSvgLine = function (x1, y1, x2, y2, str, strW) {


	return this.newEl('line', 
			["x1", "y1", "x2", "y2", "stroke", "stroke-width"], 
			arguments);
}
Element.prototype.addSvgText = function (x, y, fill, txt) {

	var text =  this.newEl('text', 
			["x", "y", "fill"], 
			arguments);

	text.setAttribute("font-size","16")
	text.setAttribute("font-weight","bold")
	text.innerHTML = txt
	return text;
}
Element.prototype.addSvgGradStop = function (x, col) {

	return this.newEl('stop', 
			["offset", "stop-color"], 
			arguments);
}
Element.prototype.addSvgGrad = function (id) {

	return this.newEl('linearGradient', 
			["id"], 
			arguments);
}
Element.prototype.addSvgRect = function (x=0, y=0, W, H,  f="red", s="", cls="") {

	return this.newEl('rect', 
			["x", "y", "width", "height", "fill", "stroke", "class"], 
			[x, y, W, H, f, s, cls]) //arguments doesn't work with default values
}
Element.prototype.newEl = function (tag, attrs, vals) {
	
	var newEl = this.appendChild(addSVG(tag))
	if (attrs) attrs.forEach( (attr, i, array) => {
		newEl.setAttribute(attr,vals[i]);
	})

	return newEl;
}
function addSVG(o){
	return document.createElementNS("http://www.w3.org/2000/svg", o);
}