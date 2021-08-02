const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;
const { merge } = require('webpack-merge');
const deps = require('../../package.json').dependencies;

module.exports = (angularWebpackConfig, options) => {
  const mfConfig = {

      output: {
    uniqueName: "shell"
      },
      optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false
      },
      plugins: [
    new ModuleFederationPlugin({
      remotes: {},
      name: "shell",


      shared: {
        // ...deps,
        "@angular/core": { eager: true, strictVersion: false  },
        "@angular/common": { eager: true, strictVersion: false   },
        // "@angular/router": { eager: true, singleton: true },
        // "@pepperi-addons/ngx-lib": { eager: true, singleton: true, strictVersion: false },
        // "@angular/cdk": { eager: true, singleton: true },
        // "@mat-datetimepicker/moment": { eager: true, singleton: true },
        // "@angular/common/http": { eager: true, singleton: true },
        // "@mat-datetimepicker/core": { eager: true, singleton: true },
        // "@ngx-translate/core":{ eager: true, singleton: true, strictVersion: false  },
        // "@angular/material-moment-adapter": { eager: true, singleton: true },
        "@angular/cdk/overlay": { eager: true, strictVersion: false  },

      }
    }),
      ],
  }
  const singleSpaWebpackConfig = singleSpaAngularWebpack(angularWebpackConfig, options);
  const merged = merge(singleSpaWebpackConfig, mfConfig);

  return merged;
}
