function condicaoParada(p_matriz) {
	var i = p_matriz.length - 1;

	for (j = 1; j < p_matriz[i].length; j++) {
		if (p_matriz[i][j] > 0) {
			return true;
		}
	}
	return false;
}

function calcMatriz(p_matriz) {
	var nLinhas = p_matriz.length - 1;
	var nColunas = p_matriz[nLinhas].length - 1;

	// Escolhendo qual colocar como variável básica
	var maior = p_matriz[nLinhas][1];
	indMaior = 1;
	for (j = 2; j <= nColunas; j++) {
		if (p_matriz[nLinhas][j] > maior) {
			maior = p_matriz[nLinhas][j];
			indMaior = j;
		}
	}

	// Escolhendo qual variável básica sai
	var menor = Number.MAX_VALUE;
	var indMenor = 0;
	for (k = 1; k < nLinhas; k++) {
		var teste = p_matriz[k][nColunas] / p_matriz[k][indMaior]; //não testou após mudança
		if (p_matriz[k][indMaior] != 0 && teste < menor && teste >= 0 ) { //não testou após mudança
			menor = p_matriz[k][nColunas] / p_matriz[k][indMaior];
			indMenor = k;
		}
	}
	var v_in = p_matriz[0][indMaior];
	var v_out = p_matriz[indMenor][0];
	//document.getElementById("tab").innerHTML+="<p>Troca Base: Entra "+v_in.substr(0,1)+"<sub>"+v_in.substr(1,1)+"</sub> e Sai "+v_out.substr(0,1)+"<sub>"+v_out.substr(1,1)+"</sub></p>";
	p_matriz[indMenor][0] = p_matriz[0][indMaior];
	
	//printTabela(p_matriz);

	// Deixando o valor da nova variável básica == 1
	var aux = p_matriz[indMenor][indMaior];
	if (aux != 1) {
		for (l = 1; l <= nColunas; l++) {
			p_matriz[indMenor][l] = p_matriz[indMenor][l] / aux;
		}
		var fracao = new Fraction(1/aux);
		var numFormatado = fracao.toFraction();
		//document.getElementById("tab").innerHTML+="<p>Linha "+indMenor+" = Linha "+indMenor+" * "+numFormatado+"</p>";
		//printTabela(p_matriz);
	}

	// Zerando os outros valores na coluna da nova variável básica
	for (i = 1; i <= nLinhas; i++) {
		var aux = p_matriz[i][indMaior];
		if (i != indMenor && aux != 0) {
			for (j = 1; j <= nColunas; j++) {
				p_matriz[i][j] = parseFloat(p_matriz[i][j]) + parseFloat(-1 * aux * p_matriz[indMenor][j]);
			}
			var fracao = new Fraction(-1*aux);
			var numFormatado = fracao.toFraction();
			//document.getElementById("tab").innerHTML+="<p>Linha "+i+" = Linha "+i+" + ("+numFormatado+") * Linha "+indMenor+"</p>";
			//printTabela(p_matriz);
		}
	}
}

//bloqueia edição nos inputs
function esconder(p_variaveis, p_restricoes) {
	for (i = 1; i <= p_variaveis; i++) {
		document.getElementById('y'+i).style = "-moz-appearance:textfield;";
		document.getElementById('y'+i).style.border = "0";
		document.getElementById('y'+i).readOnly = true;

		for (j = 1; j <= p_restricoes; j++) {
			document.getElementById('x'+j+i).style = "-moz-appearance:textfield;";
			document.getElementById('x'+j+i).style.border = "0";
			document.getElementById('x'+j+i).readOnly = true;
		}
	}
	for (j = 1; j <= p_restricoes; j++) {
		document.getElementById('b'+j).style = "-moz-appearance:textfield;";
		document.getElementById('b'+j).style.border = "0";
		document.getElementById('b'+j).readOnly = true;
	}
}

function validarCoeficientes(p_variaveis, p_restricoes) {
	for (i = 1; i <= p_variaveis; i++) {
		if (document.getElementById('y'+i).value == "") {
			document.getElementById('y'+i).focus();
			alert('Informe os valores de todos os coeficientes.');
			return 1;
		}
		for (j = 1; j <= p_restricoes; j++) {
			if (document.getElementById('x'+j+i).value == "") {
				document.getElementById('x'+j+i).focus();
				alert('Informe os valores de todos os coeficientes.');
				return 1;
			}
		}
	}
	for (j = 1; j <= p_restricoes; j++) {
		if (document.getElementById('b'+j).value == "") {
			document.getElementById('b'+j).focus();
			alert('Informe os valores de todas as constantes.');
			return 1;
		}
	}
}

/*
document.getElementById('minimize').addEventListener('click',function () {
    $('#maximize').removeAttr('checked');
    $('#minimize').attr('checked');

});

document.getElementById('maximize').addEventListener('click',function () {
    $('#minimize').removeAttr('checked');
    $('#maximize').attr('checked');
});
*/

function atualizar() {
	window.location.href='index.html';
}

