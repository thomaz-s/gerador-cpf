const formulario_consultar = document.getElementById("formulario-cpf")
const input_cpf_com_mascara = document.getElementById("input-cpf-com-mascara")
const botao_submit = document.querySelector("input[type='submit']")
const lista_resultados = document.getElementById("ul-resultados")

let listaResultados = []

formulario_consultar.onsubmit = buscarNaoNumericos
input_cpf_com_mascara.oninput = aceitarSomenteNumerosCoringa

preencherPlaceholder()

function buscarNaoNumericos(event){
    event.preventDefault()
    const cpf_com_mascara = input_cpf_com_mascara.value
    const inicio_cpf_incompleto_com_mascara = cpf_com_mascara.substring(0, 9)
    const dv = cpf_com_mascara.substring(9, 11)

    const array_de_letras = inicio_cpf_incompleto_com_mascara.match((/[^0-9]/g)) || []
    const quantidade = array_de_letras.length

    substituirNaoNumericos(quantidade, inicio_cpf_incompleto_com_mascara, dv)
    mostrarValorConsultado(cpf_com_mascara)

    input_cpf_com_mascara.value = ""
    input_cpf_com_mascara.focus()
    botao_submit.setAttribute("disabled", true)
    preencherPlaceholder()
    
}

function aceitarSomenteNumerosCoringa(event){
    event.target.value = event.target.value.replace(/[^0-9x?*]/ig, "")

    if (event.target.value.length == 11){
        botao_submit.removeAttribute("disabled")
    }else{
        botao_submit.setAttribute("disabled", true)
    }
}

function substituirNaoNumericos(quantidade, inicio_cpf_incompleto_com_mascara, dv){
    const combinacoes = 10 ** quantidade

    let tipo = null;
    if (dv.match(/[0-9][^0-9]/)){
        tipo = 0
    }else if (dv.match(/[^0-9][0-9]/)){
        tipo = 1
    }else if (dv.match(/[^0-9][^0-9]/)){
        tipo = 2
    }else{
        tipo = 3
    }

    for (let i = 0; i<combinacoes; i++){
        const combinacao = String(i).padStart(quantidade, "0")

        let inicio_sem_mascara = inicio_cpf_incompleto_com_mascara
        for(let j = 0; j < quantidade; j++){
            inicio_sem_mascara = inicio_sem_mascara.replace(/[^0-9]/, combinacao[j])
        }

        const dv0 = calcular_dv(inicio_sem_mascara)
        const cpf_com_decimo_digito = inicio_sem_mascara + dv0
        const dv1 = calcular_dv(cpf_com_decimo_digito)
        const cpf_completo = cpf_com_decimo_digito + dv1

        switch (tipo){
            case 0:
                if (dv0 == dv[0]){
                    listaResultados.push(cpf_completo)
                }
            break;

            case 1:
                if (dv1 == dv[1]){
                    listaResultados.push(cpf_completo)
                }
            break;
        
            case 2:
                listaResultados.push(cpf_completo)
            break;
                
            case 3:
                if ((dv0 == dv[0]) && (dv1 == dv[1])){
                    listaResultados.push(cpf_completo)
                }
            break;
        }

        if (i == 999999){
            alert(`Foi necessário limitar o número de cobinações. Faltaram ${combinacoes - 1000000} combinações`)
            break
        }
    }
    
    criarLista()
}

function mostrarValorConsultado(cpf_com_mascara){
    const cpf_formatado = cpf_com_mascara.substring(0, 3) + "." + cpf_com_mascara.substring(3, 6) + "." + cpf_com_mascara.substring(6, 9) + "-" + cpf_com_mascara.substring(9, 11)
    document.getElementById("consulta").innerText = cpf_formatado.toLowerCase()
}

function calcular_dv(numero){
    const sequencia = String(numero)
    let soma = 0
    const maior_multiplicador = sequencia.length + 1

    for (let i = 0; i < sequencia.length; i++){
        soma += (maior_multiplicador - i) * sequencia[i]
    }

    const resto = soma % 11
    let dv = 0

    if (resto > 1){
        dv = 11 - resto
    }

    return String(dv)
}

function criarLista(){
    lista_resultados.innerHTML = ""

    if (listaResultados.length > 0){
        listaResultados.forEach((item)=>{
            const itemLista = document.createElement("li")
            itemLista.innerText = item
            lista_resultados.appendChild(itemLista)
        })
    }else{
        const itemLista = document.createElement("li")
        itemLista.innerText = "Não há CPF's válidos nesse padrão";
        lista_resultados.appendChild(itemLista)
    }

    listaResultados = []
}

function preencherPlaceholder(){
    let placeholder = "Ex.: "

    for(let i = 0; i < 11; i++){
        let numero = Math.floor(14 * Math.random())

        if (numero >= 10){
            numero = "x"
        }

        placeholder += numero
    }

    input_cpf_com_mascara.setAttribute("placeholder", placeholder)
}