function initFetchCep() {
    const inputCep = document.getElementById('cep');
    const btnCep = document.getElementById('btnCep');
    const box = document.querySelectorAll('.info');
    const img1 = document.querySelector('.img1');
    const img2 = document.querySelector('.img2');
    const img3 = document.querySelector('.img3');

    btnCep.addEventListener('click', handleClick);

    function handleClick(event) {
        event.preventDefault();

        function buscaCep(cep) {
            var cep = inputCep.value;
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(body => {
                    if (body.erro) {
                        img1.style.display = "none";
                        img2.style.display = "none";
                        img3.style.display = "flex";
                    } else {
                        const nomeRua = document.getElementById('nomeRua');
                        const nomeBairro = document.getElementById('nomeBairro');
                        const complemento = document.getElementById('complemento');
                        const gia = document.getElementById('gia');
                        const ibge = document.getElementById('ibge');
                        const localidade = document.getElementById('localidade');
                        const uf = document.getElementById('uf');

                        nomeRua.innerText = body.logradouro;
                        nomeBairro.innerText = body.bairro;
                        complemento.innerText = body.complemento;
                        gia.innerText = body.gia;
                        ibge.innerText = body.ibge;
                        localidade.innerText = body.localidade;
                        uf.innerText = body.uf;

                        img1.style.display = "none";
                        img2.style.display = "flex";
                        img3.style.display = "none";
                    }
                }).catch(e => {
                    img1.style.display = "none";
                    img2.style.display = "none";
                    img3.style.display = "flex";
                });
        };
        buscaCep(cep);
    };

    function isEmpty() {
        if (document.getElementById("cep").value == "") {
            img1.style.display = "flex";
            img2.style.display = "none";
            img3.style.display = "none";
            return
        };
    };
    isEmpty();
}
initFetchCep();

function initModal() {
    const botaoAbrir = document.querySelector('[data-modal="abrir"]');
    const botaoFechar = document.querySelector('[data-modal="fechar"]');
    const containerModal = document.querySelector('[data-modal="container"]');
    const modal = document.querySelector('.modal h1');

    if (botaoAbrir && botaoFechar && containerModal) {
        function abrirModal(event) {
            if (document.getElementById("cep").value == "") {
                event.preventDefault();
                containerModal.classList.add('ativo');
            };
        };

        function fecharModal(event) {
            event.preventDefault();
            containerModal.classList.remove('ativo');
        };

        function cliqueFora(event) {
            if (event.target == this)
                fecharModal(event);
        };

        botaoAbrir.addEventListener('click', abrirModal);
        botaoFechar.addEventListener('click', fecharModal);
        containerModal.addEventListener('click', cliqueFora);
    };
};

initModal();