function criarForm(p_variaveis, p_restricoes) {

	if (p_variaveis == "" || p_variaveis <= 0 || p_variaveis != parseInt(p_variaveis)) {
		alert('Preencha o campo com a quantidade de variáveis.');
		form1.variaveis.focus();
		return;
	} else {
		if (p_restricoes == "" || p_restricoes <= 0 || p_restricoes != parseInt(p_restricoes)) {
			alert('Preencha o campo com a quantidade de restrições.');
			form1.regras.focus();
			return;
		}
	}
	if (p_variaveis > 0 && p_restricoes > 0) {

	    var aux = 10;

	    if(p_variaveis > 1 && p_variaveis < 4) {
            qtd_columns = 'col-md-6 ';
            col_offset = ' offset-md-3 ';
        }
        else if(p_variaveis > 3 && p_variaveis < 5) {
            qtd_columns = 'col-md-8 ';
            col_offset = ' offset-md-2 ';
        }
        else {
            qtd_columns = 'col-md ';
            col_offset = '';
        }

		$("#form2").css('display','block');
        $("#aqui").html("<div class=\"row\"><div id='global-row-1' class=\""+col_offset+qtd_columns+col_offset+" my-4 input-group d-flex text-center text-muted\"></div></div>");

        $("#global-row-1").append("<div class=\"input-group-prepend\"><span class=\"input-group-text\">Z = </span></div>");

        // Função de Z -- O laço roda o número de vezes o usuario digitou
		for (var h = 1; h <= p_variaveis; h++) {
            $("#global-row-1").append("<span class=\"px-3\"></span> <input type='number' class=\"inputZ form-control\" required autocomplete='off' size='5' maxlength='10' step='0.1' id='y"+h+"' name='y"+h+"' /><div class=\"input-group-append\"><span class=\"input-group-text\"> X<sub>"+h+"</sub></span></div>");
		}

		$('#global-row-1').append('<hr class="line-breaking">');

		// Restrições
        for (var i = 1; i <= p_restricoes; i++) {

			$('#aqui').append("<div class=\"row\"><div id='global-row-"+(i+1)+"' class=\""+col_offset+qtd_columns+col_offset+"my-4 input-group d-flex text-center text-muted\"></div></div>")

			$("#global-row-"+(i+1)).append("<div class='d-flex align-content-center'><p><b>Restrição "+i+"</b></p></div>");

			// O laço roda o número de vezes o usuario digitou
            for (var j = 1; j <= p_variaveis; j++) {
                $("#global-row-"+(i+1)).append("<span class=\"px-3\"></span> <input type='number' class=\"input form-control\" required autocomplete='off' size='5' maxlength='10' step='0.1' id='x"+(aux + j)+"' name='x"+(aux + j)+"' /><div class=\"input-group-append\"><span class=\"input-group-text\"> X<sub>"+j+"</sub></span></div>");

                //document.getElementById("aqui").innerHTML+=" + <input type='number' class='input' required autocomplete='off' size='5' maxlength='10' step='0.1' id='x"+i+j+"' name='x"+i+j+"' />x<sub>"+j+"</sub>";
            }

            aux += 10;

            $("#global-row-"+(i+1)).append("<span class=\"px-3\"></span><div class=\"input-group-append\"><span class=\"input-group-text\"> &#8804; </span></div><input type=\"numer\" class=\"input form-control\" required size='5' maxlength='10' id='b"+i+"' name='b"+i+"'>");

        }

		document.getElementById("btn1").style.display = 'none';
		document.getElementById("in1").disabled = true;
		document.getElementById("in2").disabled = true;
		$('#box-buttons-solve').css('display','block');
		$('#hr-pos-box-buttons-solve').css('display','block');
		//document.getElementById('y1').focus();
	}
}

