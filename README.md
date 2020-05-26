# EM-Spectrum-Visualiser
A multi-purpose graphical, educational, scientific, interactive, online, multimedia presentation / physics tool to explore, learn, calculate and visualise everything around the electromagnetic spectrum.  
(html / javascript / SVG)

[Developers needed!](#help-wanted)

- [Features](#features)
- [Screenshot](#screenshot)
- [Running version / Status](#running-version--status)
- [History](#history)
    - [Old Flash version](#old-flash-version)
- [Help wanted](#help-wanted)
- [Development notes](#development-notes)

## Features

- Well-know EM spectrum (sub)bands with a short explanation of each (with uses, charecteristics, etc..)  
Radio waves • Microwave • Infrared • Visible spectrum • Ultraviolet • X-ray • Gamma ray • Cosmic waves
- Calculator, converting between frequency, wavelength and photon energy (eV)  
  Jumps to the converted position
- A "mouse hover pointer" which gives you detailed frequencies 
- Independant graphical overlays which you can switch on and off:
  - Interaction with matter = Processes at (sub)atomic level with explanation  
    Nuclear Magnetic Rotation  •  Molecular rotation and torsion / vibration • Atomic, molecular and inner electronic jumps • Inonisation • Scattering (Rayleigh, Raman, Thomson, Compton) • Nuclear Jumps  • Pair Production
  - Frequency applications (ECA, more to follow)
  - Frequency allocations (ITU 1, ECA, more to follow)
  - Atmospheric attenuation
  - Black bodies
  - Irradiance / spectrum  of the sun
  - Well-known frequencies
  - Emission lines (H, O2, more to follow)
  - Wavelength sizes comparison with some well known things such as a building, insect, cell, virus, amino acid, atoms, ..
  
## Screenshot
![Screenshot](/_screenshot.png?raw=true "Sreenshot EM SPectrum Visualiser")

## Running version / Status
You can use it already for different purposes, but it's still in development state

[Running project page](http://em-spectrum.e-motiv.net)

## History
A long time ago, e-motiv.net (aka Ruben Goethals) had some free time on his hands, so he created the same tool in Flash (see link below). Flash together with actionscript was a promising platform for graphical presentations. Even today (2017) its benifits and possibilities are not matched in browsers. Unfortunatly, someone (like a certain former director of Apple) has made it possible to fade out Flash from popular acceptance. (You won't hear this from all the Flash haters out there though, but well..)

It was even linked in the main "EM Spectrum" article of Wikipedia, until some editors thought it was a commerial link after I changed my domain from e-builds.com to e-motiv.net. Even though it was free.
It seems not everyone like free physics presentations.. ?

Anyway, e-motiv would hate his efforst to go to waste. This is a trial to revive this interesting tool via html and javascript and SVG. He hopes someone or multiple persons take interest in it and take over the torch and this tool would be a standard tool for teachers, students, physicists and many more..

### Old Flash version
If you want to know how the old one looked like for development or other reasons
Check
[here on gitHUB](_version%20flash%20-%20old/source/Electromagnetic%20Spectrum.swf)

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




