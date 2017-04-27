# EM-Spectrum-Visualiser
A multi-purpose graphical tool / presentation to explore, learn, calculate and visualise everything around the electromagnetic spectrum.
(html / javascript / SVG)

([Developers needed!](#help-wanted))

Some examples:
- EM spectrum bands visualisation and knowledge (radio waves, micro waves, infrared, visible spectrum, ultra violet, X-rays, gamma rays, cosmic radiation)
- frequency wavelength calculator / positionor
- Visualisation Overlays (PLots, images, ..)
  - atmospheric attenuation
  - Popular everyday things compared to wavelength sizes
  - Irradiance / Spectrum of the sun
- Spectrum lines (TO TRANSFER)
- Interaction with matter (TO TRANSFER)
- Frequency allocations (ITU, Europe- (TO TRANSFER)

## Screenshot
![Screenshot](/_screenshot.png?raw=true "Sreenshot EM SPectrum Visualiser")

## Running version / Status
You can use it already for different purposes, though it's not really ready and the data is not always right (like Y-axis values or missing data).

[Running project page](https://e-motiv.github.io/EM-Spectrum-Visualiser/)

## History
A long time ago e-motiv.et (aka Ruben Goethals) had some free time on his hands, so he created the same tool in Flash (see link below). Flash together with actionscript was a promising platform for graphical presentations. Even today (2017) its benifits and possibilities are not matched. Unfortunatly, someone (like a certain former director of Apple) has made it possible to fade out Flash from popular acceptance. (You won't hear this from all the Flash haters out there though, but well..)


It was even linked in the main "EM Spectrum" article of Wikipedia, until some editors thought it was a commerial link after I changed my domain from e-builds.com to e-motiv.net. Even though it was free.

It seems a lot of people hate progress somehow or just like authority..

Anyway, e-motiv would hate his efforst to go to waste. This is a trial to revive this interesting tool via html and javascript and SVG. He hopes someone or multiple persons take interest in it and take over the torch and this tool would be a standard tool for teachers, students, physicists and many more..

## Old Flash version
If you want to know how the old one looked like for development or other reasons
Check
[here on gitHUB](_version%20flash%20-%20old/source/Electromagnetic%20Spectrum.swf)
or
[here on e-motiv](http://attic.e-motiv.net/em-spectrum) 

## Help wanted
You want to take over the torch (more or less) ? (Also see end of History above.) 
If you're interested and you don't know where to start, [mail me](mailto:Ruben@e-motiv.net) or write me a message here.

## Development notes
Mostly, if you start fiddling with script/base.js you will understand everything if you are a developer. But here is the most important structure:
- index.html: The main starting point
- script/base.js: Where all the magic happens!
- content: folder with all graphic and text/html files
- development: folder with some files to generate the SVGs that come into the content folder or the ones once used for it in case there are some extensions to be made. (In other words, the tool itself is used to make the SVGs and see how well they fit etc.)
  - development/todo.txt: All the TODO's that are not inline the code
  - development/decsions.txt: Decisiosn that have been made and are important to remember not to make the same mistakes later
- style: css and style-only related mages




