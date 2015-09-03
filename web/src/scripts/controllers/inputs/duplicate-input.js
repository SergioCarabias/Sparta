(function() {
  'use strict';

    /*DUPLICATE INPUT MODAL CONTROLLER */
    angular
        .module('webApp')
        .controller('DuplicateFragmentModalCtrl', DuplicateFragmentModalCtrl);

    DuplicateFragmentModalCtrl.$inject = ['$modalInstance', 'item', 'FragmentFactory', '$filter'];

    function DuplicateFragmentModalCtrl($modalInstance, item, FragmentFactory, $filter) {
        /*jshint validthis: true*/
        var vm = this;

        vm.ok = ok;
        vm.cancel = cancel;
        vm.error = false;
        vm.errorText = '';

        init();

        ///////////////////////////////////////

        function init () {
            console.log('*********Modal');
            console.log(item);
            vm.inputData = item.inputData;
        };

        function ok() {
            if (vm.form.$valid){
                checkFragmnetname();
            }
        };

        function checkFragmnetname() {
          var inputNamesExisting = [];
          console.log(vm.inputData);
          var newInputName = vm.inputData.name.toLowerCase();
          inputNamesExisting = $filter('filter')(item.inputNamesList, {'name': newInputName}, true);

          if (inputNamesExisting.length > 0) {
            vm.error = true;
            vm.errorText = "_INPUT_ERROR_100_";
          }
          else {
            createfragment();
          }
        };

        function createfragment() {
            delete vm.inputData['id'];
            var newFragment = FragmentFactory.CreateFragment(vm.inputData);

            newFragment.then(function (result) {
                console.log('*********Fragment duplicated');
                console.log(result);
                $modalInstance.close(result);

            },function (error) {
                vm.error = true;
                vm.errorText = "_INPUT_ERROR_" + error.data.i18nCode + "_";
            });
        };

        function cancel() {
            $modalInstance.dismiss('cancel');
        };
    };
})();
