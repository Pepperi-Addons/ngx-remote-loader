const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;
const { merge } = require('webpack-merge');
const deps = require('../../package.json').dependencies;

module.exports = (angularWebpackConfig, options) => {
  const mfConfig = {
  output: {
    uniqueName: "mfe1"
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mfe1",
      filename: "remoteEntry.js",
      exposes: {

        './DownloadModule': './projects/sub-addon/src/app/download/download.component.ts'
      },
      shared: {
        // ...deps,
        "@angular/core": { singleton: true, strictVersion: false   },
        "@angular/common": { singleton: true, strictVersion: false },
        // "@angular/forms": { singleton: true, strictVersion: false },
        // "@angular/material/select": { singleton: true, strictVersion: false },
        // "@angular/material/form-field": { singleton: true, strictVersion: false },
        // "@angular/material/checkbox": { singleton: true, strictVersion: false },
        // "@angular/material/menu": { singleton: true, strictVersion: false },
        // "@angular/router": { singleton: true, strictVersion: false },
        // "@pepperi-addons/ngx-lib": { singleton: true, strictVersion: false  },
        // "@pepperi-addons/ngx-lib/menu": { singleton: true, strictVersion: false  },
        // "@pepperi-addons/ngx-lib/list": { singleton: true, strictVersion: true  },
        // "@ngx-translate/core": { singleton: true, strictVersion: false  },
        // "@mat-datetimepicker/moment": { singleton: true, strictVersion: false },
        // "@angular/common/http": { singleton: true, strictVersion: false },
        // "@mat-datetimepicker/core": { singleton: true, strictVersion:  },
        // "@ngx-translate/http-loader": { singleton: true, strictVersion: false },
        // "@angular/material-moment-adapter": { singleton: true, strictVersion: false },
        // "@angular/cdk/overlay": { eager: true, strictVersion: false },
        // "@angular/cdk": { eager: true, strictVersion: false },
        // "@angular/cdk/portal": { eager: true, strictVersion: false },
        // "@angular/material": { singleton: true, strictVersion: false },
        // "@angular/material/dialog": { singleton: true, strictVersion: false },
        // "@angular/material/dialog": { singleton: true, strictVersion: false },







      }
    }),
  ],
};


const merged = merge(angularWebpackConfig, mfConfig);
const singleSpaWebpackConfig = singleSpaAngularWebpack(merged, options);

return singleSpaWebpackConfig;
}
