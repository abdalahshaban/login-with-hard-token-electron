const { MSICreator } = require('electron-wix-msi')
const path = require('path')
;(async () => {
  // Step 1: Instantiate the MSICreator
  const msiCreator = new MSICreator({
    appDirectory: path.resolve('./win-build/win-unpacked'),
    description: 'User Driver',
    exe: 'User',
    name: 'User',
    shortName: 'User',
    shortcutFolderName: 'User',
    shortcutName: 'User',
    programFilesFolderName: 'User',
    manufacturer: 'Abdalah',
    version: '1.0.0',
    appIconPath: path.resolve('./assets/img/login.ico'),
    outputDirectory: path.resolve('./app-exe'),
    appUserModelId: 'com.ISEC.app',
    ui: {
      chooseDirectory: true,
      // images: {
      //     background: path.resolve('./assets/img/setting.jpg'),
      //     banner: path.resolve('./assets/img/setting.jpg'),
      //     exclamationIcon: path.resolve('./assets/img/setting.ico'),
      //     infoIcon: path.resolve('./assets/img/setting.ico'),
      //     newIcon: path.resolve('./assets/img/setting.ico'),
      //     upIcon: path.resolve('./assets/img/setting.ico')
      // },
    },
    features: {
      autoLaunch: true,
    },
    defaultInstallMode: 'perUser',
    extensions: ['WixUtilExtension', 'WixUIExtension'],
  })

  // Step 2: Create a .wxs template file
  await msiCreator.create()

  // Step 3: Compile the template to a .msi file
  await msiCreator.compile()
})()
  .then(() => console.log('sucsses build'))
  .catch((error) => console.log(error))

// const builder = require('electron-builder')
// const path = require('path')
// const Platform = builder.Platform.WINDOWS

// // Promise is returned

// builder
//   .build({
//     targets: Platform.createTarget(),
//     config: {
//       appId: 'com.ISEC.app',
//       productName: 'userDriver',
//       directories: {
//         output: './win-build-3',
//       },
//       win: {
//         icon: './assets/img/login.ico',
//         artifactName: 'userDriver',
//         target: 'appx',
//         // compression: 'maximum',
//       },
//       // nsis: {
//       //   perMachine: true,
//       //   oneClick: false,
//       //   allowToChangeInstallationDirectory: true,
//       //   shortcutName: 'userDriver',
//       //   artifactName: 'userDriver',
//       //   deleteAppDataOnUninstall: true,
//       //   // allowElevation: true,
//       //   // createDesktopShortcut: true,
//       //   // createStartMenuShortcut: true,
//       //   // uninstallDisplayName: 'uninstall userDriver',
//       //   // differentialPackage: true,
//       //   // displayLanguageSelector: true,
//       //   // installerLanguages: [`ar-EG`],
//       //   // language: `3073`,
//       //   // multiLanguageInstaller: true,
//       //   // runAfterFinish: true,
//       //   installerIcon: path.resolve('./assets/img/login.ico'),
//       //   uninstallerIcon: path.resolve('./assets/img/login.ico'),
//       //   installerHeaderIcon: path.resolve('./assets/img/login.ico'),
//       //   installerHeader: path.resolve('./assets/img/login.ico'),
//       // },
//       msi: {
//         oneClick: false,
//         perMachine: true,
//         // createStartMenuShortcut: true,
//         // allowToChangeInstallationDirectory: true,
//         // deleteAppDataOnUninstall: true,
//       },
//       appx: {
//         showNameOnTiles: true,
//       },
//     },
//   })
//   .then(() => {
//     // handle result
//     console.log('build done')
//   })
//   .catch((error) => {
//     // handle error
//     console.log(error, 'error')
//   })
