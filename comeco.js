/*
Torre de Hanoi - josecarlos.dev
Desenvolvido por José Carlos - 2020
Modificado por: Sérgio Vieira - 2021 - sergio.vieira@ifce.edu.br
*/

var editor = null;
var number_of_pins = 0;

window.onload = function(){
	editor = CodeMirror(function(elt) {
		myTextArea.parentNode.replaceChild(elt, myTextArea);
	}, {
		  value: myTextArea.value,
		  styleActiveLine: { nonEmpty: true },
		  lineNumbers: true,
		  styleActiveSelected: true,
	});
	//var u = setInterval(mudarblur,100);
}