function printTabela(p_matriz) {
	var restricoes = parseInt(document.form1.regras.value);
	var variaveis = parseInt(document.form1.variaveis.value);
	var linhas = restricoes+1;
	var colunas = restricoes + variaveis+1;
	var tabela = document.createElement("table");
	tabela.className = "table table-striped";
	var thead = document.createElement("thead");
	thead.className = "thead-light";
	var tbody=document.createElement("tbody");
	var tr = document.createElement("tr");
	tr.scope = "col";

	for (var l = 0; l <= colunas; l++) {
		var variavel = p_matriz[0][l];
		var th = document.createElement("th");
		if(l == 0) {
			var texto = document.createTextNode(variavel);
			th.appendChild(texto)
		} else {
			var sub = document.createElement("sub");
			var textoSub = document.createTextNode(variavel.substr(1,1));
			var texto = document.createTextNode(variavel.substr(0,1));
			sub.appendChild(textoSub);
			th.appendChild(sub);
			th.insertBefore(texto, th.firstChild);
		}
		tr.appendChild(th);
	}

	thead.appendChild(tr);
	
	for(var n = 1; n <= linhas; n++) {
		var tr = document.createElement("tr");
		for(var o = 0; o <= colunas; o++) {
			var variavel = p_matriz[n][o];
			var td = document.createElement("td");

			if (o == 0 && n < linhas) {
				var sub = document.createElement("sub");
				var b = document.createElement("b");
				var textoSub = document.createTextNode(variavel.substr(1,1));
				var texto = document.createTextNode(variavel.substr(0,1));
				sub.appendChild(textoSub);
				b.appendChild(sub);
				b.insertBefore(texto, b.firstChild);
				td.appendChild(b);
			} else {
				if (variavel != '-Z') {
					var fracao = new Fraction(variavel);
					variavel = fracao.toFraction();
					var texto = document.createTextNode(variavel);
					// Printa o valor da linha Z
					td.appendChild(texto);
				} else {
					var b = document.createElement("b");
					var texto = document.createTextNode(variavel);
					b.appendChild(texto);
					td.appendChild(b);
				}
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}

	tabela.appendChild(thead);
	tabela.appendChild(tbody);
	tabela.border = 1;
	document.getElementById("tab").appendChild(tabela);
}

function resolver() {
    var restricoes = parseInt(document.form1.regras.value);
    var variaveis = parseInt(document.form1.variaveis.value);
    var linhas = parseInt(document.form1.regras.value) + 1;
    var colunas = parseInt(document.form1.variaveis.value) + parseInt(document.form1.regras.value) + 1;

    if (validarCoeficientes(variaveis, restricoes) == 1) {
        return;
    }
    esconder(variaveis, restricoes);

    document.getElementById("btn2").style.display = 'none';
    document.getElementById("btn3").style.display = 'none';
    document.getElementById("tab").innerHTML+="<h2>Resolução</h2>";
    document.getElementById("tab").innerHTML+="<hr/>";
    document.getElementById("tab").innerHTML+="<h4>Tabela Inicial</h4><br>";
    matriz = [[]];
    matriz[0][0] = 'VB';

    var indice = 1;
    for (var l = 1; l <= variaveis; l++) {
        matriz[0][indice] = "x"+indice;
        indice++;
    }
    for (var m = 1; m <= restricoes; m++) {
        matriz[0][indice] = "f"+m;
        indice++;
    }

    matriz[0][matriz[0].length] = 'b';

    // Adicionando linhas com as variavéis básicas. Ex: 'f1', 'f2'
    var x = document.querySelectorAll(".input");
    indice = 0;
    var coluna = 0;
    for (var i = 1; i < linhas; i++) {
        matriz.push(['f'+i]);
        for (var j = 1; j <= variaveis; j++) {
            matriz[i][j] = parseFloat(x[indice].value.replace(",","."));
            indice++;
        }
        coluna = variaveis + 1;
        for (var k = 1; k <= restricoes; k++) {
            if(i==k) {
                matriz[i][coluna] = 1;
            } else {
                matriz[i][coluna] = 0;
            }
            coluna++;
        }
        matriz[i][coluna] = x[indice].value;
        indice++;
    }


    // Adicionando a última linha '-Z'
    var z = document.querySelectorAll(".inputZ");
    coluna = 0;
    matriz.push(['-Z']);
    for (var l = 0; l < variaveis; l++) {
        matriz[linhas][l+1] = parseFloat(z[l].value.replace(",","."));
    }
    coluna = variaveis + 1;
    for (var m = 1; m <= restricoes; m++) {
        matriz[linhas][coluna] = 0;
        coluna++;
    }
    matriz[linhas][coluna] = 0;

    printTabela(matriz);

    var ite = 1;
    while (condicaoParada(matriz)) {
        //document.getElementById("tab").innerHTML+="<p><b>Iteração "+ite+"</b></p>";
        calcMatriz(matriz);
        ite++;
    }

    var solucao = "Solução: ";

    for (var n = 1; n <= variaveis; n++) {
        var valor = 0;
        for (var o = 1; o <= restricoes; o++) {
            if (matriz[o][0] == 'x'+n) {
                valor = matriz[o][colunas];
                break;
            }
        }
        var fracao = new Fraction(valor);
        var numFormatado = fracao.toFraction();
        if (n == variaveis) {
            solucao += "x<sub>"+n+"</sub> = "+numFormatado;
        } else {
            solucao += "x<sub>"+n+"</sub> = "+numFormatado+", ";
        }
    }
    var fracao = new Fraction((matriz[linhas][colunas])*-1);
    var z = fracao.toFraction();
    if(isNaN(z)) {
        document.getElementById("tab").innerHTML+="<br><hr/>";
        document.getElementById("tab").innerHTML+="<p class='mt-5'><b><h3>A solução é ilimitada!</h3></b></p><br>";
        document.getElementById("btn4").style.display = 'block';
	}
	else {
        solucao += " e Z = "+z;
        document.getElementById("tab").innerHTML+="<br><hr/>";
        document.getElementById("tab").innerHTML+="<p class='mt-5'><b><h3>"+solucao+"</h3></b></p><br>";
        document.getElementById("btn4").style.display = 'block';
	}
}
