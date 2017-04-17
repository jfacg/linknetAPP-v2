(function () {
  angular.module('linknetApp').service('UsuarioService', [
    'UsuarioFactory',
    'toastr',
    UsuarioService
  ]);

  function UsuarioService(UsuarioFactory, toastr) {

    function getUsuarios () {
      return UsuarioFactory.query(function (data) {
        return data
      });
    };

    function getUsuario (id) {
      return UsuarioFactory.get({userId:id}, function (data) {
        return data
      });
    };

    function deleteUsuario (usuarioId) {
      UsuarioFactory.delete({userId:usuarioId}, function () {
        toastr.success('Operação realizada com sucesso!!', 'Success')
      }, function () {
        toastr.error(response.data.errors, 'Error');
      });
    };

    function updateUsuario (usuarioId, usuario) {
      UsuarioFactory.update({userId: usuarioId} ,usuario, function () {
        toastr.success('Operação realizada com sucesso!!', 'Success')
      }, function () {
        toastr.error(response.data.errors, 'Error');
      });
    };

    function saveUsuario (usuario) {
      UsuarioFactory.save(usuario, function () {
        toastr.success('Operação realizada com sucesso!!', 'Success')
      }, function () {
        toastr.error(response.data.errors, 'Error');
      });
    };

    return {getUsuarios, getUsuario, deleteUsuario, updateUsuario, saveUsuario};
  }
})()
