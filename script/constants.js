
//////////////////////// GLOBALS ////////////////////////////////
const
	pfxs	= "yzafpnµm KMGTPEZY"
	//basic unit distance
	dx		= 10
	//maximum frequency to plot
	maxExp	= 27
	//pixel per 10 step
	xStep	= 200
	maxX	= maxExp * xStep
	
	//Bands constants // See drawBands
	//y, yT, H, c1,c2, textfillstyle (svg height = 115, bandSquare y = 15-115
	sRa		= [90,110,25],
	sIr		= [65,85,25],
	sUV		= [90,110,25],
	sUV2	= [65,85,25]
	//TOD0: ARent radio and infrared overlapping?
	bands	= [
		//rX,eX,rY,eY,color1, color2, name, height
		[1,0,3,12,"hsl(64,60%,40%)","hsl(0,60%,10%)","Radio Spectrum"],
		[3,12,43,13,"hsl(0,60%,10%)","hsl(0,60%,40%)","Infrared"],
		[1,9,3,12,"hsl(74,60%,40%)","hsl(0,60%,10%)","Micro Waves",50],
		[43,13,75,13,"gradVis",0,"Visible Spectrum"],
		[75,13,3,17,"hsl(255,60%,40%)","hsl(255,60%,10%)","Ultra Violet"],
		[3,17,3,19,"hsl(255,60%,10%)","hsl(302, 60%, 20%)","X-Rays"],
		[3,19,6,22,"hsl(302, 60%, 20%)","hsl(0, 0%, 100%)","Gamma Rays"],
		[6,22,6,25,"hsl(0, 0%, 100%)","hsl(0,0%,0%)","Cosmic background"],
		//Sub radio
		[3,0,3,1,,,"ELF",sRa],
		[3,1,3,2,,,"SLF",sRa],
		[3,2,3,3,,,"ULF",sRa],
		[3,3,3,4,,,"VLF",sRa],
		[3,4,3,5,,,"LF",sRa],
		[3,5,3,6,,,"MF",sRa],
		[3,6,3,7,,,"HF",sRa],
		[3,7,3,8,,,"VHF",sRa],
		[3,8,3,9,,,"UHF",sRa],
		[3,9,3,10,,,"SHF",sRa],
		[3,10,3,11,,,"EHF",sRa],
		//Sub infrared
		[3,11,20,12,,,"FIR",sIr],
		[20,12,375,11,,,"LWIR",sIr],
		[375,11,1,14,,,"MWIR",sIr],
		[1,14,214,12,,,"SWIR",sIr],
		[214,12,429,12,,,"NIR",sIr],
		//Sub UV Health
		[75,13,3,15,,,"UVA",sUV],
		[3,15,375,14,,,"UVB",sUV],
		[75,15,3,17,,,"UVC",sUV],
		//Sub UV other
		[789,12,15,14,,,"NUV",sUV2],
		[15,14,3,16,,,"FUV",sUV2],
		[3,17,968,13,,,"XUV",sUV2]
	],
	infos	= [
		"radio.html",
		"infrared.html",
		"microwave.html",
		"visible.html",
		"ultraviolet.html",
		"xRays.html",
		"gamma.html",
		"cosmic.html"
	];