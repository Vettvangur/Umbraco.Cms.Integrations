﻿function zapierController($scope, notificationsService, umbracoCmsIntegrationsAutomationZapierResource, umbracoCmsIntegrationsAutomationZapierValidationService) {

    var vm = this;

    vm.contentTypes = [];
    vm.contentConfigs = [];

    getContentTypes();

    getContentConfigs();

    vm.onAdd = function () {

        const isValid =
            umbracoCmsIntegrationsAutomationZapierValidationService.isValidConfig(vm.webHookUrl,
                vm.selectedContentType);

        if (!isValid) {
            notificationsService.warning("Zapier Content Config", "Zapier configuration is invalid");
            return;
        }
        
        umbracoCmsIntegrationsAutomationZapierResource.addConfig(vm.webHookUrl, vm.selectedContentType).then(function (r) {

            getContentTypes(vm.selectedContentType);

            getContentConfigs();

            reset();
        });
    }

    vm.onDelete = function(id) {
        umbracoCmsIntegrationsAutomationZapierResource.deleteConfig(id).then(function () {
            getContentTypes();

            getContentConfigs();
        });
    }

    function getContentTypes() {
        umbracoCmsIntegrationsAutomationZapierResource.getContentTypes().then(function (response) {
            vm.contentTypes = response;
        });
    }

    function getContentConfigs() {
        umbracoCmsIntegrationsAutomationZapierResource.getAllConfigs().then(function (response) {
            vm.contentConfigs = response;
        });
    }

    function reset() {
        vm.webHookUrl = "";
        vm.selectedContentType = "";
    }
}

angular.module("umbraco")
    .controller("Umbraco.Cms.Integrations.Automation.Zapier.ZapConfigController", zapierController);