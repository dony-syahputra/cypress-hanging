/* eslint-disable no-undef */
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { cypressBrowserPermissionsPlugin } = require('cypress-browser-permissions')
const _ = require('lodash');
const del = require('del');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  //require('@cypress/grep/src/plugin')(config);
  cypressBrowserPermissionsPlugin(on,config);

    on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin.default(config)],
        alias: {
            '@e2e': path.resolve(__dirname,'./cypress/e2e'),
            '@api': path.resolve(__dirname,'./cypress/api'),
            '@pom': path.resolve(__dirname,'./cypress/pom'),
            '@fixtures': path.resolve(__dirname,'./cypress/fixtures'),
            '@lib': path.resolve(__dirname,'./cypress/lib'),
            '@schema': path.resolve(__dirname,'./cypress/schema'),
          }
    }));

    on("after:spec", (spec, results) => {
        if (results && results.video) {
            // Do we have failures for any retry attempts?
            const failures = _.some(results.tests, (test) => {
                return _.some(test.attempts, { state: "failed" });
            });

            if (!failures) {
                // delete the video if the spec passed and no tests retried
                return del(results.video);
            }
        }
    });

    on('task', {
        log(message) {
            console.log(message)
            return null
        }
    });

    return config;
}

module.exports = defineConfig({
  projectId:process.env.CYPRESS_PROJECT_ID,
  defaultCommandTimeout: 20000,
  execTimeout: 20000,
  elementTimeout: 10000,
  pageLoadTimeout: 120000,
  requestTimeout:7000,
  responseTimeout:60000,
  videoCompression: 15,
  video:false,
  screenshotOnRunFailure:true,
  trashAssetsBeforeRuns:true,
  e2e: {
    specPattern: "**/*.{feature,spec.js}",
    testEnvironment: 'SIT',
    setupNodeEvents,
    env:{
        browserPermissions: {
            geolocation: 'allow'
    }},
        zephyrUploadResult: true, //default value is false - true means upload test result to zephyr.
        zephyrAttachImageOnFail: true, //default value is true - true means upload Image on failure to zephyr.
        zephyrAttachVideoOnFail: false, //default value is false - true means upload video on failure to zephyr.
        zephyrTestCycleKey: { // use projectKey as attribute name, example BA: "BA-R14"
            QA: "QA-R7", // sample project to test
            BA: "BA-R14",
            BDMS: "BDMS-R128",
            BAAT: "BAAT-R12",
            STE: "STE-R58",
            BSHA: "BSHA-R52",
            NDF4W: "B4WH-R181",
            BR: "BR-R63",
            BLMSP: "BLMSP-R646",
            BLOS: "BLOS-R2157"
        }
    },
    maxResponseTimeAPI: 1000,
});
