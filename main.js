const tableBody = document.getElementById("table-body");
        const inputDate = document.getElementById("data-base");
        const buttonMesAnterior = document.getElementById("btn-mes-anterior");
        const buttonProximoMes = document.getElementById("btn-proximo-mes");

        setMesAtual(dateToday());
        const dateHoje = new Date(dateToday()) //mm-dd-yyyy
        gerarCalendario(dateHoje);

        inputDate.addEventListener("input", function () {
            var dataBase = converterEntradaMesEmDate(inputDate.value);
            gerarCalendario(dataBase);
        });

        buttonMesAnterior.addEventListener("click", function () {
            var dataBase = converterEntradaMesEmDate(inputDate.value);
            var mesAnterior = new Date(dataBase.setMonth(dataBase.getMonth() - 1));
            gerarCalendario(mesAnterior);
            setMesAtual(mesAnterior);

        });

        buttonProximoMes.addEventListener("click", function () {
            var dataBase = converterEntradaMesEmDate(inputDate.value);
            var mesAnterior = new Date(dataBase.setMonth(dataBase.getMonth() + 1));
            gerarCalendario(mesAnterior);
            setMesAtual(mesAnterior);

        });

        function gerarCalendario(dataBase) {

            /***OBS: locações inseridas no calendario pelo arquivo locacao.js** */
            var primeiroDiaDoMes = new Date(dataBase.getFullYear(), dataBase.getMonth(), 1);
            var ultimoDiaMesAnterior = new Date(primeiroDiaDoMes - subtrairDias(1));
            var primeiroDiaProximoMes = new Date(primeiroDiaDoMes.getFullYear(), primeiroDiaDoMes.getMonth() + 1, 1)
            var ultimoDiaDoMes = new Date(primeiroDiaProximoMes - subtrairDias(1));

            var conteudoHtml = "<tr>";//abre linha
            var restanteSemana = 7;
            var UltimoDiaPrintado = 0;

            //cria a primeira semana
            //cria dias iniciais da semana do mes anterior
            for (var i = (ultimoDiaMesAnterior.getDate() - primeiroDiaDoMes.getDay() + 1); i <= ultimoDiaMesAnterior.getDate(); i++) {
                conteudoHtml += `
            <td class="dias_fora_mes">
                <span>${i}</span>
                <div></div>
            </td>`;
                restanteSemana--;
            }
            console.log()
            //cria os primeiros dias do mes completando primeira semana
            for (var i = 1; i < (restanteSemana + 1); i++) {
                conteudoHtml += criarDiaNaTabela(i, dataBase.getMonth(), dataBase.getFullYear());
                UltimoDiaPrintado = i;
            }


            //cria as linhas restante, exceto a ultima
            var quantidadeDiasRestante = ultimoDiaDoMes.getDate() - restanteSemana;
            var quantidadeSemanaRestante = Math.floor(quantidadeDiasRestante / 7);
            for (var i = 0; i < (quantidadeSemanaRestante); i++) {
                conteudoHtml += "<tr>";
                aux = UltimoDiaPrintado;
                for (var u = aux + 1; u < (aux + 7 + 1); u++) {
                    conteudoHtml += criarDiaNaTabela(u, dataBase.getMonth(), dataBase.getFullYear());
                    UltimoDiaPrintado = u;
                }
                conteudoHtml += "</tr>";
            }

            //cria a ultima linha caso o mes não encerre no sabado
            if ((ultimoDiaDoMes.getDate() - UltimoDiaPrintado) > 0) {
                conteudoHtml += "<tr>";
                restanteSemana = 7;
                for (i = UltimoDiaPrintado + 1; i < ultimoDiaDoMes.getDate() + 1; i++) {
                    conteudoHtml += criarDiaNaTabela(i, dataBase.getMonth(), dataBase.getFullYear());
                    restanteSemana--;
                }
                for (i = 1; i < restanteSemana + 1; i++) {
                    conteudoHtml += `
            <td class="dias_fora_mes">
                <span>${i}</span>
                <div></div>
            </td>`;
                }
                conteudoHtml += "</tr>";
            }
            tableBody.innerHTML = conteudoHtml;
            setarNomeMesEMes(dataBase);
        }

        function subtrairDias(dias) {
            return (dias * 24 * 60 * 60 * 1000);
        }

        function setMesAtual(data) {
            var inputDate = document.querySelector('input[id="data-base"]');
            dataString = data.getFullYear()
                + "-" + (data.getMonth() + 1).toString().padStart(2, '0');
            inputDate.value = dataString;
        }

        function dateToday() {
            const hoje = Date.now();//pega data de hoje
            const data = new Date(hoje); // transforma em Date
            return data;
        }

        function criarDiaNaTabela(dia, mes, ano) {
            if (dateToday().getDate() == dia && dateToday().getMonth() == mes && dateToday().getFullYear() == ano) {
                return `<td >
            <span class="hoje">${dia}</span> 
            <div id="dia${dia}" ></div>
        </td>`
            }
            return `<td >
            <span>${dia}</span> 
            <div id="dia${dia}"></div>
        </td>`
        }
        function converteDateInMmDdYyyy(date) {//mm-dd-yyyy
            return (date.getMonth() + 1).toString().padStart(2, '0')
                + "-" + (date.getDate() + 1).toString().padStart(2, '0')
                + "-" + date.getFullYear();
        }

        function converterEntradaMesEmDate(entrada) {
            var ano = (entrada).substring(0, 4);
            var mes = (entrada).substring(5, 7);
            var data = new Date(mes + "-01-" + ano);
            return data;
        }
        function setarNomeMesEMes(dataBase) {
            var mes = dataBase.getMonth() + 1;
            var ano = dataBase.getFullYear();
            switch (mes) {
                case 1: {
                    mes = "Janeiro";
                    break;
                }
                case 2: {
                    mes = "Fevereiro";
                    break;
                }
                case 3: {
                    mes = "Março";
                    break;
                }
                case 4: {
                    mes = "Abril";
                    break;
                }
                case 5: {
                    mes = "Maio";
                    break;
                }
                case 6: {
                    mes = "Junho";
                    break;

                } case 7: {
                    mes = "Julho";
                    break;
                }
                case 8: {
                    mes = "Agosto";
                    break;
                }
                case 9: {
                    mes = "Setembro";
                    break;
                }
                case 10: {
                    mes = "Outubro";
                    break;
                }
                case 11: {
                    mes = "Novembro";
                    break;
                }
                case 12: {
                    mes = "Dezembro";
                    break;
                }
            }
            document.getElementById("mes").innerHTML = mes;
            document.getElementById("ano").innerHTML = ano;
        }