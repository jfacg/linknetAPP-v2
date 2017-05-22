(function () {
    angular.module('linknetApp').controller('TituloController', [
        '$http',
        'tabs',
        'toastr',
        'UrlFactory',
        TituloController
    ]);

    function TituloController($http, tabs, toastr, UrlFactory) {
        const vm = this;
        const url = UrlFactory;
        const urlTitulos = `${url}/mk/listarTitulos`

        vm.refresh = function () {
            tabs.show(vm, { tabList: true })
            vm.titulo = {}
            vm.titulos = []
            $http.post(urlTitulos).then(function (response) {
                vm.titulos = response.data;
            
                for (var i = 0; i < vm.titulos.length; i++) {
                    if (vm.titulos[i].bloqueado == "sim") {
                        vm.titulos[i].statusCliente = "Bloqueado"
                    } else {
                        vm.titulos[i].statusCliente = "Observação"
                    }
                    vm.titulos[i]
                }

            });
        }

        vm.create = function () {
            vm.caixa.nome = nomeCaixa(vm.caixa.mes, vm.caixa.ano);
            $http.post(urlCaixa, vm.caixa).then(function (response) {
                toastr.success('Operação realizada com sucesso!!', 'Success')
                vm.refresh();
            }).catch(function (response) {
                toastr.error(response.data.errors, 'Error');
            });
        };

        vm.update = function () {
            vm.caixa.nome = nomeCaixa(vm.caixa.mes, vm.caixa.ano)
            const updateUrl = `${urlCaixa}/${vm.caixa._id}`
            $http.put(updateUrl, vm.caixa).then(function (response) {
                toastr.success('Operação realizada com sucesso!!', 'Success')
                vm.refresh()
            }).catch(function (response) {
                toastr.error(response.data.errors, 'Error');
            });
        };

        vm.delete = function () {
            const deleteUrl = `${urlCaixa}/${vm.caixa._id}`
            $http.delete(deleteUrl).then(function (response) {
                toastr.success('Operação realizada com sucesso!!', 'Success')
                vm.refresh()
            }).catch(function (response) {
                toastr.error(response.data.errors, 'Error');
            })
        }

        vm.showTabUpdate = function (caixa) {
            vm.caixa = caixa
            tabs.show(vm, { tabUpdate: true })
        }

        vm.showTabDelete = function (caixa) {
            vm.caixa = caixa
            tabs.show(vm, { tabDelete: true })
        }

        vm.refresh()
    };
})()
