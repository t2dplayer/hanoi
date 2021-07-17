/*
Torre de Hanoi - josecarlos.dev
Desenvolvido por José Carlos - 2020
Modificado por: Sérgio Vieira - 2021 - sergio.vieira@ifce.edu.br
*/

var currentLine = 0;
var commands = [];
var movimentos = 0; // variavel que armazena os movimentos do usuario

function selectTextareaLine(tarea,lineNum) {
	lineNum--; // array starts at 0
	var lines = tarea.value.split("\n");

	// calculate start/end
	var startPos = 0, endPos = tarea.value.length;
	for(var x = 0; x < lines.length; x++) {
		if(x == lineNum) {
			break;
		}
		startPos += (lines[x].length+1);

	}

	var endPos = lines[lineNum].length+startPos;

	// do selection
	// Chrome / Firefox

	if(typeof(tarea.selectionStart) != "undefined") {
		tarea.focus();
		tarea.selectionStart = startPos;
		tarea.selectionEnd = endPos;
		return true;
	}

	// IE
	 if (document.selection && document.selection.createRange) {
		tarea.focus();
		tarea.select();
		var range = document.selection.createRange();
		range.collapse(true);
		range.moveEnd("character", endPos);
		range.moveStart("character", startPos);
		range.select();
		return true;
	}

	return false;
}

function Gerar(tamanho, torre, ordem) {
  /* constructor do objeto disco*/
  this.tam = tamanho; // tamanho do disco
  this.tor = torre; // torre em que o disco esta
  this.ord = ordem; // ordem em que o disco na torre
  this.verificar = function (dest) {
    /* 
	funcao que verifica se o disco a ser movido eh menor que os discos da torre de destino
	onde:
	se retornar 0 significa que a movimentacao nao eh permitida
	se retornar 1 significa que a movimentacao eh permitida
	*/
    for (var i = 0; i < discos.length; i++) {
      if (discos[i].tor == dest && this.tam > discos[i].tam) {
        return 0;
      }
    }
    return 1;
  };
  this.nova_ordem = function (dest, tipo) {
    // dest -> torre de destino, tipo -> adicionar ou remover disco
    if (tipo == 0) {
      // adicionar elemento a haste
      for (var i = 0; i < discos.length; i++)
        if (discos[i].tor == dest) discos[i].ord += 1;
    } else {
      // remover elemento da haste
      for (var i = 0; i < discos.length; i++)
        if (discos[i].tor == dest) discos[i].ord -= 1;
    }
  };
  this.ganhou = function () {
    // verifica se o jogador ganhou ou nao
    for (var i = 0; i < discos.length; i++) if (discos[i].tor != 3) return 0;
    return 1;
  };
  this.movimentar = function (torre_destino) {
    /*
	se retornar 0 significa que o disco nao pode ser movido por ter outro disco acima
	se retornar 1 significa que o disco nao pode ser movido por ser maior que algum disco que ja esta na torre
	se retornar 2 significa que o disco nao pode ser movido por conta da torre escolhida
	se retornar 3 significa que o disco foi movido para a torre escolhida
	se retornar 4 significa que o jogador ganhou
	*/
    if (this.ord != 1) {
      return 0;
    } else if (this.verificar(torre_destino) == 0) {
      return 1;
    } else if (
      torre_destino == this.tor ||
      (torre_destino != 1 && torre_destino != 2 && torre_destino != 3)
    ) {
      return 2;
    } else {
      this.nova_ordem(torre_destino, 0);
      this.nova_ordem(this.tor, 1);
      /* muda o local do disco */
      this.tor = torre_destino;
      this.ord = 1;
      movimentos++;
      if (this.ganhou() == 1) {
        return 4;
      } else {
        return 3;
      }
    }
  };
}

function start() {
	if (editor != null) {
		var lines = editor.getValue();
		commands = lines.split('\n');
		currentLine = 0;
		editor.getDoc().markText({line:currentLine,ch:0},{line:currentLine,ch:3},{css: "background-color: yellow"});
	}
}

function parse(input) {
	return [input[0], input[1], input[2]];
}

function pinIndex(pin) {
	var map = {
		'A': 1,
		'B': 2,
		'C': 3,
	};
	return map[pin];
}

function execute(token) {
	var disc = parseInt(token[0]);
	var src_pin = pinIndex(token[1]);
	var dst_pin = pinIndex(token[2]);
	disc = 7 - numeross + disc;
	definir_disco(disc, src_pin)
	definir_pino(dst_pin);	
	currentLine++;
	editor.getDoc().markText({line:currentLine - 1,ch:0},{line:currentLine - 1,ch:3},{css: "background-color: transparent"});
	editor.getDoc().markText({line:currentLine,ch:0},{line:currentLine,ch:3},{css: "background-color: yellow"});
}

function next() {
	var command = commands[currentLine];
	var token = parse(command);
	execute(token);	
}

function previous() {

}