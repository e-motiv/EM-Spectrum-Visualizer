
function drawBb(){

	//TODO: something wrong with tops, like they are not on the right frequency?
	const modY	= tSvgDomH / 8e-8, h = 6.62e-34, k = 1.38e-23, modY2 = tSvgDomH / 1.16e23
	c1	= 2 * h / 9e16,
	x0 = fE2SVGX(1,12),
	col = ["#ff3300", "#ff8d0b", "#ffb969", "#ffd5a1", "#ffe7cc", "#fff4ed", "#f7f5ff", "#e3e9ff", "#d9e1ff", "#cfdaff"]
	
//	move2( 2*xStep - x0 ) // not when export
	
	for (var t = 10; t>0; t--) {
		var T = t * 1000,
			c2 	= h / ( T * k ),
			points = points2 =  x0.toFixed(0) + "," + (tSvgDomH - 3), //x0.toFixed(0) when not exporting, otherwise 0
			 yTop = tSvgDomH//apparently svg coordinates are not used, but DOM coord!! tSvgDomH - 5 (strokewidth)
		for(dX=1;dX<xStep*4;dX+=5) {			
			x	= 12 * xStep + dX //- x0		//f: 1e12 - 1e16 / -x0 only for exorting to SVG
			f	= Math.pow(10, (x) / xStep) /// x+x0 only for exorting to SVG
			
			//Spectral radiance per frequency
			var R = c1 * Math.pow(f,3) * 1 / ( Math.exp( f * c2  ) - 1 )			
			y	= tSvgDomH - 3 - ( R * modY )			
			points += " " + x.toFixed(0) + "," + y.toFixed(0)
			if (y < yTop) { yTop = y }
			//Finding out why tops of BB don't seem right...
//			if (Math.random() > 0.99) {
//				graph.addSvgLine(x,y+20,x,y-20, "hsl(0, 100%, 50%)", 2)
//				graph.addSvgText(x, y, "hsl(0,100%,50%)", f + "Hz")
//			}
			
			//Spectral radiance per wavelength
//			var R2 = c1 * Math.pow(f,5) * 1 / ( Math.exp( f * c2  ) - 1 )			
//			y	= tSvgDomH - 3 - ( R2 * modY2 )				
//			points2 += " " + x.toFixed(0) + "," + y.toFixed(0)
			
			console.log("dX:" + dX, "f:" + f.toPrecision(3), "R:" + R.toPrecision(3),  "y:" + y.toPrecision(3))//"R2:" + R2.toPrecision(3),

		}
		graph.addSvgPolyLine(points.trim(), col[t-1], 3, col[t-1])// "transparent")//
		graph.addSvgText(3114, yTop.toFixed(0), col[t-1], T + "K") // / 3114 - x0 only for exorting to SVG
//		graph.addSvgPolyLine(points2.trim(), col[t-1], 3, col[t-1])
	}
}